import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/redux.hooks";
import {
  vendorGraphData,
  vendorTableData,
} from "../../store/carrier/vendorSlice";
import { regionShow } from "../../store/commonData/commonSlice";

const VendorViewController = () => {
  let id: any =
    localStorage.getItem("regionalLevel") &&
    JSON.parse(localStorage.getItem("regionalLevel") || "");

  let currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  var quarter = Math.floor((new Date().getMonth() + 3) / 3);

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

  const { regions, emissionDates } = useAppSelector(
    (state) => state.commonData
  );
  const { vendorTableDetails, isLoading, vendorGraphDetails } = useAppSelector(
    (state) => state.carrier
  );

  useEffect(() => {
    if (regionalLevel) {
      regions?.data?.length !== 0 &&
        regions?.data?.regions.map((x: any) => {
          x.id === Number.parseInt(regionalLevel) && setRegionName(x.name);
          return true;
        });
    }
  }, [regionalLevel, regions]);

  const fetchTableData = (search = "") => {
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
  const fetchGraphData = (search = "") => {
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
  const handleSearchCarrier = async (e: any) => {
    setSearchCarrier(e.target.value);
    if (e.target.value.length >= 3 || e.target.value.length === 0) {
      setCurrentPage(1);
    }
  };

  const handleChangeOrder = (choose_Col_name: any) => {
    setOrder(order === "desc" ? "asc" : "desc");
    setCol_name(choose_Col_name);
  };

  useEffect(() => {
    dispatch(regionShow());
  }, [dispatch, regionalLevel]);

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

  const setRegoinDetail = (id: any) => {
    setRegionsLevel(id);
    setRegionName(
      regions?.data?.regions.filter((e: any) => {
        return e.id === Number.parseInt(id);
      })[0]?.name
    );
  };

  const handleChangeYear = (e: any) => {
    setQuarterDetails(1);
    setYearlyData(e.target.value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleQuarterChange = (e: any) => {
    setQuarterDetails(e.target.value);
  };
  const handleChangeRange = (value: any) => {
    setValues(value);
  };
  const handlePageChange = (e: any) => {
    setPageSize(e.target.value);
    setCurrentPage(1);
    setRelaodData(false);
  };
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
export default VendorViewController;
