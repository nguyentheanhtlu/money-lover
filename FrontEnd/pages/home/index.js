import {useEffect, useState} from "react";
import {axiosJWT} from "@/configs/axios";
import {useDispatch, useSelector} from "react-redux";
import MyBackDrop from "@/components/shares/BackDrop";
import MyHome from "@/components/UI/Home";
import {useRouter} from "next/router";
import {walletActions} from "@/features/wallet/walletSlice";
import {transactionActions} from "@/features/transaction/transactionSlice";

export default function Home() {

    const myTrans = useSelector(state => state.transaction.trans)

    const time = useSelector(state => state.time)

    const router = useRouter()

    const user = useSelector(state => state.auth);

    const [child, setChild] = useState(<MyBackDrop/>)

    const dispatch = useDispatch()

    useEffect(() => {
        if (user.isLoggedIn && myTrans.length === 0) {
            async function fetchData() {
                let wallets = (await axiosJWT.get('/wallet/info')).data
                if (wallets.length !== 0) {
                    let transactions = (await axiosJWT.get('/transaction', {
                        params: {
                            year: time.value.format('MM/YYYY').split('/')[1],
                            month: time.value.format('MM/YYYY').split('/')[0]
                        }
                    })).data
                    dispatch(walletActions.getWallets(wallets))
                    dispatch(transactionActions.getTrans(transactions))
                    setChild(<MyHome/>)
                } else {
                    router.push('/wallets')
                }
            }
            fetchData()
        }
        if (!user.isLoggedIn) {
            router.push('/login')
        }
        if (user.isLoggedIn && myTrans.length !== 0) {
            setChild(<MyHome/>)
        }
    }, [])

    return (
        <>
            {child}
        </>
    )
}

