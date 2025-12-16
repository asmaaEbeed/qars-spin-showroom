import { usePaymentContext } from '../../context/PaymentContext';
import { Menu } from '@headlessui/react';
import { CheckBadgeIcon, ChevronDownIcon, StarIcon, TagIcon } from '@heroicons/react/24/outline';
import { useHandlePostRequest } from './hook/handlePostRequest';

const PostRequestMenu = ({ currentPost, setSelectCurrencyOpen }) => {

    const { onGetQarsServices } = usePaymentContext();
    const postId = currentPost?.postId
    const { handleSubmitRequest } = useHandlePostRequest(setSelectCurrencyOpen)

    const handleSubmit = async (type) => {
        // Get All Service Price
        try {
            const res = await onGetQarsServices();
            const price = type === "Request to Feature a Post" && res.requestFeature
            handleSubmitRequest(type, postId, price);
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <Menu>
            <Menu.Button className="inline-flex items-center gap-2 h-full text-sm bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-700 data-open:bg-gray-700 px-3 py-2">
                Requests
                <ChevronDownIcon className="size-4 fill-indigo-700" />
            </Menu.Button>
            <Menu.Items
                anchor="bottom end"
                className={`min-w-40 origin-top-right absolute shadow-md right-0 bg-white rounded-xl border  p-1 text-sm/6 text-gray-800 z-50 transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0 top-9`}
            >
                <Menu.Item className="p-3 hover:bg-indigo-50">
                    <button
                        onClick={() => handleSubmit("Request New Tag")}
                        className="w-full px-6 py-3 rounded-lg ansition-colors text-sm text-gray-900 flex items-center gap-2"
                    ><TagIcon className="w-5 h-5 text-indigo-600" />
                        <p className="text-nowrap">Request New Tag</p>
                    </button>
                </Menu.Item>
                <Menu.Item className="border-t p-3 hover:bg-indigo-50">
                    <button
                        onClick={() => handleSubmit("Request Inspected Tag")}
                        className="w-full px-6 py-3 rounded-lg ansition-colors text-sm text-gray-900 flex items-center gap-2"
                    ><CheckBadgeIcon className="w-5 h-5 text-green-600" />
                        <p className="text-nowrap">Request Inspected</p>
                    </button>
                </Menu.Item>
                <Menu.Item className="border-t p-3 hover:bg-indigo-50">
                    <button
                        onClick={() => handleSubmit("Request to Feature a Post")}
                        className="w-full px-6 py-3 rounded-lg ansition-colors text-sm text-gray-900 flex items-center gap-2"
                    ><StarIcon className="w-5 h-5 text-yellow-600 " />
                        <p className="text-nowrap">Request Featured</p>
                    </button>
                </Menu.Item>
            </Menu.Items>
        </Menu>

    )
}

export default PostRequestMenu