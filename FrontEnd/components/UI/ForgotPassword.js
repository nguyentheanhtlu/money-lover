import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow } from 'mdb-react-ui-kit';
import Link from "next/link";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Logo from "@/components/shares/Logo";
import { myAxios } from "@/configs/axios";
import useRouter from 'next/router';
import { authActions } from "@/features/auth/authSlice";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import SnackBar from "@/components/shares/SnackBar";
import UserService from '@/services/user.service';

const ForgotPassword = () => {

    const dispatch = useDispatch();

    const router = useRouter;

    const [open, setOpen] = useState(false);

    const [disabled, setDisabled] = useState(false);

    const [snackbar, setSnackbar] = useState({
        severity: "",
        message: ""
    })

    const formik = useFormik({
        initialValues: {
            email: '',
        }, validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
        }), onSubmit: values => {
            UserService.forgotPassword(values);
            setDisabled(true);
        }
    })
    return (
            <MDBContainer style={{ height: '100vh', backgroundColor: 'lightgray' }} fluid>
                <MDBRow className='d-flex justify-content-center align-items-center'>
                    <MDBCol style={{ backgroundColor: 'lightgray', height: "100vh", padding: "0px" }} col='12'>
                        <div style={{ backgroundColor: '#00710f', height: '350px', width: "100%" }}>
                            <Logo />
                        </div>
                        <MDBCard className='bg-white mx-auto'
                            style={{ borderRadius: '1rem', maxWidth: '500px', zIndex: 999, top: "-185px" }}>
                            <MDBCardBody className='px-5 py-5 w-100 d-flex flex-column'>
                                <MDBRow>
                                    <h2 className="fw-bold mb-3 text-center">Forgot Password</h2>
                                    <MDBCol className="mt-4">
                                        <form onSubmit={formik.handleSubmit}>
                                            <p>Enter the email address you used to register, and we will send you an email to recover your password in no time.</p>
                                            <MDBInput wrapperClass='my-2 w-100' placeholder='Email' id='email'
                                                type='email' name='email' onChange={formik.handleChange}
                                                value={formik.values.email} size="lg" autoFocus />
                                            {formik.errors.email && formik.touched.email && (<p style={{ color: 'red' }}>{formik.errors.email}</p>)}
                                            <br />
                                            <Button type='submit' style={{ marginTop: '10px', width: '100%' }} variant="success" size='lg' disabled={disabled}>
                                                Confirm
                                            </Button>
                                            <br />
                                            <p style={{ textAlign: 'center', textDecoration: 'none', marginTop: '10px' }}>
                                                <Link href="/login">Back to Login</Link>
                                                {" or "}
                                                <Link href="/register">Create Account</Link>
                                            </p>
                                        </form>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
                <SnackBar open={open} setOpen={setOpen} severity={snackbar.severity} message={snackbar.message} />
            </MDBContainer>
    );
}
export default ForgotPassword;


