import EyeOpen from '../../assets/images/login/eyeopen.svg';
import EyeClosed from "../../assets/images/login/eyeclosed.svg";
import UserEmail from "../../assets/images/login/useremail.svg";
import Successful from "../../assets/images/login/successful.svg";
import GreensightLogo from "../../assets/images/login/greensightLogo.svg";
import TitleComponent from "../../component/tittle";
import { Modal, Button } from "react-bootstrap";
import LoginFormController from "./LoginFormController";
import OtpInput from 'react-otp-input';

/**
 * 
 * @returns LoginView Component
 */
const LoginView: React.FC = () => {

    // imported functions and variables from LoginController
    const {
        formik,
        show,
        otpNumber,
        otpErrorShow,
        setEmail1,
        handleClose,
        setOtpNumber,
        setOtpErrorShow,
        handleSubmitOtp,
        isAuthLoginLoading,
        isOtpVerifyLoading,
        handleRemember,
        rememberMe,
        setRememberMe
    } = LoginFormController();
    return (
        <>
            <TitleComponent title={"Login"} />
            {/* login page start */}

            <section className="login bg-white" data-testid="login">
                <div className="container-fluid px-0">
                    <div className="row gx-0 align-items-center ">
                        {/* left side content start */}
                        <div className="col-md-6">
                            <div className="left-side-wrapper">
                                <div className="p-4 pb-0">
                                    <img src={GreensightLogo} alt="logo" />
                                </div>
                                <div className="login-map text-center px-4">
                                    <h4 className="login-heading font-xxl-70 font-xl-45 font-45 fw-bold mb-0">
                                        Data Obfuscation
                                        Services Portal
                                    </h4>
                                </div>
                            </div>
                        </div>
                        {/* left side content ends */}

                        {/* Login Form starts */}
                        <div className="col-md-6">
                            <div className="right-side-wrapper mx-auto mt-3 mt-md-0 px-4 px-lg-0">
                                <h4 className="fw-semibold font-xxl-60 font-xl-45 font-lg-40 font-40">Login</h4>
                                <form >
                                    <div className="d-flex flex-column fields-wrapper">
                                        <div className="mail">
                                            <label className="font-xxl-20 font-18">Enter email</label>
                                            <div className="position-relative">
                                                <input
                                                    type="text"
                                                    name="email"
                                                    data-testid="login-email"
                                                    className="form-control py-3"
                                                    onChange={(e) => {
                                                        formik.handleChange(e);
                                                        setEmail1(e.target.value);
                                                    }}
                                                    value={formik.values.email}
                                                    aria-describedby="emailHelp"
                                                    placeholder="Enter your email"
                                                />
                                                <img src={UserEmail} alt="user email" />
                                            </div>
                                            {formik.touched.email && formik.errors.email ? (
                                                <span data-testid="email-error" className="error-code text-danger font-16">
                                                    {formik.errors.email}
                                                </span>
                                            ) : null}
                                        </div>
                                        <div className="mail ">
                                            <label className="font-xxl-20 font-18">Password</label>
                                            <div className="position-relative">
                                                <input
                                                    type="password"
                                                    name="password"
                                                    data-testid="login-password"
                                                    className="form-control py-3"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.password}
                                                    placeholder="Enter your password"
                                                />

                                                <img src={EyeOpen} alt="Eyeopen icon" />
                                            </div>
                                            {formik.touched.password && formik.errors.password ? (
                                                <span data-testid="email-error" className="error-code text-danger font-16">
                                                    {formik.errors.password}
                                                </span>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="checkbox d-flex align-items-center">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            checked={rememberMe}
                                            onChange={() => setRememberMe(!rememberMe)}
                                            onKeyDown={(e) => {
                                                handleRemember(e)
                                            }}
                                        />
                                        <label className="form-check-label" htmlFor="exampleCheck1">
                                            Remember Me
                                        </label>
                                    </div>
                                    <button onClick={() => formik.handleSubmit()} disabled={isAuthLoginLoading} type="button" data-testid="email-error" className="btn btn-deepgreen w-100 mb-md-0 mb-4">

                                        {isAuthLoginLoading ? <div className="spinner-border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div> : 'Login'}
                                    </button>

                                    {/* Modal start for OTP verification*/}
                                    <div className="valid-otp-wrap">
                                        <Modal show={show} className="modalLogin" onHide={handleClose}  data-testid="authentication-modal">
                                            <Modal.Header closeButton className="border-modal-login pb-2 pt-4 px-4 mx-2">
                                                <h3 className=" font-22 mb-0 fw-semibold">
                                                    Authentication
                                                </h3>
                                            </Modal.Header>
                                            <Modal.Body className="py-0 px-4 mx-2">
                                                <div className="authentication-txt">

                                                    <p className="mb-0 font-16">Enter the 6 digits code that you have received on your registered contact number.</p>
                                                </div>

                                                {" "}
                                                <div className="inputotp">
                                                    <OtpInput
                                                        value={otpNumber}
                                                        numInputs={6}
                                                        onChange={setOtpNumber}
                                                        renderInput={(props) => <input {...props} />
                                                        }
                                                    />
                                                </div>
                                                {otpErrorShow && (
                                                    <h6 className="error-code text-danger ps-0 pt-2">
                                                        Please enter the authentication code
                                                    </h6>
                                                )}
                                                <div className="border-bottom-modal mb-4 pb-2">
                                                    <Button
                                                        type="submit"
                                                        onClick={() => handleSubmitOtp()}
                                                        className="btn btn-deepgreen fs-6"
                                                        disabled={isOtpVerifyLoading}
                                                    >
                                                        {isOtpVerifyLoading ? <div className="spinner-border" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div> : 'Continue'}
                                                    </Button>
                                                    <div className="recieveCode mt-3 d-flex justify-content-center align-items-center">
                                                        <p className="mb-0">Didn't recieve a code? </p><button className="fw-semibold">Resend Code in (00:30)</button>
                                                    </div>
                                                </div>
                                            </Modal.Body>
                                        </Modal>
                                    </div>
                                    {/*  Modal end*/}

                                    {/* Modal start for Reset Password */}
                                    <div>
                                        <Modal show={false} className="modalLogin" onHide={handleClose}>
                                            <Modal.Header closeButton className="border-modal-login align-items-center pb-2 pt-4  px-4 mx-2">
                                                <h3 className=" font-22 mb-0 fw-semibold">
                                                    Reset Password
                                                </h3>
                                            </Modal.Header>
                                            <Modal.Body className="py-0 px-4 mx-2">
                                                <div className="authentication-txt">
                                                    <p className="mb-0 font-16">Enter your registered email, we will send you an email with verification code to reset your password.</p>
                                                </div>

                                                {" "}
                                                <div className="mail">
                                                    <label className="font-xxl-20 font-18 mb-2">Enter email</label>
                                                    <div className="position-relative">
                                                        <input
                                                            type="text"
                                                            name="email"
                                                            className="form-control py-3"
                                                            onChange={(e) => {
                                                                formik.handleChange(e);
                                                                setEmail1(e.target.value);
                                                            }}
                                                            value={formik.values.email}
                                                            aria-describedby="emailHelp"
                                                            placeholder="Enter your email"
                                                        />
                                                        <img src={UserEmail} alt="user email" />
                                                    </div>
                                                </div>
                                                <div className="border-bottom-modal mb-4 pb-2">
                                                    <Button
                                                        type="submit"
                                                        onClick={() => handleSubmitOtp()}
                                                        className="btn btn-deepgreen fs-6"
                                                        disabled={isOtpVerifyLoading}
                                                    >
                                                        {isOtpVerifyLoading ? <div className="spinner-border" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div> : 'Continue'}
                                                    </Button>
                                                </div>
                                            </Modal.Body>
                                        </Modal>
                                    </div>
                                    {/*  Modal ends for Reset Password  */}

                                    {/* Modal start for Verification */}
                                    <div>
                                        <Modal show={false} className="modalLogin" onHide={handleClose}>
                                            <Modal.Header closeButton className="border-modal-login align-items-center pb-2 pt-4  px-4 mx-2">
                                                <h3 className=" font-22 mb-0 fw-semibold">
                                                    Verification
                                                </h3>
                                            </Modal.Header>
                                            <Modal.Body className="py-0 px-4 mx-2">
                                                <div className="authentication-txt">
                                                    <p className="mb-0 font-16">Enter your 6 digits code that you received on your email.</p>
                                                </div>

                                                {" "}
                                                <div className="inputotp">
                                                    <OtpInput
                                                        value={otpNumber}
                                                        numInputs={6}
                                                        onChange={setOtpNumber}
                                                        renderInput={(props) => <input {...props} />
                                                        }
                                                    />
                                                </div>
                                                <div className="border-bottom-modal mb-4 pb-2">
                                                    <Button
                                                        type="submit"
                                                        onClick={() => handleSubmitOtp()}
                                                        className="btn btn-deepgreen fs-6"
                                                        disabled={isOtpVerifyLoading}
                                                    >
                                                        {isOtpVerifyLoading ? <div className="spinner-border" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div> : 'Continue'}
                                                    </Button>
                                                    <div className="recieveCode mt-3 d-flex justify-content-center align-items-center">
                                                        <p className="mb-0">Didn't recieve a code? </p><button className="fw-semibold">Resend Code</button>
                                                    </div>
                                                </div>
                                            </Modal.Body>
                                        </Modal>
                                    </div>
                                    {/*  Modal ends for Verification  */}

                                    {/* Modal start for New Password */}
                                    <div>
                                        <Modal show={false} className="modalLogin" onHide={handleClose}>
                                            <Modal.Header closeButton className="border-modal-login align-items-center pb-2 pt-4  px-4 mx-2">
                                                <h3 className=" font-22 mb-0 fw-semibold">
                                                    New Password
                                                </h3>
                                            </Modal.Header>
                                            <Modal.Body className="py-0 px-4 mx-2">
                                                <div className="authentication-txt">
                                                    <p className="mb-0 font-16">Set the new password for your account so you can login and access all features.</p>
                                                </div>

                                                {" "}
                                                <div className="mail mb-4">
                                                    <label className="font-xxl-20 font-18 mb-2">Enter New Password</label>
                                                    <div className="position-relative">
                                                        <input
                                                            type="password"
                                                            name="password"
                                                            className="form-control py-3"
                                                            onChange={(e) => {
                                                                formik.handleChange(e);
                                                                setEmail1(e.target.value);
                                                            }}
                                                            value={formik.values.password}
                                                            placeholder="Type Password"
                                                        />
                                                        <img src={EyeOpen} alt="eyeopen icon" />
                                                    </div>
                                                </div>
                                                <div className="mail">
                                                    <label className="font-xxl-20 font-18 mb-2">Confirm Password</label>
                                                    <div className="position-relative">
                                                        <input
                                                            type="password"
                                                            name="password"
                                                            className="form-control py-3"
                                                            onChange={(e) => {
                                                                formik.handleChange(e);
                                                                setEmail1(e.target.value);
                                                            }}
                                                            value={formik.values.password}
                                                            placeholder="Retype Password"
                                                        />
                                                        <img src={EyeClosed} alt="eyeclosed icon" />
                                                    </div>
                                                </div>
                                                <div className="border-bottom-modal mb-4 pb-2">
                                                    <Button
                                                        type="submit"
                                                        onClick={() => handleSubmitOtp()}
                                                        className="btn btn-deepgreen fs-6"
                                                        disabled={isOtpVerifyLoading}
                                                    >
                                                        {isOtpVerifyLoading ? <div className="spinner-border" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div> : 'Update Password'}
                                                    </Button>
                                                </div>
                                            </Modal.Body>
                                        </Modal>
                                    </div>
                                    {/*  Modal ends for New Password  */}

                                    {/* Modal start for Successful verification */}
                                    <div>
                                        <Modal show={false} className="modalLogin" onHide={handleClose}>
                                            <Modal.Header closeButton className="border-modal-login align-items-center pb-2 pt-4 px-4 mx-2"></Modal.Header>
                                            <Modal.Body className="py-0 px-4 mx-2">
                                                <div className="authentication-txt text-center">
                                                    <img src={Successful} alt="successful" className="mb-4" />
                                                    <h4 className="mb-3 font-24 fw-semibold">Congratulations</h4>
                                                    <p className="font-16 mb-0">Your password has been reset successfully</p>
                                                </div>
                                                {" "}

                                                <div className="border-bottom-modal mb-4 pb-2">
                                                    <Button
                                                        type="submit"
                                                        onClick={() => handleSubmitOtp()}
                                                        className="btn btn-deepgreen fs-6"
                                                        disabled={isOtpVerifyLoading}
                                                    >
                                                        {isOtpVerifyLoading ? <div className="spinner-border" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div> : 'Continue'}
                                                    </Button>

                                                </div>
                                            </Modal.Body>
                                        </Modal>
                                    </div>
                                    {/*  Modal ends for successful Verification  */}
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

export default LoginView