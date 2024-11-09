import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type LegislationType = {
  key: string;
  nameChange: string;
  description: string;
  effectiveDate: string | null;
  sourceLink: string;
  category: string;
};

type LegislationActionsType = {
  createLegislation: (value: LegislationType) => void;
  deleteLegislationRows: (keys: string[]) => void;
  getLegislation: (needFoundkey: string) => LegislationType | undefined;
  updateLegislation: (value: LegislationType) => void;
  setCurrentEditLegislation: (value: string) => void;
};

type LegislationStateType = {
  legislations: LegislationType[];
  currentEditLegislation: string;
  actions: LegislationActionsType;
};

export const useChangesLegislation = create<LegislationStateType>()(
  persist(
    (set, get) => ({
      legislations: [],
      currentEditLegislation: '',
      actions: {
        setCurrentEditLegislation: (value) =>
          set(() => ({ currentEditLegislation: value })),
        createLegislation: (value) =>
          set((state) => ({
            legislations: [...state.legislations, value],
          })),
        deleteLegislationRows: (keys) =>
          set((state) => ({
            legislations: state.legislations.filter(
              ({ key }) => !keys.includes(key)
            ),
          })),
        getLegislation: (needFoundkey) => {
          const legislation = get().legislations.find(
            ({ key }) => key === needFoundkey
          );
          return legislation;
        },
        updateLegislation: (value) =>
          set((state) => ({
            legislations: state.legislations.map((item) => {
              if (value.key === item.key) {
                return value;
              }
              return item;
            }),
          })),
      },
    }),
    {
      name: "legislation-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ legislations: state.legislations }),
    }
  )
);
