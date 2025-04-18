import React from 'react'

const DeleteAlert = ({content, onDelete}) => {
  return (
    <div>
        <p className='text-sm'>{content}</p>

        <div className='flex justify-end mt-6'>
            <button
                type='button'
                className='add-btn flex items-center gap-1.5 text-xs md:text-sm font-medium text-purple-600 whitespace-nowrap bg-purple-50 border border-purple-100 rounded-lg px-4 py-2 cursor-pointer'
                onClick={onDelete}
            >
                Delete
            </button>

        </div>
    </div>
  )
}

export default DeleteAlert