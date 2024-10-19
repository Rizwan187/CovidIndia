// src/App.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCovidDataRequest, fetchCovidDataSuccess, fetchCovidDataFailure } from './store/covidReducer';
import { CovidData } from './types/CovidDataTypes'; // Adjust the path if necessary
import { fetchCovidData as fetchCovidDataService } from './services/covidService'; // Adjust the path if necessary
import StateFilter from './components/StateFilter'; // Import the StateFilter component
import Plot from 'react-plotly.js'; // Import Plotly
import CovidLineChart from './components/CovidLineChart';
import MapView from './components/MapView';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const covidData = useSelector((state: any) => state.covid.data); // Accessing covid data from state
  const loading = useSelector((state: any) => state.covid.loading); // Accessing loading state
  const error = useSelector((state: any) => state.covid.error); // Accessing error state
  const [selectedState, setSelectedState] = useState<string>(''); // State to hold the selected state

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchCovidDataRequest()); // Dispatch request action
      try {
        const response: CovidData = await fetchCovidDataService(); // Call the API
        dispatch(fetchCovidDataSuccess(response)); // Dispatch success action with the response data
      } catch (error: unknown) { // Explicitly specify the type of error
        const errorMessage = (error as Error).message || 'Failed to fetch data'; // Safely extract the message
        dispatch(fetchCovidDataFailure(errorMessage)); // Dispatch failure action with error message
      }
    };

    fetchData(); // Call the fetch function
  }, [dispatch]);

  const handleStateChange = (state: string) => {
    setSelectedState(state); // Update the selected state
  };

  // Prepare pie chart data based on the selected state
  const pieChartData = selectedState
    ? [
        {
          label: 'Total Cases',
          value: covidData?.data.regional.find((region: { loc: string; totalConfirmed: number }) => region.loc === selectedState)?.totalConfirmed || 0,
        },
        {
          label: 'Active Cases',
          value: covidData?.data.regional.find((region: { loc: string; activeCases: number }) => region.loc === selectedState)?.activeCases || 0,
        },
        {
          label: 'Recovered',
          value: covidData?.data.regional.find((region: { loc: string; discharged: number }) => region.loc === selectedState)?.discharged || 0,
        },
        {
          label: 'Deaths',
          value: covidData?.data.regional.find((region: { loc: string; deaths: number }) => region.loc === selectedState)?.deaths || 0,
        },
      ]
    : [];

  return (
    <div>
      <StateFilter onStateChange={handleStateChange} /> {/* State filter component */}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {covidData && (
        <div>
          <h2>Total Cases: {covidData.data.summary.total}</h2>
          <h2>Active Cases: {covidData.data.summary.confirmedCasesIndian}</h2>
          <h2>Recovered: {covidData.data.summary.discharged}</h2>
          <h2>Deaths: {covidData.data.summary.deaths}</h2>

          <h1>COVID-19 Data Visualization</h1>

          {/* Pie Chart */}
          {selectedState && pieChartData.length > 0 && (
            <Plot
              data={[{
                labels: pieChartData.map((data) => data.label),
                values: pieChartData.map((data) => data.value),
                type: 'pie',
              }]}
              layout={{ title: `COVID-19 Cases in ${selectedState}` }}
            />
          )}

          {/* Line Chart */}
          {selectedState && (
            <CovidLineChart selectedState={selectedState} covidData={covidData} />
          )}

<MapView selectedState={selectedState} covidData={covidData} />
        </div>
      )}
    </div>
  );
};

export default App;
