import React from 'react'
import PropTypes from 'prop-types';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
// import CustomTooltip from './CustomTooltip';
import CustomTooltip from './CustomToolTip';
import CustomLegend from './CustomLegend';

const CustomPieChart = ({
    data,
    label,
    totalAmount,
    colors,
    showTextAnchor
}) => {
  return <ResponsiveContainer width="100%" height={380}>
    <PieChart>
        <Pie
        data={data}
        dataKey="amount"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={130}
        innerRadius={100}
        labelLine={false} 
        >
            {data.map( (entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
        </Pie>
        <Tooltip content={CustomTooltip}/> 
        <Legend content={CustomLegend}/> 

        {showTextAnchor && (
            <>
                <text 
                    x="50%"
                    y="50%"
                    dy={-25}
                    textAnchor="middle"
                    fill="#666"
                    fontSize="14px"
                >
                    {label}
                </text>
                <text
                    x="50%"
                    y="50%"
                    dy={8}
                    textAnchor="middle"
                    fill="#333"
                    fontSize="24px"
                    fontWeight="semi-bold"
                >
                    {totalAmount}
                </text>
            </>
        )}
    </PieChart>
  </ResponsiveContainer>
}

CustomPieChart.propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,  
        amount: PropTypes.number.isRequired, 
      })
    ).isRequired,  
    label: PropTypes.string,
    totalAmount: PropTypes.number,
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    showTextAnchor: PropTypes.bool,
  };

export default CustomPieChart