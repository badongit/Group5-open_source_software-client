import { CustomDialog } from "@components/custom-dialog/CustomDialog";
import { CameraAlt, Close } from "@mui/icons-material";
import { Box, Button, IconButton } from "@mui/material";
import React, { useState } from "react";

export default function UploadImage(props) {
	const { openModalUpload, setOpenModalUpload, onSubmitFile } = props;
  const [fileUpload, setFileUpload] = useState(null);
  
  const handleChangeFile = (e) => {
    setFileUpload(e.target.files[0]);
  }

  const onUploadFile = () => {
    if (!fileUpload) {
      return;
    }
    let formData = new FormData();
    formData.append('photo', fileUpload);
    onSubmitFile(formData);
    setOpenModalUpload(false);
  }

  return (
    <div className="upload-image">
      <CustomDialog
        open={openModalUpload}
        className="custom-dialog__title"
        title="Update Avatar"
        iconBtn={
          <div className="custom-dialog__title-icon">
            <IconButton onClick={() => setOpenModalUpload(false)}>
              <Close />
            </IconButton>
          </div>
        }
        content={
          <div className="upload-image__main">
            <div className="upload-image__preview">
              <img
                alt=""
                src={fileUpload && URL.createObjectURL(fileUpload)}
              />
              {fileUpload && (
                <p
                  className="upload-image__preview-remove"
                  onClick={() => setFileUpload(null)}
                >
                  <Close sx={{ fontSize: "16px"}} />
                </p>
              )}
              {fileUpload ? (
                ""
              ) : (
                <label htmlFor="input-upload">
                  <div className="upload-image__preview-icon">
                    <CameraAlt sx={{ fontSize: "40px" }} />
                  </div>
                </label>
              )}
            </div>
            <div className="upload-image__btn">
              <input
                accept="image/*"
                className="upload-image__input-upload"
                id="input-upload"
                type="file"
                onChange={handleChangeFile}
              />
            </div>
          </div>
        }
        actions={
          <Box sx={{ margin: "0 auto" }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginLeft: "10px" }}
              onClick={onUploadFile}
              disabled={!fileUpload}
            >
              SAVE
            </Button>
          </Box>
        }
      />
    </div>
  );
}
