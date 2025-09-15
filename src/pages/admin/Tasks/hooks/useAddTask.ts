import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { createTask } from '@/services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useUserStore } from '@/stores/UserStore';
import { useCaseStore } from '@/stores/CaseStore';

const useAddTask = () => {
  const navigate = useNavigate();
	const [cookies, ,removeCookie] = useCookies(["loginToken"]);

	const profileData = useUserStore((state) => state.profileData);
  const storeProfileData = useUserStore(
		(state) => state.storeProfileData,
	);
	const selectedCase = useCaseStore((state) => state.selectedCase);

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
    status: 'ready',
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

    if (!formData.status) {
      newErrors.status = 'Status is required';
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
    const result = await createTask({ loginToken: cookies.loginToken, title: formData.title, status: formData.status, description: formData.description, caseId: selectedCase.id });
    if (result.code === 201 && result.result?.id) {
      toast.success("Case added successfully");
			navigate(`/cases/${selectedCase.id}`);
    } else {
      toast.error("Failed to add case");
    }
    setLoading(false);    
  };

	const handleResetClick = () => {
		setFormData({
			title: '',
			status: '',
			description: '',
		});
		setErrors({});
	};

	const goBack = () => {
		navigate(`/cases/${selectedCase.id}`);
	}

  const disabled =
    formData.title === '' ||
    formData.status === '' ||
    formData.description === '';

  const statusOptions = [
    {label: 'Ready', value: 'ready'},
    {label: 'In Progress', value: 'progress'},
    {label: 'In Review', value: 'review'},
    {label: 'Completed', value: 'completed'},
    {label: 'Archived', value: 'archived'}
  ];

  return {
    handleSaveClick,
    handleInputChange,
    formData,
    errors,
    loading,
		handleResetClick,
		user, anchorEl, handleMenuOpen, handleMenuClose, handleLogout,
		goBack,
    disabled,
    statusOptions
  };

};

export default useAddTask;