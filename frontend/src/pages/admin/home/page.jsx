// import { useEffect } from "react";
import CreateService from "./components/CreateServce";
import Panel from "./components/Panel";

function AdminPanelPage() {
  // useEffect(() => {
  //   if (localStorage.getItem("ssp") !== process.env.SSP) {
  //     path.("/admin");
  //   }
  // }, [path]);

  return (
    <>
      <Panel />
      <CreateService />
    </>
  );
}

export default AdminPanelPage;
