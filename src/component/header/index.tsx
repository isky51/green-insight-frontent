import LogOut from '../../assets/images/obfuscationDashboard/logout.svg';
import headerToogle from '../../assets/images/header/headerToogle.svg';
import Search from '../../assets/images/header/search.svg';
import UserEmail from "../../assets/images/login/useremail.svg";
import Setting from "../../assets/images/header/setting.svg";
import NotificationIcon from '../../assets/images/header/notificationicon.svg';
import UserHead from '../../assets/images/header/userHead_img.svg';
import DownArrow from '../../assets/images/header/downArrow.svg';
import HeaderController from './HeaderController';
import { Form } from "react-bootstrap";


const HeaderLayout = () => {
    // iporting all states and functions from dashboard controller
    const {
        handleLogout,
        ToggleSidebar
    } = HeaderController()

    return (
        <>
            {/* top Obfuscation heading starts */}
            <div className='topHeading p-4 d-flex justify-content-between align-items-center'>
                <h1 className='mb-0 font-xxl-36 font-lg-30 font-26'>Data Obfuscation Dashboard</h1>
                <div className='cursor logoutBtn' onClick={handleLogout}>
                    <img src={LogOut} alt="logout" />
                    <span className='text-white ps-2 font-sm-16 font-14 cursor'>Logout</span>
                </div>
            </div>
            {/* top Obfuscation heading ends */}

            {/* header */}

            <header className="dashboard_Header">
                <nav className="navbar navbar-expand-lg navbar-light py-0">
                    <div className="container-fluid px-0">
                        
                        <div className="navbar-collapse" id="navbarSupportedContent">
                            <div className='d-flex gap-3 me-auto'>
                                <img src={headerToogle} alt="header toogle" className='cursor' onClick={ToggleSidebar} />
                                <div className='position-relative'>
                                    <img src={Search} alt="search" className='searchIcon' />
                                    <Form className='searchBar'>
                                        <Form.Control
                                            type="text"
                                            placeholder="Search"
                                            className=" mr-sm-2"
                                        />
                                    </Form>
                                </div>

                            </div>
                            <div className='d-flex align-items-center gap-4'>
                                <div className='toogleSwitch d-none'>
                                    <input type="checkbox" checked data-toggle="toggle" data-onlabel="Admin" data-offlabel="Application"></input>
                                </div>
                                <button type="button" className="btn position-relative badge-btn">
                                    <img src={NotificationIcon} alt="notification Icon" />
                                    <span className="position-absolute top-0 start-100 translate-middle p-2 border border-light rounded-circle">
                                        <span className="visually-hidden">New alerts</span>
                                    </span>
                                </button>
                                <div className='d-flex gap-3 align-items-center'>
                                    <img src={UserHead} alt="user head img" />
                                    <div className='userHead_details'>
                                        <div className='d-flex justify-content-between align-items-center mb-1'>
                                            <h3 className='font-16 mb-0 fw-semibold'>Cassel Lowes</h3>
                                            <img src={DownArrow} alt="downArrow" />
                                        </div>

                                        <p className='mb-0 font-14'>Head of Sustainability</p>
                                        <div className='settingProfile_dropdown d-flex flex-column gap-2'>
                                            <button type="button" className="btn btn-gray font-14 px-4 py-2">
                                                <img src={UserEmail} alt="user icon" className='me-2' />
                                                My Profile
                                            </button>
                                            <button type="button" className="btn btn-deepgreen font-14 px-4 py-2">
                                                <img src={Setting} alt="setting icon" className='me-2' />
                                               Settings
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            {/* header closed */}
        </>
    )
}

export default HeaderLayout