import { setDefaultLanguage } from "@/utils/auth";
import { useEffect } from "react";

export default function UserSettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    setDefaultLanguage();
  }, []);

  return <>{children}</>;
}
