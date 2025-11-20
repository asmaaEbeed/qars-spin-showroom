import { UserCircleIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'
import AddShowroomUserModal from './modal/AddShowroomUserModal';

const PortalUsersTab = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden h-full">
      <div className="flex justify-between items-center bg-gradient-to-r from-primary-500/10 to-indigo-500/10 px-6 py-4 border-b border-secondary-100">
        <h2 className="text-lg font-semibold text-secondary-800">Portal Users</h2>
        <div className="relative">
          <button
            onClick={() => {
              setOpen(true);
            }}
            className="flex relative items-center bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors md:text-md text-sm md:px-4 px-1 py-2"
          >
            <UserCircleIcon className="h-6 w-6 mx-1" />
            Create User
          </button>
        </div>
      </div>
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden h-full">

      </div>
      <AddShowroomUserModal open={open} setOpen={setOpen} />
    </div>
  )
}

export default PortalUsersTab