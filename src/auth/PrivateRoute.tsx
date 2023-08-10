import { useAuth } from "./ProtectedRoute";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({
    roles,
}: any) => {
    const dataCheck = useAuth();
    const userHasRequiredRole = roles.includes(dataCheck?.userdata?.role) ? true : false;
    if (!userHasRequiredRole) {
        return dataCheck?.userdata?.role === 2 ? <Navigate to="/bucket-list" /> : dataCheck?.userdata?.role === 1 ? <Navigate to="/regional-level" /> : <Navigate to="/sustainable" />
    }

    return <Outlet />;
};

export default PrivateRoute