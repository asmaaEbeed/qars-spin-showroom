import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
import { useShowroomContext } from '../../context/ShowroomContext'
import LoadingState from '../common/LoadingState'
import SwitchSelect from '../common/SwitchSelect'
import { BiEdit } from 'react-icons/bi'
import { Menu } from '@headlessui/react'
import { CheckCircleIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { XCircleIcon } from '@heroicons/react/24/outline'



const ShowRoomUsersList = () => {
    const { partnerUsers, loadingPartnerUsers } = useShowroomContext()

    const columns = [
        {
            accessorKey: "userName",
            header: "userName"
        },
        {
            accessorKey: "email",
            header: "email"
        },
        {
            accessorKey: "approved",
            header: "Approved",
            cell: ({ row }) => <SwitchSelect value={row.original.approved} disable={true} size="small" />
        },
        {
            accessorKey: "lockedOut",
            header: "lockedOut",
            cell: ({ row }) => <SwitchSelect value={row.original.lockedOut} disable={true} size="small" />
        },
        {
            accessorKey: "online",
            header: "Online",
            cell: ({ row }) => <SwitchSelect value={row.original.online} disable={true} size="small" />
        },
        {
            accessorKey: "lastLogin",
            header: "Last Login"
        },
        {
            accessorKey: "comments",
            header: "Comments"
        },
        {
            accessorKey: "id",
            header: "Actions",
            cell: ({ row }) => <DropdownActions data={row.original} lastId={partnerUsers[partnerUsers.length - 1].id} />
        }
    ]


    const table = useReactTable({ data: partnerUsers, columns, getCoreRowModel: getCoreRowModel() })

    if (loadingPartnerUsers) {
        return <><LoadingState title="Users" /></>
    }

    if(partnerUsers.length === 0) {
        return <div className="text-center py-12">
        <div className="text-gray-500 text-lg">No Users found</div>
        <div className="mt-2 text-gray-400">Try add a new user for this showroom.</div>
      </div>
    }
    return (
        <div className="rounded-xl border border-gray-200 shadow-sm m-4 overflow-x-auto overflow-y-visible">
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

    )
}

export default ShowRoomUsersList

const DropdownActions = ({ data, lastId }) => {
    const { editPartnerUserStatus, editUserStatusLoading } = useShowroomContext()
    return <>
        <div className="relative">
            <Menu>
                <Menu.Button className="inline-flex items-center gap-2 rounded-md bg-primary-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-700 data-open:bg-gray-700">
                    <BiEdit className='size-4' />
                    <ChevronDownIcon className="size-4 fill-white/60" />
                </Menu.Button>


                <Menu.Items
                    transition
                    anchor="bottom end"
                    className={`min-w-40 origin-top-right absolute shadow-md right-0 bg-white rounded-xl border  p-1 text-sm/6 text-gray-800 z-50 transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0 ${lastId === data.id ? "bottom-8" : "top-8"}`}
                >
                    {/* <Menu.Item>
                        <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
                            <PencilIcon className="size-4 fill-white/30" />
                            Edit
                        </button>
                    </Menu.Item>
                    <Menu.Item>
                        <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
                            <Square2StackIcon className="size-4 fill-white/30" />
                            Duplicate
                        </button>
                    </Menu.Item> */}
                    <div className="h-px bg-white/5" />
                    <Menu.Item>
                        <button className="group hover:bg-red-500/10 flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10" onClick={() => editPartnerUserStatus({ userName: data.userName, action: data.approved ? "Suspend" : "Unsuspend" })}>
                            {!data.approved ? <CheckCircleIcon className="size-5 fill-red-500/30 text-red-500" /> : <XCircleIcon className="size-5 fill-red-500/30 text-red-500" />}
                            {data.approved ? "Suspend" : "Unsuspend"}
                            {editUserStatusLoading && <span className="animate-spin inline-block h-4 w-4 border-2 rounded-full mx-2 border-primary-500 border-t-transparent"></span>}
                        </button>
                    </Menu.Item>

                    {/* <Menu.Item>
                        <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
                            <TrashIcon className="size-4 fill-white/30" />
                            Delete
                        </button>
                    </Menu.Item> */}
                </Menu.Items>
            </Menu>
        </div>
    </>
}