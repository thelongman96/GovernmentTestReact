import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface caseDetails {
	id: string;
	title: string;
	description: string;
	referenceNumber: string;
}

interface CaseStoreState {
  selectedCase: caseDetails | null;
  storeSelectedCase: ({
    selectedCase,
  }: {
    selectedCase: caseDetails | null;
  }) => void;
  hasHydrated: boolean;
  setHasHydratedTrue: () => void;
}

export const useCaseStore = create<
  CaseStoreState,
  [['zustand/persist', unknown]]
>(
  persist(
    (set) => ({
      selectedCase: null,
      storeSelectedCase: ({
        selectedCase,
      }: {
        selectedCase: caseDetails | null;
      }) => {
        set({ selectedCase });
      },
      hasHydrated: false,
      setHasHydratedTrue: () => {
        set({ hasHydrated: true });
      },
    }),
    {
      name: 'case-storage',
      onRehydrateStorage: (state) => {
        return () => {
          state.setHasHydratedTrue();
        };
      },
    },
  ),
);
