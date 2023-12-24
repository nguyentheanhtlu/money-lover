import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useDispatch, useSelector} from "react-redux";
import {walletActions} from "@/features/wallet/walletSlice";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {axiosJWT} from "@/configs/axios";
import {transactionActions} from "@/features/transaction/transactionSlice";

export default function Wallets() {

    const dispatch = useDispatch()

    //

    const time = useSelector(state => state.time)

    const myWallets = useSelector(state => state.wallet.wallets)
    let balance = 0
    let inflow = 0;
    let outflow = 0;
    myWallets.map(wallet => {
        balance += wallet.balance
        inflow += wallet.inflow
        outflow += wallet.outflow
    })
    const totalWallets = {
        id: 'Total',
        name: 'Total',
        inflow: inflow,
        outflow: outflow,
        balance: balance
    }

    //
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const chooseWallet = (wallet) => {
        if (time.name === 'Last Month' || time.name === 'This Month' || time.name === 'Future') {
            axiosJWT.get(`/transaction/${wallet.id}`, {
                params: {
                    year: time.value.format('MM/YYYY').split('/')[1],
                    month: time.value.format('MM/YYYY').split('/')[0]
                }
            })
                .then((res) => {
                    dispatch(walletActions.changeCurrentWallet(wallet))
                    dispatch(transactionActions.getTrans(res.data))
                    setAnchorEl(null);
                })
        } else {
            axiosJWT.get(`/transaction/${wallet.id}`, {
                params: {
                    year: time.name.split('/')[1],
                    month: time.name.split('/')[0]
                }
            })
                .then((res) => {
                    dispatch(walletActions.changeCurrentWallet(wallet))
                    dispatch(transactionActions.getTrans(res.data))
                    setAnchorEl(null);
                })
        }
    };

    const chooseAllWallets = async (wallet) => {
        if (time.name === 'Last Month' || time.name === 'This Month' || time.name === 'Future') {
            let transactions = (await axiosJWT.get('/transaction', {
                params: {
                    year: time.value.format('MM/YYYY').split('/')[1],
                    month: time.value.format('MM/YYYY').split('/')[0]
                }
            })).data
            dispatch(walletActions.changeCurrentWallet(wallet))
            dispatch(transactionActions.getTrans(transactions))
            setAnchorEl(null);
        } else {
            let transactions = (await axiosJWT.get('/transaction', {
                params: {
                    year: time.name.split('/')[1],
                    month: time.name.split('/')[0]
                }
            })).data
            dispatch(walletActions.changeCurrentWallet(wallet))
            dispatch(transactionActions.getTrans(transactions))
            setAnchorEl(null);
        }
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    return (
        <div>
            <ArrowDropDownIcon onClick={handleClick} style={{color: "black"}} />
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => chooseAllWallets(totalWallets)}>
                    <div style={{color: 'black', display: "flex", alignItems: "center"}}>
                        <div>
                            <img style={{width: '40px', marginRight: '8px'}}
                                 src="https://static.moneylover.me/img/icon/ic_category_all.png" alt=""/>
                        </div>
                        <div>
                            <p className='m-0 fw-semibold' style={{fontSize: "13px"}}>{totalWallets.name}</p>
                            <p className='m-0 text-secondary' style={{fontSize: "13px"}}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalWallets.balance)}</p>
                        </div>
                    </div>
                </MenuItem>
                {myWallets.map(wallet => {
                    return <MenuItem onClick={() => chooseWallet(wallet)}>
                        <div style={{color: 'black', display: "flex", alignItems: "center"}}>
                            <div>
                                <img style={{width: '40px', marginRight: '8px'}}
                                     src="https://static.moneylover.me/img/icon/ic_category_all.png" alt=""/>
                            </div>
                            <div>
                                <p className='m-0 fw-semibold' style={{fontSize: "13px"}}>{wallet.name}</p>
                                <p className='m-0 text-secondary' style={{fontSize: "13px"}}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(wallet.balance)}</p>
                            </div>
                        </div>
                    </MenuItem>
                })}
            </Menu>
        </div>
    );
}