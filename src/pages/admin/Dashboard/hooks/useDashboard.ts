import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useUserStore } from "@/stores/UserStore";
import { useCookies } from "react-cookie";
import { fetchCases } from "@/services/api";
import { toast } from "react-toastify";
import { useCaseStore } from "@/stores/CaseStore";
import { deleteCase } from "@/services/api";

const useDashboard = () => {
	const navigate = useNavigate();
	const [cookies, ,removeCookie] = useCookies(["loginToken"]);
	const [cases, setCases] = useState([]);

	const profileData = useUserStore((state) => state.profileData);
	const storeSelectedCase = useCaseStore((state) => state.storeSelectedCase);

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

	const fetchCasesForUser = useCallback(async () => {
		const response = await fetchCases({ loginToken: cookies.loginToken });
		const { code, result } = response;
		if (code === 200) {
			setCases(result.cases || []);
		} else {
			toast.error("Failed to retrieve cases");
		}
	}, [cookies.loginToken]);

	useEffect(() => {
		fetchCasesForUser();
	}, [fetchCasesForUser]);

	const navToViewCase = (id: string) => {
		const selectedCase = cases.find((c) => c.id === id);
		if (selectedCase) storeSelectedCase({ selectedCase });
		navigate(`/cases/${id}`);
	};

	const navToEditCase = (id: string) => {
		const selectedCase = cases.find((c) => c.id === id);
		if (selectedCase) storeSelectedCase({ selectedCase });
		navigate(`/cases/${id}/edit`);
	};

	const addNewCase = () => {
		navigate(`/cases/new`);
	};

	const deleteCaseFunc = async (id: number) => {
		const caseToDelete = cases.find(c => c.id === id);
		if (caseToDelete) {
			// Call API to delete the case
			const response = await deleteCase({ loginToken: cookies.loginToken, caseId: caseToDelete.id });
			if (response.code !== 200) {
				toast.error("Failed to delete case");
				return;
			}
			// On success:
			setCases(cases.filter(c => c.id !== id));
			toast.success(`Deleted case: ${caseToDelete.title}`);
		} else {
			// On Error
			toast.error("Case not found");
		}
	}

	return {
    user,
    anchorEl,
    handleMenuOpen,
    handleMenuClose,
    handleLogout,
    cases,
		navToViewCase,
    navToEditCase,
		addNewCase,
		deleteCaseFunc
	};
};

export default useDashboard;