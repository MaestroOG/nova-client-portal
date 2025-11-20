import Sidebar from "@/components/dashboardComponents/Sidebar";
import "../globals.css";
import MainContent from "@/components/dashboardComponents/MainContent";
import Header from "@/components/dashboardComponents/Header";
import TawkToChat from "@/components/TawkToChat";
import { getUser, getUserFromDB } from "@/lib/user";
import NextTopLoader from "nextjs-toploader";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata = {
  title: "Nova Protocols Client Portal",
  description: "A client portal for managing projects and communication",
};


export default async function RootLayout({ children }) {
  const user = await getUser();
  const userFromDB = await getUserFromDB();
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased bg-background-gray dark:bg-background flex`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader
            color="#430D4B"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
          />
          <Sidebar />
          <MainContent>
            <Header userFromDB={userFromDB} pfpLink={user?.profilePictureUrl} />
            {children}
          </MainContent>
          {user && user.role !== "superadmin" && <TawkToChat />}
        </ThemeProvider>
      </body>
    </html>
  );
}
