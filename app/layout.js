import { Inter } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/comps/BottomNav/BottomNav";
import { TopNav } from "@/comps/TopNav/TopNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div
          id="main-wrapper"
        >
          <TopNav/>

          {children}
          <BottomNav/>
          
        </div>
      </body>
    </html>
  );
}
