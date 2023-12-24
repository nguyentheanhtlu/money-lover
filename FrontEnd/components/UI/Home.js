import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { BsCalendarDay } from "react-icons/bs";
import { RiFindReplaceLine } from "react-icons/ri";
import { Row } from "react-bootstrap";
import TransOverview from "@/components/UI/DashBoard/TransOverview";
import Container from "react-bootstrap/Container";
import { useSelector } from "react-redux";
import { FaWallet } from "react-icons/fa";
import { TbReportMoney } from "react-icons/tb";
import Link from "next/link";
import { GiWallet } from "react-icons/gi";
import AddTransactionModal from "@/components/UI/Dashboard/AddTransaction/AddTransactionModal";
import Wallets from "@/components/UI/DashBoard/WalletsList";
import AccountUser from "@/components/shares/Account/Account";
import { BiCategory } from "react-icons/bi";

const drawerWidth = 240;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});
const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1), //necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
export default function MyHome() {
  const myWallet = useSelector((state) => state.wallet.currentWallet);
  const myWallets = useSelector((state) => state.wallet.wallets);

  let balance = 0;
  let inflow = 0;
  let outflow = 0;
  myWallets.map((wallet) => {
    balance += wallet.balance;
    inflow += wallet.inflow;
    outflow += wallet.outflow;
  });

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const ListItemButtonStyle = {
    minHeight: 48,
    justifyContent: open ? "initial" : "center",
    px: 2.5
  }

  const ListItemIconStyle = {
    minWidth: 0,
    mr: open ? 3 : "auto",
    justifyContent: "center"
  }

  const IconSize = { fontSize: "25px" }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar sx={{ backgroundColor: "white" }} position="fixed" open={open}>
        <Toolbar fullWidth>
          <div className="d-flex align-items-center col-6">
            <IconButton
              color="gray"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>

            <div
              style={{ color: "black", display: "flex", alignItems: "center" }}
            >
              <div
                style={{
                  color: "black",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div>
                  <img
                    style={{ width: "45px", marginRight: "8px" }}
                    src="https://static.moneylover.me/img/icon/ic_category_all.png"
                    alt=""
                  />
                </div>
                <div>
                  <p className="m-0 fw-semibold" style={{fontSize: "14px"}}>
                    {myWallet.name === "" ? "Total" : myWallet.name}
                  </p>
                  <p className="m-0" style={{fontSize: "14px"}}>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(
                      myWallet.balance === "" ? balance : myWallet.balance
                    )}
                  </p>
                </div>
                <div>
                  <Wallets />
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end align-items-center col-6">
            <BsCalendarDay style={{ color: "gray", width: "25px", height: "25px" , marginRight: "25px"}} />
            <RiFindReplaceLine style={{ color: "gray", width: "25px", height: "25px", marginRight: "25px"}} />
            <AddTransactionModal />
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem key="Transaction" disablePadding sx={{ display: "block" }}>
            <Link style={{ color: "gray" }} href="/home" className="text-decoration-none">
              <ListItemButton sx={ListItemButtonStyle}>
                <ListItemIcon sx={ListItemIconStyle}>
                  <FaWallet style={IconSize} />
                </ListItemIcon>
                <ListItemText primary="Transaction" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem key="Report" disablePadding sx={{ display: "block" }}>
            <Link style={{ color: "gray" }} href="/report" className="text-decoration-none">
              <ListItemButton sx={ListItemButtonStyle}>
                <ListItemIcon sx={ListItemIconStyle}>
                  <TbReportMoney style={IconSize} />
                </ListItemIcon>
                <ListItemText primary="Report" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem key="Account" style={{ color: "gray" }} disablePadding sx={{ display: "block" }}>
              <ListItemButton sx={ListItemButtonStyle}>
                <ListItemIcon sx={ListItemIconStyle}>
                  <AccountUser />
                </ListItemIcon>
                <ListItemText primary="Account" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
          </ListItem>
          <ListItem key="Wallets" disablePadding sx={{ display: "block" }}>
            <Link style={{ color: "gray" }} href="/wallets" className="text-decoration-none">
              <ListItemButton sx={ListItemButtonStyle}>
                <ListItemIcon sx={ListItemIconStyle}>
                  <GiWallet style={IconSize} />
                </ListItemIcon>
                <ListItemText primary="Wallets" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem key="Categories" disablePadding sx={{ display: "block" }}>
            <Link style={{ color: "gray" }} href="/category" className="text-decoration-none">
              <ListItemButton sx={ListItemButtonStyle}>
                <ListItemIcon sx={ListItemIconStyle}>
                  <BiCategory style={IconSize} />
                </ListItemIcon>
                <ListItemText primary="Categories" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </Link>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <Box
        style={{ backgroundColor: "#e4e4e4", minHeight: "1000px" }}
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
      >
        <DrawerHeader />
        <div>
          <Container>
            <Row className="justify-content-md-center">
              <TransOverview />
            </Row>
          </Container>
        </div>
      </Box>
    </Box >
  );
}
