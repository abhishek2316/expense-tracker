import moment from 'moment'
import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import PropTypes from 'prop-types'

const ExpenseTransactions = ({transactions, onSeeMore}) => {
    // console.log("Transactions:", transactions);
  return (
    <div className='card bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Expenses</h5>
    
                <button className='card-btn flex items-center gap-3 text-[12px] font-medium text-gray-700 hover:text-purple-500 bg-gray-50 hover:bg-purple-50 px-4 py-1.5 rounded-lg border border-gray-200/50 cursor-pointer' onClick={onSeeMore}>
                    See All <LuArrowRight className='text-base' />
                </button>
            </div>

            <div className='mt-6'>
            {transactions?.slice(0,5)?.map((expense) => {
                console.log("Expense:", expense);
                return (
                <TransactionInfoCard
                    key={expense.id}
                    title={expense.category}
                    icon={expense.icon}
                    date={moment(expense.date || expense.createdAt).format("Do MMM YYYY")}
                    amount={Number(expense.amount)}  
                    type="expense"
                    hideDeleteBtn
                />
                );
            })}
        </div>
    </div>
  )
}

ExpenseTransactions.propTypes = {
    transactions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string, // or number, depending on your data
        type: PropTypes.string.isRequired,
        category: PropTypes.string,
        source: PropTypes.string,
        icon: PropTypes.string,
        date: PropTypes.string,
        createdAt: PropTypes.string,
        amount: PropTypes.number.isRequired
      })
    ),
    onSeeMore: PropTypes.func.isRequired
  }
export default ExpenseTransactions