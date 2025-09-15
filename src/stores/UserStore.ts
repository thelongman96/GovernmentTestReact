import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface profileData {
	userId: string;
	firstName: string;
	lastName: string;
	email: string;
	username: string;
}

interface UserStoreState {
  profileData: profileData | null;
  storeProfileData: ({
    profileData,
  }: {
    profileData: profileData | null;
  }) => void;
  hasHydrated: boolean;
  setHasHydratedTrue: () => void;
}

export const useUserStore = create<
  UserStoreState,
  [['zustand/persist', unknown]]
>(
  persist(
    (set) => ({
      profileData: null,
      storeProfileData: ({
        profileData,
      }: {
        profileData: profileData | null;
      }) => {
        set({ profileData });
      },
      hasHydrated: false,
      setHasHydratedTrue: () => {
        set({ hasHydrated: true });
      },
    }),
    {
      name: 'user-storage',
      onRehydrateStorage: (state) => {
        return () => {
          state.setHasHydratedTrue();
        };
      },
    },
  ),
);
