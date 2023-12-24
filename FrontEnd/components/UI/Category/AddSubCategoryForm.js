import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Col, Row } from "react-bootstrap";
import FormControl from "@mui/material/FormControl";
import { Select } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { axiosJWT } from "@/configs/axios";
import { categoryActions } from "@/features/category/categorySlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import {useState} from "react";
import SnackBar from "@/components/shares/SnackBar";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function SubCateAddDiolog() {
  const [open, setOpen] = React.useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackbar, setSnackbar] = useState({
    severity: "",
    message: ""
  })
  const dispatch = useDispatch();
  const myCates = useSelector((state) => state.category.categories);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const formik = useFormik({
    initialValues: {
      cateId: "",
      name: "",
    },
    validationSchema: Yup.object({
      cateId: Yup.string().required("Required"),
      name: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      axiosJWT
        .post("/transaction-subcategory", values)
        .then(async (res) => {
          setSnackbar({
            severity: "success",
            message: res.data.message
          })
          setOpenSnackBar(true);
          handleClose();
          axiosJWT.get("/transaction-category").then((res) => {
            dispatch(categoryActions.getCates(res.data));
            handleClose();
          });
        })
        .catch((err) => {
          setSnackbar({
            severity: "error",
            message: err.response.data.message
          });
          setOpenSnackBar(true);
        });
    },
  });
  return (
    <form>
      <Button variant="contained" color="success" onClick={handleClickOpen}>
        ADD SUBCATEGORY
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Add SubCategory
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Row>
            <Col>
              <Box sx={{ minWidth: 120, marginTop: "10px" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Cate</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Cate"
                    name="cateId"
                    {...formik.getFieldProps("cateId")}
                  >
                    {myCates.map((cate) => (
                      <MenuItem value={cate.id}>{cate.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Col>
            <Col>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="name"
                  label="Name"
                  variant="outlined"
                  name="name"
                  type="text"
                  onChange={formik.handleChange}
                />
                {formik.errors.name && formik.touched.name && (
                  <p style={{ color: "red" }}>{formik.errors.name}</p>
                )}
              </Box>
            </Col>
          </Row>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ marginRight: "12px" }}
            variant="contained"
            color="success"
            type="submit"
            onClick={formik.handleSubmit}
          >
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
      <SnackBar open={openSnackBar} setOpen={setOpenSnackBar} severity={snackbar.severity} message={snackbar.message} />
    </form>
  );
}
