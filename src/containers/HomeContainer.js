import React from 'react';
import { axiosDefault } from "../Utils/axiosApi";

const useHome = () => {
  const [munDataArr, setMunDataArr] = React.useState({});
  const [stateData, setStateData] = React.useState(null);
  const [statesConfirm, setStatesConfirm] = React.useState(null);
  const [statesDeads, setStatesDeads] = React.useState(null);
  const [state, setState ] = React.useState({
    date: '',
    shortDate: '',
    dates : null,
    states : null,
    stateInfo: null,
    confirmData: [],
    deadData: [],
    countDates: 0,
  })
  const [munData, setMunData] = React.useState(null);
  const[rowsTable, setRowsTable] = React.useState([]);
  const[rows, setRows] = React.useState([]);
  const [dataChart, setDataChart] = React.useState([]);
  const [selectedLabel, setSelectedLabel] = React.useState(null);
  const [isMap, setIsMap] = React.useState(false);
  
  React.useEffect(() => {
    callStatesData();
  }, []);

  React.useEffect(() => {
      if ( stateData ) {
        let confirmData = [];
        let deadData = [];
        let rowsConfirm = [];
        let rowsDeads = [];

        //dates array
        let dates = stateData[0].confirmados.map( data => data.date);
        let last_date = dates.slice(-1)[0];
        
        onSelectLabel("confirmados");
        let _state = {
          date: last_date,
          dateIndex: dates.length - 1,
          countDates: dates.length,
          dates : dates
        }
        setState(_state)
        
        if(dataChart.length == 0)
          setDataChart([createChartData(stateData, "decesos", _state.countDates, _state.dates),createChartData(stateData, "confirmados", _state.countDates, _state.dates)]);

        console.log([createChartData(stateData, "decesos", _state.countDates, _state.dates),createChartData(stateData, "confirmados", _state.countDates, _state.dates)]);
      }
  }, [stateData]);

  React.useEffect(() => {
    if(state && state.date) {
        let rowsDeads = [];
        let rowsConfirm = [];
        stateData.sort((a,b) => b.confirmados[state.dateIndex].count - a.confirmados[state.dateIndex].count);
        let confirmData = stateData.map(s => ({"estado": s.abbrev, "confirmados": s.confirmados}))
        console.log(stateData)
        for(var i = 0; i < confirmData.length; i++) {
          //update just the last number
          rowsConfirm.push(createTableData(i+1, confirmData[i].estado, Number(confirmData[i].confirmados[state.dateIndex].count)));
        }

        stateData.sort((a,b) => b.confirmados[state.dateIndex].count - a.confirmados[state.dateIndex].count);
        let deadData = stateData.map(s => ({"estado": s.abbrev, "decesos": s.decesos}))
        console.log(deadData)
        deadData.sort((a,b) => b.decesos[state.dateIndex] -a.decesos[state.dateIndex]);
        for(var i = 0; i < deadData.length; i++) {
          //update just the last number
          rowsDeads.push(createTableData(i+1, deadData[i].estado, Number(deadData[i].decesos[state.dateIndex].count)));
        }

        setRowsTable([rowsConfirm, rowsDeads]);
    }
  }, [state]);

  
  React.useEffect(() => {
    if(selectedLabel && rowsTable.length > 0) {
      setRows(rowsTable[selectedLabel === "confirmados" ? 0 : 1]);
    }
  }, [rowsTable, selectedLabel]);

  let callStatesConfirm = ()  => {
    axiosDefault.post(`/map/data/confirmados`, {})
    .then(res => {
      setStatesConfirm(res.data);
    });
  }

  let callStatesDeads = ()  => {
    axiosDefault.post(`/map/data/decesos`, {})
    .then(res => {
      setStatesDeads(res.data);
    });
  }

  let callStatesData = ()  => {
    axiosDefault.get(`/estado/todos`, {})
    .then(res => {
      setStateData(res.data);

    });
  }

  let callMunData = (cve_ent)  => {
    console.log(munDataArr, cve_ent);
    if(!(cve_ent in munDataArr)) {
      axiosDefault.get(`/municipio/${cve_ent}`, {})
      .then(res => {
        setMunData(res.data);
        let _munObj = munDataArr;
        _munObj[cve_ent] = res.data;
        setMunDataArr(_munObj);
      });
    } else {
      setMunData(munDataArr[cve_ent]);  
    }
    
  }
  
  let createTableData = (position, state, data) => {
    return { position, state, data };
  }

  let createChartData = (data, label, datesLen, dates) => {
    let dataChart = [];
    let casos;
    for(var i = 0; i < datesLen; i++){
      casos = 0;
      data.forEach(element => {
        casos += Number(element[label][i].count);
      });

      dataChart.push(chartPoint(dates[i], casos));
    }
    
    return {
      id: label,
      data: dataChart
    }
  }

  let chartPoint = (x, y) =>{
    return {x, y}
  }

  let changeDate = (e, pos) => {
    let date = state.dates[pos];
    let dateIndex = pos;
    setState({
      ...state,
      date,
      dateIndex
    })
  }

  let onSelectLabel = (selected) => {
    setSelectedLabel(selected);
  }

  let onChangeTab = (bool) => {
    console.log("tab", bool)
    setIsMap(bool);
  }

  return {
    stateData,
    statesConfirm,
    statesDeads,
    state,
    rows,
    dataChart,
    changeDate,
    onSelectLabel,
    selectedLabel,
    isMap,
    onChangeTab,
    callMunData,
    munData
  }
}

export default useHome;