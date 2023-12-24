import {useGoogleLogin} from "@react-oauth/google";
import {useRouter} from "next/router";
import jwt_decode from "jwt-decode";
import axios from "axios";
import {FaGoogle} from "react-icons/fa";
import Button from "react-bootstrap/Button";
import React from "react";
import {authActions} from "@/features/auth/authSlice";
import {useDispatch} from "react-redux";

export default function MyGoogleButton() {

    const dispatch = useDispatch()

    const router = useRouter()

    const login = useGoogleLogin({
        onSuccess: async response => {
            try {
                // Gọi API lấy data user google
                const result = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: {
                        'Authorization': 'Bearer ' + response.access_token
                    }
                })
                // Gọi API xét login
                axios.post('http://localhost:8000/api/auth/login/google', result.data)
                    .then((res) => {
                        localStorage.setItem('accessToken', res.data.accessToken)
                        localStorage.setItem('refreshToken', res.data.refreshToken)
                        let user = jwt_decode(res.data.accessToken)
                        dispatch(authActions.loggedIn({
                            user: user
                        }))
                        router.push('/home')
                    })
            } catch (err) {
                console.log(err)
            }
        }
    })

    return (
        <>
            <Button style={{borderWidth: '2px'}} variant='outline-danger' onClick={() => login()}
                    className="mb-2 w-100 d-flex align-items-center" size="lg">
                <FaGoogle style={{marginRight: '19px'}}/>
                Connect with google
            </Button>
        </>
    )
}