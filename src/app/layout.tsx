import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ToastProvider, Toaster } from "@/components/ui/toaster";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { BackgroundSystem } from "@/components/background-system";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sadman Siam | Software Developer & Cybersecurity Enthusiast",
  description:
    "Portfolio of Md. Sadman Siam — Computer Science student building practical skills across security, networks, automation, and software.",
  keywords: [
    "Software Developer",
    "Cybersecurity",
    "Portfolio",
    "Next.js",
    "React",
    "TypeScript",
    "Sadman Siam",
    "CTF",
    "Automation",
    "n8n",
  ],
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem("portfolio-theme");var d=s==="dark"||((!s||s==="system")&&window.matchMedia("(prefers-color-scheme: dark)").matches);var t=s==="light"?"light":(d?"dark":"light");document.documentElement.setAttribute("data-theme",t);document.documentElement.style.colorScheme=t;}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased min-h-screen overflow-x-hidden selection:bg-[var(--accent)]/20 selection:text-[var(--accent)]`}
      >
        <ThemeProvider>
          <ToastProvider>
            <BackgroundSystem />
            <Navigation />
            <main className="relative">{children}</main>
            <Footer />
            <Toaster />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
