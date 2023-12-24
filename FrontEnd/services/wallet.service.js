import { axiosJWT } from "@/configs/axios";

class WalletService {
    static getAllWalletsOfUser() {
        return axiosJWT.get('/wallet/info');
    }
    static getWalletsIncludedInTotal() {
        return axiosJWT.get('/wallet/included-in-total/true');
    }
    static getWalletsNotIncludedInTotal() {
        return axiosJWT.get('/wallet/included-in-total/false');
    }
    static formatMoney(money) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money);
    }
    static adjustBalance({walletId, balance}) {
        return axiosJWT.patch('/wallet/balance', {walletId, balance});
    }
    static updateWallet(values) {
        return axiosJWT.patch('/wallet', values);
    }
    static deleteWallet(walletId) {
        return axiosJWT.delete(`/wallet/${walletId}`);
    }
}

export default WalletService;