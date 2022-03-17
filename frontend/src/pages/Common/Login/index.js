import { useState } from "react";
// material
import { styled } from "@mui/material/styles";
import { Stack, Container, Typography } from "@mui/material";

// layouts

// components
import Page from "../../../components/Page";
import SnackBar from "../../../components/SnackBar";
import LoginForm from "../../../components/authentication/LoginForm";
import React from "react";
// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
  const [snackBar, setSnackBar] = useState({
    open: false,
    status: "success",
    msg: "",
  });
  const handleCloseSnackBar = () => {
    setSnackBar({ open: false, status: "", msg: "" });
  };
  return (
    <RootStyle title="Login">
      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h2" gutterBottom>
              Đăng nhập
            </Typography>
            <Typography variant="h6" sx={{ color: "text.secondary" }}>
              Điền thông tin của bạn vào mẫu dưới đây.
            </Typography>
          </Stack>
          <LoginForm setSnackBar={setSnackBar} />
        </ContentStyle>
      </Container>
      <SnackBar
        open={snackBar.open}
        status={snackBar.status}
        msg={snackBar.msg}
        handleClose={handleCloseSnackBar}
      />
    </RootStyle>
  );
}
