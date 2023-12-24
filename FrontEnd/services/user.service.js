import { axiosJWT } from "@/configs/axios";
import {myAxios} from "@/configs/axios";

class UserService {
    static changePassword(values) {
        return axiosJWT.post('/auth/change-password',values);
    }
    static verifyEmail(token) {
        let param = token.join('/');
        return myAxios.post(`/auth/verify`, {token: param});
    }
    static forgotPassword(values) {
        return myAxios.post('/auth/forgot-password', values);
    }
    static resetPassword(token) {
        let param = token.join('/');
        return myAxios.post('/auth/reset-password', {token: param});
    }
}

export default UserService;