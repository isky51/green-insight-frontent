import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/redux.hooks';
import { regionGraphData, regionTableData } from '../../store/region/regionSlice';
import { useNavigate } from 'react-router-dom';
import { getGraphDataHorizontal } from '../../constant'; // Importing from a constant file

/**
 * A custom hook that contains all the states and functions for the RegionalController
 */
const RegionalController = () => {

  // Define and initialize all the necessary states
  const currentYear = new Date().getFullYear();
  const [yearlyData, setYearlyData] = useState<string | number>(currentYear);
  const [quarterDetails, setQuarterDetails] = useState<string | number>(1);
  const [order, setOrder] = useState<string>("desc");
  const [col_name, setCol_name] = useState<string>("emission");
  const [relaodData, setRelaodData] = useState(true);
  const [checked, setChecked] = useState<boolean>(false);

  // Get relevant data from Redux store using selector hooks
  const { emissionDates } = useAppSelector((state) => state.commonData);
  const { regionTableDetails, regionGraphDetails, regionGraphDetailsLoading } = useAppSelector((state) => state.region);

  // Define dispatch and navigate functions
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Fetch data when necessary states change using useEffect
  useEffect(() => {
    dispatch(
      regionGraphData({
        region_id: "",
        year: yearlyData,
        quarter: quarterDetails,
        toggel_data: checked ? 1 : 0,
      })
    );
  }, [dispatch, yearlyData, quarterDetails, checked]);

  useEffect(() => {
    dispatch(
      regionTableData({
        region_id: "",
        year: yearlyData,
        quarter: quarterDetails,
        toggel_data: checked ? 1 : 0,
        order_by: order,
        col_name: col_name,
      })
    );
  }, [dispatch, yearlyData, quarterDetails, checked, order, col_name]);

  // Function to handle changing order and column name
  const handleChangeOrder = (choose_Col_name: string) => {
    setOrder(order === "desc" ? "asc" : "desc");
    setCol_name(choose_Col_name);
  };

  // Process graph data using getGraphDataHorizontal function
  let regionPageArr = getGraphDataHorizontal(regionGraphDetails, "OTHER"); 

  // Return all the states and functions
  return {
    quarterDetails,
    yearlyData,
    emissionDates,
    order,
    col_name,
    checked,
    regionTableDetails,
    regionGraphDetails,
    regionGraphDetailsLoading,
    regionPageArr,
    navigate,
    setChecked,
    setYearlyData,
    setQuarterDetails,
    setRelaodData,
    handleChangeOrder,
  };
};

export default RegionalController;
