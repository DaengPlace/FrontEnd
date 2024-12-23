import ClientLayout from "@/app/ClientLayout";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata = {
  title: "댕댕플레이스",
  description: "Generated by create next app",
  icons: {
    icon: "/assets/common/dog.svg"
  },
};

export default function RootLayout({ children }) {

  return (
    <html lang="ko">
      <body>
        <AuthProvider>
          <ClientLayout>{children}</ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}