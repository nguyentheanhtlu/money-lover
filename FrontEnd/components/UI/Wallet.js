import NavBar from "@/components/UI/Wallet/NavBar";
import WalletList from "@/components/UI/Wallet/WalletList";

export default function Wallet() {
    return (
        <div className="d-flex justify-content-center bg-secondary bg-opacity-25" style={{ minHeight: "100vh", width: "100vw" }}>
            <NavBar />
            <WalletList />
        </div >
    )
}
