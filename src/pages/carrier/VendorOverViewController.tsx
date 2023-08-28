import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/redux.hooks";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  getCarrierOverviewData,
  getLaneBreakdown,
} from "../../store/carrier/vendorSlice";
import moment from "moment";

export const VendorOverViewController = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const source = axios.CancelToken.source();
  const [checkedDartTransit, setCheckedDartTransit] = useState(false);
  const params = useParams();
  // const {
  //   carrierOverviewDetail,
  //   laneBreakdownDetail,
  //   laneBreakdownDetailLoading,
  // } = useAppSelector((state) => state.vendor);

  const {
    carrierOverviewDetail,
    laneBreakdownDetail,
    laneBreakdownDetailLoading,
  } = useAppSelector((state) => state.carrier);
  const { regions, emissionDates } = useAppSelector(
    (state) => state.commonData
  );

  useEffect(() => {
    if (params?.id) {
      dispatch(getCarrierOverviewData(params?.id));
      dispatch(getLaneBreakdown({ id: params?.id, source }));
      return () => {
        source.cancel();
      };
    }
  }, [params, dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getQuarterYear = (date: Date) => {
    const quarter = Math.ceil(Number(moment.utc(date).format("MM")) / 3);
    const year = Number(moment.utc(date).format("YYYY"));

    return `Q${quarter} ${year}`;
  };

  return {
    params,
    emissionDates,
    carrierOverviewDetail,
    laneBreakdownDetail,
    laneBreakdownDetailLoading,
    checkedDartTransit,
    setCheckedDartTransit,
  };
};
