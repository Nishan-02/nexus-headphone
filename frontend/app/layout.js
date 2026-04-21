import { Inter } from "next/font/google";
import "./globals.css";
import TargetCursor from "@/components/TargetCursor";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata = {
  title: "Apex Ultra G-1 | Premium Audio",
  description: "Experience the future of personal acoustics with Apex Ultra G-1.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-body bg-background text-white`}>
        <TargetCursor 
          spinDuration={2}
          hideDefaultCursor
          parallaxOn
          hoverDuration={0.2}
        />
        {children}
      </body>
    </html>
  );
}
