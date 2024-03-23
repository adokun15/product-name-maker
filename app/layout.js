import "@/styles/globals.css";

import NavBar from "@/components/NavBar";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
/*import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

*/
export const metadata = {
  title: "Namify",

  description: "A website that generates suggestive names",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
}
