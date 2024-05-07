import { Poppins } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/comps/BottomNav/BottomNav";
import { TopNav } from "@/comps/TopNav/TopNav";
import { Toaster } from "react-hot-toast";
import { GetStarted } from "@/comps/GetStarted/GetStarted";

const poppins = Poppins({
  weight: ["200", "300", "400", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Cloud Panda",
  description: "shared drive for files",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <div id="main-wrapper">
          <GetStarted data={children} />
        </div>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
