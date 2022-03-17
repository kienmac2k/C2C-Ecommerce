import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
// material
import { styled } from "@mui/material/styles";
import { Card, Stack, Link, Container, Typography } from "@mui/material";
// layouts

// components
import Page from "../../../components/Page";
import SnackBar from "../../../components/SnackBar";
import React from "react";
import SignupForm from "../../../components/authentication/SignUpForm";

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

export default function Signup() {
  const [snackBar, setSnackBar] = useState({
    open: false,
    status: "",
    msg: "",
  });
  const handleCloseSnackBar = () => {
    setSnackBar({ open: false, status: "", msg: "" });
  };
  return (
    <RootStyle title="Signup">
      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h2" gutterBottom>
              Đăng ký
            </Typography>
            <Typography variant="h6" sx={{ color: "text.secondary" }}>
              Điền thông tin của bạn vào mẫu dưới đây.
            </Typography>
          </Stack>
          <SignupForm setSnackBar={setSnackBar} />
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
