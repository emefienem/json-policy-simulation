import React, { useState, useEffect, useRef } from "react";
import JSONEditor from "jsoneditor";
import "jsoneditor/dist/jsoneditor.css";

const PolicyEditor = ({ policy, onSave }) => {
  const [editorContent, setEditorContent] = useState(policy);
  const editorRef = useRef(null);

  useEffect(() => {
    const options = {
      mode: "code",
      onChange: handleChange,
    };

    if (!editorRef.current) {
      editorRef.current = new JSONEditor(
        document.getElementById("jsoneditor"),
        options
      );
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  const handleChange = (content) => {
    setEditorContent(content);
  };

  const handleSave = () => {
    onSave(editorContent);
  };

  return (
    <div>
      <h2>Edit Policy</h2>
      <div id="jsoneditor" style={{ height: "400px" }}></div>
      <button onClick={handleSave}>Save Policy</button>
    </div>
  );
};

export default PolicyEditor;
