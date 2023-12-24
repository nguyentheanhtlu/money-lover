import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from '@mui/icons-material/Close';
import moment from "moment/moment";
import styles from '../../../styles/Report.module.css'
import {useDispatch} from "react-redux";
import reportTimeSLice, {reportTimeActions} from "@/features/reportTime/reportTimeSLice";
import CustomTimeForm from "@/components/UI/Report/CustomTimeForm";

export default function TimeList() {

    const dispatch = useDispatch()
    const [openTimeDialog, setOpenTimeDialog] = React.useState(false);
    const [openCustomDialog, setOpenCustomDialog] = React.useState(false);

    const handleClickOpenTimeDialog = () => {
        setOpenTimeDialog(true);
    };
    const handleCloseTimeDialog = () => {
        setOpenTimeDialog(false);
    };

    const handleOpenCustomDialog = () => {
        setOpenCustomDialog(true)
    }

    const handleCloseCustomDialog = () => {
        setOpenCustomDialog(false)
    }

    const handleClick = (time) => {
        dispatch(reportTimeActions.changeReportTime(time))
        handleCloseTimeDialog()
    }

    return (
        <div>
            <ArrowDropDownIcon onClick={handleClickOpenTimeDialog} style={{color: "black"}} />
            <Dialog
                onClose={handleCloseTimeDialog}
                aria-labelledby="customized-dialog-title"
                open={openTimeDialog}
                fullWidth='sm'
            >
                <DialogContent style={{padding: 0}}>
                    <div style={{display: "flex", alignItems: "center", padding: '20px', fontWeight: "bold", fontSize: '20px'}}>
                        <CloseIcon style={{cursor: "pointer"}} onClick={handleCloseTimeDialog} className='me-3'/>
                        Select Time Range
                    </div>
                    <div style={{padding: '15px'}} className={styles.div} onClick={() => handleClick({
                        name: 'Today',
                        value: moment().format('DD/MM/YYYY')
                    })}>
                        <p className='m-0'>Today</p>
                    </div>
                    <div style={{padding: '15px'}} className={styles.div} onClick={() => handleClick({
                        name: 'This Month',
                        value: `${moment().startOf('month').format('DD/MM/YYYY')} - ${moment().endOf('month').format('DD/MM/YYYY')}`
                    })}>
                        <p className='m-0'>This Month</p>
                        <p className='m-0'>{moment().startOf('month').format('DD/MM/YYYY')} - {moment().endOf('month').format('DD/MM/YYYY')}</p>
                    </div>
                    <div style={{padding: '15px'}} className={styles.div} onClick={() => handleClick({
                        name: 'Last Month',
                        value: `${moment().subtract(1, "month").startOf('month').format('DD/MM/YYYY')} - ${moment().subtract(1, "month").endOf('month').format('DD/MM/YYYY')}`
                    })}>
                        <p className='m-0'>Last Month</p>
                        <p className='m-0'>{moment().subtract(1, "month").startOf('month').format('DD/MM/YYYY')} - {moment().subtract(1, "month").endOf('month').format('DD/MM/YYYY')}</p>
                    </div>
                    <div style={{padding: '15px'}} className={styles.div} onClick={handleOpenCustomDialog}>
                        Custom
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog
                onClose={handleCloseCustomDialog}
                aria-labelledby="customized-dialog-title"
                open={openCustomDialog}
                fullWidth='sm'
            >
                <DialogContent style={{padding: 0}}>
                    <CustomTimeForm closeTimeDialog={handleCloseTimeDialog} closeCustomDialog={handleCloseCustomDialog}/>
                </DialogContent>
            </Dialog>
        </div>
    );
}