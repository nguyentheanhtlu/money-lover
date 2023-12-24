import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CancelButton from '@/components/shares/CancelButton';
import WalletService from '@/services/wallet.service';
import { useDispatch, useSelector } from 'react-redux';
import { walletActions } from '@/features/wallet/walletSlice';
import SnackBar from "@/components/shares/SnackBar";
import {useState} from "react";
import * as React from "react";

export default function WalletDeleteDialog({ wallet, setShow, setShowDetail, show }) {

    const dispatch = useDispatch();

    const currentWallet = useSelector(state => state.wallet.currentWallet);


    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbar, setSnackbar] = useState({
        severity: "", message: ""
    })

    const handleClose = () => setShow(false);

    const handleDelete = async () => {
        dispatch(walletActions.resetWallet());
        try {
            let res = await WalletService.deleteWallet(wallet.id);
            let wallets = (await WalletService.getAllWalletsOfUser()).data;
            dispatch(walletActions.getWallets(wallets));
            setSnackbar({
                severity: "success", message: res.data.message
            })
            setOpenSnackbar(true);
        }
        catch(err) {
            setSnackbar({
                severity: "error", message: err.response.data.message
            });
            setOpenSnackbar(true);
        }
        handleClose();
        setShowDetail(false);
    }

    return (
        <>
        <Dialog onClose={handleClose} open={show}>
            <DialogTitle>Do you want to delete {wallet.name} ?</DialogTitle>
            <hr className="my-0" />
            <DialogContent>
                You will also delete all of its transactions, budgets, events, bills and this action cannot be undone.
            </DialogContent>
            <DialogActions sx={{ mr: 3, my: 1 }}>
                <CancelButton onClick={handleClose} text="Cancel" />
                <Button variant="contained" color="error" onClick={handleDelete} sx={{ ml: 2 }}>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
            <SnackBar open={openSnackbar} setOpen={setOpenSnackbar} severity={snackbar.severity}
                      message={snackbar.message}/>
            </>
    );
}