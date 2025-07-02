import React from 'react'

export default function BorrowTable({}) {
  return (
    <div>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50'>
          <tr>
            <th className='py-3.5 px-4 text-sm font-normal text-left text-gray-500'>No</th>
            <th className='px-4 py-3.5 text-sm font-normal text-left text-gray-500'>Item Image</th>
            <th className='px-4 py-3.5 text-sm font-normal text-left text-gray-500'>Item Name</th>
            <th className='px-4 py-3.5 text-sm font-normal text-left text-gray-500'>Price</th>
            <th className='px-4 py-3.5 text-sm font-normal text-left text-gray-500'>Action</th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {cart.map((item, index) => (
            <tr key={item._id}>
              <td className='px-4 py-4 text-sm text-gray-500 whitespace-nowrap'>{index + 1}</td>
              <td className='px-4 py-4 text-sm text-gray-500 whitespace-nowrap'>
                <img src={item.image} alt={item.name} className='rounded-full w-16 h-16 object-cover' />
              </td>
              <td className='px-4 py-4 text-sm text-gray-500 whitespace-nowrap'>{item.name}</td>
              <td className='px-4 py-4 text-sm text-gray-500 whitespace-nowrap'>${item.price}</td>
              <td className='px-4 py-4 text-sm whitespace-nowrap'>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
