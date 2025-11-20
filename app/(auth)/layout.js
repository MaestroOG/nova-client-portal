import NextTopLoader from 'nextjs-toploader';
import { ThemeProvider } from "@/components/theme-provider";
import '../globals.css'

// app/login/layout.js
export default function LoginLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
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
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
