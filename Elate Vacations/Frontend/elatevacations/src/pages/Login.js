import React, { useState, useEffect } from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCardFooter,
    MDBValidation,
    MDBBtn,
    MDBIcon,
    MDBSpinner
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify'
import { login } from '../redux/features/authslice';
// import { GoogleLogin } from 'react-google-login';



const Login = () => {
    const initialState = {
        email: "",
        password: ""
    }


    const [formValue, setFormValue] = useState(initialState);
    const { email, password } = formValue;
    const { loading, error } = useSelector((state) => ({ ...state.auth }))

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email && password) {
            dispatch(login({ formValue, navigate, toast }))
        }
    }

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    }

    // const googleSuccess = ()=>{

    // }
    // const googleFailure = ()=>{

    // }

    useEffect(() => {
        error && toast.error(error)
    }, [error])

    return (
        <div style={{ margin: "auto", padding: "15px", maxWidth: "450px", alignContent: "center", marginTop: "120px" }}>
            <MDBCard alignment='center'>
                <MDBIcon fas icon="user-circle" className="fa-2x" />
                <h5>Sign In</h5>
                <MDBCardBody>
                    <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
                        <div className="col-md-12">
                            <MDBInput
                                label="Email"
                                type="email"
                                value={email}
                                name="email"
                                onChange={onInputChange}
                                required
                                invalid
                                validation="Please provide your email"
                            />
                        </div>
                        <div className="col-md-12">
                            <MDBInput
                                label="Password"
                                type="password"
                                value={password}
                                name="password"
                                onChange={onInputChange}
                                required
                                invalid
                                validation="Please provide your passsword" />
                        </div>
                        <div className="col-md-12">
                            <MDBBtn style={{ width: "100%" }} className="mt-2">
                                {
                                    loading && (<MDBSpinner
                                        size="sm"
                                        role="status"
                                        tag="span"
                                        className="me-2" />)
                                }
                                Login
                            </MDBBtn>
                        </div>
                    </MDBValidation>
                    {/* <br />
                    <GoogleLogin
                        clientId="..."
                        render={(renderProps) => {
                            <MDBBtn style={{ width: "100%"}} color= "danger" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                <MDBIcon className='me-2' fab icon='gooogle' /> Google Sign in
                            </MDBBtn>
                        }}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    /> */}


                </MDBCardBody>
                <MDBCardFooter>
                    <Link to="/register">
                        <p>Don't have an account ? Sign Up</p>
                    </Link>
                </MDBCardFooter>
            </MDBCard>
        </div>
    )
}

export default Login;










