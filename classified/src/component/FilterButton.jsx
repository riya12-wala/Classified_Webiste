import React from 'react'

function FilterButton({text,Icon}) {
  return (
    <div>
         <div className="flex items-center border border-gray-300 rounded-full bg-white px-3 py-1 mb-2 w-fit gap-2">
  <Icon  />
   {text}
</div>
    </div>
  )
}

export default FilterButton
