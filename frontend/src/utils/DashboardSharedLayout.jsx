import { Outlet, ScrollRestoration } from "react-router-dom";
import Sidebar from "../pages/dashboard/components/Sidebar";
import Header from "../pages/dashboard/components/Header";

const GeneralSharedLayout = () => {
  return (
    <main>
      <Sidebar />
      <div>
        <Header />
        <div>
          <Outlet />
        </div>
      </div>
      <ScrollRestoration
        getKey={(location, matches) => {
          return location.pathname;
        }}
      />
    </main>
  );
};

export default GeneralSharedLayout;
