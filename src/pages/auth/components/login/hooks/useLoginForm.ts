import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { login } from '@/services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useUserStore } from '@/stores/UserStore';

const useLoginForm = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['loginToken']);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const storeProfileData = useUserStore(
		(state) => state.storeProfileData,
	);

  const handleInputChange = (field) => (value) => {
    setFormData({
      ...formData,
      [field]: value
    });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username) {
      newErrors.username = 'Username is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLoginClick = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    const result = await login({username: formData.username, password: formData.password});
    if (result.code === 200 && result.result?.sessionId) {
      setCookie('loginToken', result.result.sessionId);
      storeProfileData({profileData: result.result.user});
      toast.success("Login Successful");
    } else {
      toast.error("Login failed, please check your credentials");
    }
    setLoading(false);    
  };

  const navToRegister = () => {
    navigate('register');
  }

  return {
    handleLoginClick,
    handleInputChange,
    formData,
    errors,
    loading,
    showPassword,
    setShowPassword,
    navToRegister
   };
};

export default useLoginForm;
