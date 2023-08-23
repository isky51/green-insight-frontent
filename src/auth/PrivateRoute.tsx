import { useAuth } from "./ProtectedRoute";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({
    roles,
}: any) => {
    const dataCheck = useAuth();
    const userHasRequiredRole = roles.includes(dataCheck?.userdata?.role) ? true : false;
    if (!userHasRequiredRole) {
        return <Navigate to="/" />
    }

    return <Outlet />;
};

export default PrivateRoute