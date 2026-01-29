import React from 'react'
import shoe1 from '../../ladies-shoes/shoe-1.jpg'
import { FaFacebookF, FaPinterestP, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { useState } from 'react';
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuItems = [
    { name: "NEW", img: shoe1 },
    { name: "WOMEN", img: shoe1 },
    { name: "BAGS", img: shoe1 },
    { name: "MEN", img: shoe1 },
    { name: "FRAGRANCES", img: shoe1 },
    { name: "ACCESSORIES", img: shoe1 },
    { name: "GET INSPIRED", img: shoe1 },
    { name: "SALE", img: shoe1, text: "text-red-600" },
  ];
return (
    <div className="w-full relative h-150 overflow-y-scroll bg-gray-50">
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-30 "
          onClick={() => setIsOpen(false)}
          />
      )}
  <div className='fixed top-0 left-0 bg-white overflow-y-auto shadow-sm z-30  flex items-center justify-between h-screen'>
    <div className='bg-white h-full flex flex-col'>
      <div className='flex-col h-full'>
        <div className="flex justify-between items-center bg-white px-6 py-3 shadow overflow-hidden ">
          {/* Left Side */}
          <div>
            <h2 className="font-bold text-sm">WELCOME TO</h2>
            <p className="text-sm ">WWW.INSIGNIA.COM</p>
          </div>

          {/* Right Side - Sign in Button */}
          <button className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition ">
            <FaUser className="text-sm" />
            <span className="text-sm font-semibold">Sign in</span>
          </button>
        </div>

        <ul className="overflow-y-auto overflow-x-hidden flex-1">
          <div className="flex justify-between items-center bg-white px-6 py-3"></div>
          {menuItems.map((item) => (
            <li
              key={item.name}
              className="flex justify-between items-center px-4 py-4 hover:bg-gray-100"
            >
              {/* Text */}
              <span className={`text-lg font-medium ${item.text}`}>{item.name}</span>

              {/* Image */}
              <img
                src={item.img}
                alt={item.name}
                className="size-[60px] object-cover"
              />
            </li>
          ))}
        </ul>

        <div className="flex justify-between items-center px-4 bg-gray-100 py-4 flex-shrink-0">
          {/* Facebook */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded bg-gray-400 text-white hover:bg-blue-600 transition"
          >
            <FaFacebookF size={17} />
          </a>

          {/* Pinterest */}
          <a
            href="https://pinterest.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full border border-black text-black hover:bg-red-600 hover:text-white transition"
          >
            <FaPinterestP size={18} />
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full border border-black text-black hover:bg-pink-500 hover:text-white transition"
          >
            <FaInstagram size={18} />
          </a>

          {/* TikTok */}
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full border border-black text-black hover:bg-black hover:text-white transition"
          >
            <FaTiktok size={18} />
          </a>

          {/* YouTube */}
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full border border-black text-black hover:bg-red-600 hover:text-white transition"
          >
            <FaYoutube size={18} />
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
);
}

export default Sidebar