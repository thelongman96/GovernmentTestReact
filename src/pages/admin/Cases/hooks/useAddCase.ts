import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { createCase } from '@/services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useUserStore } from '@/stores/UserStore';

const useAddCase = () => {
  const navigate = useNavigate();
	const [cookies, ,removeCookie] = useCookies(["loginToken"]);

	const profileData = useUserStore((state) => state.profileData);
  const storeProfileData = useUserStore(
		(state) => state.storeProfileData,
	);

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [user, setUser] = useState(profileData);

	const handleLogout = () => {
    setUser(null);
    setAnchorEl(null);
		removeCookie('loginToken');
    storeProfileData(null);
    navigate('/');
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    referenceNumber: '',
    description: '',
  });
  const [errors, setErrors] = useState({});

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
    
    if (!formData.title) {
      newErrors.title = 'Title is required';
    }

    if (!formData.referenceNumber) {
      newErrors.referenceNumber = 'Reference Number is required';
    }

    if (!formData.description) {
      newErrors.description = 'Description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveClick = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    const result = await createCase({ loginToken: cookies.loginToken, title: formData.title, referenceNumber: formData.referenceNumber, description: formData.description });
    if (result.code === 201 && result.result?.id) {
      toast.success("Case added successfully");
			navigate(`/`);
    } else {
      toast.error("Failed to add case");
    }
    setLoading(false);    
  };

	const handleResetClick = () => {
		setFormData({
			title: '',
			referenceNumber: '',
			description: '',
		});
		setErrors({});
	};

	const navToDashboard = () => {
		navigate(`/`);
	}

  const disabled =
    formData.title === '' ||
    formData.referenceNumber === '' ||
    formData.description === '';

  return {
    handleSaveClick,
    handleInputChange,
    formData,
    errors,
    loading,
		handleResetClick,
		user, anchorEl, handleMenuOpen, handleMenuClose, handleLogout,
		navToDashboard,
    disabled
  };

};

export default useAddCase;