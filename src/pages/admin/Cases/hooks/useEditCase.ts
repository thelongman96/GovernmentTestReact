import { useCallback, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { updateCase, fetchCaseById } from '@/services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useUserStore } from '@/stores/UserStore';
import { useCaseStore } from '@/stores/CaseStore';
import { useParams } from 'react-router';

const useEditCase = () => {
  const navigate = useNavigate();
	const params = useParams();
	const [cookies, ,removeCookie] = useCookies(["loginToken"]);

	const profileData = useUserStore((state) => state.profileData);
	const selectedCase = useCaseStore((state) => state.selectedCase);
	const storeSelectedCase = useCaseStore((state) => state.storeSelectedCase);

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [user, setUser] = useState(profileData);

	const fetchCasesForUser = useCallback(async (caseId: string) => {
		const response = await fetchCaseById({ loginToken: cookies.loginToken, caseId });
		const { code, result } = response;
		if (code === 200) {
			storeSelectedCase({selectedCase: result});
		} else {
			toast.error("Failed to retrieve cases");
		}
	}, [cookies.loginToken, storeSelectedCase]);

	useEffect(() => {
		if(!selectedCase && params.caseId) {
			fetchCasesForUser(params.caseId)
		}
	}, [selectedCase, fetchCasesForUser, params]);

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
  const [formData, setFormData] = useState(selectedCase ? {
    title: selectedCase.title,
    referenceNumber: selectedCase.referenceNumber,
    description: selectedCase.description,
  } : {
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
    const result = await updateCase({ loginToken: cookies.loginToken, id: selectedCase.id, title: formData.title, referenceNumber: formData.referenceNumber, description: formData.description });
    if (result.code === 200 && result.result?.id) {
      toast.success("Case updated successfully");
			storeSelectedCase({selectedCase: null});
			navigate(`/`);
    } else {
      toast.error("Failed to add case");
    }
    setLoading(false);    
  };

	const handleResetClick = () => {
		setFormData({
			title: selectedCase.title,
			referenceNumber: selectedCase.referenceNumber,
			description: selectedCase.description,
		});
		setErrors({});
	};

	const navToDashboard = () => {
		storeSelectedCase({selectedCase: null})
		navigate(`/`);
	}

  const disabled = selectedCase ? 
    formData.title === selectedCase.title &&
    formData.referenceNumber === selectedCase.referenceNumber &&
    formData.description === selectedCase.description : true;

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

export default useEditCase;