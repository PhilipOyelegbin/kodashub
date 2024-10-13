import { Navbar } from "./Navbar";

export const dynamic = "force-dynamic";

export default async function AuthLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
