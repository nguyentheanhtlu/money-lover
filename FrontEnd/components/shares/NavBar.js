import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import { useRouter } from 'next/router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


export default function SimpleAppBar() {
    const router = useRouter();
    let path = router.pathname.charAt(1).toUpperCase() + router.pathname.slice(2);
    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar sx={{ backgroundColor: "white" }}>
                <Toolbar sx={{ mx: 6 }}>
                    <ArrowBackIcon sx={{ color: "gray", mr: 4 }} onClick={() => router.back()} />
                    <Typography variant="h6" component="div"
                        sx={{ color: "black", fontWeight: "medium" }}>
                        {path}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </React.Fragment>
    );
}