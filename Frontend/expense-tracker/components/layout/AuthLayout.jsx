import React from 'react'

const AuthLayout = ({children}) => {
  return (
    <div>
        <div className='md:w-[60vw]  w-screen h-screen pb-12 px-8 py-8'>
            <h1 className='text-3xl'>Expense Tracker</h1>
            {children}
        </div>
    </div>
  )
}

export default AuthLayout