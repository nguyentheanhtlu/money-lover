import ListGroup from 'react-bootstrap/ListGroup';
import {useState} from "react";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {axiosJWT} from "@/configs/axios";
import {transactionActions} from "@/features/transaction/transactionSlice";
import {timeActions} from "@/features/time/timeSlice";

function TransOverviewTabs() {

    const dispatch = useDispatch();

    const time = useSelector(state => state.time)

    const myWallet = useSelector(state => state.wallet.currentWallet)

    const [months, setMonths] = useState([
        {
            name: 'Last Month',
            value: moment().subtract(1, 'months')
        }, {
            name: 'This Month',
            value: moment()
        }, {
            name: 'Future',
            value: moment().add(1, 'months')
        }
    ])

    const [timeRange, setTimeRange] = useState(months)

    const handleCLick = async (index, item) => {
        let monthNames = months.map(month => {return month.name})
        if (index === 0) {
            if (monthNames.indexOf(item.name) === 0) {
                let obj = {
                    name: moment(item.value).subtract(1, 'months').format('MM/YYYY'),
                    value: moment(item.value).subtract(1, 'months')
                }
                if (item.name === 'Last Month') {
                    if (myWallet.id === 'Total') {
                        let month = item.value.format('MM/YYYY').split('/')[0]
                        let year = item.value.format('MM/YYYY').split('/')[1]
                        let transactions = (await axiosJWT.get('/transaction', {
                            params: {
                                year: year,
                                month: month
                            }
                        })).data
                        dispatch(transactionActions.getTrans(transactions))
                        dispatch(timeActions.changeTime(item))
                        setMonths([obj, ...months]);
                        setTimeRange([obj, ...months].slice(0, 3))
                    } else {
                        let month = item.value.format('MM/YYYY').split('/')[0]
                        let year = item.value.format('MM/YYYY').split('/')[1]
                        let transactions = (await axiosJWT.get(`/transaction/${myWallet.id}`, {
                            params: {
                                year: year,
                                month: month
                            }
                        })).data
                        dispatch(transactionActions.getTrans(transactions))
                        dispatch(timeActions.changeTime(item))
                        setMonths([obj, ...months]);
                        setTimeRange([obj, ...months].slice(0, 3))
                    }
                } else {
                    if (myWallet.id === 'Total') {
                        let month = item.name.split('/')[0]
                        let year = item.name.split('/')[1]
                        let transactions = (await axiosJWT.get('/transaction', {
                            params: {
                                year: year,
                                month: month
                            }
                        })).data
                        dispatch(transactionActions.getTrans(transactions))
                        dispatch(timeActions.changeTime(item))
                        setMonths([obj, ...months]);
                        setTimeRange([obj, ...months].slice(0, 3))
                    } else {
                        let month = item.name.split('/')[0]
                        let year = item.name.split('/')[1]
                        let transactions = (await axiosJWT.get(`/transaction/${myWallet.id}`, {
                            params: {
                                year: year,
                                month: month
                            }
                        })).data
                        dispatch(transactionActions.getTrans(transactions))
                        dispatch(timeActions.changeTime(item))
                        setMonths([obj, ...months]);
                        setTimeRange([obj, ...months].slice(0, 3))
                    }
                }
            } else {
                if (item.name === 'Last Month') {
                    if (myWallet.id === 'Total') {
                        let month = item.value.format('MM/YYYY').split('/')[0]
                        let year = item.value.format('MM/YYYY').split('/')[1]
                        let transactions = (await axiosJWT.get('/transaction', {
                            params: {
                                year: year,
                                month: month
                            }
                        })).data
                        dispatch(transactionActions.getTrans(transactions))
                        dispatch(timeActions.changeTime(item))
                        setTimeRange([months[monthNames.indexOf(item.name)-1], item, months[monthNames.indexOf(item.name)+1]])
                    } else {
                        let month = item.value.format('MM/YYYY').split('/')[0]
                        let year = item.value.format('MM/YYYY').split('/')[1]
                        let transactions = (await axiosJWT.get(`/transaction/${myWallet.id}`, {
                            params: {
                                year: year,
                                month: month
                            }
                        })).data
                        dispatch(transactionActions.getTrans(transactions))
                        dispatch(timeActions.changeTime(item))
                        setTimeRange([months[monthNames.indexOf(item.name)-1], item, months[monthNames.indexOf(item.name)+1]])
                    }
                } else {
                    if (myWallet.id === 'Total') {
                        let month = item.name.split('/')[0]
                        let year = item.name.split('/')[1]
                        let transactions = (await axiosJWT.get('/transaction', {
                            params: {
                                year: year,
                                month: month
                            }
                        })).data
                        dispatch(transactionActions.getTrans(transactions))
                        dispatch(timeActions.changeTime(item))
                        setTimeRange([months[monthNames.indexOf(item.name)-1], item, months[monthNames.indexOf(item.name)+1]])
                    } else {
                        let month = item.name.split('/')[0]
                        let year = item.name.split('/')[1]
                        let transactions = (await axiosJWT.get(`/transaction/${myWallet.id}`, {
                            params: {
                                year: year,
                                month: month
                            }
                        })).data
                        dispatch(transactionActions.getTrans(transactions))
                        dispatch(timeActions.changeTime(item))
                        setTimeRange([months[monthNames.indexOf(item.name)-1], item, months[monthNames.indexOf(item.name)+1]])
                    }
                }
            }
        }
        if (index === 2) {
            if (monthNames.indexOf(item.name) !== monthNames.length-1) {
                if (item.name === 'This Month' || item.name === 'Last Month') {
                    if (myWallet.id === 'Total') {
                        let month = item.value.format('MM/YYYY').split('/')[0]
                        let year = item.value.format('MM/YYYY').split('/')[1]
                        let transactions = (await axiosJWT.get('/transaction', {
                            params: {
                                year: year,
                                month: month
                            }
                        })).data
                        dispatch(transactionActions.getTrans(transactions))
                        dispatch(timeActions.changeTime(item))
                        setTimeRange([months[monthNames.indexOf(item.name)-1], item, months[monthNames.indexOf(item.name)+1]])
                    } else {
                        let month = item.value.format('MM/YYYY').split('/')[0]
                        let year = item.value.format('MM/YYYY').split('/')[1]
                        let transactions = (await axiosJWT.get(`/transaction/${myWallet.id}`, {
                            params: {
                                year: year,
                                month: month
                            }
                        })).data
                        dispatch(transactionActions.getTrans(transactions))
                        dispatch(timeActions.changeTime(item))
                        setTimeRange([months[monthNames.indexOf(item.name)-1], item, months[monthNames.indexOf(item.name)+1]])
                    }
                } else {
                    if (myWallet.id === 'Total') {
                        let month = item.name.split('/')[0]
                        let year = item.name.split('/')[1]
                        let transactions = (await axiosJWT.get('/transaction', {
                            params: {
                                year: year,
                                month: month
                            }
                        })).data
                        dispatch(transactionActions.getTrans(transactions))
                        dispatch(timeActions.changeTime(item))
                        setTimeRange([months[monthNames.indexOf(item.name)-1], item, months[monthNames.indexOf(item.name)+1]])
                    } else {
                        let month = item.name.split('/')[0]
                        let year = item.name.split('/')[1]
                        let transactions = (await axiosJWT.get(`/transaction/${myWallet.id}`, {
                            params: {
                                year: year,
                                month: month
                            }
                        })).data
                        dispatch(transactionActions.getTrans(transactions))
                        dispatch(timeActions.changeTime(item))
                        setTimeRange([months[monthNames.indexOf(item.name)-1], item, months[monthNames.indexOf(item.name)+1]])
                    }
                }
            }
            if (item.name === 'Future') {
                if (myWallet.id === 'Total') {
                    let month = item.value.format('MM/YYYY').split('/')[0]
                    let year = item.value.format('MM/YYYY').split('/')[1]
                    let transactions = (await axiosJWT.get('/transaction', {
                        params: {
                            year: year,
                            month: month
                        }
                    })).data
                    dispatch(transactionActions.getTrans(transactions))
                    dispatch(timeActions.changeTime(item))
                } else {
                    let month = item.value.format('MM/YYYY').split('/')[0]
                    let year = item.value.format('MM/YYYY').split('/')[1]
                    let transactions = (await axiosJWT.get(`/transaction/${myWallet.id}`, {
                        params: {
                            year: year,
                            month: month
                        }
                    })).data
                    dispatch(transactionActions.getTrans(transactions))
                    dispatch(timeActions.changeTime(item))
                }
            }
        }
        if (index === 1) {
            if (item.name === 'This Month' || item.name === 'Last Month') {
                if (myWallet.id === 'Total') {
                    let month = item.value.format('MM/YYYY').split('/')[0]
                    let year = item.value.format('MM/YYYY').split('/')[1]
                    let transactions = (await axiosJWT.get('/transaction', {
                        params: {
                            year: year,
                            month: month
                        }
                    })).data
                    dispatch(transactionActions.getTrans(transactions))
                    dispatch(timeActions.changeTime(item))
                } else {
                    let month = item.value.format('MM/YYYY').split('/')[0]
                    let year = item.value.format('MM/YYYY').split('/')[1]
                    let transactions = (await axiosJWT.get(`/transaction/${myWallet.id}`, {
                        params: {
                            year: year,
                            month: month
                        }
                    })).data
                    dispatch(transactionActions.getTrans(transactions))
                    dispatch(timeActions.changeTime(item))
                }
            } else {
                if (myWallet.id === 'Total') {
                    let month = item.name.split('/')[0]
                    let year = item.name.split('/')[1]
                    let transactions = (await axiosJWT.get('/transaction', {
                        params: {
                            year: year,
                            month: month
                        }
                    })).data
                    dispatch(transactionActions.getTrans(transactions))
                    dispatch(timeActions.changeTime(item))
                } else {
                    let month = item.name.split('/')[0]
                    let year = item.name.split('/')[1]
                    let transactions = (await axiosJWT.get(`/transaction/${myWallet.id}`, {
                        params: {
                            year: year,
                            month: month
                        }
                    })).data
                    dispatch(transactionActions.getTrans(transactions))
                    dispatch(timeActions.changeTime(item))
                }
            }
        }
    }

    return (
        <ListGroup horizontal>
            {timeRange.map((item, index) => {
                return <ListGroup.Item className='col-lg-4 text-center' active={item.name === time.name ? true : false} style={{cursor: "pointer", backgroundColor: item.name === time.name ? '#2e7d32' : ''}} onClick={() => handleCLick(index, item)}>{item.name}</ListGroup.Item>
            })}
        </ListGroup>
    );
}

export default TransOverviewTabs;