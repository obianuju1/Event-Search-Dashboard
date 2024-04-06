import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Chart = () => {
  const URL = `https://app.ticketmaster.com/discovery/v2/events.json?size=50&apikey=0sRtJA7WghwWb0SUfpN9F3lLVll5LLoS`
  const [chartInfo, setChartInfo] = useState([]);

  useEffect(() => {
    const allEvents = async () => {
      const response = await fetch(URL);
      const data = await response.json();
      setChartInfo(data._embedded.events.map(event => ({
        name: event.name,
        minPrice: event.priceRanges && event.priceRanges.length > 0 ? event.priceRanges[0].min : 0,
        maxPrice: event.priceRanges && event.priceRanges.length > 0 ? event.priceRanges[0].max : 0,
      })));
    };
    allEvents().catch(console.error);
  }, []);

  return (
    <ResponsiveContainer width="100%" minHeight={300}>
      <AreaChart
        width={1000}
        height={600}
        data={chartInfo}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Events" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="name" stackId="1" stroke="#8884d8" fill="#8884d8" />
        <Area type="monotone" dataKey="minPrice" stackId="1" stroke="#8884d8" fill="#8884d8" />
        <Area type="monotone" dataKey="maxPrice" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Chart;