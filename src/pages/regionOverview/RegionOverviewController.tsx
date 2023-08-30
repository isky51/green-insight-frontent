// Importing necessary React hooks and functions
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/redux.hooks';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../auth/ProtectedRoute';
import { getRegionOverviewDetail, laneGraphData, regionCarrierComparison } from '../../store/lane/laneDetailsSlice';
import { regionFacilityEmissions } from '../../store/region/regionOverviewSlice';
import { getGraphData, getGraphDataHorizontal } from '../../constant';
import { regionLevelGlidePath, regionShow } from '../../store/commonData/commonSlice';

/**
 * A custom hook that contains all the states and functions for the RegionalController
 */
const RegionOverviewController = () => {

    // Define and initialize all the necessary states
    const currentYear = new Date().getFullYear();
    const [checkedEmissionsReductionGlide, setCheckedEmissionsReductionGlide] = useState(true)
    const [yearlyData, setYearlyData] = useState<string | number>(currentYear);
    const [regionName, setRegionName] = useState<boolean | null>(null)
    const [reloadData, setRelaodData] = useState(true)
    const [checked, setChecked] = useState(true);
    const [checkedEmissions, setCheckedEmissions] = useState(true);
    const [yearlyData1, setYearlyData1] = useState(2022)
    const [checkedFacilityEmissions, setCheckedFacilityEmissions] = useState(true);

    // Get relevant data from Redux store using selector hooks
    const { regions, emissionDates, isLoadingRegionLevelGlidePath, regionLevelGlideData } = useAppSelector((state) => state.commonData);
    const { regionFacilityEmissionDto, regionFacilityEmissionIsLoading } = useAppSelector((state) => state.regionOverview);
    const { laneGraphDetails, laneGraphDetailsLoading, regionCarrierComparisonData, regionCarrierComparisonLoading, getRegionOverviewDetailData } = useAppSelector((state) => state.lane);

    // Custom authentication hook
    const dataCheck = useAuth();
    
    // Get the route parameters
    const params = useParams();
    const currentPage = 1
    const pageSize = 10

    // Define dispatch function from Redux store
    const dispatch = useAppDispatch();

    // Fetch data when necessary states change using useEffect

    // Fetch regions when the component mounts
    useEffect(() => {
        dispatch(regionShow())
    }, [dispatch])

    // Set regionName when regions data and route parameters change
    useEffect(() => {
        if (regions?.data) {
            setRegionName(regions?.data?.regions?.filter((i: any) => i?.name === params?.regionId)[0]?.id || 1)
        }
    }, [regions, params])

    // Fetch region level glide path data
    useEffect(() => {
        if (yearlyData1 && regionName) {
            dispatch(regionLevelGlidePath({ region_id: regionName, company_id: "", year: yearlyData1, toggel_data: checkedEmissionsReductionGlide ? 0 : 1 }))
        }
    }, [dispatch, yearlyData1, regionName, checkedEmissionsReductionGlide])

    // Fetch lane graph data
    useEffect(() => {
        if (regionName) {
            dispatch(
                laneGraphData({
                    page: currentPage,
                    page_size: pageSize,
                    region_id: regionName,
                    facility_id: "",
                    toggel_data: checked ? 1 : 0,
                })
            );
        }
    }, [dispatch, regionName, checked])

    // Fetch region overview detail data
    useEffect(() => {
        if (regionName) {
            dispatch(
                getRegionOverviewDetail({
                    region_id: regionName,
                    year: "",
                    quarter: ""
                })
            );
        }
    }, [dispatch, regionName])

    // Fetch region carrier comparison data
    useEffect(() => {
        if (regionName) {
            dispatch(regionCarrierComparison({
                page: currentPage,
                page_size: pageSize,
                region_id: regionName,
                facility_id: "",
                toggel_data: checkedEmissions ? 1 : 0,
            }))
        }
    }, [regionName, dispatch, checkedEmissions])

    // Fetch region facility emissions data
    useEffect(() => {
        if (regionName) {
            dispatch(regionFacilityEmissions({
                region_id: regionName,
                facility_id: "",
                toggel_data: checkedFacilityEmissions ? 1 : 0,
            }))
        }
    }, [regionName, dispatch, checkedFacilityEmissions])

    // Get formatted arrays for various graph data
    let lanePageArr = getGraphData(laneGraphDetails);
    let laneCarrierArr = getGraphData(regionCarrierComparisonData);
    let laneFacilityEmessionArr = getGraphDataHorizontal(regionFacilityEmissionDto);

    // Return all the states and functions
    return {
        params,
        checked,
        emissionDates,
        yearlyData1,
        checkedFacilityEmissions,
        dataCheck,
        checkedEmissions,
        yearlyData,
        reloadData,
        lanePageArr,
        checkedEmissionsReductionGlide,
        getRegionOverviewDetailData,
        regionLevelGlideData,
        isLoadingRegionLevelGlidePath,
        regionCarrierComparisonData,
        regionFacilityEmissionIsLoading,
        regionFacilityEmissionDto,
        laneGraphDetailsLoading,
        laneGraphDetails,
        laneCarrierArr,
        regionCarrierComparisonLoading,
        laneFacilityEmessionArr,
        setCheckedEmissionsReductionGlide,
        setYearlyData,
        setCheckedEmissions,
        setChecked,
        setCheckedFacilityEmissions,
        setRelaodData,
        setYearlyData1
    };
};

// Exporting the custom hook for use in other components
export default RegionOverviewController;
