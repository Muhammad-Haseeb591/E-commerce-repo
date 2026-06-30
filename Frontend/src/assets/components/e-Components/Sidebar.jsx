import React from 'react'
import { Link } from 'react-router-dom'
import NewShoes from '../../images/NewShoes.jpg'
import LadiesShoes from '../../images/LadiesShoes.jpg'
import MenShoes from '../../images/MensShoes.jpg'
import shoe1 from '../../ladies-shoes/shoe-1.jpg'
import { FaFacebookF, FaPinterestP, FaInstagram, FaTiktok, FaYoutube, FaUser } from 'react-icons/fa'
import { IoChevronForward } from 'react-icons/io5'

const menuItems = [
  { name: 'NEW', to: '/new', img: NewShoes },
  { name: 'WOMEN', to: '/women', img: LadiesShoes },
  { name: 'MEN', to: '/men', img: MenShoes },
  { name: 'KIDS', to: '/kids', img: shoe1 },
  { name: 'FRAGRANCES', to: '/fragrances', img: shoe1 },
  { name: 'ACCESSORIES', to: '/accessories', img: shoe1 },
  { name: 'GET INSPIRED', to: '/getinspired', img: shoe1 },
  { name: 'SALES', to: '/sales', img: shoe1, text: 'text-red-600' },
]

const socialLinks = [
  { href: 'https://facebook.com', icon: FaFacebookF, label: 'Facebook', className: 'hover:bg-[#1877f2] hover:text-white hover:border-[#1877f2]' },
  { href: 'https://pinterest.com', icon: FaPinterestP, label: 'Pinterest', className: 'hover:bg-[#e60023] hover:text-white hover:border-[#e60023]' },
  { href: 'https://instagram.com', icon: FaInstagram, label: 'Instagram', className: 'hover:bg-[#e4405f] hover:text-white hover:border-[#e4405f]' },
  { href: 'https://tiktok.com', icon: FaTiktok, label: 'TikTok', className: 'hover:bg-black hover:text-white hover:border-black' },
  { href: 'https://youtube.com', icon: FaYoutube, label: 'YouTube', className: 'hover:bg-[#ff0000] hover:text-white hover:border-[#ff0000]' },
]

const Sidebar = ({ onClose }) => {
  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/45 backdrop-blur-[3px] lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

<aside className="fixed top-0 left-0 z-50 flex h-[100dvh] w-[75vw] flex-col bg-white shadow-[4px_0_24px_rgba(0,0,0,0.12)] sm:w-[min(85vw,360px)] md:w-[min(80vw,400px)] lg:hidden">
        <div className="border-b border-gray-100 bg-white px-5 py-4 sm:px-6 sm:py-5">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 sm:text-[11px]">
                Welcome to
              </p>
              <h2 className="truncate text-sm font-bold tracking-tight text-gray-900 sm:text-base">
                WWW.INSIGNIA.COM
              </h2>
            </div>

            <Link
              to="/login"
              onClick={onClose}
              className="flex shrink-0 items-center gap-1.5 rounded-full bg-gray-900 px-3 py-2 text-white transition-colors hover:bg-gray-700 sm:gap-2 sm:px-4 sm:py-2.5"
            >
              <FaUser className="text-xs sm:text-sm" />
              <span className="text-xs font-semibold sm:text-sm">Sign in</span>
            </Link>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto overscroll-contain py-1">
          <ul className="divide-y divide-gray-50">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.to}
                  onClick={onClose}
                  className="group flex items-center justify-between gap-3 px-5 py-3.5 transition-colors hover:bg-gray-50 sm:px-6 sm:py-4"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
                    <div className="relative size-12 shrink-0 overflow-hidden rounded-lg ring-1 ring-gray-100 sm:size-14">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    <span
                      className={`truncate text-sm font-medium tracking-tight text-gray-800 transition-transform duration-200 group-hover:translate-x-0.5 sm:text-base ${
                        item.text ?? ''
                      }`}
                    >
                      {item.name}
                    </span>
                  </div>

                  <IoChevronForward className="size-4 shrink-0 text-gray-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-gray-600 sm:size-5" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-gray-100 bg-gray-50/80 px-5 py-4 sm:px-6 sm:py-5">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400 sm:text-[11px]">
            Follow us
          </p>
          <div className="flex items-center justify-between gap-1.5 sm:gap-2">
            {socialLinks.map(({ href, icon: Icon, label, className }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`flex size-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition-all duration-200 sm:size-10 ${className}`}
              >
                <Icon size={15} className="sm:text-[16px]" />
              </a>
            ))}
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
