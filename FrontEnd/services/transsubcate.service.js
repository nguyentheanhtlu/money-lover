import { axiosJWT } from "@/configs/axios";

class TransSubCateService {
    static getAllTransSubCateByType(transTypeId) {
        return axiosJWT.get(`/transaction-subcategory/${transTypeId}`);
    }
}

export default TransSubCateService;