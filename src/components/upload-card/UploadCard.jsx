import React from "react";
import PropTypes from "prop-types";
import { Close, PlayArrow, TextSnippet } from "@mui/icons-material";

function UploadCard(props) {
  const { file, handleRemoveClick } = props;

  const renderImage = () => {
    return <img src={URL.createObjectURL(file)} alt="message" />;
  };

  const renderVideo = () => {
    return (
      <div className="upload-card__video">
        <div className="upload-card__video__play">
          <PlayArrow />
        </div>
        <video src={URL.createObjectURL(file)} />
      </div>
    );
  };

  const renderDocument = () => {
    return (
      <div className="upload-card__document">
        <TextSnippet />
        <div className="upload-card__document__text">{file.name}</div>
      </div>
    );
  };

  const body = file.type.startsWith("image")
    ? renderImage()
    : file.type.startsWith("video")
    ? renderVideo()
    : renderDocument();

  return (
    <div className="upload-card">
      <button onClick={() => handleRemoveClick(file.subId)}>
        <Close fontSize="inherit" />
      </button>
      {body}
    </div>
  );
}

UploadCard.propTypes = {
  file: PropTypes.shape({
    name: PropTypes.string,
    subId: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  handleRemoveClick: PropTypes.func.isRequired,
};

export default UploadCard;
