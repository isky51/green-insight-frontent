import { useEffect, useState } from 'react'
// import { useSelector } from "react-redux";
import { loginPost, otpPost, resendOtpPost } from "../../store/auth/authDataSlice";
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
    const [timer, setTimer] = useState(60);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [email, setEmail] = useState("");

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
            navigate("/sustainable");
            // if(dataCheck?.userdata?.role === 1){
            //     navigate("/dashboard");
            // }else if(dataCheck?.userdata?.role === 3){
            //     navigate("/sustainable");
            // }
        }
        if (isSuccess && !isOtp && dataCheck?.loggedIn) {
            navigate("/sustainable");
            // if(dataCheck?.userdata?.role === 1){
            //     navigate("/dashboard");
            // }else if(dataCheck?.userdata?.role === 3){
            //     navigate("/sustainable");
            // }
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
        setEmail(event.email);
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

    useEffect(() => {
        if (isTimerActive && timer > 0) {
          const countdown = setInterval(() => {
            setTimer(prevTimer => prevTimer - 1);
          }, 1000);
    
          return () => clearInterval(countdown);
        } else if (timer === 0) {
          setTimer(60)
          setIsTimerActive(false);
        }
      }, [isTimerActive, timer]);
    
      const handleResendOTP = () => {
        // Logic to trigger OTP resend
        const userPayload = {
            email: email,
        };
        dispatch(resendOtpPost(userPayload));
        setIsOtpSent(true);
        setTimer(60);
        setIsTimerActive(true);
      };


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
        setRememberMe,
        handleResendOTP,
        isTimerActive,
        timer
    }

}

export default LoginFormController
