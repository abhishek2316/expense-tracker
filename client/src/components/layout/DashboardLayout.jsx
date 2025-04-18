import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activeMenu={activeMenu} />
      {/* <div className="hidden min-[1080px]:block">
            <SideMenu activeMenu={activeMenu} />
          </div> */}
      {user ? (
        <div className="flex">
          <div className="hidden min-[1080px]:block">
            <SideMenu activeMenu={activeMenu} />
          </div>
          <div className="grow mx-5">{children}</div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">Please log in</div>
      )}
    </div>
    
  );
};

// const DashboardLayout = ({ children, activeMenu }) => {
//   const { user } = useContext(UserContext);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar activeMenu={activeMenu} />
//       <div className="flex">
//         <div className="hidden min-[1080px]:block">
//           <SideMenu activeMenu={activeMenu} />
//         </div>
//         <div className="grow mx-5">{children}</div>
//       </div>
//     </div>
//   );
// };



export default DashboardLayout;
