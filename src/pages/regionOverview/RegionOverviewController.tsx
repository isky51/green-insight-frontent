import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/redux.hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../auth/ProtectedRoute';
import { getRegionOverviewDetail, laneGraphData, regionCarrierComparison } from '../../store/lane/laneDetailsSlice';
import { regionFacilityEmissions } from '../../store/region/regionOverviewSlice';
import { getGraphDataHorizontal } from '../../constant';
import { regionLevelGlidePath, regionShow } from '../../store/commonData/commonSlice';


/**
 * A custom hook that contains all the states and functions for the RegionalController
 */
const RegionOverviewController = () => {

    // Define and initialize all the necessary states
    const currentYear = new Date().getFullYear();
    const [checkedEmissionsReductionGlide, setCheckedEmissionsReductionGlide] = useState(true)
    const [yearlyData, setYearlyData] = useState<string | number>(currentYear);
    const [regionName, setRegionName] = useState(null)
    const [relaodData, setRelaodData] = useState(true)
    const [checked, setChecked] = useState(true);
    const [checkedEmissions, setCheckedEmissions] = useState(true);
    const [yearlyData1, setYearlyData1] = useState(2022)
    const [checkedFacilityEmissions, setCheckedFacilityEmissions] = useState(true);

    // Get relevant data from Redux store using selector hooks
    const { regions,emissionDates,isLoadingRegionLevelGlidePath,regionLevelGlideData 
        } = useAppSelector((state) => state.commonData);
    const { regionFacilityEmissionDto, regionFacilityEmissionIsLoading } = useAppSelector((state) => state.regionOverview)
    const { laneGraphDetails, laneGraphDetailsLoading, regionCarrierComparisonData, regionCarrierComparisonLoading, getRegionOverviewDetailData } = useAppSelector((state) => state.lane);

    const dataCheck = useAuth();
    const params = useParams();
    const currentPage = 1
    const pageSize = 10

    // Define dispatch and navigate functions
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // Fetch data when necessary states change using useEffect
    useEffect(() => {
        dispatch(regionShow())
    }, [dispatch])


    useEffect(() => {
        if (regions?.data) {
            setRegionName(regions?.data?.regions?.filter((i:any) => i?.name === params?.regionId)[0]?.id || 1)
        }
    }, [regions, params])


    useEffect(() => {
        if (yearlyData1 && regionName) {
            dispatch(regionLevelGlidePath({ region_id: regionName, company_id: "", year: yearlyData1, toggel_data: checkedEmissionsReductionGlide ? 0 : 1 }))
        }
    }, [dispatch, yearlyData1, regionName, checkedEmissionsReductionGlide])

    useEffect(() => {
        if (regionName) {
            dispatch(
                laneGraphData({
                    page: currentPage,
                    page_size: pageSize,
                    region_id: regionName,
                    facility_id: "",
                    // year: yearlyData,
                    // quarter: quarterDetails,
                    toggel_data: checked ? 1 : 0,
                })
            );

        }
    }, [dispatch, regionName, checked])


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

    useEffect(() => {
        if (regionName) {

            dispatch(regionCarrierComparison({
                page: currentPage,
                page_size: pageSize,
                region_id: regionName,
                facility_id: "",
                // year: yearlyData,
                // quarter: quarterDetails,
                toggel_data: checkedEmissions ? 1 : 0,
            }))
        }
    }, [regionName, dispatch, checkedEmissions])

    useEffect(() => {
        if (regionName) {

            dispatch(regionFacilityEmissions({
                // page: currentPage,
                // page_size: pageSize,
                region_id: regionName,
                facility_id: "",
                // year: yearlyData,
                // quarter: quarterDetails,
                toggel_data: checkedFacilityEmissions ? 1 : 0,
            }))
        }
    }, [regionName, dispatch, checkedFacilityEmissions])

    // let lanePageArr = getGraphData(laneGraphDetails);
    // let laneCarrierArr = getGraphData(regionCarrierComparisonData);
    // let laneFacilityEmessionArr = getGraphDataHorizontal(regionFacilityEmissionDto);

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
        checkedEmissionsReductionGlide,
        getRegionOverviewDetailData,
        regionLevelGlideData,
        isLoadingRegionLevelGlidePath,
        regionCarrierComparisonData,
        regionFacilityEmissionIsLoading,
        regionFacilityEmissionDto,
        laneGraphDetailsLoading,
        laneGraphDetails,
        regionCarrierComparisonLoading,
        setCheckedEmissionsReductionGlide,
        setYearlyData,
        setCheckedEmissions,
        setChecked,
        setCheckedFacilityEmissions,
        setRelaodData,
        setYearlyData1
    };
};

export default RegionOverviewController;
