import { useEffect, useState } from 'react'
// import { useSelector } from "react-redux";
import { loginPost, otpPost } from "../../store/auth/authDataSlice";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../auth/ProtectedRoute';
import { useFormik } from 'formik';
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from '../../store/redux.hooks';

// Predefined models 
interface AuthData {
    email: string;
    password: string;
}

interface OtpData {
    email: string;
    otp: string;
}

/**
 * 
 * @returns all controllers for login page.
 */

const LoginFormController = () => {

    // Defined all stats and constants
    const [show, setShow] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [otpNumber, setOtpNumber] = useState("");
    const [otpErrorShow, setOtpErrorShow] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const [email1, setEmail1] = useState("");
    const dataCheck = useAuth();

    // Import data from auth selector
    const { isAuthLoginLoading, isOtpVerifyLoading, isSuccess, otpSuccess, isOtp } = useAppSelector(
        (state) => state.auth
    );

    // Function for closing modal
    const handleClose = () => {
        setOtpErrorShow(false)
        setShow(false);
        setOtpNumber("")
    }

    // If login success, redirects to dashboard else show errors
    useEffect(() => {
        if (isSuccess && isOtp) {
            setShow(true);
        } else if (!isSuccess && !isOtp) {
            setShow(false);
            localStorage.clear();
        } else if (isSuccess && !isOtp) {
            setShow(false);

        }
    }, [isSuccess, isOtp, navigate]);

    // If otp gets verified, redirects to dashboard
    useEffect(() => {
        if (otpSuccess && dataCheck?.loggedIn) {
            setShow(false)
            navigate("/dashboard");
        }
        if (isSuccess && !isOtp && dataCheck?.loggedIn) {
            navigate("/dashboard");
        }
    }, [otpSuccess, isSuccess, isOtp, dataCheck, navigate]);

    // On submit otp button click, dispatches verify-otp api
    const handleSubmitOtp = () => {
        if (otpNumber?.length > 0) {
            const payload: OtpData = {
                email: email1, otp: otpNumber
            }
            dispatch(otpPost(payload));
        } else {
            setOtpErrorShow(true)
        }

    }

    // used in formic to call login api
    const handleSubmit = (event: any) => {
        const userPayload = {
            email: event.email,
            password: event.password,
        };
        dispatch(loginPost(userPayload));

    };

    // intialData for formic
    let _Fields: AuthData = { email: "", password: "" };

    // schema for varification of email and password
    const schema = yup.object().shape({
        email: yup
            .string()
            .email("Please enter a valid Email")
            .required("Email should not be empty"),
        password: yup
            .string()
            .required("Password should not be empty"),
    });


    const handleRemember = (e: any) => {
        if (e.key === 'Enter') {
            setRememberMe(!rememberMe)
        }

    }



    // formic to control login form
    const formik = useFormik({
        initialValues: _Fields,
        validationSchema: schema,
        onSubmit: handleSubmit,
    });


    // All the state and function return to LoginView
    return {
        formik,
        show,
        setEmail1,
        otpNumber,
        otpErrorShow,
        handleClose,
        setOtpNumber,
        setOtpErrorShow,
        handleSubmitOtp,
        navigate,
        isAuthLoginLoading,
        isOtpVerifyLoading,
        handleRemember,
        rememberMe,
        setRememberMe
    }

}

export default LoginFormController
