import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";

export function CustomDialog({ title, open, content, actions, iconBtn, className, customClassNameDialog }) {
  return (
    <Dialog
      open={open}
      PaperProps={{
        style: {
          padding: "10px",
        },
      }}
      className={customClassNameDialog}
    >
      <DialogTitle
        sx={{ borderBottom: "1px solid #cccccc" }}
        className={className ? className : ""}
      >
        <Typography
          sx={{ fontWeight: 600, textAlign: "center", fontSize: "20px" }}
        >
          {title}
        </Typography>
        {iconBtn ? iconBtn : ""}
      </DialogTitle>
      <DialogContent
        sx={{ borderBottom: "1px solid #cccccc", margin: "10px 0" }}
      >
        {content}
      </DialogContent>
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  );
}
