import * as React from 'react';
import {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MaskedTextField from '@/components/shares/MaskedTextField';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import CancelButton from '@/components/shares/CancelButton';
import {Checkbox} from '@mui/material';
import WalletService from '@/services/wallet.service';
import {useDispatch, useSelector} from 'react-redux';
import {walletActions} from '@/features/wallet/walletSlice';
import SnackBar from "@/components/shares/SnackBar";
import {axiosJWT} from "@/configs/axios";
import {transactionActions} from "@/features/transaction/transactionSlice";

const label = {inputProps: {'aria-label': 'Checkbox demo'}};
export default function WalletEditDialog({data, wallet, show, setShow, setSelectedWallet}) {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbar, setSnackbar] = useState({
        severity: "", message: ""
    })
    const dispatch = useDispatch();
    const handleClose = () => setShow(false);
    const [isValidated, setIsValidated] = useState(false);
    const myWallet = useSelector(state => state.wallet.currentWallet)
    const time = useSelector(state => state.time)

    useEffect(() => {
        setValues({
            walletId: wallet.id,
            name: wallet.name,
            initialBalance: wallet.initialBalance,
            includeTotal: wallet.includeTotal,
            active: wallet.active
        })
    }, [wallet])
    const [values, setValues] = useState({
        walletId: wallet.id,
        name: wallet.name,
        initialBalance: wallet.initialBalance,
        includeTotal: wallet.includeTotal,
        active: wallet.active
    });
    const handleChange = event => {
        let selectedWallet = data.filter(item => item.id == wallet.id)[0];
        let newValues = {
            ...values,
            [event.target.name]: event.target.type == "checkbox" ? !values[event.target.name] : event.target.value
        }
        setValues(newValues);
        if (event.target.name == "name") {
            let oldName = wallet.name;
            let newName = event.target.value;
            let nameIsDuplicated = data.filter(item => item.name == newName)[0];
            if (nameIsDuplicated && newName != oldName) {
                return setIsValidated(false);
            }
        }
        for (let key in newValues) {
            if (key != "walletId") {
                if ((key == "name" || key == "initialBalance") && !newValues[key]) {
                    return setIsValidated(false);
                }
                if (newValues[key] != selectedWallet[key]) {
                    return setIsValidated(true);
                }
            }
        }
        setIsValidated(false);
    }
    const handleSubmit = event => {
        event.preventDefault();
        WalletService.updateWallet(values)
            .then((res) => {
                setSnackbar({
                    severity: "success", message: res.data.message
                })
                setOpenSnackbar(true);
                handleClose();
                WalletService.getAllWalletsOfUser()
                    .then(async res => {
                        if (myWallet.id !== 'Total') {
                            if (myWallet.id === wallet.id) {
                                let transactions = (await axiosJWT.get(`/transaction/${wallet.id}`, {
                                    params: {
                                        year: time.name === 'Last Month' || time.name === 'This Month' || time.name === 'Future' ? time.value.format('MM/YYYY').split('/')[1] : time.name.split('/')[1],
                                        month: time.name === 'Last Month' || time.name === 'This Month' || time.name === 'Future' ? time.value.format('MM/YYYY').split('/')[0] : time.name.split('/')[0]
                                    }
                                })).data
                                let selectedWallet = res.data.filter(item => item.id == wallet.id)[0];
                                setSelectedWallet(selectedWallet);
                                dispatch(walletActions.changeCurrentWallet(selectedWallet))
                                dispatch(walletActions.getWallets(res.data));
                                dispatch(transactionActions.getTrans(transactions))
                            } else {
                                let selectedWallet = res.data.filter(item => item.id == wallet.id)[0];
                                setSelectedWallet(selectedWallet);
                                dispatch(walletActions.getWallets(res.data));
                            }
                        } else {
                            let transactions = (await axiosJWT.get('/transaction', {
                                params: {
                                    year: time.name === 'Last Month' || time.name === 'This Month' || time.name === 'Future' ? time.value.format('MM/YYYY').split('/')[1] : time.name.split('/')[1],
                                    month: time.name === 'Last Month' || time.name === 'This Month' || time.name === 'Future' ? time.value.format('MM/YYYY').split('/')[0] : time.name.split('/')[0]
                                }
                            })).data
                            let selectedWallet = res.data.filter(item => item.id == wallet.id)[0];
                            setSelectedWallet(selectedWallet);
                            dispatch(walletActions.getWallets(res.data));
                            dispatch(transactionActions.getTrans(transactions))
                        }
                    })
            }).catch(err => {
            setSnackbar({
                severity: "error", message: err.response.data.message
            });
            setOpenSnackbar(true);
        })
    }
    return (
        <>
        <Dialog onClose={handleClose} open={show}>
        <form onSubmit={handleSubmit}>
            <DialogTitle>Edit Wallet</DialogTitle>
            <hr className="my-0"/>
            <DialogContent>
                <FormControl fullWidth sx={{mb: 3}}>
                    <TextField id="outlined-basic" label="Name" variant="outlined" type="text"
                               name="name"
                               value={values.name}
                               onChange={handleChange}
                    />
                    <span className="text-secondary" style={{"font-size": "12px"}}>Wallet name must be unique</span>
                </FormControl>
                <FormControl fullWidth sx={{mb: 1}}>
                    <MaskedTextField label="Initial Balance" variant="outlined"
                                     name="initialBalance"
                                     value={values.initialBalance}
                                     onChange={handleChange}
                    />
                </FormControl>
                <hr/>
                <div className="mb-3 d-flex align-items-center">
                    <Checkbox {...label} checked={!values.includeTotal} color="success"
                              name="includeTotal"
                              onChange={handleChange}
                    />
                    <div className="d-inline-flex flex-column ms-3">
                        <span>Excluded from Total</span>
                        <span className="text-secondary" style={{"font-size": "12px"}}>
                                Exclude this wallet and its balance in the "Total" mode.
                            </span>
                    </div>
                </div>
                <div className="mb-3 d-flex align-items-center">
                    <Checkbox {...label} checked={!values.active} color="success"
                              name="active"
                              onChange={handleChange}
                    />
                    <div className="d-inline-flex flex-column ms-3">
                        <span>Archived</span>
                        <span className="text-secondary" style={{"font-size": "12px"}}>
                                Freeze this wallet and stop generating bills & recurring transactions.
                            </span>
                    </div>
                </div>
            </DialogContent>
            <DialogActions sx={{mr: 3, my: 1}}>
                <CancelButton onClick={handleClose} text="Cancel"/>
                <Button variant="contained" color="success" type="submit" disabled={!isValidated} sx={{ml: 2}}>
                    Save
                </Button>
            </DialogActions>
        </form>

    </Dialog>
            <SnackBar open={openSnackbar} setOpen={setOpenSnackbar} severity={snackbar.severity}
            message={snackbar.message}/>
            </>
            );
}