import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { setCart, setHydrated } from "../redux_Toolkit/cartSlice";

/**
 * Mount this ONCE at the root of the app (in App.jsx / ReactRouter.jsx,
 * outside <Routes>). It does not render anything. It:
 *
 *  1. Loads the cart from the DB (logged-in) or localStorage (guest) ONCE
 *     when the app first loads.
 *  2. Auto-saves the cart (debounced) whenever Redux items change.
 *
 * 🛠 FIX: hydration is async (network calls), so if the user adds an item
 * to the cart WHILE this is still loading, the old fix would overwrite
 * that fresh item with stale fetched data the moment the fetch resolved.
 * We now track live items in a ref, and if anything was added before
 * hydration finished, we keep the user's current cart instead of
 * clobbering it.
 */
const CartSync = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const hydrated = useSelector((state) => state.cart.hydrated);

  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  const hasHydrated = useRef(false);
  const skipNextSave = useRef(true);
  const saveTimer = useRef(null);

  // Always-current snapshot of items, safe to read inside async callbacks
  const itemsRef = useRef(items);
  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  // 🔐 CHECK LOGIN USER — once
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/me", { withCredentials: true })
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null))
      .finally(() => setAuthChecked(true));
  }, []);

  // 🛒 HYDRATE — once, when auth status is known
  useEffect(() => {
    if (!authChecked || hasHydrated.current) return;
    hasHydrated.current = true;

    const hydrate = async () => {
      let fetched = [];

      if (user) {
        try {
          const res = await axios.get("http://localhost:3000/cart", {
            withCredentials: true
          });
          fetched = res.data.items || [];
        } catch {
          fetched = [];
        }
      } else {
        fetched = JSON.parse(localStorage.getItem("cart")) || [];
      }

      // 🛠 RACE FIX: if the user already added something to the cart
      // while this fetch was in flight, don't overwrite it — keep what's
      // there and just mark hydration done so saving can proceed normally.
      if (itemsRef.current.length > 0) {
        skipNextSave.current = false;
        dispatch(setCart(itemsRef.current));
      } else {
        skipNextSave.current = true;
        dispatch(setCart(fetched));
      }

      dispatch(setHydrated(true));
    };

    hydrate();
  }, [user, authChecked, dispatch]);

  // 💾 AUTO-SYNC — runs on every cart change, app-wide, debounced
  useEffect(() => {
    if (!hydrated) return;

    if (skipNextSave.current) {
      skipNextSave.current = false;
      return;
    }

    if (saveTimer.current) clearTimeout(saveTimer.current);

    saveTimer.current = setTimeout(() => {
      if (user) {
        axios
          .post(
            "http://localhost:3000/cart/save",
            { items },
            { withCredentials: true }
          )
          .catch((err) => console.error("Cart sync failed:", err));
      } else {
        localStorage.setItem("cart", JSON.stringify(items));
      }
    }, 500);

    return () => clearTimeout(saveTimer.current);
  }, [items, user, hydrated]);

  return null;
};

export default CartSync;