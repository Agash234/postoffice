import React, { useState } from 'react';
import { db} from './firebase'; 
import { collection , addDoc } from 'firebase/firestore' ;
import { useNavigate } from 'react-router-dom';// Import Firebase configuration

function Main() {
  const [speed, setSpeed] = useState("");
  const [normal, setNormal] = useState("");
  const [thabal, setThabal] = useState('');
  const [SpeedResult, setSpeedResult] = useState('');
  const [NormalResult, setNormalResult] = useState('');
  const [ThabalResult, setThabalResult] = useState('');
  const [branchOffice, setBranchOffice] = useState('');
  const[selectdate,setselectdate]=useState('');

  const navigate=useNavigate()



  const handleSpeedChange = (e) => {
    const value = e.target.value;
    setSpeed(value);
    setSpeedResult(value ? value * 37 : '');
  };

  const handleNormalChange = (e) => {
    const value = e.target.value;
    setNormal(value);
    setNormalResult(value ? value * 35 : '');
  };

  const handleThabalChange = (e) => {
    const value = e.target.value;
    setThabal(value);
    setThabalResult(value ? value * 30 : '');
  };

  const handleSubmit = async () => {
    try {
      // Prepare the data as a JSON object
   
      const formData = {
        SpeedResult,
        NormalResult,
        ThabalResult,
        speed,
        normal,
        thabal,
        branch: branchOffice,
        date:selectdate,
      };
      console.log(formData);

      // Add the data to FirestoreDate
      const docRef = await addDoc(collection(db, 'posts'), formData);
      
      console.log('Post successfully added:', docRef.id);
      alert('Post added successfully');

      // Reset the form
      setSpeed('');
      setNormal('');
      setThabal('');
      setNormalResult('');
      setSpeedResult('');
      setThabalResult('');
      setBranchOffice('');
      setselectdate('');
      
    } catch (error) {
      // Handle errors
      console.error('Error posting data to Firestore:', error);
      alert('Failed to submit the form.');
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", background: "#f0f8ff" }}>
        <button onClick={() => navigate('/getposts')}>Get Details</button>
      <div className="form-container">
        <div className="form-group">
          <label className="form-label">Branch Office</label>
          <select className="form-input" value={branchOffice} onChange={(e) => setBranchOffice(e.target.value)}>
            <option value="" disabled>Select Branch</option>
            <option value="pondy">Pondy</option>
            <option value="villupuram">Villupuram</option>
          </select>
        </div>

        <div className="form-group">
          <div>
            <label className="form-label">Speed Post</label>
            <input
              type="number"
              placeholder="Enter the number"
              className="form-input"
              value={speed}
              onChange={handleSpeedChange}
            />
          </div>
          <div>
            <input className="form-output" value={SpeedResult} readOnly />
          </div>
        </div>

        <div className="form-group">
          <div>
            <label className="form-label">Normal Post</label>
            <input
              type="number"
              value={normal}
              placeholder="Enter the number"
              className="form-input"
              onChange={handleNormalChange}
            />
          </div>
          <div>
            <input className="form-output" value={NormalResult} readOnly />
          </div>
        </div>

        <div className="form-group">
          <div>
            <label className="form-label">Thabal Post</label>
            <input
              type="number"
              value={thabal}
              placeholder="Enter the number"
              className="form-input"
              onChange={handleThabalChange}
            />
          </div>
          <div>
            <input className="form-output" value={ThabalResult} readOnly />
          </div>
          <div>
            <label className='form-label'>Date</label>
            <input type="date" className='form-input' onChange={(e)=>setselectdate(e.target.value)} />
          </div>
        </div>

        <button className="form-submit" type="button" onClick={handleSubmit}>Submit</button>
      </div>

     
    </div>
  );
}

export default Main;
