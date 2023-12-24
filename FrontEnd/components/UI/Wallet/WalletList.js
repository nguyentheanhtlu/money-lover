import Card from 'react-bootstrap/Card';
import { useSelector, useDispatch } from 'react-redux';
import WalletService from '@/services/wallet.service';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AdjustBalanceDialog from './AdjustBalanceDialog';
import WalletDetailCard from './WalletDetailCard';
import WalletEditDialog from './WalletEditDialog';
import WalletDeleteDialog from './WalletDeleteDialog';

function ListItems({ data, setShowDetail, setSelectedWallet, include }) {

    const selectWallet = walletId => {
        let wallet = data.filter(item => item.id == walletId)[0];
        setSelectedWallet(wallet);
        setShowDetail(true);
    }

    useEffect(() => {
    }, [data])

    return (
        <Table bordered hover className="mb-0">
            <tbody>
                {
                    data.length ?
                        data.map(item =>
                            // <tr>
                            <tr>
                                <td key={item.id} className="ps-3" onClick={() => selectWallet(item.id)}>
                                    <Row>
                                        <Col xs={1} className="d-flex align-items-center me-3">
                                            <img src="https://static.moneylover.me/img/icon/icon.png" alt="" style={{ height: "40px" }} />
                                        </Col>
                                        <Col xs={8}>
                                            <p className="mb-0 fw-bolder text-bottom">{item.name}</p>
                                            <span className="text-secondary" style={{ ["font-size"]: "13px" }}>
                                                {WalletService.formatMoney(item.balance)}
                                            </span>
                                        </Col>
                                    </Row>
                                </td>
                            </tr>
                        )
                        :
                        <tr>
                            <td className="text-secondary ps-4">No wallets</td>
                        </tr>
                }
            </tbody>
        </Table>
    )
}

export default function WalletLists() {
    const wallets = useSelector(state => state.wallet.wallets);
    let walletsIncludeTotal = wallets.filter(item => item.includeTotal == true);
    let walletsNotIncludeTotal = wallets.filter(item => item.includeTotal == false);
    const [showDetail, setShowDetail] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showBalance, setShowBalance] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedWallet, setSelectedWallet] = useState({});

    useEffect(() => {
        walletsIncludeTotal = wallets.filter(item => item.includeTotal == true);
        walletsNotIncludeTotal = wallets.filter(item => item.includeTotal == false);
    }, [wallets])

    return (
        <Row className="mt-5 pt-5 d-flex justify-content-center" style={{ "min-width": "80%" }}>
            <Col xs={5}>
                <Card style={{ width: '100%' }}>
                    <Card.Header className="ps-4">Included In Total</Card.Header>
                    <ListItems
                        data={walletsIncludeTotal}
                        showDetail={showDetail}
                        setShowDetail={setShowDetail}
                        selectedWallet={selectedWallet}
                        setSelectedWallet={setSelectedWallet}
                        include={true}
                    />
                    <Card.Header className="ps-4">Excluded In Total</Card.Header>
                    <ListItems
                        data={walletsNotIncludeTotal}
                        showDetail={showDetail}
                        setShowDetail={setShowDetail}
                        selectedWallet={selectedWallet}
                        setSelectedWallet={setSelectedWallet}
                        include={false}
                    />
                </Card>
            </Col>
            {
                showDetail ?
                    <WalletDetailCard wallet={selectedWallet}
                        showDetail={showDetail}
                        setShowDetail={setShowDetail}
                        setShowEdit={setShowEdit}
                        setShowBalance={setShowBalance}
                        setShowDelete={setShowDelete}
                    />
                    : null
            }

                    <WalletEditDialog wallet={selectedWallet}
                        data={wallets}
                                      show={showEdit}
                        setShow={setShowEdit}
                        setSelectedWallet={setSelectedWallet}
                    />

                    <AdjustBalanceDialog wallet={selectedWallet}
                        data={wallets}
                                         show={showBalance}
                        setShow={setShowBalance}
                        setSelectedWallet={setSelectedWallet}
                    />
                    <WalletDeleteDialog wallet={selectedWallet}
                                        show={showDelete}
                        setShow={setShowDelete}
                        setShowDetail={setShowDetail}
                    />

        </Row>
    );
}