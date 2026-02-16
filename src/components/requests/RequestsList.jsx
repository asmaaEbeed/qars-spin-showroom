import React, { useMemo, useState } from 'react'
import { useRequestContext } from '../../context/RequestContext'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import LoadingState from '../common/LoadingState'
import { BiEdit } from 'react-icons/bi'
import QuickPostView from './QuickPostView'
import { useCarContext } from '../../context/CarContext'
import { useAddCar360Url } from '../../pages/hooks/useCar360Request'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { formatDateTime } from '../../utils/dateFormatter'
import Pagination from '../layout/Pagination'

const RequestsList = ({ isUser = false }) => {
    const { requests, loadingRequests } = useRequestContext()

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const commonColumn = useMemo(() => [
        {
            accessorKey: "image",
            header: "Image",
            cell: ({ row }) => <CarImage src={row.original.image} />
        },
        {
            accessorKey: "requestType",
            header: "Request Type",
            cell: ({ row }) => <div className="text-xs font-semibold text-wrap text-gray-700">{row.original.requestType}</div>
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => <Status data={row.original} />
        },
        {
            accessorKey: "createdAt",
            header: "Created At",
            cell: ({ row }) => <div>{formatDateTime(row.original.createdAt)}</div>
        },
        {
            accessorKey: "postCode",
            header: "Post Code",
            cell: ({ row }) => <PostCode data={row.original}  />
        },
        // {
        //     accessorKey: "id",
        //     header: "Actions",
        //     cell: ({ row }) => <DropdownActions data={row.original} />
        // }
    ], [])
    const superAdminColumns = useMemo(() => [
        {
            accessorKey: "name",
            header: "User Name"
        },
        {
            accessorKey: "mobile",
            header: "Mobile"
        },
        {
            accessorKey: "email",
            header: "Email"
        },
        {
            accessorKey: "sourceKind",
            header: "Source Kind"
        },
        // {
        //     accessorKey: "id",
        //     header: "Actions",
        //     cell: ({ row }) => <DropdownActions data={row.original} />
        // }
        {
            accessorKey: "id",
            header: "Actions",
            cell: ({ row }) => <Button360 data={row.original} />
        }
    ], [])

    const columns = isUser ? commonColumn : [...commonColumn, ...superAdminColumns]

    // Pagination logic
    const totalPages = Math.ceil(requests.length / itemsPerPage);

    const currentRequests = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return requests.slice(startIndex, startIndex + itemsPerPage);
    }, [requests, currentPage]);


    const table = useReactTable({ data: currentRequests, columns, getCoreRowModel: getCoreRowModel() })
    if (loadingRequests) {
        return <><LoadingState title="Requests" /></>
    }

    if (requests.length === 0) {
        return <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No Requests found</div>
            <div className="mt-2 text-gray-400">No requests from users or showrooms.</div>
        </div>
    }




    return (
        <>
            <div className="rounded-xl border border-gray-200 shadow-sm my-4 overflow-x-auto">
                <table className="min-w-full border-collapse">
                    <thead className="bg-gradient-to-r from-primary-500/20 to-indigo-500/20">
                        {table.getHeaderGroups().map((hg) => (
                            <tr key={hg.id} className="">
                                {hg.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="px-3 py-4 text-left text-xs font-semibold text-gray-600 tracking-wider uppercase"
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody className="bg-white">
                        {table.getRowModel().rows.map((row, rowIndex) => (
                            <tr
                                key={row.id}
                                className={`transition-all duration-150 ${rowIndex % 2 === 0 ? "bg-primary-50/40" : "bg-primary-50"
                                    } hover:bg-primary-100/80 `}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        key={cell.id}
                                        className="px-3 py-4 text-xs font-semibold text-gray-700 whitespace-nowrap border-t border-gray-300"
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
            {/* Pagination Component */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </>
    )
}

export default RequestsList

// const DropdownActions = ({ data, lastId }) => {
//     return <>
//         <div className="relative">
//             <Menu>
//                 <Menu.Button className="inline-flex items-center gap-2 rounded-md bg-primary-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-700 data-open:bg-gray-700">
//                     <BiEdit className='size-4' />
//                     <ChevronDownIcon className="size-4 fill-white/60" />
//                 </Menu.Button>


//                 <Menu.Items
//                     transition
//                     anchor="bottom end"
//                     className={`min-w-40 origin-top-right absolute shadow-md right-0 bg-white rounded-xl border  p-1 text-sm/6 text-gray-800 z-50 transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0 ${lastId === data.id ? "bottom-8" : "top-8"}`}
//                 >
//                     <div className="h-px bg-white/5" />
//                     <Menu.Item>
//                         <button className="group hover:bg-red-500/10 flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
//                             <CheckCircleIcon className="size-5 fill-primary-500/30 text-primary-500" />
//                             <span className="inline-block h-4 w-4 border-2 rounded-full mx-2 border-primary-500 border-t-transparent"></span>
//                         </button>
//                     </Menu.Item>
//                 </Menu.Items>
//             </Menu>
//         </div>
//     </>
// }

const CarImage = ({ src }) => {
    return (
        <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
            <img
                src={src}
                alt="car"
                className="w-full h-full object-cover"
            />
        </div>
    );
};

const PostCode = ({ data }) => {
    const [quickPostView, setQuickPostView] = useState(false)
    const { fetchCarProfile } = useCarContext();

    const handlePostCodeClick = () => {
        setQuickPostView(true)
        fetchCarProfile(data.postCode)
    }
    return <>
        <button onClick={handlePostCodeClick} title="View Post details" className="text-sm font-semibold text-primary-600 underline">{data.postCode}</button>
        <QuickPostView open={!!quickPostView} setOpen={setQuickPostView} />
    </>
}

const Status = ({ data }) => {

    const status = data.status
    return <span className={`text-xs font-semibold text-white px-2 py-1 rounded-full ${status === "Pending" ? "bg-yellow-500" : "bg-green-500"}`}>{status}</span>
}

const Button360 = ({ data }) => {
    const handleAdd360 = useAddCar360Url(data.postId);
    const { updateRequestStatus } = useRequestContext();

    const onAdd360Click = async () => {
        const enteredUrl = await handleAdd360();
        if (enteredUrl) {
            updateRequestStatus(data.id, "Completed");
        }
    }
    if (data.requestType === "Request 360 Photo Session" || data.requestType === "Request to 360") {

        return data.status === "Pending" ?
            <div className="relative">

                <button className="flex relative items-center  hover:underline text-indigo-700 rounded-lg transition-colors md:text-md text-sm md:px-4 px-1 py-2" onClick={() => { onAdd360Click() }}>
                    <PlusCircleIcon className="h-4 w-4 left-3 text-indigo-700 hover:underline" />
                    Add 360
                </button>
            </div>
            :
            <button className="flex relative items-center  hover:underline text-indigo-700 rounded-lg transition-colors md:text-md text-sm md:px-4 px-1 py-2" onClick={() => { onAdd360Click() }}>
                <BiEdit className="h-4 w-4 left-3 text-indigo-700  " />
                Edit 360
            </button>
    } else {
        return <></>
    }
}