import { Navbar } from "./Navbar";

export default function AuthLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
