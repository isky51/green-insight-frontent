import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute, { AuthRouteCheck } from "../auth/ProtectedRoute";
import ErrorPage from "../pages/error/ErrorView";
import DashboardView from "../pages/dashboard/DashboardView";
import LoginView from "../pages/login/LoginView";
import RegionalView from "../pages/region/RegionalView";
import { useAppDispatch } from "../store/redux.hooks";
import { useEffect } from "react";
import { getFiltersDate } from "../store/commonData/commonSlice";
import Vendor from "../pages/carrier/vendorView";
import RegionOverview from "../pages/regionOverview/RegionOverview";
import RegionalLevel from "../pages/regionalLevel/RegionalLevelView";

/**
 * Component that defines all the routes for the website
 */
const GreenInsightRoute = () => {
  const dispatch = useAppDispatch();

  // Fetch user token from local storage
  const userdata: any =
    localStorage.getItem("loginDetails") &&
    JSON.parse(localStorage.getItem("loginDetails") || "");
  let tokenDetails: string = process.env.REACT_APP_IS_DEV
    ? process.env.REACT_APP_TEST_TOKEN
    : userdata?.token;

  // Fetch emission filter dates on component mount
  useEffect(() => {
    if (tokenDetails) {
      dispatch(getFiltersDate(tokenDetails));
    }
  }, [dispatch, tokenDetails]);

  return (
    <Router basename="/">
      <Routes>
        {/* LoginView route */}
        <Route
          path="/"
          element={
            <AuthRouteCheck>
              <LoginView />
            </AuthRouteCheck>
          }
        />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          {/* DashboardView route */}
          <Route path="/dashboard" element={<DashboardView />} />

          {/* RegionalLevel-Dashboard route */}
          <Route path="/region-level/:regionId/" element={<RegionalLevel />} />

          {/* RegionalView route */}
          <Route path="/regional" element={<RegionalView />} />

          {/* Regional-OverviewView route */}
          <Route path="/region-overview/:regionId/" element={<RegionOverview />} />

          <Route path="/carrier" element={<Vendor />} />
        </Route>

        {/* ErrorPage route */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default GreenInsightRoute;
