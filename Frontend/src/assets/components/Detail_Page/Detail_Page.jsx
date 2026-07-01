import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addToCart } from "../redux_Toolkit/cartSlice";
import { fetchFavourites, toggleFavourite } from "../redux_Toolkit/Favouriteslice"; // ← apna actual path check karna
import {
  ArrowLeft, ShoppingCart, Check, Star,
  Tag, Percent, ImageOff, Truck, Shield, RotateCcw,
  ChevronUp, ChevronDown, Heart,
} from "lucide-react";

const FREE_DELIVERY_THRESHOLD = 5000;

const StockBadge = ({ stock }) => {
  const qty = Number(stock);
  let style, label;
  if (!stock && stock !== 0) { style = "bg-gray-100 text-gray-500";    label = "—"; }
  else if (qty === 0)        { style = "bg-red-100 text-red-700";       label = "Out of Stock"; }
  else if (qty <= 10)        { style = "bg-yellow-100 text-yellow-700"; label = `${qty} — Low Stock`; }
  else                       { style = "bg-green-100 text-green-700";   label = `${qty} In Stock`; }
  return <span className={`px-3 py-1 rounded-full text-sm font-medium ${style}`}>{label}</span>;
};

const StarRating = ({ rating, size = "w-4 h-4", interactive = false, onSelect }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star
        key={s}
        onClick={() => interactive && onSelect?.(s)}
        className={`${size} transition-colors
          ${s <= Math.round(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"}
          ${interactive ? "cursor-pointer hover:text-yellow-300 hover:fill-yellow-300" : ""}
        `}
      />
    ))}
  </div>
);

const FAKE_REVIEWS = [
  {
    id: 1,
    name: "Ali Hassan",
    rating: 5,
    date: "2 din pehle",
    img: "https://api.dicebear.com/7.x/thumbs/svg?seed=Ali&backgroundColor=b6e3f4",
    comment: "Bohat acha product hai, quality bhi behtareen hai. Definitely recommend karunga!",
  },
  {
    id: 2,
    name: "Sara Khan",
    rating: 4,
    date: "1 hafta pehle",
    img: "https://api.dicebear.com/7.x/thumbs/svg?seed=Sara&backgroundColor=ffd5dc",
    comment: "Delivery fast thi, product packaging bhi achi thi. Overall satisfied hoon.",
  },
  {
    id: 3,
    name: "Ahmed Raza",
    rating: 5,
    date: "2 hafta pehle",
    img: "https://api.dicebear.com/7.x/thumbs/svg?seed=Ahmed&backgroundColor=c0aede",
    comment: "Price ke hisaab se bohat achi quality hai. Dobara zaroor order karunga.",
  },
  {
    id: 4,
    name: "Fatima Malik",
    rating: 3,
    date: "1 mahina pehle",
    img: "https://api.dicebear.com/7.x/thumbs/svg?seed=Fatima&backgroundColor=ffd5dc",
    comment: "Theek hai, lekin color thoda alag tha picture se. Baaki sab sahi tha.",
  },
  {
    id: 5,
    name: "Usman Sheikh",
    rating: 5,
    date: "1 mahina pehle",
    img: "https://api.dicebear.com/7.x/thumbs/svg?seed=Usman&backgroundColor=b6e3f4",
    comment: "Zabardast! Bilkul waise hi mila jaise picture mein tha. Happy hoon.",
  },
];

const RelatedCard = ({ product }) => (
  <Link to={`/products/${product._id}`} className="w-full group block">
    <div className="bg-gray-100 rounded-xl overflow-hidden aspect-square mb-2">
      {product.images?.[0] ? (
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-300">
          <ImageOff className="w-8 h-8" />
        </div>
      )}
    </div>
    {product.discount && (
      <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">
        {product.discount}
      </span>
    )}
    <p className="text-sm font-medium text-gray-900 truncate mt-1">{product.name}</p>
    <div className="flex items-center gap-2">
      <p className="text-sm text-red-600 font-semibold">Rs. {Number(product.price).toLocaleString()}</p>
      {product.oldPrice && (
        <p className="text-xs text-gray-400 line-through">Rs. {Number(product.oldPrice).toLocaleString()}</p>
      )}
    </div>
  </Link>
);

