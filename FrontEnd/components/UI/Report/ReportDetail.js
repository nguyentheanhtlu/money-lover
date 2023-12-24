import CloseIcon from '@mui/icons-material/Close';
import PieChart from "@/components/shares/PieChart";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import styles from '../../../styles/Report.module.css'
import {useSelector} from "react-redux";
import {useEffect} from "react";

export default function ReportDetail(props) {

    const reportTime = useSelector(state => state.reportTime)

    const myWallet = useSelector(state => state.wallet.currentWallet)


    const handleClose = () => {
        props.close()
    }

    const handleCLick = (item) => {
        props.click(item)
    }

    let number = 0
    if (props.type.value) {
        props.type.value.map(item => {
            number += item.sum
        })
    }

    console.log(props.type.value)

    if (props.type.value) {
        return (
            <>
                <div style={{backgroundColor: "white"}}>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                        <div style={{padding: '12px', display: "flex", alignItems: "center", borderBottom: '1px solid #ccc', width: '100%'}}>
                            <CloseIcon onClick={handleClose} className='me-3' style={{cursor: "pointer"}}/>
                            <p className='m-0' style={{fontSize: '16px', fontWeight: "bold"}}>{props.type.name}</p>
                        </div>
                        <div>
                            {/*Icon*/}
                        </div>
                    </div>
                    <div className='mt-4 pb-3' style={{borderBottom: '1px solid #ccc'}}>
                        <div className='mb-3'>
                            <PieChart data={props.type.value}/>
                        </div>
                        <div style={{color: number < 0 ? 'red' : 'dodgerblue', fontSize: '24px', textAlign: "center"}}>
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number)}
                        </div>
                    </div>
                    <div style={{marginTop: '8px'}}>
                        {props.type.value.map((item, index) => {
                            return (
                                <div className={styles.div} style={{width: '90%', borderBottom: index === props.type.value.length - 1 ? '0' : '1px solid #ccc', marginLeft: "auto", marginRight: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: '8px'}} onClick={() => handleCLick(item)}>
                                    <div>{item.subCate_name}</div>
                                    <div style={{color: item.sum < 0 ? 'red' : 'dodgerblue'}}>
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.sum)}
                                        <KeyboardArrowRightIcon style={{color: '#ccc', marginLeft: '4px'}}/>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <></>
        )
    }
}