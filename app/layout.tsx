import type { Metadata } from "next";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Forge AI · Console",
  description: "The AI development platform — models, datasets, experiments, deployments.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning lets React tolerate the Soffi editor injecting
    // `data-soffi-id` attributes before hydration — the same pattern Next.js
    // recommends for theme libraries and extensions that mutate the DOM early.
    <html lang="en" suppressHydrationWarning>
      <body className="bg-bg-canvas text-fg-primary font-sans antialiased" suppressHydrationWarning>
        <ThemeProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex min-h-screen flex-1 flex-col pl-60">
              <Topbar />
              <main className="flex flex-1 flex-col">{children}</main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
