import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import WestIcon from "@mui/icons-material/West";
import { useRouter } from "next/router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import WalletAddDiolog from "@/components/UI/Wallet/WalletAddDiolog";

export default function SimpleAppBar() {
  const router = useRouter();
  let path = router.pathname.charAt(1).toUpperCase() + router.pathname.slice(2);
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar sx={{ backgroundColor: "white" }}>
        <Toolbar style={{ justifyContent: "space-between" }} sx={{ mx: 6 }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <ArrowBackIcon
              sx={{ color: "gray", mr: 4 }}
              onClick={() => router.back()}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{ color: "black", fontWeight: "medium" }}
            >
              {path}
            </Typography>
          </div>
          <div>
            <WalletAddDiolog variant="contained" color="success">
              ADD WALLET
            </WalletAddDiolog>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}
