import React from 'react';
import { Box, Link, Typography } from "@mui/material";
import {KeyboardDoubleArrowLeft} from '@mui/icons-material';
import ResetPasswordForm from "@components/form/ResetPasswordForm";
import Helmet from "@components/common/Helmet";

export default function ResetPassword() {
  return (
    <Helmet title="Reset password">
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Box component="div" sx={{minWidth: '600px', boxShadow: "rgb(100 100 111 / 20%) 0 7px 29px 0", padding: "30px"}}>
          <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
            Reset password
          </Typography>

          <ResetPasswordForm />

          <Link href="/auth/login" variant="body2">
            <KeyboardDoubleArrowLeft color="inherit" sx={{marginRight: '5px', width:' 14px', height: 'auto'}} />
            Back to login
          </Link>
        </Box>
      </Box>
    </Helmet>
  )
}