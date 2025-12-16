import { Switch } from '@headlessui/react'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'

const SwitchSelect = ({ value, handleOnChange, disable = false, size = "large" }) => {
    const switchSize = {
        large: {
            main: "h-6 w-14",
            circle: "size-7"
        },
        small: {
            main: "h-4 w-11",
            circle: "size-5"
        }

    }
    return (
        <Switch
            disabled={disable}
            checked={value}
            onChange={e => handleOnChange(e)}
            className={`group relative flex ${switchSize[size].main} cursor-pointer rounded-full bg-primary-100 border-2 items-center border-primary-200 ease-in-out focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white ${value ? "bg-gray-200" : "bg-primary-50"} transition-all `}
        >
            <span
                aria-hidden="true"
                className={`pointer-events-none inline-block ${switchSize[size].circle} rounded-full bg-primary-500 shadow-lg ring-0 transition duration-200 ease-in-out ${value ? "bg-primary-600 translate-x-7" : "bg-primary-200 -translate-x-1"}`}
            >
                {value ? <CheckCircleIcon className='text-white' /> : <XCircleIcon className="text-white" />}
            </span>
        </Switch>
    )
}

export default SwitchSelect