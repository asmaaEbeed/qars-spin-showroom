// import React, { useState } from 'react';
// import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

// const PostSpecifications = ({ specifications = [], onAdd, onRemove, onUpdate }) => {
//   return (
//     <div className="mb-4">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-lg font-semibold text-gray-900">Specifications</h3>
//         <button
//         type='button'
//           onClick={onAdd}
//           className="flex items-center space-x-2 text-primary-600 hover:text-primary-700"
//         >
//           <PlusIcon className="h-5 w-5" />
//           <span>Add Specification</span>
//         </button>
//       </div>

//       {specifications.map((spec, index) => (
//         <div key={index} className="border-b border-gray-200 pb-4 mb-4">
//           <div className="flex items-center justify-between">
//             <div className="flex-1">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
//                   <input
//                     type="text"
//                     value={spec.name}
//                     onChange={(e) => onUpdate(index, { ...spec, name: e.target.value })}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
//                   <input
//                     type="text"
//                     value={spec.value}
//                     onChange={(e) => onUpdate(index, { ...spec, value: e.target.value })}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
//                   />
//                 </div>
//               </div>
//             </div>
//             <button
//               onClick={() => onRemove(index)}
//               className="text-red-500 hover:text-red-600"
//             >
//               <MinusIcon className="h-5 w-5" />
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PostSpecifications;
