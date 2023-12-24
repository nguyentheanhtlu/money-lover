import { useRouter } from "next/router";
import { useEffect } from "react";
import UserService from "@/services/user.service";

const Token = () => {
    const router = useRouter();
    const { token } = router.query;
    useEffect(() => {
        if (!token) {
            return;
        }
        UserService.verifyEmail(token)
        .then(res => {
            setTimeout(() => {
                router.push('/login');
            }, 3000);
        })
        .catch(err => {
            console.log(err.response.data.message)
        })
    }, [token])

    return <p>Verifying Email...</p>
}

export default Token;