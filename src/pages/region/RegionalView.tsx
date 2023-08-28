import TitleComponent from "../../component/tittle";
import RegionalController from './RegionalController';
import Form from "react-bootstrap/Form";
import { FormGroup, Row, Col, Input } from "reactstrap";
import DateTimeShow from "../../component/DateTimeShow";
import {
  getQuarterName,
  getQuarters,
  sortIcon,
  yearList,
} from "../../constant";
import ChartHighChart from "../../constant/highchart/chartHighChart";
import { columnChart } from "../../constant/highchart/columnChart";

/**
 *
 * @returns Regional view page
 */

const RegionalView = () => {
  // Importing all states and functions from Region Controller
  const {
    quarterDetails,
    yearlyData,
    emissionDates,
    order,
    col_name,
    relaodData,
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
  } = RegionalController();

  return (
    <>
      {/* Carrier View starts */}
      <TitleComponent title={"Carrier"} />
      <section className="region-screen py-4 px-2" data-testid="regional">
        <div className="region-screen-wraper pb-5">
          <div className="region-heading">
            <div className="heading py-3 pt-1 d-flex justify-content-between align-items-center">
              <h2 className="mb-0 font-20 font-xxl-28">Regional Emissions Comparison</h2>
              <div className="lates-update">
                <DateTimeShow />
              </div>
            </div>
            <Row className="align-items-center">
              <Col lg="9" md="6">
                <div>
                  <FormGroup className="select-box d-flex">
                    <Input
                      id="exampleSelect"
                      name="select"
                      type="select"
                      value={yearlyData}
                      onChange={(e) => {
                        setYearlyData(e.target.value);
                        setQuarterDetails(1)
                        setRelaodData(false);
                      }}
                    >
                      {yearList(emissionDates?.data?.emission_dates).map((x, index) => (
                        <option value={x} key={index} >
                          {x}
                        </option>
                      ))}
                    </Input>
                    <Input
                      id="exampleSelect"
                      name="select"
                      type="select"
                      className="ms-2 quater-dropdown"
                      value={quarterDetails}
                      onChange={(e) => {
                        setQuarterDetails(e.target.value);
                        setRelaodData(false);
                      }}
                    >
                      {getQuarters(yearlyData).map(i => (
                        <option key={i?.value} value={i?.value}>{i?.name}</option>
                      ))}

                    </Input>

                  </FormGroup>
                </div>
              </Col>
            </Row>

          </div>
          <div className="region-section py-4 px-3">
            <div>
              <h4 className="datafrom-txt font-20 fw-semibold mb-3">
                Region-Wise <span>{checked ? "Total Emissions" : "Emissions Intensity"}</span> for {getQuarterName(quarterDetails, yearlyData)} {yearlyData}
              </h4>
            </div>
            <Row className="g-3">
              {/* Regional Emission Graph */}
              <Col lg="6" md="12">
                <div className="mainGrayCards p-2 p-lg-3 p-xl-3 p-xxl-4 h-100">
                  <div className="regionWiseTxt">
                    <div className="emi-inten d-flex justify-content-between pb-4">
                      <div className="d-flex align-items-center">
                        <h6 className="mb-0 fw-semibold text-capitalize fs-14">
                          Emissions intensity
                        </h6>
                        <div className="toggle-switch">

                          <Form>
                            <Form.Check
                              type="switch"
                              id="custom-switch"
                              label="Total Emissions"
                              className="ps-xxl-2 ps-2 ps-lg-0 mb-0 fw-semibold mt-1"
                              checked={checked}
                              onChange={() => setChecked(!checked)}
                            />
                          </Form>
                        </div>
                      </div>
                      <div className="ps-4">
                        <div className="d-flex align-items-center mb-1 detractor">
                          <div className="orange-div"></div>
                          <h6 className="ps-2 mb-0">Detractor</h6>
                        </div>
                        <div className="d-flex align-items-center detractor">
                          <div className="primary-div"></div>
                          <h6 className="ps-2 mb-0">Contributor</h6>
                        </div>
                      </div>
                    </div>
                    <div className="avg-region text-center x-axis-hide">
                      {regionGraphDetails?.data?.average && <h6 className="font-16 mb-3">
                        Average of all regions (
                        {regionGraphDetails?.data?.average?.toLocaleString(
                          "en-US",
                          { minimumFractionDigits: 1 }
                        )}{" "}

                        {regionGraphDetails?.data?.unit})
                      </h6>}
                      <div className="avg-img region-avg-img">
                        {
                          regionGraphDetailsLoading ? <div className="graph-loader">

                            <div className="spinner-border  spinner-ui" role="status">
                              <span className="visually-hidden"></span>
                            </div>
                          </div>
                            : (
                              regionPageArr?.length > 0 && (
                                <ChartHighChart
                                  options={columnChart({
                                    chart:"region",
                                    regionPageArr:regionPageArr,
                                    reloadData:relaodData,
                                    unitDto:regionGraphDetails?.data?.unit,
                                  }
                                   
                                  )}
                                />
                              )
                            )
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              {/* Regional Emission Table */}
              <Col lg="6" md="12">
                <div className="mainGrayCards h-100">
                  <div className="regionWiseTxt p-2 p-lg-3 p-xl-3 p-xxl-4">

                    <div className="d-md-flex">
                      <div className="d-flex align-items-center ">
                        <div className="primary-div"></div>
                        <h6 className="mb-0 ps-2 performance">High Performance</h6>
                      </div>
                      <div className="d-flex align-items-center ps-0 ps-md-4">
                        <div className="white-div"></div>
                        <h6 className="mb-0 ps-2 performance">Medium Performance</h6>
                      </div>
                      <div className="d-flex align-items-center ps-0 ps-md-4">
                        <div className="orange-div"></div>
                        <h6 className="mb-0 ps-2 performance">Low Performance</h6>
                      </div>
                    </div>
                    <div className="static-table mt-4">
                      <div className="tWrap">
                        <div className="tWrap__head">
                          <table>
                            <thead>
                              <tr>
                                <th>
                                  <div className="d-flex align-items-center">
                                    Regions

                                  </div>
                                </th>

                                <th>
                                  <div className="d-flex align-items-center text-capitalize pointer" onClick={() => handleChangeOrder("intensity")}>
                                    Emissions intensity
                                    <span ><img className="pointer" src={sortIcon("intensity", col_name, order)} alt="ico" /></span>


                                  </div>
                                  <h6 className="font-10">
                                    gCO2e/Ton-Mile
                                    <br /> of freight
                                  </h6>
                                </th>
                                <th className="pointer" onClick={() => handleChangeOrder("shipments")}>
                                  Total Shipments
                                  <span ><img className="pointer" src={sortIcon("shipments", col_name, order)} alt="ico" /></span>
                                </th>
                                <th className="pointer" onClick={() => handleChangeOrder("emission")}>
                                  Total Emissions
                                  <span ><img className="pointer" src={sortIcon("emission", col_name, order)} alt="ico" /></span>

                                  <h6 className="font-10">tCo2e</h6>
                                </th>


                                {/* <th></th> */}
                              </tr>
                            </thead>
                          </table>
                        </div>
                        <div className="tWrap__body">
                          <table>
                            <tbody className=" text-left ">
                              {regionTableDetails?.data?.map((row: any) => (
                                <tr onClick={() => navigate(`/region-overview/${row?.["Region.name"]}`)} key={row?.["Region.name"]} className="m-cursor">
                                  <td>{row?.["Region.name"]}</td>

                                  <td>
                                    <div className="d-flex align-items-center">
                                      <div
                                        className="orange-div me-2"
                                        style={{
                                          backgroundColor: row?.intensity?.color,
                                        }}
                                      ></div>
                                      {Number.parseFloat(
                                        row?.intensity?.value
                                      )?.toLocaleString("en-US", {
                                        minimumFractionDigits: 1,
                                      })}
                                    </div>
                                  </td>
                                  <td>
                                    {row?.shipments?.toLocaleString("en-US")}
                                  </td>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <div
                                        className="orange-div me-2"
                                        style={{
                                          backgroundColor: row?.cost?.color,
                                        }}
                                      ></div>
                                      {Number.parseFloat(
                                        row?.cost?.value
                                      )?.toLocaleString("en-US", {
                                        minimumFractionDigits: 2,
                                      })}
                                    </div>
                                  </td>


                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <div className="data-sources mt-lg-4 mt-5 pt-3 pt-lg-0">
              <a
                target="_blank"
                rel="noreferrer"
                href="https://smartfreightcentre.org/en/about-sfc/about-us/"
                className="d-flex align-items-center"
              >
                <span className="glec-txt me-1">GLEC</span>See data sources
                and methodologies
              </a>
            </div>
          </div>
        </div>
      </section >
      {/* Carrier View ends */}
    </>
  );
};

export default RegionalView;
