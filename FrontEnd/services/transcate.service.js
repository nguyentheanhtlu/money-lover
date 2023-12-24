import { axiosJWT } from "@/configs/axios";

class TransCateService {
    static getAllTransSubCateByType() {
        return axiosJWT.get(`/transaction-category`);
    }
}

export default TransCateService;