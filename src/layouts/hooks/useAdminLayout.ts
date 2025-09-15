import { useCookies } from "react-cookie";

const useAdminLayout = () => {
	const [, setCookie] = useCookies(['loginToken']);
	const handleLogoutClick = () => {
		setCookie('loginToken', '');
	};
	return { handleLogoutClick };
};

export default useAdminLayout;
