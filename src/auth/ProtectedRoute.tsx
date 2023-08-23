import { Navigate, Outlet } from "react-router-dom";
import HeaderLayout from "../component/header";
import SidebarLayout from "../component/sidebar";


// Returns Is user is logged in or not
export const useAuth = () => {
    const userdata: any = localStorage.getItem("loginDetails") && JSON.parse(localStorage.getItem("loginDetails") || '');
    return userdata?.token ? { loggedIn: true, userdata } : { loggedIn: false, userdata };
};

// Checks AuthRouters and redirects them to dashboard
export const AuthRouteCheck = ({ children }: any) => {
    const isAuth = useAuth();
    if (!isAuth?.loggedIn) {
        return children
    } else {
        return <Navigate to={'/dashboard'} />
    }
}

// Checks Routes except AuthRouters and redirects them to respective route or Login page
export const ProtectedRouteCheck = ({ children }: any) => {
    const isAuth = useAuth();

    if (isAuth?.loggedIn) {
        return children
    } else {
        return <Navigate to={'/'} />
    }
};

const ProtectedRoute = () => {
    const isAuth = useAuth().loggedIn;
    return isAuth ? <>
        <section className="insight_top_wrapper">
            <div className="main-section position-relative">
                <section className="obfuscationDashboard">
                    <SidebarLayout />
                    <HeaderLayout />
                    <Outlet />
                </section>

            </div>
        </section>
    </> : <Navigate to="/" />;
};
export default ProtectedRoute;
