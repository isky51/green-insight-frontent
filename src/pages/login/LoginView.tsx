import Password from "../../assets/images/login/password.svg"
import UserEmail from "../../assets/images/login/useremail.svg"
import TitleComponent from "../../component/tittle";
import { Modal, Button } from "react-bootstrap";
import LoginFormController from "./LoginFormController";
import GreensightLogo from "../../assets/images/login/greensightLogo.svg"

/**
 * 
 * @returns LoginView Component
 */
const LoginView: React.FC = () => {

    // Imported functions and variables from LoginController
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

            <section className="login" data-testid="login">
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
                                                <span data-testid="email-error"  className="error-code text-danger font-16">
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

                                                <img src={Password} alt="password" />
                                            </div>
                                            {formik.touched.password && formik.errors.password ? (
                                                <span data-testid="password-error" className="error-code text-danger font-16">
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
                                    <button onClick={() => formik.handleSubmit()} disabled={isAuthLoginLoading} type="button" data-testid="login_btn" className="btn btn-deepgreen w-100 mb-md-0 mb-4">

                                        {isAuthLoginLoading ? <div className="spinner-border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div> : 'Login'}
                                    </button>

                                    <div className="valid-otp-wrap">
                                        {/* Modal start for OTP verification*/}
                                        <Modal show={show} className="modalLogin" onHide={handleClose} data-testid="authentication-modal">
                                            <Modal.Header closeButton className="border-modal-login pb-4">
                                            </Modal.Header>
                                            <Modal.Body className="py-0 px-4 mx-4">
                                                <h3 className="authentication-txt text-center font-22">
                                                    Enter the authentication code
                                                </h3>
                                                {" "}
                                                <input
                                                    id="otp"
                                                    name="otp"
                                                    className="form-control"
                                                    placeholder=" Enter the authentication code"
                                                    type="text"
                                                    maxLength={6}
                                                    value={otpNumber}
                                                    onChange={(e) => {
                                                        setOtpNumber(e.target.value);
                                                        setOtpErrorShow(false);
                                                    }}
                                                />
                                                {otpErrorShow && (
                                                    <h6 className="error-code text-danger ps-0 pt-2">
                                                        Please enter the authentication code
                                                    </h6>
                                                )}
                                                <div className="border-bottom-modal mb-4">
                                                    <Button
                                                        type="submit"
                                                        onClick={() => handleSubmitOtp()}
                                                        className="btn btn-deepgreen"
                                                        disabled={isOtpVerifyLoading}
                                                    >
                                                        {isOtpVerifyLoading ? <div className="spinner-border" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div> : 'Submit'}
                                                    </Button>
                                                </div>
                                            </Modal.Body>
                                        </Modal>
                                        {/*  Modal end*/}
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

export default LoginView