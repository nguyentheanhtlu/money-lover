import Grid from "@mui/material/Grid";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import MaskedTextField from "@/components/shares/MaskedTextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import Button from "@mui/material/Button";
import CancelButton from "@/components/shares/CancelButton";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import SnackBar from "@/components/shares/SnackBar";
import { useState } from "react";
import { useFormik } from "formik";
import { axiosJWT } from "@/configs/axios";
import { useDispatch, useSelector } from "react-redux";
import { walletActions } from "@/features/wallet/walletSlice";
import { transactionActions } from "@/features/transaction/transactionSlice";

export default function EditTransactionForm(props) {

    const time = useSelector(state => state.time)

    const myCurrentTransaction = useSelector(state => state.transaction.currentTransaction)

    const dispatch = useDispatch()

    const myWallet = useSelector(state => state.wallet.currentWallet)

    const [open, setOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({
        severity: "",
        message: ""
    })

    const handleClose = () => {
        props.close()
    }

    const formik = useFormik({
        initialValues: {
            walletId: myCurrentTransaction.wallet_name,
            subcategoryId: myCurrentTransaction.subCate_name,
            money: myCurrentTransaction.money,
            date: new Date(myCurrentTransaction.date),
            note: myCurrentTransaction.note
        },
        validationSchema: Yup.object({
            money: Yup.number().required("Required"),
            note: Yup.string().nullable()
        }),
        onSubmit: values => {
            values.walletId = myCurrentTransaction.wallet_id;
            values.subcategoryId = myCurrentTransaction.subCate_id;
            let date = new Date(values.date)
            date.setDate(date.getDate() + 1)
            values.date = date
            axiosJWT.put(`/transaction/${myCurrentTransaction.id}`, values)
                .then(async (res) => {
                    if (myWallet.id === values.walletId) {
                        let wallet = (await axiosJWT.get(`/wallet/info/${values.walletId}`)).data
                        let transactions = (await axiosJWT.get(`/transaction/${values.walletId}`, {
                            params: {
                                year: time.name === 'Last Month' || time.name === 'This Month' || time.name === 'Future' ? time.value.format('MM/YYYY').split('/')[1] : time.name.split('/')[1],
                                month: time.name === 'Last Month' || time.name === 'This Month' || time.name === 'Future' ? time.value.format('MM/YYYY').split('/')[0] : time.name.split('/')[0]
                            }
                        })).data
                        dispatch(walletActions.changeCurrentWallet(wallet))
                        dispatch(transactionActions.getTrans(transactions))
                        dispatch(walletActions.changeWallets({
                            walletInfo: wallet,
                            walletId: values.walletId
                        }))
                    } else {
                        let wallet = (await axiosJWT.get(`/wallet/info/${values.walletId}`)).data
                        let transactions = (await axiosJWT.get('/transaction', {
                            params: {
                                year: time.name === 'Last Month' || time.name === 'This Month' || time.name === 'Future' ? time.value.format('MM/YYYY').split('/')[1] : time.name.split('/')[1],
                                month: time.name === 'Last Month' || time.name === 'This Month' || time.name === 'Future' ? time.value.format('MM/YYYY').split('/')[0] : time.name.split('/')[0]
                            }
                        })).data
                        dispatch(walletActions.changeWallets({
                            walletInfo: wallet,
                            walletId: values.walletId
                        }))
                        dispatch(transactionActions.getTrans(transactions))
                        dispatch(walletActions.resetCurrentWallet())
                    }
                    let date = new Date(values.date)
                    date.setDate(date.getDate() - 1)
                    dispatch(transactionActions.changeCurrentTransaction({
                        subCate_name: myCurrentTransaction.subCate_name,
                        wallet_name: myCurrentTransaction.wallet_name,
                        date: date,
                        note: values.note,
                        type_name: myCurrentTransaction.type_name,
                        money: values.money
                    }))
                    setSnackbar({
                        severity: "success",
                        message: res.data.message
                    })
                    setOpen(true);
                    handleClose()
                })
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <TextField
                            id="outlined-read-only-input"
                            label="Wallet"
                            name='walletId'
                            InputProps={{
                                readOnly: true,
                            }}
                            {...formik.getFieldProps('walletId')}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            id="outlined-read-only-input"
                            label="Category"
                            name='subcategoryId'
                            InputProps={{
                                readOnly: true,
                            }}
                            {...formik.getFieldProps('subcategoryId')}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <MaskedTextField label="Amount" variant="outlined" name="money"
                            {...formik.getFieldProps('money')}
                        />
                    </Grid>
                </Grid>
                <Grid className='mt-1' container spacing={2}>
                    <Grid item xs={4}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <MobileDatePicker
                                label="Date"
                                inputFormat="MM/DD/YYYY"
                                id="date"
                                name="date"
                                value={formik.values.date}
                                onChange={value => {
                                    formik.setFieldValue('date', new Date(Date.parse(value)));
                                }}
                                renderInput={(params) =>
                                    <TextField {...params} />
                                }
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField id="outlined-basic" label="Note" variant="outlined" fullWidth
                            name="note" {...formik.getFieldProps('note')}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{ mb: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={8} />
                    <Grid item xs={4}>
                        <CancelButton onClick={handleClose} text="Cancel" />
                        <Button variant="contained" color="success" type="submit" className="ms-2">
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </DialogActions>
            <SnackBar open={open} setOpen={setOpen} severity={snackbar.severity} message={snackbar.message} />
        </form >
    )
}