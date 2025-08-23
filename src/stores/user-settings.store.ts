import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Theme = "light" | "dark";
export type Language = "Vietnamese" | "English" | "Korean";

export type UserSettingsState = {
  language: Language | null;
  setLanguage: (language: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const useUserSettingsStore = create<UserSettingsState>()(
  persist(
    (set) => ({
      language: null,
      setLanguage: (language: Language) => set({ language }),
      theme: "light",
      setTheme: (theme: Theme) => set({ theme }),
    }),
    {
      name: "user-settings",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
