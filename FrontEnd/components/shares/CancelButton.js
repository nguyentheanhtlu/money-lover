import * as React from 'react';
import Button from '@mui/material/Button';

export default function CancelButton({ onClick, text }) {
    return (
        <Button color="success" variant="text" text="success" onClick={onClick}
            sx={{ bgcolor: "#E4E4E4", ":hover": { bgcolor: "#BDBDBD" } }}>
            {text}
        </Button>
    );
}
