import { ConfigProvider } from "antd";
import "dayjs/locale/vi";
import dayjs from "dayjs";
import locale from "antd/locale/vi_VN";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.locale("vi");

dayjs.updateLocale("vi", {
  relativeTime: {
    future: "%s nữa",
    past: "%s trước",
    s: "vài giây",
    m: "1 phút",
    mm: "%d phút",
    h: "1 giờ",
    hh: "%d giờ",
    d: "1 ngày",
    dd: "%d ngày",
    M: "1 tháng",
    MM: "%d tháng",
    y: "1 năm",
    yy: "%d năm",
  },
});

export default function AntdConfigProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConfigProvider
      locale={locale}
      theme={{
        token: {
          colorPrimary: "#1B3281",
          colorTextSecondary: "#565E6C",
        },
        components: {
          Button: {
            borderRadius: 6,
            colorPrimaryText: "#FFF",
            colorText: "#0A0A0A",
            primaryShadow: "none",
            defaultBorderColor: "#9E9E9E",
          },
          Input: {
            colorBorder: "#9E9E9E",
            colorTextPlaceholder: "#9E9E9E",
          },
          InputNumber: {
            colorBorder: "#9E9E9E",
            colorTextPlaceholder: "#9E9E9E",
          },
          Select: {
            colorTextPlaceholder: "#9E9E9E",
            colorBorder: "#9E9E9E",
          },
          DatePicker: {
            colorTextPlaceholder: "#9E9E9E",
            colorBorder: "#9E9E9E",
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
