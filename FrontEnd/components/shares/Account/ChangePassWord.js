import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import UserService from "@/services/user.service";
import InputLabel from "@mui/material/InputLabel";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { InputAdornment, OutlinedInput } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import Snackbar from "@mui/material/Snackbar";
import { useEffect, useState } from "react";
import MuiAlert from "@mui/material/Alert";
import CancelButton from "@/components/shares/CancelButton";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function DialogChangePassWord() {
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [open, setOpen] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const [confirmMessage, setConfirmMessage] = useState({
    status: "",
    visible: false,
    message: "",
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: (values, actions) => {
      let data = {
        oldPassword: values.oldPassword,
        newPassword: values.confirmPassword,
      };
      let result = checkConfirmPassword();
      if (result === true) {
        UserService.changePassword(data)
          .then(() => {
            setOpenSnackBar(true);
            handleClose();
          })
          .catch((err) => {
            setConfirmMessage({
              status: "danger",
              visible: true,
              message: err.response.data.message,
            });
          });
      }
      actions.resetForm();
    },
  });

  const handleClickShowPassword = (name) => {
    setShowPassword({
      ...showPassword,
      [name]: !showPassword[name],
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setConfirmMessage({
      status: "",
      visible: false,
      message: "",
    });
    setOpen(false);
  };

  const checkConfirmPassword = () => {
    let passwordMatch =
      formik.values.newPassword !== formik.values.confirmPassword;
    let passwordInserted =
      formik.values.newPassword !== "" || formik.values.confirmPassword !== "";
    if (passwordMatch && passwordInserted) {
      setConfirmMessage({
        status: "danger",
        visible: true,
        message: "Password not matches",
      });
      return false;
    } else {
      setConfirmMessage({
        status: "",
        visible: false,
        message: "",
      });

      return true;
    }
  };
  return (
    <>
      <Snackbar severity="success" open={openSnackBar} autoHideDuration={2000}>
        <Alert
          onClose={() => {
            setOpenSnackBar(false);
          }}
          severity="success"
          sx={{ width: "100%" }}
        >
          Change password success
        </Alert>
      </Snackbar>
      <Button color="success" onClick={handleClickOpen}>
        <b>Change Password</b>
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form>
          <DialogTitle id="alert-dialog-title">{"Change PassWord"}</DialogTitle>
          <DialogContent>
            <FormControl variant="outlined" className="w-100 pb-3 mt-3">
              <InputLabel htmlFor="outlined-adornment-old-password">
                Password Old
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-old-password"
                type={showPassword.oldPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleClickShowPassword("oldPassword")}
                      edge="end"
                    >
                      {showPassword.oldPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password Old"
                name="oldPassword"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.oldPassword &&
                  Boolean(formik.errors.oldPassword)
                }
              />
            </FormControl>
            <FormControl variant="outlined" className="w-100 pb-3 mt-3">
              <InputLabel htmlFor="outlined-adornment-new-password">
                Password New
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-new-password"
                type={showPassword.newPassword ? "text" : "password"}
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.newPassword &&
                  Boolean(formik.errors.newPassword)
                }
                name="newPassword"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleClickShowPassword("newPassword")}
                      edge="end"
                    >
                      {showPassword.newPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password New"
              />
            </FormControl>
            <FormControl variant="outlined" className="w-100 pb-3 mt-3">
              <InputLabel htmlFor="outlined-adornment-password-confirm">
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-confirm"
                type={showPassword.confirmPassword ? "text" : "password"}
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                name="confirmPassword"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleClickShowPassword("confirmPassword")}
                      edge="end"
                    >
                      {showPassword.confirmPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm PassWord"
              />
            </FormControl>
            <span
              style={{ color: "red" }}
              className={`text-{confirmMessage.status} d-${
                confirmMessage.visible ? "block" : "none"
              }`}
            >
              {confirmMessage.message}
            </span>
          </DialogContent>
          <DialogActions>
            <CancelButton onClick={handleClose} text={"Cancel"} />
            <Button type="submit"
                    variant="contained"
                    color="success"
                    onClick={formik.handleSubmit}>
              <b>Save</b>
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
