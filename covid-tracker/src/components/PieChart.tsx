// src/components/PieChart.tsx
import React from 'react';
import Plot from 'react-plotly.js';

interface PieChartProps {
  data: {
    label: string;
    value: number;
  }[];
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const labels = data.map((item) => item.label);
  const values = data.map((item) => item.value);

  return (
    <Plot
      data={[
        {
          type: 'pie',
          labels: labels,
          values: values,
          hole: 0.4,
          textinfo: 'label+percent',
          insidetextorientation: 'horizontal',
        },
      ]}
      layout={{
        title: 'COVID-19 Cases by State',
        height: 400,
        width: 500,
      }}
    />
  );
};

export default PieChart;
