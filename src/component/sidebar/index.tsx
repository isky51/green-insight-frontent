import GreensightLogo from "../../assets/images/login/greensightLogo.svg";
import Dashboardicon from "../../assets/images/sidebar/dashboardicon.svg";
import Logouticon from "../../assets/images/sidebar/logouticon.svg";
import bylane from "../../assets/images/sidebar/bylane.svg";
import bycarrier from "../../assets/images/sidebar/bycarrier.svg";
import byregion from "../../assets/images/sidebar/byregion.svg";
import byfacility from "../../assets/images/sidebar/byfacility.svg";
import Decarb from "../../assets/images/sidebar/decarb.svg";
import Project from "../../assets/images/sidebar/project.svg";
import Resources from "../../assets/images/sidebar/resources.svg";
import methadology from "../../assets/images/sidebar/methadology.svg";
import Accelaration from "../../assets/images/sidebar/acceration.svg";
import usermanagenment from "../../assets/images/sidebar/usermanagenment.svg";
import carrierComparision from "../../assets/images/sidebar/carrierComparision.svg";
import segmentationIcon from "../../assets/images/sidebar/segmentationIcon.svg";
import { Accordion } from 'react-bootstrap';
import { Nav, NavItem } from 'reactstrap';
import { useLocation, NavLink} from "react-router-dom";
import { useAppSelector } from "../../store/redux.hooks";
const SidebarLayout = () => {
    const location = useLocation();
    const {sideBarStatus} = useAppSelector((state)=>state.commonData)
    return (
        <>
            <div className={sideBarStatus?"mainsidebar": "mainsidebar closedSidebar"}>
                <div className="p-4">
                    <img src={GreensightLogo} alt="logo" className="greensightLogo img-fluid" />
                </div>
                <div className="sidebarnav-wrapper">
                    <Accordion>
                        <Nav className="flex-column">
                            <NavItem className="position-relative mb-2">
                               
                                    <NavLink to="/sustainable" className={(location.pathname.includes("/regional-level") || location.pathname.includes("/sustainable") ? "activebar" : "")}>
                                        <div className="d-flex align-items-center gap-3 navitemtxtWrapper" data-toggle="tooltip" data-placement="right" title="Dashboard">
                                            <img src={Dashboardicon} alt="dashboard icon" />
                                            <h4 className="mb-0 font-16 navText">Dashboard</h4>
                                        </div>
                                    </NavLink>
                                
                            </NavItem>

                            <Accordion.Item eventKey="0">
                                <Accordion.Header className={(location.pathname.includes("/regional") || location.pathname.includes("/regional-overview") || location.pathname.includes("/carrier") ? "activebar" : "")}>
                                    <div >
                                        <div className="d-flex align-items-center gap-3 navitemtxtWrapper" data-toggle="tooltip" data-placement="right" title="Segmentation">
                                            <img src={segmentationIcon} alt="segmentationIcon" />
                                            <h4 className="mb-0 font-16 navText">Segmentation</h4>
                                        </div>
                                    </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <Nav className="d-flex flex-column">
                                        <NavItem>
                                                <NavLink to="/regional">
                                                    <div className="d-flex align-items-center gap-3 navitemtxtWrapper" data-toggle="tooltip" data-placement="right" title="By Region">
                                                        <img src={byregion} alt="byregion icon" />
                                                        <h4 className="mb-0 font-16 navText">By Region</h4>
                                                    </div>
                                                </NavLink>
                                        </NavItem>
                                        {/* <Nav.Item>
                                            <NavLink className="py-2">
                                                <div className="d-flex align-items-center gap-3 navitemtxtWrapper">
                                                    <img src={byfacility} alt="byfacility icon" />
                                                    <h4 className="mb-0 font-16 navText">By Facility</h4>
                                                </div>
                                            </NavLink>
                                        </Nav.Item> */}
                                        <NavItem>
                                                <NavLink to="/carrier">
                                                    <div className="d-flex align-items-center gap-3 navitemtxtWrapper" data-toggle="tooltip" data-placement="right" title="By Carrier">
                                                        <img src={bycarrier} alt="bycarrier icon" />
                                                        <h4 className="mb-0 font-16 navText">By Carrier</h4>
                                                    </div>
                                                </NavLink>
                                        </NavItem>
                                        {/* <Accordion className="newaccordian w-100">
                                            <Accordion.Item eventKey="2">
                                                <Accordion.Header className="py-2 pe-0">
                                                    <div className="d-flex align-items-center gap-3 navitemtxtWrapper">
                                                        <img src={bycarrier} alt="bycarrier icon" />
                                                        <h4 className="mb-0 font-16 navText">By Carrier</h4>
                                                    </div>
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    <Nav>
                                                        <Nav.Item>
                                                            <Link className="py-2">
                                                                <div className="d-flex align-items-center gap-3 navitemtxtWrapper">
                                                                    <img src={carrierComparision} alt="Methodologies icon" />
                                                                    <h4 className="mb-0 font-16 navText">Carrier Comparison</h4>
                                                                </div>
                                                            </Link>
                                                        </Nav.Item>
                                                    </Nav>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion> */}

                                        {/* <Nav.Item>
                                            <Link className="py-2">
                                                <div className="d-flex align-items-center gap-3 navitemtxtWrapper">
                                                    <img src={bylane} alt="bylane icon" />
                                                    <h4 className="mb-0 font-16 navText">By Lane</h4>
                                                </div>
                                            </Link>
                                        </Nav.Item> */}
                                    </Nav>
                                </Accordion.Body>
                            </Accordion.Item>
                            {/* 
                            <Nav.Item className="position-relative mb-2">
                                <Link>
                                    <div className="d-flex align-items-center gap-3 navitemtxtWrapper">
                                        <img src={Decarb} alt="Decarb icon" />
                                        <h4 className="mb-0 font-16 navText">Deacrb levers</h4>
                                    </div>
                                </Link>
                            </Nav.Item> */}
                            {/* <Nav.Item className="position-relative mb-2">
                                <Link to={}>
                                    <div className="d-flex align-items-center gap-3 navitemtxtWrapper">
                                        <img src={Project} alt="project icon" />
                                        <h4 className="mb-0 font-16 navText">Projects</h4>
                                    </div>
                                </Link>
                            </Nav.Item> */}
                            {/* <Accordion.Item eventKey="1">
                                <Accordion.Header>
                                    <div >
                                        <div className="d-flex align-items-center gap-3 navitemtxtWrapper">
                                            <img src={Resources} alt="resource Icon" />
                                            <h4 className="mb-0 font-16 navText">Resources</h4>
                                        </div>
                                    </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <Nav>
                                        <Nav.Item>
                                            <Link className="py-2">
                                                <div className="d-flex align-items-center gap-3 navitemtxtWrapper">
                                                    <img src={methadology} alt="Methodologies icon" />
                                                    <h4 className="mb-0 font-16 navText">Methodologies</h4>
                                                </div>
                                            </Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Link className="py-2">
                                                <div className="d-flex align-items-center gap-3 navitemtxtWrapper">
                                                    <img src={Accelaration} alt="Accreditation icon" />
                                                    <h4 className="mb-0 font-16 navText">Accreditation</h4>
                                                </div>
                                            </Link>
                                        </Nav.Item>
                                    </Nav>
                                </Accordion.Body>
                            </Accordion.Item> */}
                            {/* <Nav.Item className="position-relative mb-2">
                                <NavLink>
                                    <div className="d-flex align-items-center gap-3 navitemtxtWrapper">
                                        <img src={usermanagenment} alt="User Management icon" />
                                        <h4 className="mb-0 font-16 navText">User Management</h4>
                                    </div>
                                </NavLink>
                            </Nav.Item> */}

                            {/* <Nav.Item>
                                <NavLink >
                                    <div className="d-flex align-items-center gap-3 pb-3 navitemtxtWrapper">
                                        <img src={Logouticon} alt="logout icon" />
                                        <h4 className="mb-0 font-16 navText">Logout</h4>
                                    </div>
                                </NavLink>
                            </Nav.Item> */}
                        </Nav>
                    </Accordion>
                </div>

            </div>
        </>
    )
}

export default SidebarLayout