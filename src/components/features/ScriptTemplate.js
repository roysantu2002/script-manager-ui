import { useState } from 'react';
import { BsCodeSlash } from 'react-icons/bs';

const ScriptTemplate = () => {
  const [formData, setFormData] = useState({
    scriptName: '',
    description: '',
    command: '',
    logsRequirement: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the form submission, for example, sending it to a server.
    console.log(formData);
  };

  return (
    <div className="container mt-4">
     <div className='row m-2 justify-content-center'>
        <div className='col-md-6'>
      <h3>Python Script Details</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="scriptName">Script Name</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="scriptName"
              name="scriptName"
              value={formData.scriptName}
              onChange={handleChange}
              required
            />
            <div className="input-group-append">
              <span className="input-group-text">
                <BsCodeSlash />
              </span>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="command">Python Command</label>
          <textarea
            className="form-control"
            id="command"
            name="command"
            value={formData.command}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="logsRequirement">Logs Requirement</label>
          <textarea
            className="form-control"
            id="logsRequirement"
            name="logsRequirement"
            value={formData.logsRequirement}
            onChange={handleChange}
            required
          />
        </div>
        <div className='row justify-content-center'>
  <div className='col-md-6 text-center m-2'>
    <button type="submit" className="btn btn-primary">
      Submit
    </button>
  </div>
</div>
        
      </form>
      </div>
      </div>
    </div>
  );
};

export default ScriptTemplate;
