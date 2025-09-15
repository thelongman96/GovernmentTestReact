import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import { useCaseStore } from "@/stores/CaseStore";
import { useUserStore } from "@/stores/UserStore";
import { fetchTasksByCaseId, deleteTask } from "@/services/api";
import { useTaskStore } from "@/stores/TaskStore";
import { toast } from "react-toastify";

const useViewCase = () => {
	const navigate = useNavigate();
	const [cookies, ,removeCookie] = useCookies(["loginToken"]);
	const [tasks, setTasks] = useState([]);

	const profileData = useUserStore((state) => state.profileData);
	const selectedCase = useCaseStore((state) => state.selectedCase);
	const storeSelectedTask = useTaskStore((state) => state.storeSelectedTask);

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

	const fetchCasesForUser = useCallback(async (caseId: string) => {
		const response = await fetchTasksByCaseId({ loginToken: cookies.loginToken, caseId: caseId });
		const { code, result } = response;
		if (code === 200) {
			setTasks(result.tasks || []);
		} else {
			toast.error("Failed to retrieve tasks");
		}
	}, [cookies.loginToken]);

	useEffect(() => {
		fetchCasesForUser(selectedCase.id);
	}, [fetchCasesForUser, selectedCase]);

	const navToDashboard = () => {
		navigate(`/`);
	};

	const navToEditTask = (id: string) => {
		const selectedTask = tasks.find((t) => t.id === id);
		storeSelectedTask({selectedTask})
		navigate(`/task/${id}/edit`);
	};

	const addNewTask = () => {
		navigate(`/task/new`);
	};

	const deleteTaskFunc = async (id: string) => {
		const taskToDelete = tasks.find(t => t.id === id);
		if (taskToDelete) {
			// Call API to delete the case
			const response = await deleteTask({ loginToken: cookies.loginToken, taskId: taskToDelete.id });
			if (response.code !== 200) {
				toast.error("Failed to delete task");
				return;
			}
			// On success:
			setTasks(tasks.filter(c => c.id !== id));
			toast.success(`Deleted task: ${taskToDelete.title}`);
		} else {
			// On Error
			toast.error("Task not found");
		}
	}

	return {
    user,
    anchorEl,
    handleMenuOpen,
    handleMenuClose,
    handleLogout,
		selectedCase,
		tasks,
		navToDashboard,
		navToEditTask,
		addNewTask,
		deleteTaskFunc
	};
}

export default useViewCase;