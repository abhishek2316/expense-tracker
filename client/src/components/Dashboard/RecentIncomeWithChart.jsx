import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CustomPieChart from '../Charts/CustomPieChart';

const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4f39f6"];

const RecentIncomeWithChart = ({ data, totalIncome }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        // Check if data exists and is an array before mapping
        if (Array.isArray(data) && data.length > 0) {
            const processedData = data.map((item) => ({
                name: item?.source || 'Other',
                amount: Number(item?.amount) || 0,
            }));
            setChartData(processedData);
            console.log("Processed chart data:", processedData);
        } else {
            // If no data, set empty array
            setChartData([]);
            console.log("No data available for chart");
        }
    }, [data]);

    return (
        <div className='card bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Last 60 Days Income</h5>
            </div>

            {chartData.length > 0 ? (
                <CustomPieChart
                    data={chartData}
                    label="Total Income"
                    totalAmount={`$${totalIncome}`}
                    showTextAnschor
                    colors={COLORS}
                />
            ) : (
                <div className="flex justify-center items-center h-48 text-gray-500">
                    No income data available
                </div>
            )}
        </div>
    );
};

RecentIncomeWithChart.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            source: PropTypes.string,
            amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            icon: PropTypes.string
            // Add any other properties that might be in your transaction objects
        })
    ),
    totalIncome: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

RecentIncomeWithChart.defaultProps = {
    data: [],
    totalIncome: 0
};

export default RecentIncomeWithChart;