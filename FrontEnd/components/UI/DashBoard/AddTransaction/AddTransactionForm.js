import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import MaskedTextField from '@/components/shares/MaskedTextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {axiosJWT} from "@/configs/axios";
import {MobileDatePicker} from "@mui/x-date-pickers/MobileDatePicker";
import Button from "@mui/material/Button";
import {useFormik} from "formik";
import * as Yup from "yup";
import { transactionActions } from "@/features/transaction/transactionSlice";
import SnackBar from "@/components/shares/SnackBar";
import {walletActions} from "@/features/wallet/walletSlice";
import CancelButton from "@/components/shares/CancelButton";

export default function AddTransactionForm({ handleClose, data }) {
    const time = useSelector(state => state.time)
    const [open, setOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({
        severity: "",
        message: ""
    })

    const dispatch = useDispatch()

    const myWallet = useSelector(state => state.wallet.currentWallet)
    const myWallets = useSelector(state => state.wallet.wallets)

    const formik = useFormik({
        initialValues: {
            walletId: myWallet.name === 'Total' || myWallet.name === '' ? '' : myWallet.id,
            subcategoryId: '',
            money: '',
            date: new Date(),
            note: ''
        },
        validationSchema: Yup.object({
            walletId: Yup.number().required("Required"),
            money: Yup.number().required("Required"),
            note: Yup.string().nullable()
        }),
        onSubmit: values => {
            // let date = new Date(values.date)
            // date.setDate(date.getDate() + 1)
            // values.date = date
            console.log(values.date)
            let payload = {
                date: values.date,
                money: values.money,
                note: values.note,
                walletId: values.walletId,
                subcategoryId: +values.subcategoryId.split(' ')[1]
            }
            axiosJWT.post('/transaction', payload)
                .then(async res => {
                    if (values.walletId === myWallet.id) {
                        let wallet = (await axiosJWT.get(`/wallet/info/${myWallet.id}`)).data
                        let transactions = (await axiosJWT.get(`/transaction/${myWallet.id}`, {
                            params: {
                                year: time.name === 'Last Month' || time.name === 'This Month' || time.name === 'Future' ? time.value.format('MM/YYYY').split('/')[1] : time.name.split('/')[1],
                                month: time.name === 'Last Month' || time.name === 'This Month' || time.name === 'Future' ? time.value.format('MM/YYYY').split('/')[0] : time.name.split('/')[0]
                            }
                        })).data
                        dispatch(walletActions.changeCurrentWallet(wallet))
                        dispatch(transactionActions.getTrans(transactions))
                        dispatch(walletActions.changeWallets({
                            walletInfo: wallet,
                            walletId: myWallet.id,
                        }))
                    } else if (myWallet.id === 'Total') {
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
                    } else {
                        let wallet = (await axiosJWT.get(`/wallet/info/${values.walletId}`)).data
                        dispatch(walletActions.changeWallets({
                            walletInfo: wallet,
                            walletId: values.walletId
                        }))
                    }
                    setSnackbar({
                        severity: "success",
                        message: res.data.message
                    })
                    setOpen(true);
                    handleClose();

                })
                .catch(err => {
                    setSnackbar({
                        severity: "error",
                        message: err.response.data.message
                    });
                    setOpen(true);
                })
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <InputLabel id="select-wallet-label">Wallet</InputLabel>
                        <Select
                            labelId="select-wallet-label"
                            id="select-wallet"
                            label="Wallet"
                            name="walletId"
                            {...formik.getFieldProps('walletId')}
                        >
                            {
                                myWallets.map(item =>
                                    <MenuItem value={item.id}>{item.name}</MenuItem>
                                )
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="grouped-native-select">Category</InputLabel>
                        <Select native defaultValue="" id="grouped-native-select" label="Category" name='subcategoryId' {...formik.getFieldProps('subcategoryId')}>
                            <option aria-label="None" value="" />
                            {data.transCates.map(transCates => {
                                return (
                                    <>
                                        <optgroup label={transCates.name}>
                                            {transCates.subCategories.map(subCategory => {
                                                return (
                                                    <option value={`${data.name} ${subCategory.id} ${subCategory.name}`}>{subCategory.name}</option>
                                                )
                                            })}
                                        </optgroup>
                                    </>
                                )
                            }
                            )}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <MaskedTextField label="Amount" variant="outlined" name="money" fullWidth="true"
                        {...formik.getFieldProps('money')}
                    />
                </Grid>
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
                                <TextField {...params} fullWidth />
                            }
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={8}>
                    <TextField id="outlined-basic" label="Note" variant="outlined" fullWidth
                        name="note" {...formik.getFieldProps('note')}
                    />
                </Grid>
                <Grid item xs={8} />
                <Grid item xs={4}>
                    <CancelButton onClick={handleClose} text={"Cancel"} />
                    <Button variant="contained" color="success" type="submit" className="ms-2">
                        Save
                    </Button>
                </Grid>
            </Grid>
            <SnackBar open={open} setOpen={setOpen} severity={snackbar.severity} message={snackbar.message} />
        </form>
    )
}