// Importing necessary React hooks and functions
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/redux.hooks';
import { useParams, useNavigate } from "react-router-dom";
import { emissionRegionDetails, graphEmissionIntensity, graphRegionEmission, regionShow, getProjectCount } from "../../store/sustain/sustainSlice";
import { useAuth } from '../../auth/ProtectedRoute';

/**
 * Custom hook for managing state and actions related to the DashboardView.
 * @returns All the states and functions for DashboardView
 */
const SustainController = () => {
    // State variables using React useState hook
    const [checked, setChecked] = useState(true);
    const { id } = useParams();
    const YearData = new Date().getFullYear() - 1;
    const [yearlyDataEmission, setYearlyDataEmission] = useState("");
    const [companyLevel, setCompanyLevel] = useState("");
    const [regionsLevel, setRegionsLevel] = useState(id);
    const [regionsIntensity, setRegionsIntensity] = useState("");
    const [revenueType, setRevenueType] = useState<string | number>(1);
    const [yearlyData, setYearlyData] = useState<string | number>(YearData);
    const [yearlyData1, setYearlyData1] = useState<number>(YearData);
    const [yearlyDataProject, setYearlyDataProject] = useState<string | number>(2023);
    const [relaodData, setRelaodData] = useState(true);
    const [checkedEmissionsReductionGlide, setCheckedEmissionsReductionGlide] = useState(true);

    // Custom authentication hook
    const dataCheck = useAuth();

    // Selecting data from the Redux store using custom hooks
    const { emissionDates } = useAppSelector((state) => state.commonData);
    const {
        graphRegionChart,
        regions,
        emissionIntensityDetails,
        regionEmission,
        projectCountData,
        isLoading,
        isLoadingGraphRegionEmission,
        regionEmissionIsLoading,
        emissionIntensityDetailsIsLoading
    } = useAppSelector((state) => state.sustain);

    // Dispatch and navigation functions from Redux and React Router
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // Effects to run when component mounts or state changes

    // Effect to remove item from local storage and dispatch a Redux action
    useEffect(() => {
        localStorage.removeItem("regionalLevel");
        dispatch(regionShow());
    }, [dispatch]);

    // Effect to set reload data flag when emissionIntensityDetails changes
    useEffect(() => {
        setRelaodData(true);
    }, [emissionIntensityDetails]);

    // Effect to fetch graph data based on yearlyData and revenueType
    useEffect(() => {
        dispatch(graphEmissionIntensity({ year: Number(yearlyData), toggel: revenueType }));
    }, [dispatch, yearlyData, revenueType]);

    // Effect to fetch region emission data based on various parameters
    useEffect(() => {
        dispatch(graphRegionEmission({
            region_id: regionsIntensity ? regionsIntensity : "",
            company_id: "",
            year: Number(yearlyDataEmission),
            toggel_data: checked ? 0 : 1
        }));
    }, [dispatch, companyLevel, regionsLevel, yearlyDataEmission, checked, regionsIntensity]);

    // Effect to fetch emission region details based on yearlyData1 and toggle flag
    useEffect(() => {
        dispatch(emissionRegionDetails({ year: Number(yearlyData1), region_id: "", toggel_data: checkedEmissionsReductionGlide ? 0 : 1 }));
    }, [dispatch, yearlyData1, checkedEmissionsReductionGlide]);

    // Effect to fetch project count data based on regionsLevel and yearlyDataProject
    useEffect(() => {
        dispatch(getProjectCount({ region_id: regionsLevel, year: yearlyDataProject }));
    }, [dispatch, regionsLevel, yearlyDataProject]);

    // Effect to navigate to a different route when regionsLevel changes
    useEffect(() => {
        if (regionsLevel) {
            localStorage.setItem("regionalLevel", regionsLevel);
            navigate(`/regional-level`);
        }
    }, [regionsLevel, navigate]);

    // Returning all states and functions to be used in DashboardView
    return {
        regionsLevel,
        setRegionsLevel,
        regionsIntensity,
        setRegionsIntensity,
        revenueType,
        setRevenueType,
        yearlyData,
        setYearlyData,
        yearlyData1,
        setYearlyData1,
        yearlyDataProject,
        setYearlyDataProject,
        relaodData,
        setRelaodData,
        graphRegionChart,
        regions,
        emissionIntensityDetails,
        regionEmission,
        projectCountData,
        isLoading,
        isLoadingGraphRegionEmission,
        regionEmissionIsLoading,
        emissionIntensityDetailsIsLoading,
        dataCheck,
        checkedEmissionsReductionGlide,
        setCheckedEmissionsReductionGlide,
        emissionDates
    };
};

// Exporting the custom hook for use in other components
export default SustainController;
