import React, { useState } from 'react'
import Input from '../Input/Input';
import EmojiPickerPopup from '../layout/EmojiPickerPopup';

const AddIncomeForm = ({onAddIncome}) => {
    const [income, setIncome] = useState({
        source:"",
        amount:"",
        date:"",
        icon:"",
    });

    const handleChange = (key, value) => setIncome({...income, [key]: value});

  return (
    <div>

        <EmojiPickerPopup 
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
        /> 
        <Input 
            value={income.source}
            onChange={({target} ) => handleChange("source", target.value)}
            label="Income Source"
            placehoder="Freelance, Salary, etc"
            type="text"
        /> 
        <Input 
            value={income.amount}
            onChange={({target}) => handleChange("amount", target.value)}
            label="Amount"
            placehoder=""
            type="number"
         />

        <Input
            value={income.date}
            onChange={({target}) => handleChange("date", target.value)}
            label="Date"
            placehoder=""
            type="date"
        /> 

        <div className='flex justify-end mt-6'>
            <button 
            type='button'
            className='add-btn flex items-center gap-1.5 text-xs md:text-sm font-medium text-purple-600 whitespace-nowrap bg-purple-50 border border-purple-100 rounded-lg px-4 py-2 cursor-pointer'
            onClick={() => onAddIncome(income)}
            >
                Add Income
            </button>
        </div>
    </div>
  )
}

export default AddIncomeForm