import "@styles/globals.css";

/*import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

*/
export const metadata = {
  title: "ProductMaker",
  description:
    "A website that creates suggestive names of products for it user.",
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
