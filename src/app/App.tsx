import { router } from "@/config/router";
import AntdConfigProvider from "@/providers/AntdConfigProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import UserSettingsProvider from "@/providers/UserSettingsProvider";
import { unstableSetRender } from "antd";
import { RouterProvider } from "react-router";
import { createRoot } from "react-dom/client";

unstableSetRender((node, container) => {
  container._reactRoot ||= createRoot(container);
  const root = container._reactRoot;
  root.render(node);
  return async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    root.unmount();
  };
});

export default function App() {
  return (
    <ReactQueryProvider>
      <AntdConfigProvider>
        <UserSettingsProvider>
          <RouterProvider router={router} />
        </UserSettingsProvider>
      </AntdConfigProvider>
    </ReactQueryProvider>
  );
}
