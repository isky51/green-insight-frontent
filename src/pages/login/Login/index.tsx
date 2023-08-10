import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { Input } from "reactstrap";
import Password from "../../../assets/images/login/password.svg"
import UserEmail from "../../../assets/images/login/useremail.svg"
import TitleComponent from "../../../component/tittle";
import { useDispatch, useSelector } from "react-redux";
import { loginPost, otpPost, reset } from "../../../store/auth/authDataSlice";
import { useAuth } from "../../../auth/ProtectedRoute";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";


const LoginForm = () => {
    const { loginDetails, isSuccess, otpSuccess, otpError } = useSelector(
        (state: any) => state.auth
    );

    const [show, setShow] = useState(false);
    const [otpNumber, setOtpNumber] = useState("");
    const [handleOtpBtn, setHandleOtpBtn] = useState(false);
    const [otpErrorShow, setotpErrorShow] = useState(false);
    const handleClose = () => setShow(false);
    const dispatch = useDispatch<any>();
    const dataCheck = useAuth();
    const [email1, setEmail1] = useState("");
    
    const navigate = useNavigate();

    const schema = yup.object().shape({
        email: yup
            .string()
            .email("Please enter the valid username")
            .required("Username should not be empty"),
        password: yup
            .string()
            .min(3, "Please enter the min 3 letter")
            .required("Password should not be empty"),
    });

    let _Fields = { email: "", password: "" };

    console.log(isSuccess , loginDetails?.message, "logindetails")

    useEffect(() => {  
        if (
            isSuccess && 
            loginDetails?.message ===
            "Verification code send to registered phone number."
        ) {
            setShow(true);
            setotpErrorShow(false);
        } else if (
            !isSuccess &&
            loginDetails?.message !==
            "Verification code send to registered phone number."
        ) {
            setShow(false);
            setotpErrorShow(false);
            localStorage.clear();
        } else if (isSuccess &&
            loginDetails?.message ===
            "User Logged In Successfully.") {
            setShow(false);
            setotpErrorShow(false);
            if (dataCheck?.loggedIn) {
                 navigate("/dashboard");

                // if (dataCheck?.userdata?.count === 1) {
                //     navigate("/settings");
                // } else {
                //     if (dataCheck?.userdata?.role === 1) {
                //         if (dataCheck?.userdata?.Region?.id) {
                //             localStorage.setItem(
                //                 "regionalLevel",
                //                 dataCheck?.userdata?.Region?.id
                //             );
                //         }
                //         navigate("/regional-level");
                //     } else {
                //         navigate("/sustainable");
                //     }
                // }
            }
        }
    }, [isSuccess]);

console.log(show,"show")

    useEffect(() => {
        if (otpSuccess && dataCheck?.loggedIn) {
            if (dataCheck?.userdata?.role === 1) {
                if (dataCheck?.userdata?.Region?.id) {
                    localStorage.setItem(
                        "regionalLevel",
                        dataCheck?.userdata?.Region?.id
                    );
                }
                navigate("/regional-level");
            } else {
                navigate("/sustainable");
            }
        }
    }, [otpSuccess]);
    useEffect(() => {
        if (handleOtpBtn) {
            dispatch(otpPost({ email: email1, otp: otpNumber }));
            setHandleOtpBtn(false);
        }
    }, [handleOtpBtn]);

    useEffect(() => {
        setotpErrorShow(true);
    }, [otpError]);

    const handleSubmit = (event: any) => {
        const userPayload = {
            email: event.email,
            password: event.password,
        };
        console.log(userPayload,"Login Email, Password")
        dispatch(loginPost(userPayload));

    };

    const formik = useFormik({
        initialValues: _Fields,
        validationSchema: schema,
        onSubmit: handleSubmit,
    });

    return (
        <>
            <TitleComponent title={"Login"} />
            {/* login page start */}
            <section className="login">
                <div className="container-fluid px-0">
                    <div className="row align-items-center ">
                        {/* left side content start */}
                        <div className="col-md-6">
                            <div className="left-side-wrapper">
                                <div className="login-map text-center">
                                    <h4 className="login-heading fw-bold mb-0">
                                        Utility Portal
                                    </h4>
                                </div>
                            </div>
                        </div>
                        {/* left side content ends */}

                        {/* Login Form starts */}
                        <div className="col-md-6">
                            <div className="right-side-wrapper mx-auto mt-3 mt-md-0">
                                <h4 className="fw-semibold">Login</h4>

                                <form onSubmit={formik.handleSubmit}>
                                    <div className="d-flex flex-column fields-wrapper">
                                        <div className="mail">
                                            <label >Enter email</label>
                                            <div className="position-relative">
                                                <input
                                                    type="text"
                                                    name="email"
                                                    className="form-control py-3"
                                                    onChange={(e) => {
                                                        formik.handleChange(e);
                                                        setEmail1(e.target.value);
                                                    }}
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Enter your username"
                                                />
                                                <img src={UserEmail} alt="user email" />
                                            </div>

                                            {formik.errors.email ? (
                                                <span className="error-code text-danger">
                                                    {formik.errors.email}
                                                </span>
                                            ) : null}
                                        </div>
                                        <div className="mail ">
                                            <label >Password</label>
                                            <div className="position-relative">
                                                <input
                                                    type="password"
                                                    name="password"
                                                    className="form-control py-3"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.password}
                                                    id="exampleInputPassword1"
                                                    placeholder="Enter your password"
                                                />

                                                <img src={Password} alt="password" />
                                            </div>

                                            {formik.errors.password ? (
                                                <span className="error-code text-danger">
                                                    {formik.errors.password}
                                                </span>
                                            ) : null}
                                        </div>
                                    </div>

                                    <div className="checkbox d-flex align-items-center">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="exampleCheck1"
                                        />
                                        <label className="form-check-label" htmlFor="exampleCheck1">
                                            Remember Me
                                        </label>
                                    </div>
                                    <button type="submit" className="btn btn-deepgreen w-100">
                                        Login
                                    </button>
                                    <div className="valid-otp-wrap">
                                        <Modal show={show} onHide={handleClose}>
                                            <Modal.Header closeButton className="border-modal-login">
                                                <Modal.Title>
                                                    <h3 className="fs-5 mb-0">
                                                        Enter the authentication code
                                                    </h3>
                                                </Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body className="py-0">
                                                {" "}
                                                <Input
                                                    id="exampleEmail"
                                                    name="email"
                                                    className="form-control"
                                                    placeholder="Authentication Code"
                                                    type="text"
                                                    maxLength={6}
                                                    value={otpNumber}
                                                    onChange={(e) => {
                                                        setOtpNumber(e.target.value);
                                                        setotpErrorShow(false);
                                                    }}
                                                />
                                                {otpError && otpErrorShow ? (
                                                    <h6 className="error-code text-danger ps-0 pt-2">
                                                        Enter the authentication code correctly
                                                    </h6>
                                                ) : (
                                                    ""
                                                )}
                                            </Modal.Body>
                                            <Modal.Footer className="border-bottom-modal justify-content-center">
                                                <div className="text-center">
                                                    <Button
                                                        type="submit"
                                                        onClick={() => setHandleOtpBtn(true)}
                                                        className="btn btn-green py-1 px-4"
                                                    >
                                                        Submit
                                                    </Button>
                                                </div>
                                            </Modal.Footer>
                                        </Modal>
                                    </div>
                                </form>

                            </div>
                        </div>
                        {/* login form ends */}
                    </div>
                </div>
            </section>
        </>
    );
}

export default LoginForm