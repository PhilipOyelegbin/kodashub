import Navbar from "../Nav";
import Footer from "../Footer";

export const dynamic = "force-dynamic";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </>
  );
}
