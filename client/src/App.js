import './App.css';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Chart } from "react-google-charts";

function App() {
  const [data, setData] = useState([]);

  const getData = () => {
    axios.get('http://localhost:3001/')
    .then(res=> {
      setData(res.data)
      }).catch(err=>console.log(err))
  }
  useEffect(() => {
    getData()
  }, []);

  const poid = data.map(e=> {

    return e.poids
  })

const datas = [
  ["Year", "Sales", "Expenses"],
  ["2004", 1000, 400],
  ["2005", 1170, 460],
  ["2006", 660, 1120],
  ["2007", 1030, 540],
];

  return (
    <div className="App">
       <Chart
      chartType="LineChart"
      width="100%"
      height="400px"
      data={datas}
    />
    </div>
  );
}

export default App;
