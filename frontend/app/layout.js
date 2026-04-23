import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  title: "NEXUS Audio | Premium Headphones, Earbuds & Speakers",
  description: "Shop premium audio gear at NEXUS. True wireless earbuds, noise-cancelling headphones, Bluetooth speakers & smartwatches. Bold. Loud. Limitless.",
  keywords: "headphones, earbuds, bluetooth speakers, true wireless, noise cancelling, smartwatches, audio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} nexus-body`}>
        {children}
      </body>
    </html>
  );
}
