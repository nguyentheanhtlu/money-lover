import { axiosJWT } from "@/configs/axios";

class TransactionService {
    static addTransaction(values) {
        return axiosJWT.post('/transaction', values);
    }
    
}

export default TransactionService;