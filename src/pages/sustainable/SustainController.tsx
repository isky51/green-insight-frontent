// useDashboardViewModel.ts
import { useEffect, useState } from 'react';
import { databaseListPost, tableColumnPost, tableListPost } from '../../store/dashboard/dashboardDataSlice';
import { useAppDispatch, useAppSelector } from '../../store/redux.hooks';

import { useParams, useNavigate, Link } from "react-router-dom";
import { emissionRegionDetails, graphEmissionIntensity, graphRegionEmission, regionShow, getProjectCount } from "../../store/sustain/sustainSlice";
import { useAuth } from '../../auth/ProtectedRoute';




/**
 * 
 * @returns All the states and functions for DashboardView
 */

const SustainController = () => {

  const [checked, setChecked] = useState(true);
    const { id } = useParams()
    let YearData = new Date().getFullYear() -1 ;
    const [yearlyDataEmission, setYearlyDataEmission] = useState("")
    const [companyLevel, setCompanyLevel] = useState("")
    const [regionsLevel, setRegionsLevel] = useState(id)
    const [regionsIntensity, setRegionsIntensity] = useState("");
    const [revenueType, setRevenueType] = useState<string | number>(1)
    const [yearlyData, setYearlyData] = useState<string | number>(YearData)
    const [yearlyData1, setYearlyData1] = useState<number>(YearData)
    const [yearlyDataProject, setYearlyDataProject] = useState<string | number>(2023)
    const [relaodData, setRelaodData] = useState(true)
    const dataCheck = useAuth();
    const { emissionDates } = useAppSelector((state) => state.commonData);
    const [checkedEmissionsReductionGlide, setCheckedEmissionsReductionGlide] = useState(true)
    // Define dispatch and navigate functions
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { graphRegionChart, regions, emissionIntensityDetails, regionEmission, projectCountData, isLoading, isLoadingGraphRegionEmission, regionEmissionIsloading, emissionIntensityDetailsIsLoading } = useAppSelector((state) => state.sustain)
   
   
    useEffect(() => {
      localStorage.removeItem("regionalLevel")
      dispatch(regionShow())
      //dispatch(setHeaderName("Dashboard"))
  }, [dispatch])


  useEffect(() => {
      setRelaodData(true)
  }, [emissionIntensityDetails])


  useEffect(() => {
      dispatch(graphEmissionIntensity({ year: Number(yearlyData), toggel: revenueType }))
  }, [dispatch, yearlyData, revenueType])

  useEffect(() => {
      dispatch(graphRegionEmission({ region_id: regionsIntensity ? regionsIntensity : "", company_id: "", year: Number(yearlyDataEmission), toggel_data: checked ? 0 : 1 }))
  }, [dispatch, companyLevel, regionsLevel, yearlyDataEmission, checked, regionsIntensity])


  useEffect(() => {
      dispatch(emissionRegionDetails({ year: Number(yearlyData1), region_id: "", toggel_data: checkedEmissionsReductionGlide ? 0 : 1 }))
  }, [dispatch, yearlyData1, checkedEmissionsReductionGlide])

  useEffect(() => {
      dispatch(getProjectCount({ region_id: regionsLevel, year: yearlyDataProject }))
  }, [dispatch, regionsLevel, yearlyDataProject])



  useEffect(() => {
      if (regionsLevel) {
          localStorage.setItem("regionalLevel", regionsLevel)
          navigate(`/regional-level`)
      }
  }, [regionsLevel, navigate])
    
 

  // All states 

  //  All the states and functions returned
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
    regionEmissionIsloading, 
    emissionIntensityDetailsIsLoading,
    dataCheck,
    checkedEmissionsReductionGlide,
    setCheckedEmissionsReductionGlide,
    emissionDates
  };
};

export default SustainController;