const Detail_Page = () => {
  const { id }   = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  const { items: favouriteItems } = useSelector((state) => state.favourites);

  useEffect(() => {
    dispatch(fetchFavourites());
  }, [dispatch]);


  const cartItems   = useSelector((state) => state.cart.items);
  const allProducts = useSelector((state) => state.FetchPrducts.products || []);

  const [product,      setProduct]      = useState(null);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState(null);
  const [activeImage,  setActiveImage]  = useState(0);
  const [thumbStart,   setThumbStart]   = useState(0);
  const [added,        setAdded]        = useState(false);
  const [reviews,      setReviews]      = useState(FAKE_REVIEWS);
  const [reviewText,   setReviewText]   = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [showAll,      setShowAll]      = useState(false);
  // ← local isFavourite state hata diya, ab yeh seedha redux ke favouriteItems se nikalenge (neeche)

  const VISIBLE_THUMBS = 3;

  useEffect(() => {
    setLoading(true);
    setActiveImage(0);
    setThumbStart(0);
    setAdded(false);
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/admin/products/getproducts/${id}`);
        setProduct(res.data.product || res.data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-3 text-gray-400">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin" />
        <span className="text-sm">Loading...</span>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-3">
        <p className="text-red-500">{error}</p>
        <button onClick={() => navigate(-1)} className="text-sm text-gray-500 hover:underline">Go back</button>
      </div>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-3">
        <ImageOff className="w-12 h-12 mx-auto text-gray-300" />
        <p className="text-gray-500 font-medium">Product not found</p>
        <button onClick={() => navigate(-1)} className="text-sm text-blue-500 hover:underline">Go back</button>
      </div>
    </div>
  );

  const images       = product.images?.filter(Boolean) || [];
  const isInCart     = cartItems.some((i) => (i._id || i.id) === (product._id || product.id));
  const outOfStock   = Number(product.stock) === 0;
  const productPrice = Number(product.price);

  // ← isFavourite ab redux favouriteItems list me se check ho raha hai (no separate local state)
  const isFavourite = (favouriteItems || []).some((item) => item._id === product._id);

  // ── Free Delivery Logic ──
  const hasFreeDelivery = productPrice >= FREE_DELIVERY_THRESHOLD;
  const amountLeft      = FREE_DELIVERY_THRESHOLD - productPrice;

  const savePercent = product.oldPrice && Number(product.oldPrice) > productPrice
    ? Math.round(((Number(product.oldPrice) - productPrice) / Number(product.oldPrice)) * 100)
    : null;

  const avgRating = reviews.length
    ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  const related = allProducts
    .filter((p) => p._id !== id && p.category === product.category)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (outOfStock) return;
    dispatch(addToCart(product));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // ← Favourite toggle handler add kiya - product._id pass karta hai
  const handleToggleFavourite = () => {
    dispatch(toggleFavourite(product._id));
  };

  const handleReviewSubmit = () => {
    if (!reviewText.trim()) return;
    setReviews([
      {
        id: Date.now(),
        name: "Aap",
        rating: reviewRating,
        date: "Abhi",
        img: `https://api.dicebear.com/7.x/thumbs/svg?seed=${Date.now()}&backgroundColor=d1fae5`,
        comment: reviewText.trim(),
      },
      ...reviews,
    ]);
    setReviewText("");
    setReviewRating(5);
  };

  const visibleReviews = showAll ? reviews : reviews.slice(0, 3);

  const canScrollUp   = thumbStart > 0;
  const canScrollDown = thumbStart + VISIBLE_THUMBS < images.length;
  const visibleThumbs = images.slice(thumbStart, thumbStart + VISIBLE_THUMBS);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        {/* ── Main Section ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-2xl p-6 border border-gray-100">

          {/* Left: Images */}
          <div className="flex gap-3">
            {images.length > 1 && (
              <div className="flex flex-col items-center gap-2 shrink-0">
                <button
                  onClick={() => setThumbStart((p) => Math.max(0, p - 1))}
                  disabled={!canScrollUp}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 transition disabled:opacity-30"
                >
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                </button>
                {visibleThumbs.map((img, i) => {
                  const realIndex = thumbStart + i;
                  return (
                    <button
                      key={realIndex}
                      onClick={() => setActiveImage(realIndex)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                        activeImage === realIndex
                          ? "border-gray-900 shadow-md"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <img src={img} alt={`thumb-${realIndex}`} className="w-full h-full object-cover" />
                    </button>
                  );
                })}
                <button
                  onClick={() => setThumbStart((p) => Math.min(images.length - VISIBLE_THUMBS, p + 1))}
                  disabled={!canScrollDown}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 transition disabled:opacity-30"
                >
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            )}

            <div className="flex-1 aspect-square rounded-xl bg-gray-100 overflow-hidden flex items-center justify-center">
              {images[activeImage] ? (
                <img src={images[activeImage]} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <ImageOff className="w-12 h-12 text-gray-300" />
              )}
            </div>
          </div>

          {/* Right: Info */}
          <div className="space-y-4">

            {product.category && (
              <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                <Tag className="w-3.5 h-3.5" />
                {product.category}
              </div>
            )}

            <div className="flex items-start justify-between gap-3">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
                {product.name}
              </h1>

              {/* ── Favourite Heart Button ── */}
              <button
                onClick={handleToggleFavourite}
                className={`shrink-0 w-11 h-11 flex items-center justify-center rounded-full border-2 transition-all duration-200 ${
                  isFavourite
                    ? "border-red-400 bg-red-50"
                    : "border-gray-200 bg-white hover:border-red-300 hover:bg-red-50"
                }`}
                title={isFavourite ? "Favourites se hatayen" : "Favourites mein add karein"}
              >
                <Heart
                  className={`w-5 h-5 transition-all duration-200 ${
                    isFavourite
                      ? "text-red-500 fill-red-500 scale-110"
                      : "text-gray-400"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <StarRating rating={avgRating} />
              <span className="text-sm text-gray-500">{avgRating} ({reviews.length} reviews)</span>
            </div>

            <StockBadge stock={product.stock} />

            <hr className="border-gray-100" />

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-3xl font-bold text-gray-900">
                  Rs. {productPrice.toLocaleString()}
                </span>
                {product.oldPrice && (
                  <span className="text-gray-400 line-through text-base">
                    Rs. {Number(product.oldPrice).toLocaleString()}
                  </span>
                )}
              </div>

              <div className="flex gap-2 flex-wrap">
                {product.discount && (
                  <span className="flex items-center gap-1 bg-green-100 text-green-800 text-xs px-2.5 py-1 rounded-full font-medium">
                    <Percent className="w-3 h-3" /> {product.discount} OFF
                  </span>
                )}
                {savePercent && (
                  <span className="bg-orange-100 text-orange-800 text-xs px-2.5 py-1 rounded-full font-medium">
                    Save {savePercent}%
                  </span>
                )}
              </div>

              {hasFreeDelivery ? (
                <div className="flex items-center gap-3 p-3 rounded-xl border border-green-200 bg-green-50">
                  <Truck className="w-5 h-5 text-green-600 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-green-800">🎉 Free Delivery!</p>
                    <p className="text-xs text-green-600">Is order par delivery bilkul free hai</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 p-3 rounded-xl border border-orange-200 bg-orange-50">
                  <Truck className="w-5 h-5 text-orange-500 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-orange-800">Delivery Charges Lagengy</p>
                    <p className="text-xs text-orange-600">
                      Rs. {amountLeft.toLocaleString()} aur milao — delivery free ho jaye!
                    </p>
                  </div>
                </div>
              )}
            </div>

            <hr className="border-gray-100" />

            {/* Add to Cart */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={outOfStock}
                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all ${
                  outOfStock
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : added
                    ? "bg-green-600 text-white"
                    : "bg-gray-900 hover:bg-gray-700 text-white"
                }`}
              >
                {outOfStock ? "Out of Stock"
                  : added
                  ? <><Check className="w-4 h-4" /> Added to Cart</>
                  : <><ShoppingCart className="w-4 h-4" /> Add to Cart</>
                }
              </button>

              {/* COD */}
              <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50">
                <div className="w-4 h-4 rounded-full border-4 border-gray-900 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Cash on Delivery</p>
                  <p className="text-xs text-gray-500">Delivery par payment karein</p>
                </div>
              </div>

              {isInCart && !added && (
                <p className="text-center text-xs text-gray-400">
                  Already in cart —{" "}
                  <span
                    onClick={() => navigate("/cart")}
                    className="text-gray-700 font-medium hover:underline cursor-pointer"
                  >
                    View Cart
                  </span>
                </p>
              )}
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              {[
                { icon: Truck,     label: "Free Delivery" },
                { icon: Shield,    label: "Secure Payment" },
                { icon: RotateCcw, label: "Easy Returns" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1 text-center p-2 rounded-lg bg-gray-50 border border-gray-100">
                  <Icon className="w-5 h-5 text-gray-600" />
                  <span className="text-xs text-gray-500">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Description ── */}
        {product.description && (
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Description</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
          </div>
        )}

        {/* ── Rating Breakdown ── */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Customer Rating</h2>
          <div className="flex items-center gap-8">

            <div className="text-center shrink-0">
              <p className="text-5xl font-bold text-gray-900">{avgRating}</p>
              <StarRating rating={avgRating} size="w-5 h-5" />
              <p className="text-xs text-gray-400 mt-1">{reviews.length} reviews</p>
            </div>

            <div className="flex-1 space-y-2">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = reviews.filter((r) => r.rating === star).length;
                const pct   = reviews.length ? Math.round((count / reviews.length) * 100) : 0;
                return (
                  <div key={star} className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 w-2 shrink-0">{star}</span>
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 shrink-0" />
                    <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400 w-4 shrink-0">{count}</span>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* ── Reviews ── */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 space-y-6">

          <div className="flex items-center justify-between flex-wrap gap-3">
            <h2 className="text-lg font-bold text-gray-900">Customer Reviews</h2>
            <span className="text-sm text-gray-400">({reviews.length} reviews)</span>
          </div>

          {/* Write Review */}
          <div className="border border-gray-100 rounded-xl p-4 space-y-3 bg-gray-50">
            <p className="text-sm font-medium text-gray-700">Apna review likhein</p>
            <StarRating
              rating={reviewRating}
              size="w-5 h-5"
              interactive
              onSelect={setReviewRating}
            />
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Apna experience share karein..."
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 resize-none h-20"
            />
            <button
              onClick={handleReviewSubmit}
              disabled={!reviewText.trim()}
              className="px-5 py-2 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-700 transition disabled:opacity-40"
            >
              Submit Review
            </button>
          </div>

          {/* Review List with Profile Photos */}
          <div className="space-y-4">
            {visibleReviews.map((review) => (
              <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0">
                <div className="flex items-start gap-3">

                  <img
                    src={review.img}
                    alt={review.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-gray-100 shrink-0"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-gray-800">{review.name}</span>
                      <span className="text-xs text-gray-400">{review.date}</span>
                    </div>
                    <StarRating rating={review.rating} size="w-3.5 h-3.5" />
                    <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">{review.comment}</p>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {reviews.length > 3 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-sm text-gray-500 hover:text-gray-900 hover:underline transition"
            >
              {showAll ? "Kam dikhao" : `Sab ${reviews.length} reviews dekho`}
            </button>
          )}
        </div>

        {/* ── Related Products ── */}
        {related.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900">Related Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {related.map((p) => (
                <RelatedCard key={p._id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Detail_Page;