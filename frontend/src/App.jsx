import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import GeneralLayout from "./utils/GeneralSharedLayout";
import AuthLayout from "./utils/AuthSharedLayout";
import DashboardLayout from "./utils/DashboardSharedLayout";
import Loader from "./components/loading";

const Home = lazy(() => import("./pages/general/home/page"));
const Services = lazy(() => import("./pages/general/services/page"));
const Contact = lazy(() => import("./pages/general/contact/page"));
const Login = lazy(() => import("./pages/auth/login/page"));
const Register = lazy(() => import("./pages/auth/register/page"));
const Dashboard = lazy(() => import("./pages/dashboard/home/page"));
const NewServices = lazy(() => import("./pages/dashboard/services/page"));
const Hosting = lazy(() => import("./pages/dashboard/hosting/page"));
const Invoice = lazy(() => import("./pages/dashboard/invoice/page"));
const Website = lazy(() => import("./pages/dashboard/website/page"));
const Profile = lazy(() => import("./pages/dashboard/profile/page"));

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path='/' element={<GeneralLayout />}>
          <Route index element={<Home />} />
          <Route path='/services' element={<Services />} />
          <Route path='/contact' element={<Contact />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route element={<DashboardLayout />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/dashboard/services' element={<NewServices />} />
            <Route path='/dashboard/hosting' element={<Hosting />} />
            <Route path='/dashboard/invoice' element={<Invoice />} />
            <Route path='/dashboard/website' element={<Website />} />
            <Route path='/dashboard/profile' element={<Profile />} />
          </Route>
        </Route>
      </Route>
    )
  );

  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Suspense>
  );
}

export default App;
