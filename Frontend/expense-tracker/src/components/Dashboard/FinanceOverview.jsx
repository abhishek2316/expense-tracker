// import React from 'react'
// import CustomPieChart from '../charts/CustomPieChart';

// const COLORS = ["#875CF5", "#FA2C37", "#FF6900"];

// const FinanceOverview = ({totalBalance, totalIncome, totalExpense}) => {
//     const balanceData = [
//         {
//             name:"Total Balance", amount:totalBalance
//         },
//         {
//             name:"Total Income", amount:totalIncome
//         },
//         {
//             name:"Total Expense", amount:totalExpense
//         }
//     ]
//   return <div className='card'>
//         <div className='flex items-center justify-between'>
//             <h5 className='text-lg'>Financial Overview</h5>
//         </div>

//         <CustomPieChart 
//         data={balanceData}
//         label="Total Balance"
//         totalAmount={`$${totalBalance}`}
//         colors={COLORS}
//         showTextAnchor/>
//     </div>
// }

// export default FinanceOverview