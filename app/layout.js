import "@/styles/globals.css";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import AuthProvider from "@/utils/Provider/AuthProvider";
import ModalProvider from "@/utils/Provider/ModalProvider";
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
      <body className="relative">
        <AuthProvider>
          <ModalProvider>{children}</ModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
