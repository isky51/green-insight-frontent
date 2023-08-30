import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/redux.hooks";
import {
  vendorGraphData,
  vendorTableData,
} from "../../store/carrier/vendorSlice";
import { regionShow } from "../../store/commonData/commonSlice";

/**
 * A custom hook that contains all the states and functions for the VendorViewController
 */
const VendorViewController = () => {
  // Get the regional level from local storage or default to an empty string
  let id: any =
    localStorage.getItem("regionalLevel") &&
    JSON.parse(localStorage.getItem("regionalLevel") || "");

  // Get the current year and current quarter
  let currentYear = new Date().getFullYear();
  var quarter = Math.floor((new Date().getMonth() + 3) / 3);

  // Define and initialize various states
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [regionalLevel, setRegionsLevel] = useState(id ? id : "");
  const [yearlyData, setYearlyData] = useState(currentYear);
  const [quarterDetails, setQuarterDetails] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [relaodData, setRelaodData] = useState(true);
  const [searchCarrier, setSearchCarrier] = useState("");
  const [order, setOrder] = useState("desc");
  const [col_name, setCol_name] = useState("intensity");
  const [pageSize, setPageSize] = useState(20);
  const [regionName, setRegionName] = useState("");
  const [values, setValues] = React.useState([60, 390]);

  // Select relevant data from Redux store
  const { regions, emissionDates } = useAppSelector(
    (state) => state.commonData
  );
  const { vendorTableDetails, isLoading, vendorGraphDetails } = useAppSelector(
    (state) => state.carrier
  );

  // Update regionName state based on regionalLevel and regions data
  useEffect(() => {
    if (regionalLevel) {
      regions?.data?.length !== 0 &&
        regions?.data?.regions.map((x: any) => {
          x.id === Number.parseInt(regionalLevel) && setRegionName(x.name);
          return true;
        });
    }
  }, [regionalLevel, regions]);

  // Function to fetch vendor table data
  const fetchTableData = (search = "") => {
    // Check for a valid searchCarrier length before making the API call
    if (searchCarrier.length >= 3 || searchCarrier.length === 0) {
      const tableDataPayload = {
        region_id: regionalLevel,
        year: yearlyData,
        quarter: quarterDetails,
        page: currentPage,
        page_size: pageSize,
        order_by: order,
        col_name: col_name,
        search_name: searchCarrier?.length >= 3 ? searchCarrier : "",
        min_range: values[0],
        max_range: values[1],
      };
      dispatch(vendorTableData(tableDataPayload));
    }
  };

  // Function to fetch vendor graph data
  const fetchGraphData = (search = "") => {
    // Check for a valid searchCarrier length before making the API call
    if (searchCarrier.length >= 3 || searchCarrier.length === 0) {
      const payloadData = {
        region_id: regionalLevel,
        year: yearlyData,
        quarter: quarterDetails,
        page: currentPage,
        page_size: pageSize,
        order_by: order,
        col_name: col_name,
        search_name: searchCarrier?.length >= 3 ? searchCarrier : "",
        min_range: values[0],
        max_range: values[1],
      };
      dispatch(vendorGraphData(payloadData));
    }
  };

  // Handle carrier search input change
  const handleSearchCarrier = async (e: any) => {
    setSearchCarrier(e.target.value);
    if (e.target.value.length >= 3 || e.target.value.length === 0) {
      setCurrentPage(1);
    }
  };

  // Handle change in sorting order
  const handleChangeOrder = (choose_Col_name: any) => {
    setOrder(order === "desc" ? "asc" : "desc");
    setCol_name(choose_Col_name);
  };

  // Fetch region data when the component mounts
  useEffect(() => {
    dispatch(regionShow());
  }, [dispatch, regionalLevel]);

  // Fetch table and graph data when relevant states change
  useEffect(() => {
    fetchTableData();
    fetchGraphData();
  }, [
    dispatch,
    searchCarrier,
    yearlyData,
    quarterDetails,
    regionalLevel,
    currentPage,
    order,
    col_name,
    pageSize,
  ]);

  // Set the regional level and associated details
  const setRegoinDetail = (id: any) => {
    setRegionsLevel(id);
    setRegionName(
      regions?.data?.regions.filter((e: any) => {
        return e.id === Number.parseInt(id);
      })[0]?.name
    );
  };

  // Handle change in year input
  const handleChangeYear = (e: any) => {
    setQuarterDetails(1);
    setYearlyData(e.target.value);
  };

  // Scroll to the top of the page on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle quarter selection change
  const handleQuarterChange = (e: any) => {
    setQuarterDetails(e.target.value);
  };

  // Handle range change for intensity values
  const handleChangeRange = (value: any) => {
    setValues(value);
  };

  // Handle page size change for pagination
  const handlePageChange = (e: any) => {
    setPageSize(e.target.value);
    setCurrentPage(1);
    setRelaodData(false);
  };

  // Return all the states and functions
  return {
    fetchTableData,
    regionalLevel,
    setCurrentPage,
    setRegoinDetail,
    regions,
    currentPage,
    yearlyData,
    handleChangeYear,
    quarterDetails,
    handleQuarterChange,
    values,
    handleChangeRange,
    fetchGraphData,
    regionName,
    pageSize,
    handlePageChange,
    searchCarrier,
    handleSearchCarrier,
    handleChangeOrder,
    col_name,
    order,
    setRelaodData,
    emissionDates,
    vendorTableDetails,
    navigate,
    isLoading,
    vendorGraphDetails,
  };
};

// Exporting the custom hook for use in other components
export default VendorViewController;
