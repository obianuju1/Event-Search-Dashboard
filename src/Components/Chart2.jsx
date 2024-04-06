import React, { PureComponent } from 'react';
import { ResponsiveContainer, PieChart, Pie, Legend } from 'recharts';


export default Chart2 = ({info})=>{

    return (
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie dataKey="value" data={info} fill="#8884d8" label />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }
