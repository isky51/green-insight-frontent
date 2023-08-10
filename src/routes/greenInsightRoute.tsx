// import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ProtectedRoute, { AuthRouteCheck, ProtectedRouteCheck } from "../auth/ProtectedRoute";
import PrivateRoute from "../auth/PrivateRoute";

import { LoginForm } from "../pages/login";
import ErrorPage from "../pages/error";
import Dashboard from "../pages/dashboard"

export default function GreenInsightRoute() {
    // const dispatch = useDispatch();
    // let tokenDetails1 = JSON.parse(localStorage.getItem("loginDetails"))?.token
    // useEffect(() => {
    //     if (tokenDetails1) {
    //         dispatch(getFiltersDate());
    //         dispatch(userDetailsApi());

    //     }
    // }, [dispatch, tokenDetails1]);


    return (
        <Router basename="/">
            <Routes>
                <Route
                    path="/"
                    element={
                        <AuthRouteCheck>
                        <LoginForm />
                        </AuthRouteCheck>
                    }
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRouteCheck>
                            <Dashboard />
                        </ProtectedRouteCheck>
                    }
                />

                {/* <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<PrivateRoute roles={[2]} />}>
                        <Route path="/bucket-list" element={<Dashboard />} />
                    </Route>



                    <Route path="/" element={<PrivateRoute roles={[0, 1]} />}>
                        <Route path="/sustainable" element={<Dashboard />} />
                    </Route>
                </Route> */}
                <Route path="*" element={<ErrorPage />} />

            </Routes>

        </Router>
    );
}
