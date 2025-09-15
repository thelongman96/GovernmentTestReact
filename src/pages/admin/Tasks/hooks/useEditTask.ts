import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { updateTask } from '@/services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useUserStore } from '@/stores/UserStore';
import { useCaseStore } from '@/stores/CaseStore';
import { useTaskStore } from '@/stores/TaskStore';

const useEditTask = () => {
  const navigate = useNavigate();
	const [cookies, ,removeCookie] = useCookies(["loginToken"]);

	const profileData = useUserStore((state) => state.profileData);
	const selectedCase = useCaseStore((state) => state.selectedCase);
	const storeSelectedTask = useTaskStore((state) => state.storeSelectedTask);
	const selectedTask = useTaskStore((state) => state.selectedTask);

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [user, setUser] = useState(profileData);

	const handleLogout = () => {
    setUser(null);
    setAnchorEl(null);
		removeCookie('loginToken');
    navigate('/');
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(selectedTask ? {
    title: selectedTask.title,
    status: selectedTask.status,
    description: selectedTask.description,
  } : {
    title: '',
    status: '',
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
    const result = await updateTask({ loginToken: cookies.loginToken, id: selectedTask.id, title: formData.title, status: formData.status, description: formData.description });
    if (result.code === 200 && result.result?.id) {
      toast.success("Task updated successfully");
			storeSelectedTask({selectedTask: null});		
      navigate(`/cases/${selectedCase.id}`);
    } else {
      toast.error("Failed to add case");
    }
    setLoading(false);    
  };

	const handleResetClick = () => {
		setFormData({
			title: selectedTask.title,
			status: selectedTask.status,
			description: selectedTask.description,
		});
		setErrors({});
	};

	const goBack = () => {
		navigate(`/cases/${selectedCase.id}`);
	}

  const disabled = selectedTask ? 
    formData.title === selectedTask.title &&
    formData.status === selectedTask.status &&
    formData.description === selectedTask.description : true;

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

export default useEditTask;