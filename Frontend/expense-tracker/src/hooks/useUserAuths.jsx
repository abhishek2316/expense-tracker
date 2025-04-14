import React, { useContext, useEffect } from 'react'
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom';
import { API_PATHS } from '../../utils/apiPath';
import axiosInstance from '../../utils/axiosInstance';



export const useUserAuths = () => {
    const { user, updateUser, cleanUser } = useContext(UserContext);
    const navigate = useNavigate();
  
    useEffect(() => {
      if (user) return;
  
      let isMounted = true;
      const loginInfo = async () => {
        try {
            // console.log("Checking auth...");
          const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
          // console.log("Auth response:", response);
          if (isMounted && response.data) {
            updateUser(response.data);
          }
        } catch (error) {
          console.log("Error", error.message);
          if (isMounted) {
            cleanUser();
            navigate("/login");
          }
        }
      };
  
      loginInfo();
  
      return () => {
        isMounted = false;
      };
    }, [updateUser, cleanUser, navigate]);
  
    return { user }; // return user so Home.jsx can wait
  };
  
