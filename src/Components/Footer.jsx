import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className="mt-40 px-6 md:px-16">

      {/* TOP FOOTER GRID */}
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 text-sm">

        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="" />
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li className='cursor-pointer'>Home</li>
            <li className='cursor-pointer'>About Us</li>
            <li className='cursor-pointer'>Delivery</li>
            <li className='cursor-pointer'>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+1-000-000-0000</li>
            <li>devmode@gmail.com</li>
            <li className='cursor-pointer'>Instagram</li>
          </ul>
        </div>

      </div>

      {/* FULL WIDTH DIVIDER */}
      <hr className="my-8"/>

      {/* COPYRIGHT */}
      <p className="text-center text-sm py-4">
        Copyright 2024@ devmode.mj - All Right Reserved.
      </p>

    </div>
  )
}


export default Footer
