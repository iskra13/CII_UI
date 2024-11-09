import { create } from "zustand";

type RoleType = "user" | "expert" | null;

type StoreRoleType = {
  role: RoleType;
  actions: {
    setRole: (value: RoleType) => void;
  };
};

export const useRole = create<StoreRoleType>((set) => ({
  role: null,
  actions: {
    setRole: (value) => set(() => ({ role: value })),
  },
}));
