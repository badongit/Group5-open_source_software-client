import React, { useState } from "react";
import PropTypes from "prop-types";
import { useAuthenticatedSocket } from "@socket/hook";

UploadAvatar.propTypes = {
  type: PropTypes.string,
};

UploadAvatar.defaultProps = {
  type: "",
};

export function UploadAvatar(props) {
  const { type } = props;
  const [fileUpload, setFileUpload] = useState(null);
  const { socketService } = useAuthenticatedSocket();

  const onChange = (event) => {
    console.log(event.target.files[0]);
    console.log(event.target.files[0].arrayBuffer());
    console.log(event.target.files[0].stream());
    setFileUpload(event.target.files[0]);
  };

  const onSubmit = () => {
    if (socketService) {
      socketService.clientSendFile({
        file: fileUpload,
        metadata: { type: fileUpload.type, size: fileUpload.size },
      });
    }
  };

  const onUploadFile = () => {
    if (!fileUpload) {
      return;
    }

    const formUpload = new FormData();
    formUpload.append(type, fileUpload);

    onSubmit(formUpload);
  };

  return (
    <div className={`upload-avatar`}>
      <div className="upload-avatar__background"></div>

      <div className="upload-avatar__modal__button">
        <input
          className="input-upload"
          id="input-upload"
          type="file"
          onChange={onChange}
        />

        <button variant="contained" color="primary" onClick={onSubmit}>
          submit
        </button>
      </div>
    </div>
  );
}
