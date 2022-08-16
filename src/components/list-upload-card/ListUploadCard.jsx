import React from "react";
import PropTypes from "prop-types";
import UploadCard from "@components/upload-card/UploadCard";
import { NoteAdd } from "@mui/icons-material";

function ListUploadCard(props) {
  const { files, handleRemoveClick, handleChangeFilesInput } = props;

  return (
    <div className="list-upload-card">
      {files.map((file) => (
        <UploadCard file={file} handleRemoveClick={handleRemoveClick} />
      ))}
      <input
        type="file"
        name="add-files"
        id="add-files"
        hidden={true}
        onChange={handleChangeFilesInput}
        multiple
      />
      <label className="list-upload-card__add-files" htmlFor="add-files">
        <NoteAdd />
      </label>
    </div>
  );
}

ListUploadCard.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      subId: PropTypes.string,
      type: PropTypes.string,
    })
  ),
  handleRemoveClick: PropTypes.func,
  handleChangeFilesInput: PropTypes.func,
};

export default ListUploadCard;
