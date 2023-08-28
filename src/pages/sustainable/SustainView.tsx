import { Accordion, Modal, Button } from "react-bootstrap";
import SustainController from "./SustainController";
import TitleComponent from "../../component/tittle";
import Select from "react-select";
import DateTimeShow from "../../component/DateTimeShow";
import SidebarLayout from "../../component/sidebar";
import HeaderLayout from "../../component/header";
import { FormGroup, Row, Col, Input, Table } from "reactstrap";
import ArrowDown from "../../assets/images/common/arrow-down.svg";
import Down from "../../assets/images/common/down.svg";
import Up from "../../assets/images/common/up.svg";
import GArrow from "../../assets/images/common/g-arrow.svg";
import Export from "../../assets/images/components/export.svg";
import { yearList, getCompanyName } from "../../constant";
import { Link } from "react-router-dom";
import ExportButton from "../../component/export-button";
import moment from "moment";
import Form from "react-bootstrap/Form";
import ChartHighChart from "../../constant/highchart/chartHighChart";
import { lineChart } from "../../constant/highchart/lineChart";
import { pieChart } from "../../constant/highchart/pieChart";
import { verticalColumnChart } from "../../constant/highchart/verticalColumnChart";

/**
 *
 * @returns Dashboard view page
 */
const SustainView = () => {
  // Importing all states and functions from dashboard controller
  const {
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
    emissionDates,
  } = SustainController();
  console.log("regionEmission?.data  ", regionEmission?.data);
  return (
    <>
      {/* Obfuscation dashboard starts */}
      <TitleComponent title={"Sustain Dashboard"} />
      <section className="substain-screen py-4 px-2">
        <div className="substain-screen-wraper">
          <div className="substain-heading">
            <Row>
              <Col lg="12" md="12">
                <Row className="substain-h-wrapper pb-3 ">
                  <Col lg="9" md="12">
                    <h1 className="mb-0 text-capitalize fw-semibold font-28">
                      Transportation emissions dashboard
                    </h1>
                  </Col>
                  <Col lg="3" md="12">
                    <div className="lates-update">
                      <DateTimeShow />
                    </div>
                  </Col>
                </Row>
                <Row className=" p-3 pt-0 ps-0 align-items-center">
                  <Col lg="9" md="12">
                    <FormGroup className="select-box d-flex">
                      <Input
                        id="exampleSelect"
                        name="select"
                        type="select"
                        className="regionDropdown"
                        onChange={(e) => {
                          setRelaodData(false);
                          setRegionsLevel(e.target.value);
                        }}
                      >
                        <option value="">All Regions</option>

                        {regions?.data?.length !== 0 &&
                          regions?.data?.regions.map((x: any) => (
                            <option value={x.id} key={x.id}>
                              {x.name}
                            </option>
                          ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col lg="3" md="12">
                    <div className="d-flex justify-content-end">
                      <ExportButton />
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
          <div className="substain-section pb-5 px-3">
            <div>
              <Row>
                <Col lg="12" md="12">
                  <div className="subs-inner-heading py-4 pb-4">
                    <h2 className="fw-medium pb-4 mb-0 font-24">
                      Sustainability Tracker
                    </h2>
                    {/* new-ui */}
                    <Row className="g-3">
                      <Col lg="3">
                        <div className="primaryCard p-4 h-100">
                          <div className="primaryCardInnerWprpper">
                            <div className="co-txt d-flex align-items-center mb-3">
                              <div className="green-div me-2"></div>
                              <h4 className="mb-0">
                                <span>
                                  {" "}
                                  <img src={ArrowDown} alt="ico" />
                                </span>
                                22.5%
                              </h4>
                            </div>
                            <h6 className="font-14">
                              {getCompanyName(dataCheck?.userdata)}{" "}
                            </h6>
                            <h3>Emissions Reduction Target</h3>
                            <div className="by-date mt-2">
                              <p className="mb-0">
                                By {new Date().getFullYear()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col lg="3">
                        <div className="primaryCard p-4 h-100">
                          <div className="primaryCardInnerWprpper">
                            <div className="co-txt d-flex align-items-center mb-3">
                              <div className="green-div me-2"></div>
                              <h4 className="mb-0">
                                <span>
                                  {" "}
                                  <img src={ArrowDown} alt="ico" />
                                </span>
                                4%
                              </h4>
                            </div>
                            <h6>{getCompanyName(dataCheck?.userdata)}</h6>
                            <h3>Emissions Reduction Target</h3>
                            <div className="by-date mt-2">
                              <p className="mb-0">
                                By Q
                                {Math.floor((new Date().getMonth() + 3) / 3)}{" "}
                                {new Date().getFullYear()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col lg="3">
                        <div className="primaryCard p-4 h-100">
                          <div className="primaryCardInnerWprpper">
                            <div className="co-txt d-flex align-items-center mb-3">
                              <div className="green-div me-2"></div>
                              <h4 className="mb-0">
                                {Number.parseInt(
                                  projectCountData?.data?.Total || 0
                                ).toLocaleString("en-US")}
                              </h4>
                            </div>
                            <h6>{getCompanyName(dataCheck?.userdata)}</h6>
                            <h3>Projects in Progress</h3>
                            <div className="by-date mt-2">
                              <p className="mb-0">
                                In Q
                                {Math.floor((new Date().getMonth() + 3) / 3)}{" "}
                                {new Date().getFullYear()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col lg="3">
                        <div className="primaryCard p-4 h-100">
                          <div className="primaryCardInnerWprpper">
                            <div className="co-txt d-flex align-items-center mb-3">
                              <div className="orange-div me-2"></div>
                              <h4 className="mb-0">2%</h4>
                            </div>
                            <h6>{getCompanyName(dataCheck?.userdata)}</h6>
                            <h3>Gap to Target</h3>
                            <div className="by-date mt-2 company-commit">
                              <p className="mb-0">
                                {" "}
                                Reduction needed between now and Q
                                {Math.floor(
                                  (new Date().getMonth() + 3) / 3
                                )}{" "}
                                {new Date().getFullYear()}
                              </p>
                              <a
                                target="_blank"
                                rel="noreferrer"
                                href="https://corporate.lowes.com/our-responsibilities/corporate-responsibility-reports-policies"
                                className="text-decoration-underline text-white"
                              >
                                {" "}
                                See company commitment
                              </a>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    {/* new-ui end */}
                  </div>
                </Col>
              </Row>
            </div>
            <div>
              <Row className="g-3">
                <Col lg="6">
                  <div className="mainGrayCards p-3 h-100 slider-icons position-relative">
                    <div className="left-arrow-slider">
                      {yearlyData1 >
                        Number.parseInt(
                          moment(
                            emissionDates?.data?.emission_dates?.start_date
                          ).format("YYYY")
                        ) && (
                          <button
                            onClick={() => {
                              setRelaodData(false);
                              setYearlyData1(
                                (prev: any) => Number.parseInt(prev) - 1
                              );
                            }}
                          >
                            <svg
                              width="11"
                              height="20"
                              viewBox="0 0 11 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M-1.07292e-06 9.99996C-1.07015e-06 10.2325 0.0888614 10.4652 0.266361 10.6427L9.35726 19.7336C9.71248 20.0888 10.2877 20.0888 10.6427 19.7336C10.9977 19.3784 10.9979 18.8031 10.6427 18.4481L2.19454 9.99996L10.6427 1.55179C10.9979 1.19656 10.9979 0.621334 10.6427 0.266335C10.2875 -0.088665 9.71226 -0.088892 9.35726 0.266335L0.266361 9.35723C0.0888613 9.53473 -1.0757e-06 9.76746 -1.07292e-06 9.99996Z"
                                fill="#5f9a80"
                              />
                            </svg>
                          </button>
                        )}
                    </div>
                    <div className="right-arrow-slider">
                      {yearlyData1 < 2023 && (
                        <button
                          onClick={() => {
                            setRelaodData(false);
                            setYearlyData1(
                              (prev: any) => Number.parseInt(prev) + 1
                            );
                          }}
                        >
                          <svg
                            width="11"
                            height="20"
                            viewBox="0 0 11 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10.9091 9.99996C10.9091 10.2325 10.8203 10.4652 10.6428 10.6427L1.55187 19.7336C1.19665 20.0888 0.62142 20.0888 0.26642 19.7336C-0.0885794 19.3784 -0.0888067 18.8031 0.26642 18.4481L8.71459 9.99996L0.26642 1.55179C-0.0888064 1.19656 -0.0888064 0.621334 0.26642 0.266335C0.621647 -0.088665 1.19687 -0.088892 1.55187 0.266335L10.6428 9.35723C10.8203 9.53473 10.9091 9.76746 10.9091 9.99996Z"
                              fill="#5f9a80"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                    <h6>COMPANY LEVEL</h6>
                    <div className="track-btnWrapper d-flex align-items-center mb-2 justify-content-between">
                      <h3 className="fw-semibold mb-0">
                        {" "}
                        Reduction Glide Path{" "}
                        <span className="fw-light">
                          ({!checkedEmissionsReductionGlide ? "gCO2e" : "tCo2e"}
                          )
                        </span>
                      </h3>
                      <Button className="px-4 py-0 ms-4">On track</Button>
                    </div>
                    <div>
                      <div className="d-flex align-items-center">
                        <h6 className="mb-0 fw-semibold fs-14">
                          Emissions Intensity
                        </h6>
                        <div className="toggle-switch mt-1">
                          <Form>
                            <Form.Check
                              type="switch"
                              id="custom-switch"
                              label="Total Emissions"
                              className="fw-semibold fs-14 mb-0"
                              checked={checkedEmissionsReductionGlide}
                              onChange={() =>
                                setCheckedEmissionsReductionGlide(
                                  !checkedEmissionsReductionGlide
                                )
                              }
                            />
                          </Form>
                        </div>
                      </div>
                    </div>
                    {regionEmissionIsloading ? (
                      <div className="graph-loader d-flex justify-content-center ">
                        <div
                          className="spinner-border position-absolute spinner-ui"
                          role="status"
                        >
                          <span className="visually-hidden"></span>
                        </div>
                      </div>
                    ) : (
                      regionEmission?.data && (
                        // <ChartsHigh
                        //     isLoading={isLoading}
                        //     options={regionEmission?.data}
                        //     chart={1}
                        //     reloadData={relaodData}
                        //     unitReduction={!checkedEmissionsReductionGlide}

                        // />
                        <ChartHighChart
                          options={lineChart(
                            {
                              isLoading: isLoading,
                              options: regionEmission?.data,
                              chart: 1
                            }
                          )}
                        />
                      )
                    )}
                    {/* first graph plot is here */}
                  </div>
                </Col>
                <Col lg="6">
                  <div className="mainGrayCards p-3 h-100 position-relative">
                    <h6>COMPANY LEVEL</h6>
                    <div className="d-md-block d-lg-flex justify-content-between mb-2">
                      <div className="lh-1">
                        <h3 className=" fw-semibold text-capitalize mb-0">
                          Emissions intensity
                        </h3>
                        <span className="fs-12 color-primary">
                          (gCO2e/Ton-Mile of freight)
                        </span>
                      </div>
                      <div>
                        <FormGroup className="select-box d-flex ">
                          <Input
                            id="exampleSelect"
                            name="select"
                            type="select"
                            className="perTonDropdown"
                            value={revenueType}
                            onChange={(e) => {
                              setRelaodData(false);
                              setRevenueType(e.target.value);
                            }}
                          >
                            <option value={1}>per Ton-Mile</option>
                          </Input>
                          <Input
                            id="exampleSelect"
                            name="select"
                            type="select"
                            className="ms-2 w-auto"
                            value={yearlyData}
                            onChange={(e) => {
                              setRelaodData(false);
                              setYearlyData(e.target.value);
                            }}
                          >
                            {yearList(emissionDates?.data?.emission_dates).map(
                              (x, index) => (
                                <option key={index} value={x}>
                                  {x}
                                </option>
                              )
                            )}
                          </Input>
                        </FormGroup>
                      </div>
                    </div>
                    {
                      emissionIntensityDetailsIsLoading ? (
                        <div className="graph-loader d-flex justify-content-center ">
                          <div
                            className="spinner-border position-absolute spinner-ui"
                            role="status"
                          >
                            <span className="visually-hidden"></span>
                          </div>
                        </div>
                      ) : (

                        emissionIntensityDetails?.data?.length > 0 &&

                        <ChartHighChart
                          options={verticalColumnChart(
                            {
                              isLoading: isLoading,
                              options: emissionIntensityDetails?.data,
                              chart: 2

                            }
                          )}
                        />
                      )
                    }
                    {/* Bar element graph plot is here */}
                    {Math.round(
                      ((emissionIntensityDetails?.data?.[0]?.max -
                        emissionIntensityDetails?.data?.[0]
                          ?.industrialAverage) /
                        emissionIntensityDetails?.data?.[0]?.max) *
                      100
                    ).toFixed(2) ? (
                      <div
                        className={`model-overview-down px-3 py-2 ${emissionIntensityDetailsIsLoading
                            ? "model-overview-up"
                            : ""
                          }`}
                      >
                        <div>
                          <h6 className=" mb-0 d-flex fs-6">
                            <span className="pe-2">
                              <img src={Down} alt="ico" />
                            </span>
                            Your emissions intensity per{" "}
                            {revenueType === 0 ? "revenue dollar" : "Ton-Mile"}{" "}
                            is{" "}
                            {Math.round(
                              ((emissionIntensityDetails?.data?.[0]?.max -
                                emissionIntensityDetails?.data?.[0]
                                  ?.industrialAverage) /
                                emissionIntensityDetails?.data?.[0]?.max) *
                              100
                            ) + "%"}{" "}
                            higher than industry average
                          </h6>
                        </div>
                      </div>
                    ) : (
                      <div className="model-overview-down px-3 py-2 bottom-card">
                        <div>
                          <h6 className="mb-0 d-flex fs-6">
                            <span className="pe-2">
                              <img src={Up} alt="ico" />
                            </span>
                            Your emissions intensity per{" "}
                            {revenueType === 0 ? "revenue dollar" : "Ton-Mile"}{" "}
                            is{" "}
                            {Math.round(
                              ((emissionIntensityDetails?.data?.[0]?.max -
                                emissionIntensityDetails?.data?.[0]
                                  ?.industrialAverage) /
                                emissionIntensityDetails?.data?.[0]?.max) *
                              100
                            ) + "%"}{" "}
                            lower than industry average
                          </h6>
                        </div>
                      </div>
                    )}
                  </div>
                </Col>
              </Row>
              <div className="data-sources  pt-2 pb-4">
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
            <div className="">
              <Row>
                <Col lg="12">
                  <div className="mainGrayCards p-3 h-100 position-relative">
                    <div className="d-md-block d-lg-flex justify-content-between align-items-center">
                      <div>
                        <h6>COMPANY LEVEL</h6>
                        <h3 className="fw-semibold mb-0">
                          Emissions Intensity by Region{" "}
                          <span>(gCO2e/Ton-Mile of freight)</span>
                        </h3>
                      </div>
                      <div>
                        <FormGroup className="select-box d-flex">
                          <Input
                            id="exampleSelect"
                            name="select"
                            type="select"
                            className="ms-2 regionDropdown"
                            value={regionsIntensity}
                            onChange={(e) => {
                              setRelaodData(false);
                              setRegionsIntensity(e.target.value);
                            }}
                          >
                            <option value="">All Regions</option>
                            {regions?.data?.length !== 0 &&
                              regions?.data?.regions.map((x: any) => (
                                <option value={x.id} key={x.id}>
                                  {x.name}
                                </option>
                              ))}
                          </Input>
                        </FormGroup>
                      </div>
                    </div>
                    {isLoadingGraphRegionEmission ? (
                      <div className="graph-loader d-flex justify-content-center">
                        <div
                          className="spinner-border position-absolute spinner-ui"
                          role="status"
                        >
                          <span className="visually-hidden"></span>
                        </div>
                      </div>
                    ) : (
                      graphRegionChart?.data && (
                        <ChartHighChart
                          options={verticalColumnChart(
                            {
                              isLoading: isLoadingGraphRegionEmission,
                              options: graphRegionChart?.data?.filter(
                                (i: any) =>
                                  i.name !== "company_level" &&
                                  i.name !== "target_level"
                              ),
                              chart: 4
                            }
                          )}
                        />
                      )
                    )}
                  </div>
                </Col>
              </Row>
            </div>
            <div className="data-sources  pt-2 pb-4">
              <a
                target="_blank"
                rel="noreferrer"
                href="https://smartfreightcentre.org/en/about-sfc/about-us/"
                className="d-flex align-items-center"
              >
                <span className="glec-txt me-1">GLEC</span>See data sources and
                methodologies
              </a>
            </div>
            <div className="project-overview mainGrayCards p-3 h-100 position-relative">
              <Row>
                <Col lg="12">
                  <Row>
                    <Col xl="3" lg="4">
                      <h6 className="">COMPANY LEVEL</h6>
                      <h3 className="fw-semibold text-capitalize mb-0">
                        Projects overview
                      </h3>
                    </Col>
                    <Col xl="3" lg="4">
                      <div>
                        <FormGroup className="select-box d-flex mt-2">
                          <Input
                            id="exampleSelect"
                            name="select"
                            type="select"
                            className="w-auto"
                            value={yearlyDataProject}
                            onChange={(e) => {
                              setRelaodData(false);
                              setYearlyDataProject(e?.target?.value);
                            }}
                          >
                            <option value="">Year to date</option>
                            {yearList(emissionDates?.data?.emission_dates).map(
                              (x, index) => (
                                <option key={index} value={x}>
                                  {x}
                                </option>
                              )
                            )}
                          </Input>
                        </FormGroup>
                      </div>
                    </Col>
                  </Row>
                  <Row className="align-items-center">
                    <Col xl="3" lg="6">
                      <div>
                        {projectCountData?.data &&
                          <Link to="/projects">
                            <ChartHighChart
                              options={pieChart(
                                {
                                  chart: "piechart",
                                  pieChartCount: Number.parseInt(projectCountData?.data?.Total || 0).toLocaleString("en-US")
                                }
                              )}
                            />
                          </Link>
                        }
                        {/* <PieChart /> */}
                      </div>
                    </Col>
                    <Col xl="3" lg="6">
                      <div className="ps-4 ps-lg-0">
                        <div className="co-txt d-flex align-items-center pt-2">
                          <div className="lightgreen-div me-3"></div>
                          <h4 className="mb-0">Completed</h4>
                          <h5 className="mb-0 ms-4">0</h5>
                        </div>
                        <h4 className="pt-3">Emissions reduction achieved</h4>
                        <div className="overview-num">
                          <h4 className="fw-bold d-flex align-items-center">
                            <span>
                              {" "}
                              <img src={GArrow} alt="ico" />
                            </span>
                            0
                          </h4>
                        </div>
                      </div>
                    </Col>
                    <Col xl="3" lg="6">
                      <div className="track-btn-green px-3 px-xl-0  ps-4 ps-lg-0">
                        <Button color="primary" className="px-5 py-0 mb-3">
                          On track
                        </Button>
                        <div className="co-txt d-flex align-items-center">
                          <div className="green-div me-3"></div>
                          <h4 className="mb-0">In-progress</h4>
                          <h5 className="mb-0 ms-4">
                            {Number.parseInt(
                              projectCountData?.data?.Total || 0
                            ).toLocaleString("en-US")}
                          </h5>
                        </div>
                        <h4 className="pt-3">
                          {" "}
                          Estimated emissions reduction{" "}
                        </h4>
                        <div className="overview-num">
                          <h4 className="fw-bold d-flex align-items-center">
                            <span>
                              {" "}
                              <img src={GArrow} alt="ico" />
                            </span>
                            5%
                          </h4>
                        </div>
                      </div>
                    </Col>
                    <Col xl="3" lg="6">
                      <div className="track-btn-orange ps-4 ps-lg-0">
                        <Button color="primary" className="px-5 py-0 mb-3">
                          Action needed
                        </Button>
                        <div className="co-txt d-flex align-items-center">
                          <div className="orange-div me-3"></div>
                          <h4 className="mb-0">In-progress</h4>
                          <h5 className="mb-0 ms-4">0</h5>
                        </div>
                        <h4 className="pt-3">Estimated emissions reduction</h4>
                        <div className="overview-num">
                          <h4 className="fw-bold d-flex align-items-center">
                            <span>
                              {" "}
                              <img src={GArrow} alt="ico" />
                            </span>
                            0
                          </h4>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
            <div>
              <div className="data-sources  pt-2">
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
        </div>
      </section>
    </>
  );
};

export default SustainView;
