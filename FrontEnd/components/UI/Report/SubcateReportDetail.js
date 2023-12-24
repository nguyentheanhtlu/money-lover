import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Dialog, DialogContent, DialogTitle} from "@mui/material";
import {useEffect, useState} from "react";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import moment from 'moment';
import styles from '../../../styles/Report.module.css'
import CloseIcon from '@mui/icons-material/Close';
import MyBarChart from "@/components/shares/BarChart";
import {useSelector} from "react-redux";

export default function SubcateReportDetail(props) {

    const reportTime = useSelector(state => state.reportTime)

    const myWallet = useSelector(state => state.wallet.currentWallet)


    //

    let myNumberData = []

    console.log(props.days)
    console.log(props.subCate)
    console.log(moment("Wed Feb 15").format('DD/MM/YYYY'))

    if (props.subCate !== '') {
        for (let i = 0; i < props.days.length; i++) {
            for (let j = 0; j < props.subCate.trans.length; j++) {
                if (reportTime.name !== 'Custom') {
                    if (props.days[i] === moment(props.subCate.trans[j].date).get('date')) {
                        myNumberData.push(props.subCate.trans[j].sum)
                        break
                    }
                    if (props.days[i] !== moment(props.subCate.trans[j].date).get('date') && j === props.subCate.trans.length-1) {
                        myNumberData.push(0)
                    }
                } else {
                    if (props.days[i] === moment(props.subCate.trans[j].transOfDate[0].date).format('DD-MM-YYYY')) {
                        myNumberData.push(props.subCate.trans[j].sum)
                        break
                    }
                    if (props.days[i] !== moment(props.subCate.trans[j].transOfDate[0].date).format('DD-MM-YYYY') && j === props.subCate.trans.length-1) {
                        myNumberData.push(0)
                    }
                }
            }
        }
    }

    console.log(myNumberData)

    //

    const [dateDetail, setDateDetail] = useState('')

    const [open, setOpen] = useState(false)

    const handleCloseDialog = () => {
        setOpen(false)
        setDateDetail('')
    }

    const handleOpenDialog = (item) => {
        setOpen(true)
        setDateDetail(item)
    }

    const handleClose = () => {
        props.close()
    }

    console.log(props.subCate)

    if (props.subCate !== '') {
        return (
            <div style={{backgroundColor: "white"}}>
                <div style={{display: "flex", alignItems: "center", padding: '16px', borderBottom: '1px solid #ccc'}}>
                    <ArrowBackIcon style={{cursor: "pointer"}} onClick={handleClose} className='me-3'/>
                    <p className='m-0' style={{fontWeight: "bold", fontSize: '16px'}}>{props.subCate.subCate_name}</p>
                </div>
                <div style={{borderBottom: '1px solid #ccc', width: '100%', marginTop: '16px'}}>
                    <MyBarChart for='subCate' data={myNumberData} categories={props.days}/>
                </div>
                <div style={{marginTop: '8px'}}>
                    {props.subCate.trans.map((item, index) => {
                        return (
                            <div className={styles.div} onClick={() => handleOpenDialog(item)} style={{width: '90%', borderBottom: index === props.subCate.trans.length - 1 ? '0' : '1px solid #ccc', marginLeft: "auto", marginRight: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: '8px'}}>
                                <div>{moment(item.date).format('dddd')}, {moment(item.date).format('DD/MM/YYYY')}</div>
                                <div style={{color: item.sum < 0 ? 'red' : 'dodgerblue'}}>
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.sum)}
                                    <KeyboardArrowRightIcon style={{color: '#ccc', marginLeft: '4px'}}/>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <Dialog
                    onClose={handleCloseDialog}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                    fullWidth='sm'
                >
                    <DialogContent className='p-0'>
                        {dateDetail === '' ? <></> :
                            <>
                                <div style={{padding: '20px', borderBottom: '1px solid #ccc', display: "flex", alignItems: "center", fontWeight: "bold", fontSize: '20px'}}>
                                    <CloseIcon style={{cursor: "pointer"}} onClick={handleCloseDialog} className='me-4'/>
                                    {moment(dateDetail.date).format('dddd')}, {moment(dateDetail.date).format('DD/MM/YYYY')}
                                </div>
                                <div>
                                    <div style={{padding: '8px', display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                                        <p className='m-0'>Inflow</p>
                                        <p className='m-0' style={{color: "dodgerblue"}}>{dateDetail.sum < 0 ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(0) : new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(dateDetail.sum)}</p>
                                    </div>
                                    <div style={{padding: '8px', display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                                        <p className='m-0'>Outflow</p>
                                        <p className='m-0' style={{color: "red"}}>{dateDetail.sum > 0 ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(0) : new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(dateDetail.sum)}</p>
                                    </div>
                                </div>
                                <div style={{height: '36px', backgroundColor: '#ccc'}}>
                                </div>
                                <div style={{height: '500px'}}>
                                    <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", padding: '8px'}}>
                                        <div style={{display: "flex", alignItems: "center"}}>
                                            <div style={{fontSize: '40px', marginRight: '12px'}}>{moment(dateDetail.date).format('DD')}</div>
                                            <div style={{lineHeight: '20px'}}>
                                                <p className='m-0' style={{fontWeight: "bold", opacity: 0.7}}>{moment(dateDetail.date).format('dddd')}</p>
                                                <p className='m-0' style={{opacity: 0.7}}>{moment(dateDetail.date).format('MMMM')} {moment(dateDetail.date).format('YYYY')}</p>
                                            </div>
                                        </div>
                                        <div style={{fontWeight: "bold", fontSize: '18px'}}>{dateDetail.sum > 0 ? `+${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(dateDetail.sum)}` : new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(dateDetail.sum)}</div>
                                    </div>
                                    <div>
                                        {dateDetail.transOfDate.map(tran => {
                                            return (
                                                <div style={{padding: '8px', display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: '8px'}}>
                                                    <div>
                                                        <p style={{fontWeight: "bold", marginBottom: 0}}>{tran.subCate_name}</p>
                                                        <p style={{opacity: 0.7, marginBottom: 0}}>{tran.note}</p>
                                                    </div>
                                                    {tran.type_name === 'Expense' ? (
                                                        <div style={{color: 'red'}}>-{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(tran.money)}</div>
                                                    ) : (
                                                        <div style={{color: "dodgerblue"}}>+{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(tran.money)}</div>
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </>
                        }
                    </DialogContent>
                </Dialog>
            </div>
        )
    } else {
        return (
            <></>
        )
    }
}