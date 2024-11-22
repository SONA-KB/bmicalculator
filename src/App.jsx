

import './App.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';

function App() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [isWeight, setIsWeight] = useState(true);
  const [isHeight, setIsHeight] = useState(true);
  const [bmi, setBmi] = useState(0);
  const [category, setCategory] = useState("");

  const validate = (e) => {
    const { name, value } = e.target;
    console.log(name);
    console.log(value);

    if (!!value.match('^[0-9]*$')) {
      if (name === 'weight') {
        setWeight(value);
        setIsWeight(true);
      } else {
        setHeight(value);
        setIsHeight(true);
      }
    } else {
      if (name === 'weight') {
        setWeight(value);
        setIsWeight(false);
      } else {
        setHeight(value);
        setIsHeight(false);
      }
    }
  };

  const handleReset = () => {
    setWeight("");
    setHeight("");
    setIsWeight(true);
    setIsHeight(true);
    setBmi(0);
    setCategory("");
  };

  const calculateBmi = () => {
    const heightInMeter = height / 100;
    const bmiValue = weight / (heightInMeter * heightInMeter);
    setBmi(bmiValue.toFixed(2));

    if (bmiValue < 18.5) {
      setCategory("Underweight");
    } else if (bmiValue < 25) {
      setCategory("Normal");
    } else if (bmiValue < 30) {
      setCategory("Overweight");
    } else {
      setCategory("Obese");
    }
  };

  return (
    <>
      <div className='bg-dark d-flex justify-content-center align-items-center' style={{ height: '100vh', width: '100%' }}>
        <div className='bg-light p-5 rounded-2' style={{ width: '500px' }}>
          <h1>BMI Calculator App</h1>
          <p>Calculate your Body Mass Index Easily</p>
          <div className='bg-warning p-3 mt-4 d-flex justify-content-center align-items-center rounded flex-column' style={{ height: '150px' }}>
            <h1>BMI: {bmi}</h1>
            <p>Category: {category}</p>
          </div>
          <div className='my-3'></div>
          <div className="mb-3">
            <TextField id="outlined-basic" className='w-100' value={weight} name='weight' label="Weight (kg)" variant="outlined" onChange={(e) => validate(e)} />
            {isWeight === false && <p className='text-danger'>*Invalid Input</p>}
          </div>
          <div className="mb-3">
            <TextField id="outlined-basic" className='w-100' value={height} name='height' label="Height (cm)" variant="outlined" onChange={(e) => validate(e)} />
            {isHeight === false && <p className='text-danger'>*Invalid Input</p>}
          </div>
          <div className="mb-3 d-flex justify-content-between">
            <Button disabled={isWeight && isHeight ? false : true} variant="contained" style={{ width: '190px' }} color='success' className='p-3' onClick={calculateBmi}>Calculate</Button>
            <Button variant="outlined" style={{ width: '190px' }} className='p-3' onClick={handleReset}>Reset</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
