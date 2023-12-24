import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import Link from "next/link";
import styles from "../../../styles/TransOverview.module.css";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {useEffect, useRef, useState} from "react";
import { Slide, TableContainer } from "@mui/material";
import TranDetail from "@/components/UI/DashBoard/TranDetail";
import TransOverviewTabs from "@/components/UI/DashBoard/TransOverviewTabs";
import moment from "moment";
import { transactionActions } from "@/features/transaction/transactionSlice";

const TransOverview = () => {
  const dispatch = useDispatch();
    const time = useSelector(state => state.time)

  // Add Transaction

  const myWallet = useSelector((state) => state.wallet.currentWallet);
  const myTrans = useSelector((state) => state.transaction.trans);
  const myWallets = useSelector((state) => state.wallet.wallets);

    console.log(myTrans)

  let balance = 0;
  let inflow = 0;
  let outflow = 0;
  myWallets.map((wallet) => {
    balance += wallet.balance;
    inflow += wallet.inflow;
    outflow += wallet.outflow;
  });

  //


    let inflowByTime = 0;
    let outflowByTime = 0;
    myTrans.map(trans => {
        trans.transOfDate.map(tran => {
            if (tran.type_name === 'Expense') {
                outflowByTime += tran.money
            } else {
                inflowByTime += tran.money
            }
        })
    })

  //

  // const [tranDetail, setTranDetail] = useState('')
  const [display, setDisplay] = useState(false);
  const [width, setWidth] = useState(0);

  const handleOver = (event) => {
    event.target.classList.add(styles.changePointer);
  };

    const handleClick = (transaction) => {
        console.log(transaction)
        dispatch(transactionActions.changeCurrentTransaction(transaction))
        // setTranDetail(transaction)
        setDisplay(true)
        setWidth('100%')
        window.scrollTo(0, 0)
    }

  const handleClose = () => {
    dispatch(transactionActions.changeCurrentTransaction({}));
    setDisplay(false);
    setWidth(0);
  };

  const containerRef = useRef(null);

  useEffect(() => {
      handleClose()
  }, [myWallet, time])

  //

    return (
        <TableContainer>
            <Table aria-label="simple table"
                   ref={containerRef}>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Card style={{width:'540px', marginRight: "auto", marginLeft: "auto"}}>
                                     <Card.Header className='p-0'>
                                         <TransOverviewTabs/>
                                     </Card.Header>
                                     <Card.Body>
                                         <Container style={{padding:'0px'}}>
                                             <Row style={{padding:'10px'}}>
                                                 <Col>
                                                     <p>Inflow</p>
                                                    <p>Outflow</p>
                                                </Col>
                                                <Col>

                                                    {/*<p style={{color:'dodgerblue',marginLeft:'124px'}}>+ {myWallet.inflow === '' ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(inflow) : new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(myWallet.inflow) }</p>*/}
                                                    {/*<p style={{color:'red',marginLeft:'124px'}}>- {myWallet.outflow === '' ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(outflow) : new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(myWallet.outflow)}</p>*/}
                                                    <p style={{color:'dodgerblue',marginLeft:'124px', width: 'inherit'}}>+ {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(inflowByTime)}</p>
                                                    <p style={{color:'red',marginLeft:'124px', width: "inherit"}}>- {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(outflowByTime)}</p>
                                                    <p>
                                                        <hr style={{width: '120px', marginLeft: '106px'}}/>
                                                    </p>
                                                    {/*<p style={{marginLeft:'134px'}}>{myWallet.balance === '' ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(balance) : new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(myWallet.balance)}</p>*/}
                                                    <p style={{marginLeft:'134px', width: "inherit"}}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(inflowByTime-outflowByTime)}</p>
                                                </Col>
                                                <Link href='#' style={{textAlign:'center',color: '#2db84c',textDecoration:'none'}}>VIEW REPORT FOR THIS PERIOD</Link>
                                            </Row>
                                            <hr/>
                                             {myTrans.length !== 0 ? myTrans.map((item, index) => {
                                                 return (
                                                     <>
                                                         <div>
                                                             <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: '8px'}}>
                                                                 <div style={{display: "flex", alignItems: "center"}}>
                                                                     <div style={{fontSize: '40px', marginRight: '12px'}}>{moment(item.date).format('DD')}</div>
                                                                     <div style={{lineHeight: '20px'}}>
                                                                         <p className='m-0' style={{fontWeight: "bold", opacity: 0.7}}>{moment(item.date).format('dddd')}</p>
                                                                         <p className='m-0' style={{opacity: 0.7}}>{moment(item.date).format('MMMM')} {moment(item.date).format('YYYY')}</p>
                                                                     </div>
                                                                 </div>
                                                                 <div style={{fontWeight: "bold", fontSize: '18px'}}>{item.sum > 0 ? `+${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.sum)}` : new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.sum)}</div>
                                                             </div>
                                                             <div>
                                                                 {item.transOfDate.map(tran => {
                                                                     return (
                                                                         <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: '8px'}} onMouseOver={(event) => handleOver(event)} onClick={() => handleClick(tran)}>
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
                                                         {index !== myTrans.length - 1 && <div style={{height: '24px', backgroundColor: '#f4f4f4', marginBottom: '12px'}}></div>}
                                                     </>
                                                 )

                                             }) : <div style={{textAlign: "center"}}>There is no transactions</div>}

                                        </Container>
                                    </Card.Body>
                                </Card>
                        </TableCell>
                        <Slide in={display} direction="up" mountOnEnter unmountOnExit container={containerRef.current}>
                            <TableCell style={{width: width, verticalAlign: "unset"}}>
                                <TranDetail close={handleClose}/>
                            </TableCell>
                        </Slide>
                    </TableRow>
                </TableHead>
            </Table>
        </TableContainer>
    );
}

export default TransOverview;
