import { useUserSettingsStore } from "@/stores/user-settings.store";
import dayjs from "dayjs";

export const setDefaultLanguage = () => {
  const currentLanguageSettings = useUserSettingsStore.getState().language;

  if (currentLanguageSettings) return;

  if (dayjs.locale() === "vi") {
    useUserSettingsStore.setState({ language: "Vietnamese" });
  } else if (dayjs.locale() === "en") {
    useUserSettingsStore.setState({ language: "English" });
  } else if (dayjs.locale() === "kr") {
    useUserSettingsStore.setState({ language: "Korean" });
  } else {
    useUserSettingsStore.setState({ language: "English" });
  }
};
