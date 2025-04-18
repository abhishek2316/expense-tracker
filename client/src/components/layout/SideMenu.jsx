import React, { useContext } from 'react'
// import {SIDE_MNEU} from '../../../utils/data'
import { SIDE_MENU } from '../../utils/data' 
import { UserContext } from '../../context/userContext'
import { useNavigate } from "react-router-dom";
import CharAvatar from '../Cards/CharAvatar';

const SideMenu = ({activeMenu}) => {
  const { user, cleanUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleClick = (route) => {
    if(route === 'logout'){
      handleLogout();
      return;
    }

    navigate(route);
  }

  const handleLogout = () => {
    localStorage.clear();
    cleanUser();
    navigate('/login');
  }
  return ( 
  <div className='w-64 h-[calc(98vh-60px)] border-b border-gray-200/50 p-5 border-r sticky z-30 top-[61px] bg-white '>
  <div className='flex flex-col items-center justify-center gap-4 mt-5 mb-7'>
    {user?.profileImageUrl?(
      <img src={user?.profileImageUrl || "" } alt="Profile Image" className='w-20 h-20 bg-slate-500 rounded-full' />
    ) : <CharAvatar 
        fullName={user?.name}
        width="w-20"
        height="h-20"
        style="text-xl"
        />}

    <h5 className='text-gray-950 font-medium leading-6'>
      {user?.name || ""}
    </h5>
  </div>
  {SIDE_MENU.map((item, index) => {
        // Return the button JSX here to render it properly
        return (
          <button
            key={`menu_${index}`}
            className={`w-full flex gap-4 text-[15px] items-center ${activeMenu === item.label ? "text-white bg-primary" : ""} py-3 px-6 rounded-lg mb-3`}
            onClick={() => handleClick(item.path)}
          >
            <item.icon className='text-xl' />
            {item.label}
          </button>
        );
      })}
</div>
)   
  
}

export default SideMenu;