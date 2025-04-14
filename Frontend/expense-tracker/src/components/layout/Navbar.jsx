import React, { useState } from 'react'
import {HiOutlineMenu, HiOutlineX} from 'react-icons/hi';
import SideMenu from './SideMenu';

const Navbar = (activeMenu) => {
  const [ openSideMenu, setOpenSideMenu ] = useState(false);
  return (
    <div className='flex gap-5 border border-b border-gray-200/50 backdrop-blur-[2px] px-7 py-4 sticky top-0 z-30'>
      <button
      className='hidden max-[1080px]:block text-black'
      onClick={() => setOpenSideMenu(!openSideMenu)}>  
        { openSideMenu ? (
          <HiOutlineX className="text-2xl"></HiOutlineX>
        ) : (
          <HiOutlineMenu className="text-2xl"></HiOutlineMenu>
        )
      }
      </button>
      <h2 className='text-2xl font-medium'> EXPENSE TRACKER</h2>
      { openSideMenu && (
        <div className='fixed top-[61px] bg-white -ml-4'>
          <SideMenu activeMenu={activeMenu}></SideMenu>
        </div>
      )}

    </div>
  )
}

export default Navbar;