import Report from "@/components/UI/Report";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import MyBackDrop from "@/components/shares/BackDrop";
import {axiosJWT} from "@/configs/axios";
import {transactionActions} from "@/features/transaction/transactionSlice";
import moment from "moment";

export default function UserReport() {

    const dispacth = useDispatch()

    const [child, setChild] = useState(<MyBackDrop/>)

    const myWallet = useSelector(state => state.wallet.currentWallet)

    const reportTime = useSelector(state => state.reportTime)

    useEffect(() => {
        async function fetchData() {
            if (myWallet.id !== 'Total') {
                let params = ''
                if (reportTime.name !== 'Custom') {
                    params = {
                        year: reportTime.name !== 'Today' ? reportTime.value.split(' - ')[0].split('/')[2] : reportTime.value.split('/')[2],
                        month: reportTime.name !== 'Today' ? reportTime.value.split(' - ')[0].split('/')[1] : reportTime.value.split('/')[1],
                        date: reportTime.name !== 'Today' ? '' : reportTime.value.split('/')[0]
                    }
                } else {
                    params = {
                        startDate: reportTime.value.split(' - ')[0],
                        endDate: reportTime.value.split(' - ')[1]
                    }
                }
                let transactions = (await axiosJWT.get(`/transaction/${myWallet.id}`, {
                    params: params
                })).data
                let incomeTransactions = (await axiosJWT.get(`/transaction/${myWallet.id}/detail`, {
                    params: {...params, typeName: 'Income'}
                })).data
                let expenseTransactions = (await axiosJWT.get(`/transaction/${myWallet.id}/detail`, {
                    params: {...params, typeName: 'Expense'}
                })).data
                dispacth(transactionActions.getTrans(transactions))
                dispacth(transactionActions.getIncomeTrans(incomeTransactions))
                dispacth(transactionActions.getExpenseTrans(expenseTransactions))
                setChild(<Report/>)
            } else {
                let params = ''
                if (reportTime.name !== 'Custom') {
                    params = {
                        year: reportTime.name !== 'Today' ? reportTime.value.split(' - ')[0].split('/')[2] : reportTime.value.split('/')[2],
                        month: reportTime.name !== 'Today' ? reportTime.value.split(' - ')[0].split('/')[1] : reportTime.value.split('/')[1],
                        date: reportTime.name !== 'Today' ? '' : reportTime.value.split('/')[0]
                    }
                } else {
                    params = {
                        startDate: reportTime.value.split(' - ')[0],
                        endDate: reportTime.value.split(' - ')[1]
                    }
                }
                let transactions = (await axiosJWT.get(`/transaction`, {
                    params: params
                })).data
                let incomeTransactions = (await axiosJWT.get(`/transaction/type`, {
                    params: {...params, typeName: 'Income'}
                })).data
                let expenseTransactions = (await axiosJWT.get(`/transaction/type`, {
                    params: {...params, typeName: 'Expense'}
                })).data
                dispacth(transactionActions.getTrans(transactions))
                dispacth(transactionActions.getIncomeTrans(incomeTransactions))
                dispacth(transactionActions.getExpenseTrans(expenseTransactions))
                setChild(<Report/>)
            }
        }
        fetchData()
    }, [myWallet.id, reportTime])

    return (
        <>
            {child}
        </>
    )
}