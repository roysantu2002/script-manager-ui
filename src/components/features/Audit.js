import React from 'react';


const audits = [
    {
        "id": 1,
        "action": "Create",
        "scriptName": "Script 1",
        "ipAddress": "192.168.1.1",
        "deviceType": "Router",
        "executionDateTime": "2023-09-05 10:30 AM",
        "executionStatus": "Success",
        "duration": "5 minutes",
        "logOutput": "Script execution completed successfully."
    },
    {
      "id": 2,
      "action": "Edit",
      "scriptName": "Script 2",
      "ipAddress": "10.0.0.2",
      "deviceType": "Switch",
      "deviceName": "Device B",
      "executionDateTime": "2023-09-04 2:45 PM",
      "executionStatus": "Failed",
      "duration": "2 minutes",
      "logOutput": "Script encountered an error and failed."
    },
    {
      "id": 3,
      "action": "Delete",
      "scriptName": "Script 3",
      "deviceName": "Device C",
      "ipAddress": "10.0.0.4",
      "deviceType": "VM",
      "executionDateTime": "2023-09-03 8:15 AM",
      "executionStatus": "In Progress",
      "duration": "Running",
      "logOutput": "Script is currently running."
    },
    {
      "id": 4,
      "action": "Approve",
      "scriptName": "Script 4",
      "deviceName": "Device D",
      "ipAddress": "10.0.0.6",
      "deviceType": "Linux Box",
      "executionDateTime": "2023-09-02 1:00 PM",
      "executionStatus": "Pending",
      "duration": "Pending",
      "logOutput": "Approval pending."
    }
  ]

const Audit = () => {
  return (
    <div className="container">

    <div className="row">
      {audits.map((audit) => (
        <div className="col-md-4 mb-3" key={audit.id}>
          <div className={`card`}>
            <div className="card-body">
              <h5 className="card-title">{audit.action} - {audit.scriptName}</h5>
              <p className="card-text">Device Type: {audit.deviceType}</p>
              <p className="card-text">IP Address: {audit.ipAddress}</p>
              <p className="card-text">Execution Date: {audit.executionDateTime}</p>
              <p className="card-text">Status: {audit.executionStatus}</p>
              <p className="card-text">Duration: {audit.duration}</p>
              <p className="card-text">Log Output: {audit.logOutput}</p>
              {/* Add buttons/icons for actions */}
              <div className="mt-2 d-flex justify-content-between">
                  <button className="btn btn-primary btn-sm mr-2 ml-2">Edit</button>
                  <button className="btn btn-danger btn-sm mr-2 ml-2">Delete</button>
                  {audit.action === 'Approve' && (
                    <button className="btn btn-success btn-sm">Approve</button>
                  )}
                </div>
                </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default Audit;
