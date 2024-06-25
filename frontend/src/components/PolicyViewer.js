import React from "react";
import ReactJson from "react-json-view";

const PolicyViewer = ({ policy, onEdit }) => {
  return (
    <div>
      <h2>Policy</h2>
      <ReactJson src={policy} />
      <button onClick={onEdit}>Edit Policy</button>
    </div>
  );
};

export default PolicyViewer;
