import React, { useEffect, useState } from 'react'
// import { expenseBarChartData } from '../../../utils/helper';
import { expenseBarChartData } from '../../utils/helper';
import CustomBarChart from '../Charts/CustomBarChart';

const Last30DaysExpenses = ({data}) => {

    const [chartData, setCharData] = useState([]);
    
    useEffect(() => {
        const result = expenseBarChartData(data);
        setCharData(result);

        return () => {};
    }, [data])
    
  return (
    <div className="card bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50 col-span-1">
        <div className="flex items-center justify-between">
            <h5 className='text-lg'>Last 30 Days Expenses</h5>
        </div>

        <CustomBarChart data={chartData} />

    </div>
  )
}

export default Last30DaysExpenses