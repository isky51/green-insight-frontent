import { useNavigate } from 'react-router-dom';

import { logoutPost } from '../../store/auth/authDataSlice';
import { useAppDispatch, useAppSelector } from '../../store/redux.hooks';
import { sideBarToggleStatus } from '../../store/commonData/commonSlice';

/**
 * 
 * @returns All the states and functions for DashboardView
 */

const HeaderController = () => {
    // Define constant 
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {sideBarStatus} = useAppSelector((state)=>state.commonData)
    const ToggleSidebar = () => {
        dispatch(sideBarToggleStatus(!sideBarStatus))
    }
    // Logout function
    const handleLogout = () => {
        dispatch(logoutPost() as any);
        navigate('/')
    }

    //  All the states and functions returned
    return {
        handleLogout,
        ToggleSidebar
    };
};

export default HeaderController;