import React from 'react'

const LoadingState = ({title}) => {
    return (
        <div className="flex flex-col items-center justify-center py-20 h-full">
            <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200"></div>
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-500 border-t-transparent absolute top-0"></div>
            </div>
            <p className="mt-6 text-lg font-medium text-secondary-600">
                {`Loading ${title}...`}
            </p>
            <p className="text-secondary-500">
                Please wait while we fetch your data
            </p>
        </div>
    )
}

export default LoadingState