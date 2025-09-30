import React, { useEffect } from 'react'
import PostSpecifications from '../../posts/details/PostSpecifications'
import { usePosts } from '../../../context/PostsContext'

const PostSpecsStep = ({ onClose, setStep, step }) => {
    const { postCreatedCode } = usePosts()


    const styleFromSteps = {
        mainLayout: "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4",
        internalSpec: "md:!block",
        maxHeight: "!max-h-max"
    }
    
    return (
        <div>
            <div className='p-4'>

            {/* <PostSpecifications code={"CAR-20250922-C77731"} styleFromSteps={styleFromSteps} /> */}
            <PostSpecifications code={postCreatedCode} styleFromSteps={styleFromSteps} />
            </div>
            <div className="flex justify-end space-x-3 p-4 sticky bottom-0 z-50 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                >
                    Cancel
                </button>
                <button
                    onClick={() => setStep(step + 1)}
                    className="px-6 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default PostSpecsStep