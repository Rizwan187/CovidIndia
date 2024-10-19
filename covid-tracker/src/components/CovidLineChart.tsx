import React from 'react';
import Plot from 'react-plotly.js';
import { CovidData } from '../types/CovidDataTypes'; // Adjust the path if necessary

interface CovidLineChartProps {
  selectedState: string;
  covidData: CovidData; // Define the type for covidData
}

const CovidLineChart: React.FC<CovidLineChartProps> = ({ selectedState, covidData }) => {
  // Extract relevant data for the selected state
  const stateData = covidData?.data?.regional.find((region) => region.loc === selectedState);

  // Sample data - replace with actual time series data
  const dates = ['Date 1', 'Date 2', 'Date 3']; // Replace with actual dates or time series data

  // For demonstration, let's say you have arrays for each case type
  const totalConfirmedCases = [stateData?.totalConfirmed || 0, stateData?.totalConfirmed || 0, stateData?.totalConfirmed || 0]; // Replace with actual time series data
  const activeCases = [stateData?.confirmedCasesIndian || 0, stateData?.confirmedCasesIndian || 0, stateData?.confirmedCasesIndian || 0]; // Replace with actual time series data
  const recoveredCases = [stateData?.discharged || 0, stateData?.discharged || 0, stateData?.discharged || 0]; // Replace with actual time series data
  const deaths = [stateData?.deaths || 0, stateData?.deaths || 0, stateData?.deaths || 0]; // Replace with actual time series data

  const lineChartData = [
    {
      x: dates,
      y: totalConfirmedCases,
      type: 'scatter' as const,
      mode: 'lines+markers' as const,
      name: 'Total Confirmed Cases',
      line: { color: 'blue' },
    },
    {
      x: dates,
      y: activeCases,
      type: 'scatter' as const,
      mode: 'lines+markers' as const,
      name: 'Active Cases',
      line: { color: 'orange' },
    },
    {
      x: dates,
      y: recoveredCases,
      type: 'scatter' as const,
      mode: 'lines+markers' as const,
      name: 'Recovered Cases',
      line: { color: 'green' },
    },
    {
      x: dates,
      y: deaths,
      type: 'scatter' as const,
      mode: 'lines+markers' as const,
      name: 'Deaths',
      line: { color: 'red' },
    },
  ];

  return (
    <Plot
      data={lineChartData}
      layout={{
        title: `COVID-19 Trends in ${selectedState}`,
        xaxis: { title: 'Dates' },
        yaxis: {
          title: 'Number of Cases',
          range: [0, Math.max(...totalConfirmedCases, ...activeCases, ...recoveredCases, ...deaths) + 100], // Adjust the range dynamically based on your data
        },
        margin: { t: 50, r: 50, b: 50, l: 50 }, // Adjust margins as needed
      }}
    />
  );
};

export default CovidLineChart;
