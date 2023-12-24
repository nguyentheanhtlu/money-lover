import {createSlice} from "@reduxjs/toolkit";
import moment from "moment/moment";

let initialState = {
    name: 'This Month',
    value: `${moment().startOf('month').format('DD/MM/YYYY')} - ${moment().endOf('month').format('DD/MM/YYYY')}`
}

export const reportTimeSlice = createSlice({
    name: 'reportTime',
    initialState: initialState,
    reducers: {
        changeReportTime(state, action) {
            state = action.payload;
            return state
        }
    }
})

export const reportTimeActions = reportTimeSlice.actions;
export default reportTimeSlice;