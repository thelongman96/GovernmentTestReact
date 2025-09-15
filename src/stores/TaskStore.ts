import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface taskDetails {
	id: string;
	title: string;
	description: string;
	status: string;
  caseId: number;
}

interface TaskStoreState {
  selectedTask: taskDetails | null;
  storeSelectedTask: ({
    selectedTask,
  }: {
    selectedTask: taskDetails | null;
  }) => void;
  hasHydrated: boolean;
  setHasHydratedTrue: () => void;
}

export const useTaskStore = create<
  TaskStoreState,
  [['zustand/persist', unknown]]
>(
  persist(
    (set) => ({
      selectedTask: null,
      storeSelectedTask: ({
        selectedTask,
      }: {
        selectedTask: taskDetails | null;
      }) => {
        set({ selectedTask });
      },
      hasHydrated: false,
      setHasHydratedTrue: () => {
        set({ hasHydrated: true });
      },
    }),
    {
      name: 'task-storage',
      onRehydrateStorage: (state) => {
        return () => {
          state.setHasHydratedTrue();
        };
      },
    },
  ),
);
