import * as React from 'react';
import Card from "react-bootstrap/Card";
import CloseIcon from '@mui/icons-material/Close';
import styles from "@/styles/TransOverview.module.css";
import Button from "@mui/material/Button";
import { DialogContentText, Slide } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { axiosJWT } from "@/configs/axios";
import { walletActions } from "@/features/wallet/walletSlice";
import { transactionActions } from "@/features/transaction/transactionSlice";
import { useDispatch, useSelector } from "react-redux";
import EditTransactionForm from "@/components/UI/DashBoard/EditTransaction/EditTransactionForm";
import SnackBar from "@/components/shares/SnackBar";
import CancelButton from '@/components/shares/CancelButton';
import { useState } from "react";

export default function TranDetail(props) {

    const time = useSelector(state => state.time)

    const myCurrentTransaction = useSelector(state => state.transaction.currentTransaction)

    const [open, setOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({
        severity: "",
        message: ""
    })

    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const myWallet = useSelector(state => state.wallet.currentWallet)

    const dispatch = useDispatch()

    const handleOver = (event) => {
        event.target.classList.add(styles.changePointer)
    }

    const handleDelete = async () => {
        // Gọi api xóa
        axiosJWT.delete(`/transaction/${myCurrentTransaction.id}`)
            .then(async res => {
                if (myWallet.id === myCurrentTransaction.wallet_id) {
                    let wallet = (await axiosJWT.get(`/wallet/info/${myCurrentTransaction.wallet_id}`)).data
                    let transactions = (await axiosJWT.get(`/transaction/${myCurrentTransaction.wallet_id}`, {
                        params: {
                            year: time.name === 'Last Month' || time.name === 'This Month' || time.name === 'Future' ? time.value.format('MM/YYYY').split('/')[1] : time.name.split('/')[1],
                            month: time.name === 'Last Month' || time.name === 'This Month' || time.name === 'Future' ? time.value.format('MM/YYYY').split('/')[0] : time.name.split('/')[0]
                        }
                    })).data
                    dispatch(walletActions.changeCurrentWallet(wallet))
                    dispatch(transactionActions.getTrans(transactions))
                    dispatch(walletActions.changeWallets({
                        walletInfo: wallet,
                        walletId: myCurrentTransaction.wallet_id
                    }))
                } else {
                    let wallet = (await axiosJWT.get(`/wallet/info/${myCurrentTransaction.wallet_id}`)).data
                    let transactions = (await axiosJWT.get('/transaction', {
                        params: {
                            year: time.name === 'Last Month' || time.name === 'This Month' || time.name === 'Future' ? time.value.format('MM/YYYY').split('/')[1] : time.name.split('/')[1],
                            month: time.name === 'Last Month' || time.name === 'This Month' || time.name === 'Future' ? time.value.format('MM/YYYY').split('/')[0] : time.name.split('/')[0]
                        }
                    })).data
                    dispatch(walletActions.changeWallets({
                        walletInfo: wallet,
                        walletId: myCurrentTransaction.wallet_id
                    }))
                    dispatch(transactionActions.getTrans(transactions))
                    dispatch(walletActions.resetCurrentWallet())
                }
                setSnackbar({
                    severity: "success",
                    message: res.data.message
                })
                setOpen(true);
                setOpenDeleteDialog(false)
                props.close()
            })
    }

    const myHandleCLose = () => {
        props.close()
    }

    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
    const [openEditDialog, setOpenEditDialog] = React.useState(false);

    const handleClickOpenDeleteDialog = () => {
        setOpenDeleteDialog(true);
    };

    const handleClickOpenEditDialog = () => {
        setOpenEditDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
    };

    return (
        <Card style={{ marginTop: '20px', marginRight: "auto", marginLeft: "auto" }}>
            <Card.Header>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <CloseIcon className='ms-2' onClick={myHandleCLose} onMouseOver={(event) => handleOver(event)} />
                        <p className='m-0 ms-3' style={{ fontWeight: "bold", fontSize: '16px' }}>Transaction Details</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <Button style={{ color: 'red' }} onClick={handleClickOpenDeleteDialog}>Delete</Button>
                        <Button style={{ color: 'green' }} onClick={handleClickOpenEditDialog}>Edit</Button>
                    </div>
                </div>
            </Card.Header>
            <Card.Body>
                <div className='ms-5'>
                    <p style={{ fontSize: '20px' }}>{myCurrentTransaction.subCate_name}</p>
                    <p>{myCurrentTransaction.wallet_name}</p>
                    <p style={{ opacity: 0.7 }}>{weekday[new Date(myCurrentTransaction.date).getDay()]}, {new Date(myCurrentTransaction.date).toLocaleDateString('en-GB')}</p>
                    <hr style={{ width: '200px' }} />
                    <p>{myCurrentTransaction.note}</p>
                    {myCurrentTransaction.type_name === 'Expense' ? (
                        <p style={{ color: 'red', fontSize: '36px' }}>-{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(myCurrentTransaction.money)}</p>
                    ) : (
                        <p style={{ color: "dodgerblue", fontSize: '36px' }}>+{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(myCurrentTransaction.money)}</p>
                    )}
                </div>
            </Card.Body>

            {/*Delete Dialog*/}
            <Dialog
                fullWidth='sm'
                open={openDeleteDialog}
                keepMounted
                onClose={handleCloseDeleteDialog}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Confirm deletion"}</DialogTitle>
                <hr className="my-0" />
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Delete this transaction?
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{my: 1, pr: 2}}>
                    <CancelButton onClick={handleCloseDeleteDialog} text="No" />
                    <Button onClick={handleDelete} variant="contained" color="error">Yes</Button>
                </DialogActions>
            </Dialog>

            {/*Edit Dialog*/}
            <Dialog open={openEditDialog} onClose={handleCloseEditDialog} fullWidth='sm' maxWidth="sm">
                <DialogTitle>Edit Transaction</DialogTitle>
                <hr className="my-0" />
                <EditTransactionForm close={handleCloseEditDialog} />
            </Dialog>
            <SnackBar open={open} setOpen={setOpen} severity={snackbar.severity} message={snackbar.message} />
        </Card>
    )
}