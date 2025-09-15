import { register } from "@/services/api";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useUserStore } from "@/stores/UserStore";

const useRegisterForm = () => {
	const navigate = useNavigate();
	const [, setCookie] = useCookies(['loginToken']);
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
		firstName: '',
		lastName: ''
	});
	const [errors, setErrors] = useState<{
		[key: string]: string
	}>({});

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
		const newErrors: {
			[key: string]: string
		} = {};
    if (!formData.username) {
      newErrors.username = 'Username is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

		if (!formData.firstName) {
			newErrors.firstName = 'First name is required';
		}
		if (!formData.lastName) {
			newErrors.lastName = 'Last name is required';
		}
		if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = 'Passwords do not match';
		}

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
	};

	const handleRegisterClick = async (event) => {
		event.preventDefault();
		
		if (!validateForm()) return;

		setLoading(true);
		const result = await register({username: formData.username, password: formData.password, email: formData.email, firstName: formData.firstName, lastName: formData.lastName});
		if (result.code === 200 && result.result?.sessionId) {
			setCookie('loginToken', result.result.sessionId);
			storeProfileData({profileData: result.result.user});
			toast.success("Registration Successful");
			return navigate('/');
		} else {
			toast.error("Login failed, please check your credentials");
		}
		setLoading(false);    
	};

	const navToLogin = () => {
		navigate('/');
	}

	return {
		handleRegisterClick,
		handleInputChange,
		formData,
		errors,
		loading,
		showPassword,
		setShowPassword,
		navToLogin
	 };
};

export default useRegisterForm;