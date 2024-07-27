import { Global } from "./Global";

export default function DashboardLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <Global>{children}</Global>
      </body>
    </html>
  );
}
