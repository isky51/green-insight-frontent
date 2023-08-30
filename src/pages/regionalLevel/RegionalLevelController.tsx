// Importing necessary React hooks and functions
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../store/redux.hooks';
import { useAuth } from '../../auth/ProtectedRoute';
import { getProjectCount, regionLevelGlidePath, regionShow } from '../../store/commonData/commonSlice';
import { regionEmissionIntensityOverall, regionFacilityEmissions, totalEmissionOverall } from '../../store/region/regionOverviewSlice';
import { regionGraphData } from '../../store/region/regionSlice';
import { changeRegion,changeLane,changeCarrier,changeFacility} from'../../store/dashRegion/dashRegionSlice'
import { laneGraphData } from '../../store/lane/laneDetailsSlice';
import { vendorGraphData } from '../../store/carrier/vendorSlice';
import { getGraphData, getGraphDataHorizontal } from '../../constant';

/**
 * A custom hook that contains all the states and functions for the RegionalLevelController
 */
const RegionalLevelController = () => {
    // Define and initialize all the necessary states
    let id = localStorage.getItem("regionalLevel") || ""
    const [modal, setModal] = useState(false);
    const [checkedRegion, setCheckedRegion] = useState(true);
    const [checked, setChecked] = useState(true);
    const [checkedEmissionsReductionGlide, setCheckedEmissionsReductionGlide] = useState(true);
    const [checkedFacilityEmissions, setCheckedFacilityEmissions] = useState(true);
    const [quarterDetails, setQuarterDetails] = useState<string | number>(1);
    const [yearlyData, setYearlyData] = useState<number | string>(new Date().getFullYear());
    const [yearlyData1, setYearlyData1] = useState<number | string>((new Date().getFullYear() - 1));
    const [regionName, setRegionName] = useState("");
    const [regionsLevel, setRegionsLevel] = useState<any>(id);
    const [quartelyData, setQuartelyData] = useState<string | number>("1");
    const [relaodData, setRelaodData] = useState(true);
    const [pieChartCount, setpieChartCount] = useState(null);
    const [isRegionState, setIsRegionState] = useState(false);
    const [isLaneState, setIsLaneState] = useState(false);
    const [isCarrierState, setIsCarrierState] = useState(false);
    const [isFacilityState, setIsFacilityState] = useState(false);
    
    // Define dispatch function from Redux store
    const dispatch = useAppDispatch();
    
    // Function to toggle modal
    const toggle = () => setModal(!modal);
    
    // Get navigation function from React Router
    const navigate = useNavigate();
    
    // Custom authentication hook
    const dataCheck = useAuth();
    
    // Define constants for pagination
    const currentPage = 1;
    const pageSize = 10;

    // Import data from auth selector
    const { emissionDates } = useAppSelector((state) => state.commonData)

    // Select data from Redux store using selector hooks
    const { regions, isLoadingRegionLevelGlidePath, regionLevelGlideData, projectCountData } =
        useAppSelector((state) => state.commonData);
    const { regionEmissionIntensityDetails, totalEmissionOverallDetails, regionEmissionIntensityDetailsIsLoading } =
        useAppSelector((state) => state.regionOverview);
    const { isRegion, isLane, isFacility, isCarrier } = useAppSelector((state) => state.regionDash);
    const { regionGraphDetails, regionGraphDetailsLoading } = useAppSelector((state) => state.region);
    const { vendorGraphDetails } = useAppSelector((state) => state.carrier)
    const { laneGraphDetails, laneGraphDetailsLoading } = useAppSelector((state) => state.lane);
    const { regionFacilityEmissionDto, regionFacilityEmissionIsLoading } =
        useAppSelector((state) => state.regionOverview);

    // Fetch data when necessary states change using useEffect

    // Fetch regions when the component mounts
    useEffect(() => {
        dispatch(regionShow())
    }, [dispatch])

    // Set region name when regions data and regionsLevel change
    useEffect(() => {
        if (regionsLevel) {
            regions?.data?.regions.map((x: any) => {
                x.id === Number.parseInt(regionsLevel) && setRegionName(x.name)
                return true
            });
        }
    }, [regionsLevel, regions])

    // Set pie chart count when projectCountData changes
    useEffect(() => {
        if (projectCountData?.data) {
            setpieChartCount(projectCountData?.data?.Total || 0)
        }
    }, [projectCountData])

    // Navigate to "/sustainable" if regionsLevel is empty
    useEffect(() => {
        if (regionsLevel === "") {
            navigate("/sustainable");
        }
    }, [regionsLevel, navigate]);

    // Fetch project count data based on regionsLevel and yearlyData
    useEffect(() => {
        if (regionsLevel) {
            dispatch(getProjectCount({ region_id: regionsLevel, year: yearlyData }))
        }
    }, [dispatch, regionsLevel, yearlyData]);

    // Fetch region emission intensity overall data
    useEffect(() => {
        if (id || regionsLevel || quartelyData) {
            dispatch(
                regionEmissionIntensityOverall({
                    quarter: quartelyData,
                    toggel: 1,
                    year: yearlyData,
                    region_id: regionsLevel,
                })
            );
        }
    }, [dispatch, id, regionsLevel, yearlyData, quartelyData]);

    // Fetch total emission overall data
    useEffect(() => {
        if (id || regionsLevel) {
            dispatch(
                totalEmissionOverall({
                    year: yearlyData,
                    toggel: 0,
                    quarter: quartelyData,
                    region_id: regionsLevel,
                })
            );
        }
    }, [dispatch, id, regionsLevel, quartelyData, yearlyData]);

    // Fetch region level glide path data
    useEffect(() => {
        if (yearlyData1 || regionsLevel) {
            dispatch(regionLevelGlidePath({ region_id: regionsLevel, company_id: "", year: yearlyData1, toggel_data: checkedEmissionsReductionGlide ? 0 : 1 }))
        }
    }, [dispatch, yearlyData1, regionsLevel, checkedEmissionsReductionGlide]);

    // Get formatted arrays for various graph data
    let regionPageArr = getGraphDataHorizontal(regionGraphDetails);
    let lanePageArr = getGraphData(laneGraphDetails);
    let laneFacilityEmessionArr = getGraphDataHorizontal(regionFacilityEmissionDto);

    // Fetch region graph data when isRegion state changes
    useEffect(() => {
        if (isRegion) {
            dispatch(
                regionGraphData({
                    region_id: "",
                    quarter: quarterDetails,
                    toggel_data: checkedRegion ? 1 : 0,
                    year: yearlyData
                })
            );
        }
    }, [dispatch, isRegion, quarterDetails, checkedRegion, yearlyData]);

    // Fetch region facility emissions data when isFacility state changes
    useEffect(() => {
        if (isFacility && regionsLevel) {
            dispatch(
                regionFacilityEmissions({
                    region_id: regionsLevel,
                    facility_id: "",
                    quarter: quarterDetails,
                    toggel_data: checkedFacilityEmissions ? 1 : 0,
                    year: yearlyData
                })
            );
        }
    }, [regionsLevel, dispatch, isFacility, quarterDetails, checkedFacilityEmissions, yearlyData]);

    // Fetch lane graph data when isLane state changes
    useEffect(() => {
        if (isLane && regionsLevel) {
            dispatch(
                laneGraphData({
                    page: currentPage,
                    page_size: pageSize,
                    region_id: regionsLevel,
                    facility_id: "",
                    toggel_data: checked ? 1 : 0,
                    quarter: quarterDetails,
                    year: yearlyData
                })
            );
        }
    }, [regionsLevel, dispatch, isLane, quarterDetails, checked, yearlyData]);

    // Fetch vendor graph data when isCarrier state changes
    useEffect(() => {
        if (isCarrier && regionsLevel) {
            dispatch(vendorGraphData({
                region_id: regionsLevel,
                page: currentPage,
                page_size: 20,
                quarter: quarterDetails,
                year: yearlyData
            }));
        }
    }, [dispatch, isCarrier, quarterDetails, regionsLevel, yearlyData]);

    // Return all the states and functions
    return {
        relaodData,
        regionName,
        quarterDetails,
        emissionDates,
        yearlyData,
        yearlyData1,
        checkedFacilityEmissions,
        regionFacilityEmissionIsLoading,
        checkedEmissionsReductionGlide,
        regionLevelGlideData,
        isLoadingRegionLevelGlidePath,
        regionFacilityEmissionDto,
        pieChartCount,
        isFacilityState,
        isCarrierState,
        isLaneState,
        isRegionState,
        quartelyData,
        setCheckedFacilityEmissions,
        setCheckedEmissionsReductionGlide,
        setYearlyData,
        setYearlyData1,
        setQuarterDetails,
        setQuartelyData,
        regions,
        vendorGraphDetails,
        regionsLevel,
        regionGraphDetails,
        regionGraphDetailsLoading,
        isRegion,
        isLane,
        isCarrier,
        isFacility,
        regionEmissionIntensityDetails,
        totalEmissionOverallDetails,
        regionEmissionIntensityDetailsIsLoading,
        modal,
        setModal,
        laneGraphDetails,
        laneGraphDetailsLoading,
        laneFacilityEmessionArr,
        changeRegion,
        changeLane,
        changeCarrier,
        changeFacility,
        toggle,
        setIsRegionState,
        setIsLaneState,
        setIsCarrierState,
        setIsFacilityState,
        setRegionsLevel,
        setRelaodData,
        setChecked,
        projectCountData,
        dispatch,
        dataCheck,
        regionPageArr,
        lanePageArr,
        checked,
        checkedRegion,
        setCheckedRegion,
    };
}

// Exporting the custom hook for use in other components
export default RegionalLevelController;
