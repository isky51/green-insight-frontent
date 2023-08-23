import { useNavigate } from 'react-router-dom';

import { logoutPost } from '../../store/auth/authDataSlice';
import { useAppDispatch } from '../../store/redux.hooks';

/**
 * 
 * @returns All the states and functions for DashboardView
 */

const HeaderController = () => {
    // Define constant 
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    // Logout function
    const handleLogout = () => {
        dispatch(logoutPost() as any);
        navigate('/')
    }

    //  All the states and functions returned
    return {
        handleLogout
    };
};

export default HeaderController;