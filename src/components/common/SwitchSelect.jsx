import { Switch } from '@headlessui/react'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'

const SwitchSelect = ({role, handleOnChange}) => {
    return (
        <Switch
            checked={role.value}
            onChange={e => handleOnChange(e, role.id)}
            className={`group relative flex h-6 w-14 cursor-pointer rounded-full bg-primary-100 border-2 items-center border-primary-200 ease-in-out focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white ${role.value ? "bg-gray-200" : "bg-primary-50"} transition-all `}
        >
            <span
                aria-hidden="true"
                className={`pointer-events-none inline-block size-7  rounded-full bg-primary-500 shadow-lg ring-0 transition duration-200 ease-in-out ${role.value ? "bg-primary-600 translate-x-7" : "bg-primary-200 -translate-x-1"}`}
            >
                {role.value ? <CheckCircleIcon className='text-white' /> : <XCircleIcon className="text-white" />}
            </span>
        </Switch>
    )
}

export default SwitchSelect