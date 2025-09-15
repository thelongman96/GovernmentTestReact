import { useEffect } from 'react';
import { eventBus } from './eventBus';
import { useCookies } from 'react-cookie';
import { useUserStore } from '@/stores/UserStore';
import { useNavigate } from 'react-router';

export const useAuthHandler = () => {
	const [,,removeCookie] = useCookies(['loginToken']);
	const storeProfileData = useUserStore((state) => state.storeProfileData);
	const navigate = useNavigate();

  useEffect(() => {
    const handleUnauthorized = (eventData) => {
      console.log('Handling unauthorized access:', eventData);
      
      // Clear cookies
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
      
      // Clear storage
      removeCookie('loginToken');
      
      // Clear your app stores/state
      storeProfileData({profileData: null});

			navigate('/');
    };

    const handleServerError = (eventData) => {
      console.error('Server error detected:', eventData);
      // Handle server errors globally if needed
    };

    eventBus.on('unauthorized', handleUnauthorized);
    eventBus.on('serverError', handleServerError);

    return () => {
      eventBus.off('unauthorized', handleUnauthorized);
      eventBus.off('serverError', handleServerError);
    };
  }, [navigate, storeProfileData, removeCookie]);
};