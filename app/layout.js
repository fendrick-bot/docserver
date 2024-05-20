import { Poppins } from "next/font/google";
import "./globals.css";
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
  content:
    "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0",
};
export const fetchCache = 'force-no-store';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <meta
        name={"viewport"}
        content={
          "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        }
      />
      <body className={poppins.className}>
        <div id="main-wrapper">
          <GetStarted data={children} />
        </div>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
