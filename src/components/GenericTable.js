import React from 'react';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function GenericTable({ data, selectedItems, onCheckboxChange, onRunButtonClick, listFields }) {
  const isRunning = false; // Replace with your actual running state
  const keys = Object.keys(data[0]);

  return (
    <div className="container m-3">
  <div className="row">
    <div className="col-md-8"></div>
    <table className="table table-bordered">
    <thead>
      <tr>
        {listFields.map((field) => (
          <th key={field}>{field}</th>
        ))}
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {data.map((item) => (
        <tr key={item.id}>
          {listFields.map((field) => (
            <td key={field}>
              {Array.isArray(item[field]) ? item[field].join(', ') : item[field]}
            </td>
          ))}
          <td>
            {item.status ? (
              <input
                type="checkbox"
                onChange={() => onCheckboxChange(item)}
                checked={selectedItems.some((selectedItem) => selectedItem.id === item.id)}
              />
            ) : (
              <input type="checkbox" disabled />
            )}
          </td>
        </tr>
      ))}
    </tbody>
  
  </table>
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <button
            className={`btn btn-success btn-lg rounded-circle ${
              isRunning ? 'disabled' : ''
            }`}
            onClick={onRunButtonClick}
          >
            {isRunning ? (
              <FontAwesomeIcon icon={faStop} />
            ) : (
              <FontAwesomeIcon icon={faPlay} />
            )}
          </button>
        </div>
        </div>


  </div>
  </div>
  
  );
}

export default GenericTable;
