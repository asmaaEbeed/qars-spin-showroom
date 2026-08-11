import { useEffect, useMemo, useState } from 'react';
import MainLayout from '../../../../components/layout/MainLayout'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { DocumentArrowUpIcon, PlusIcon } from '@heroicons/react/24/solid';
import LoadingState from '../../../../components/common/LoadingState';
import Pagination from '../../../../components/layout/Pagination';
import xlsxExport from '../../../../hooks/xlsxExport';
import AddCarsMakesModal from '../../../../components/management/cars-management/AddCarsMakesModal';
import { useCarsManagement } from '../../../../context/CarsManagementContext';

const CarsModels = () => {
  const [openMakesModal, setOpenMakesModal] = useState(false);
  const [selectedCarMake, setSelectedCarMake] = useState(null);
  const {
    fetchCarsMakes,
    carsMakesFiltered,
    carsMakesLoading,

    fetchCarsClass,
    carsClassLoading,
    carsClassList,

    fetchCarsModel,
    carsModelList,
    carsModelLoading,

    filter,
    setFilter,
    totalPages,
    currentCarsMakes,

    createCarMake,
    createCarMakesLoading,



    deleteCarMake,
    updateCarMake,
    updateCarMakeLoading,

  } = useCarsManagement()

  useEffect(() => {
    fetchCarsMakes()
  }, [fetchCarsMakes])

  const columns = useMemo(() => [
    {
      accessorKey: 'imageUrl',
      header: 'Img',
      cell: ({ row }) => (
        <img src={row.original.imageUrl} alt={row.original.makeNamePl} className="max-w-20 h-20 object-cover" />
      ),
    },
    {
      accessorKey: 'makeId',
      header: 'Make ID',
    },
    {
      accessorKey: 'makeNamePl',
      header: 'Make Name En',
    },
    {
      accessorKey: 'makeNameSl',
      header: 'Make Name Ar',
    },
    {
      accessorKey: 'isActive',
      header: 'Status',
      cell: ({ row }) => (
        <span className={row.original.isActive ? 'text-green-600 px-2 py-1' :
          'text-red-600 px-2 py-1'}>
          {row.original.isActive ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button className="bg-primary-500 text-white px-2 py-1 rounded"
            onClick={() => { setSelectedCarMake(row.original); setOpenMakesModal(true) }}>
            Edit
          </button>
          <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => deleteCarMake(row.original.makeId)}>
            Delete
          </button>
        </div>
      ),
    },

  ], [])
  const table = useReactTable({ data: currentCarsMakes, columns, getCoreRowModel: getCoreRowModel() })

  const handleExportCarsMakes = () => {
    xlsxExport(currentCarsMakes, `Car Makes`);
  };

  return (
    <MainLayout>
      <main className="relative min-h-[calc(100vh-10rem)]">
        <div className="max-w-7xl m-auto my-4 overflow-x-auto">
          <div className="mb-2 pb-4 bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-md">
            <h2 className="text-base font-semibold text-gray-700 flex items-center gap-2 px-4 py-2">Car Makes List</h2>
            <div className="flex justify-between items-center px-4 py-2">
              <div className="flex gap-1">

                <select
                  value={filter.filterBy}
                  onChange={(e) =>
                    setFilter({ ...filter, filterBy: e.target.value, pageNumber: 1, value: '' })
                  }
                  className="w-full rounded-lg border border-gray-300 text-sm text-gray-700 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Search By</option>
                  <option value="makeId">Id</option>
                  <option value="makeNamePl">Make Name En</option>
                  <option value="makeNameSl">Make Name Ar</option>
                </select>
                <input
                  type="text"
                  disabled={filter.filterBy === ''}
                  placeholder="Search..."
                  className="px-3 py-2 border border-gray-300 rounded-lg"
                  onChange={(e) => setFilter({ ...filter, value: e.target.value, pageNumber: 1 })}
                  value={filter.value}
                />
              </div>
              {carsMakesFiltered.length > 0 && !carsMakesLoading &&
                <div className="flex items-end gap-2">
                  <div className="flex items-center gap-1">
                    <label className="block text-xs text-nowrap font-medium text-gray-600">
                      Page Size
                    </label>
                    <select
                      value={filter.pageSize}
                      onChange={(e) =>
                        setFilter({ ...filter, pageSize: e.target.value, pageNumber: 1 })
                      }
                      className="w-full rounded-lg border border-gray-300 text-sm text-gray-700 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="20">20</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                  </div>
                  <button
                    className="bg-primary-500 text-white px-4 hight-auto py-2 rounded-lg text-sm"
                    onClick={handleExportCarsMakes}
                  >
                    <DocumentArrowUpIcon className="w-5 h-5 inline" /> Export
                  </button>
                  <button
                    className="bg-primary-500 text-white px-4 hight-auto py-2 rounded-lg text-sm"
                    onClick={() => setOpenMakesModal(true)}
                  >
                    <PlusIcon className="w-5 h-5 inline" /> Add Car Make
                  </button>
                </div>}
            </div>

            {carsMakesLoading ?
              // Loading Data
              <LoadingState title="Car Makes" />
              :
              (carsMakesFiltered.length === 0 ?
                // When  payment records length 0
                <main className="relative min-h-[calc(100vh-10rem)]">
                  <div className="text-center py-12">
                    <div className="text-gray-500 text-lg">No Car Makes found</div>
                    <div className="mt-2 text-gray-400">No car makes are available.</div>
                  </div>
                </main> :
                // When payment tabe list available
                <>
                  <div className="border border-gray-200 shadow-sm mb-4 overflow-x-auto">
                    <table className="min-w-full border-collapse">
                      <thead className="bg-gradient-to-r from-primary-500/20 to-indigo-500/20">
                        {table.getHeaderGroups().map((hg) => (
                          <tr key={hg.id}>
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

                      <tbody className="bg-white max-h-96 ">
                        {table.getRowModel().rows.map((row, rowIndex) => (
                          <tr
                            key={row.id}
                            className={`transition-all duration-150 ${rowIndex % 2 === 0 ? 'bg-primary-50/40' : 'bg-primary-50'
                              } hover:bg-primary-100/80`}
                          >
                            {row.getVisibleCells().map((cell) => (
                              <td
                                key={cell.id}
                                className="px-2 py-1.5 text-xs font-semibold text-gray-700 whitespace-nowrap border-t border-gray-300"
                              >
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Pagination
                    currentPage={filter.pageNumber}
                    totalPages={totalPages}
                    onPageChange={(page) =>
                      setFilter((prev) => ({
                        ...prev,
                        pageNumber: page,
                      }))
                    }
                  />
                </>
              )
            }
          </div>
        </div>
        <AddCarsMakesModal
          open={openMakesModal}
          onClose={() => { setOpenMakesModal(false); setSelectedCarMake(null); }}
          createCarMake={createCarMake}
          createCarMakesLoading={createCarMakesLoading}
          selectedCarMake={selectedCarMake}
          updateCarMake={updateCarMake}
          updateCarMakeLoading={updateCarMakeLoading}
        />

      </main>
    </MainLayout>
  )
}

export default CarsModels