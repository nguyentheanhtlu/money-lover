import Grid from "@mui/material/Grid";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useState} from "react";
import {MobileDatePicker} from "@mui/x-date-pickers/MobileDatePicker";
import SnackBar from "@/components/shares/SnackBar";
import {useDispatch, useSelector} from "react-redux";
import {reportTimeActions} from "@/features/reportTime/reportTimeSLice";
import moment from "moment";

export default function CustomTimeForm(props) {

    const reportTime = useSelector(state => state.reportTime)

    const dispatch = useDispatch()

    const [open, setOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({
        severity: "",
        message: ""
    })

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const handleSubmit = () => {
        if (new Date(Date.parse(endDate)) < new Date(Date.parse(startDate))) {
            setSnackbar({
                severity: "error",
                message: "End date can't be before start date"
            })
            setOpen(true);
        }
        if (new Date(Date.parse(endDate)) === new Date(Date.parse(startDate))) {
            setSnackbar({
                severity: "error",
                message: "Ending date must be after starting date"
            })
            setOpen(true);
        }
        if (new Date(Date.parse(endDate)) > new Date(Date.parse(startDate))) {
            dispatch(reportTimeActions.changeReportTime({
                name: 'Custom',
                value: `${moment(new Date(Date.parse(startDate))).format('DD/MM/YYYY')} - ${moment(new Date(Date.parse(endDate))).format('DD/MM/YYYY')}`
            }))
            console.log(moment(new Date(Date.parse(startDate))).format('DD/MM/YYYY'))
            props.closeCustomDialog()
            props.closeTimeDialog()
        }
    }

    return (
        <>
            <div style={{padding: '20px 30px', fontWeight: "bold", fontSize: '18px', borderBottom: '1px solid #ccc'}}>
                Custom
            </div>
            <div style={{padding: '24px 30px 24px', marginBottom: '20px'}}>
                <div style={{marginBottom: '20px'}}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileDatePicker
                            inputFormat="DD/MM/YYYY"
                            label="Starting Date"
                            value={startDate}
                            onChange={(newValue) => {
                                setStartDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                    </LocalizationProvider>
                </div>
                <div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileDatePicker
                            inputFormat="DD/MM/YYYY"
                            label="End Date"
                            value={endDate}
                            onChange={(newValue) => {
                                setEndDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                    </LocalizationProvider>
                </div>
            </div>
            <div style={{float: "right", marginRight: '30px'}}>
                <Button variant="outlined" type="button" className="ms-2 mb-3" onClick={() => {
                    props.closeCustomDialog()
                }}>
                    Cancel
                </Button>
                <Button variant="contained" color="success" type="button" className="ms-2 mb-3" onClick={handleSubmit}>
                    Done
                </Button>
            </div>
            <SnackBar open={open} setOpen={setOpen} severity={snackbar.severity} message={snackbar.message} />
        </>
    )
}