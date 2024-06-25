import React, { useState, useEffect } from "react";
import axios from "axios";
import PolicyEditor from "./components/PolicyEditor";
import PolicyViewer from "./components/PolicyViewer";

function App() {
  const [policyData, setPolicyData] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const response = await axios.get(
          "/http://localhost:5000/api/get-policies",
          { withCredentials: true }
        );
        console.log("Fetched Policy Data:", response.data);
        setPolicyData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPolicy();
  }, []);

  const handleSavePolicy = async (updatedPolicy) => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/update-policies",
        { withCredentials: true },
        updatedPolicy
      );
      console.log("Updated Policy Data:", response.data);
      setPolicyData(response.data);
      setEditMode(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditPolicy = () => {
    setEditMode(true);
  };

  const handleInitializePolicy = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/initialize-policy",
        { withCredentials: true }
      );
      console.log("Initialized Policy Data:", response.data);
      setPolicyData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>JSON Policy Simulator</h1>
      {policyData ? (
        editMode ? (
          <PolicyEditor policy={policyData} onSave={handleSavePolicy} />
        ) : (
          <PolicyViewer policy={policyData} onEdit={handleEditPolicy} />
        )
      ) : (
        <div>
          <p>Loading policy...</p>
          <button onClick={handleInitializePolicy}>
            Initialize Default Policy
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
