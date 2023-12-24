import styles from '../../../styles/Report.module.css'
import dynamic from 'next/dynamic'
import moment from "moment/moment";
import {useSelector} from "react-redux";
import PieChart from "@/components/shares/PieChart";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {Slide, TableContainer} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import ReportDetail from "@/components/UI/Report/ReportDetail";
import SubcateReportDetail from "@/components/UI/Report/SubcateReportDetail";
import MyBarChart from "@/components/shares/BarChart";

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function ReportOverview() {

    const reportTime = useSelector(state => state.reportTime)

    const myWallet = useSelector(state => state.wallet.currentWallet)

    useEffect(() => {
        handleCLoseSubCateRpDetail()
        handleCloseRpDetail()
    }, [myWallet, reportTime])

    let myTrans = useSelector(state => state.transaction.trans)

    let incomeTrans = useSelector(state => state.transaction.incomeTrans)

    let expenseTrans = useSelector(state => state.transaction.expenseTrans)

    console.log(myTrans)

    let balance = 0
    myTrans.map(tran => {
        balance += tran.sum
    })

    let inflowByTime = 0;
    let outflowByTime = 0;
    myTrans.map(tran => {
        if (tran.sum > 0) {
            inflowByTime += tran.sum
        } else {
            outflowByTime += tran.sum
        }
    })

    let myData = []

    const getDaysByMonth = (month) => {
        const daysInMonth = moment(month).daysInMonth();
        return Array.from({length: daysInMonth}, (v, k) => k + 1)
    };

    let month = ''
    if (reportTime.name === 'Today') {
        month = `${reportTime.value.split('/')[2]}-${reportTime.value.split('/')[1]}`
    }
    if (reportTime.name === 'Last Month') {
        month = `${reportTime.value.split(' - ')[0].split('/')[2]}-${reportTime.value.split(' - ')[0].split('/')[1]}`
    }
    if (reportTime.name === 'This Month') {
        month = moment().format('YYYY-MM')
    }

    const days = getDaysByMonth(month)

    for (let i = 0; i < days.length; i++) {
        for (let j = 0; j < myTrans.length; j++) {
            if (days[i] === moment(myTrans[j].date).get('date')) {
                myData.push({
                    date: days[i],
                    balance: myTrans[j].sum
                })
                break
            }
            if (days[i] !== moment(myTrans[j].date).get('date') && j === myTrans.length-1) {
                myData.push({
                    date: days[i],
                    balance: 0
                })
            }
        }
    }

    let myDays = []
    let myNumberData = []

    myData.map(data => {
        myDays.push(data.date)
        myNumberData.push(data.balance)
    })

    if (reportTime.name === 'Custom') {
        myDays = []
        myNumberData = []
        myTrans.map(item => {
            myDays.push(moment(item.date).format('DD-MM-YYYY'))
            myNumberData.push(item.sum)
        })
        myDays = myDays.reverse()
        myNumberData = myNumberData.reverse()
    }

    const containerRef = useRef(null);

    const types = [{
        name: 'Income',
        value: incomeTrans
    }, {
        name: 'Expense',
        value: expenseTrans
    }]

    const [displayRpDetail, setDisplayRpDetail] = useState(false);
    const [widthRpDetail, setWidthRpDetail] = useState(0);
    const [displaySubCateRpDetail, setDisplaySubCateRpDetail] = useState(false);
    const [widthSubCateRpDetail, setWidthSubCateRpDetail] = useState(0);
    const [type, setType] = useState('');
    const [subCate, setSubCate] = useState('');

    const handleOpenRpDetail = (type) => {
        setDisplaySubCateRpDetail(false)
        setWidthSubCateRpDetail(0)
        setSubCate('')
        setDisplayRpDetail(true)
        setWidthRpDetail('100%')
        setType(type)
        window.scrollTo(0, 0)
    }

    const handleCloseRpDetail = () => {
        setDisplayRpDetail(false)
        setWidthRpDetail(0)
        setType('')
    }

    const handleOpenSubCateRpDetail = (item) => {
        setDisplayRpDetail(false)
        setWidthRpDetail(0)
        setDisplaySubCateRpDetail(true)
        setWidthSubCateRpDetail('100%')
        setSubCate(item)
        window.scrollTo(0, 0)
    }

    const handleCLoseSubCateRpDetail = (item) => {
        setDisplaySubCateRpDetail(false)
        setWidthSubCateRpDetail(0)
        setSubCate('')
        setDisplayRpDetail(true)
        setWidthRpDetail('100%')
    }

    return (
        <>
            <TableContainer>
                <Table aria-label="simple table"
                       ref={containerRef}>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <div style={{backgroundColor: "white", width: '600px', height: '1000px' , marginRight: "auto", marginLeft: "auto"}}>
                                    <div style={{borderBottom: '1px solid #ccc'}}>
                                        <div style={{textAlign: "center", opacity: 0.7}}>Net Income</div>
                                        <div style={{textAlign: "center", fontSize: '28px'}}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(balance)}</div>
                                        <div>
                                            <MyBarChart for='all' categories={myDays} data={myNumberData}/>
                                        </div>
                                    </div>
                                    <div style={{marginTop: '12px'}}>
                                        {types.map(type => {
                                            return (
                                                <div style={{display: "inline-block"}} className={styles.div} onClick={() => handleOpenRpDetail(type)}>
                                                    <div style={{textAlign: "center", opacity: 0.7}}>{type.name}</div>
                                                    <div style={{textAlign: "center", color: type.name === 'Income' ? 'dodgerblue' : 'red', fontSize: '20px'}}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(type.name === 'Income' ? inflowByTime : outflowByTime)}</div>
                                                    <div>
                                                        <PieChart data={type.value}/>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </TableCell>
                            <Slide in={displayRpDetail} direction="up" mountOnEnter unmountOnExit container={containerRef.current}>
                                <TableCell style={{ width: widthRpDetail, verticalAlign: "unset"}}>
                                    <ReportDetail type={type} close={handleCloseRpDetail} click={handleOpenSubCateRpDetail}/>
                                </TableCell>
                            </Slide>
                            <Slide in={displaySubCateRpDetail} direction="right" mountOnEnter unmountOnExit container={containerRef.current}>
                                <TableCell style={{ width: widthSubCateRpDetail, verticalAlign: "unset"}}>
                                    <SubcateReportDetail days={myDays} subCate={subCate} close={handleCLoseSubCateRpDetail}/>
                                </TableCell>
                            </Slide>
                        </TableRow>
                    </TableHead>
                </Table>
            </TableContainer>
        </>
    )
}