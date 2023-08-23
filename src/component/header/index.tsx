
import LogOut from '../../assets/images/obfuscationDashboard/logout.svg'
import HeaderController from './HeaderController'

const HeaderLayout = () => {
    // iporting all states and functions from dashboard controller
    const {
        
        handleLogout,
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
        </>
    )
}

export default HeaderLayout