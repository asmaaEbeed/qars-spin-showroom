import { useEffect, useMemo, useState } from 'react';
import MainLayout from '../../../../components/layout/MainLayout'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { DocumentArrowUpIcon, FolderPlusIcon, PlusIcon } from '@heroicons/react/24/solid';
import LoadingState from '../../../../components/common/LoadingState';
import xlsxExport from '../../../../hooks/xlsxExport';
import Select from 'react-select';
import EmptyState from '../../../../components/common/EmptyState';
import { LuPointer } from 'react-icons/lu';
import AddCarsClassesModal from '../../../../components/management/cars-management/AddCarsClassesModal';
import { Link, useSearchParams } from 'react-router-dom';
import { useCarsManagement } from '../../../../context/CarsManagementContext';
import AddCarsModelsModal from '../../../../components/management/cars-management/AddCarsModelsModal';

const CarsClasses = () => {
  // const [selectedCarMake, setSelectedCarMake] = useState(null);

  const [selectedCarClass, setSelectedCarClass] = useState("");
  const [openClassesModal, setOpenClassesModal] = useState(false);
  const [addModelOpen, setAddModelOpen] = useState(false)

  const [searchParams, setSearchParams] = useSearchParams();

  const makeIdParams = Number(searchParams.get('makeid'));


  const {
    fetchCarsMakes,
    carsMakesFiltered,
    carsMakesLoading,
    carsMakesList,

    fetchCarsClass,
    carsClassLoading,
    carsClassList,

    createCarClass,
    createCarClassesLoading,

    updateCarClass,
    updateCarClassLoading,
    deleteCarClass,

    fetchCarsModel,
    carsModelList,
    carsModelLoading,

    createCarMake,
    createCarMakesLoading,

    deleteCarMake,
    updateCarMake,
    updateCarMakeLoading,

    selectedCarMakeId,
    setSelectedCarMakeId

  } = useCarsManagement()

  useEffect(() => {
    fetchCarsMakes()
  }, [fetchCarsMakes])

  useEffect(() => {

    if (makeIdParams) setSelectedCarMakeId(makeIdParams)
  }, [makeIdParams, setSelectedCarMakeId])

  useEffect(() => {

    if (selectedCarMakeId) {
      fetchCarsClass(selectedCarMakeId);
    }
  }, [fetchCarsClass, selectedCarMakeId]);

  const columns = useMemo(() => [
    {
      accessorKey: 'classId',
      header: 'Class ID',
    },
    {
      accessorKey: 'classNamePl',
      header: 'Class Name En',
    },
    {
      accessorKey: 'classNameSl',
      header: 'Class Name Ar',
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
            onClick={() => { setSelectedCarClass(row.original); setOpenClassesModal(true) }}>
            Edit
          </button>
          <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => deleteCarClass(row.original.classId)}>
            Delete
          </button>
        </div>
      ),
    },
    {
      accessorKey: 'view',
      header: 'Models',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Link to={`/admin/cars-management/car-models?classid=${row.original.classId}&makeid=${selectedCarMakeId}`} className='flex gap-2 items-center text-primary-700'>
            Models
          </Link>
        </div>
      ),
    },

  ], [])
  const table = useReactTable({
    data: carsClassList,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleExportCarClasses = () => {
    xlsxExport(carsClassList, `Car Classes`);
  };

  return (
    <MainLayout>
      <main className="relative min-h-[calc(100vh-10rem)]">
        <div className="max-w-7xl m-auto my-4 overflow-x-auto">
          <div className="mb-2 pb-4 min-h-[calc(100vh-10rem)] bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-md">
            <h2 className="text-base font-semibold text-gray-700 flex items-center gap-2 px-4 py-2">Car Classes List</h2>
            <div className="flex justify-between items-center px-4 py-2">
              <div className="flex gap-1 w-full">
                {carsMakesLoading ? <p className='border p-2 min-w-200'>Loading...</p> : <Select
                  options={carsMakesList}
                  getOptionLabel={(option) => option.makeNamePl}
                  getOptionValue={(option) => String(option.makeId)}
                  value={
                    carsMakesList.find((c) => c.makeId === selectedCarMakeId) || null
                  }
                  onChange={(selected) => {
                    setSearchParams(selected ? {
                      makeid: String(selected.makeId),
                    } : "")
                    setSelectedCarMakeId(selected ? selectedCarMakeId : "")
                    // fetchCarsClass(selected.classId)
                  }
                  }
                  placeholder="Select Car Make"
                  isClearable
                  className='min-w-300'
                  styles={{
                    control: (base, state) => ({
                      ...base,
                      borderColor: state.isFocused
                        ? "#3b82f6" // tailwind primary-500 تقريباً
                        : "#d1d5db", // gray-300
                      boxShadow: state.isFocused
                        ? "0 0 0 1px #3b82f6"
                        : "none",
                      "&:hover": {
                        borderColor: state.isFocused
                          ? "#3b82f6"
                          : "#9ca3af", // gray-400
                      },
                    }),
                  }}
                  formatOptionLabel={(option) => (
                    <div className="grid grid-cols-5 items-center space-x-2">
                      <img
                        alt={option.makeNamePl}
                        src={option.imageUrl}
                        className="col-span-1 w-10 h-10 rounded-full border border-gray-300"
                      />
                      <span className="col-span-2">{option.makeNamePl}</span>
                    </div>
                  )}
                />}
              </div>
              {(selectedCarMakeId) &&
                <div className="flex items-end gap-2 w-full justify-end">
                  <button
                    disabled={!selectedCarMakeId}
                    className="bg-primary-500 text-white px-4 hight-auto py-2 rounded-lg text-sm disabled:bg-primary-200 disabled:cursor-not-allowed"
                    onClick={handleExportCarClasses}
                  >
                    <DocumentArrowUpIcon className="w-5 h-5 inline" /> Export
                  </button>
                  <button
                    disabled={!selectedCarMakeId}
                    className="bg-primary-500 text-white px-4 hight-auto py-2 rounded-lg text-sm disabled:bg-primary-200 disabled:cursor-not-allowed"
                    onClick={() => setOpenClassesModal(true)}
                  >
                    <PlusIcon className="w-5 h-5 inline" /> Add Car Class
                  </button>
                </div>}
            </div>

            {carsClassLoading ?
              // Loading Data
              <LoadingState title="Car Makes" />
              :
              selectedCarMakeId ?
                ((carsClassList.length === 0) ?
                  // When  payment records length 0
                  <EmptyState
                    icon={<FolderPlusIcon className="h-10 w-10 text-white" />}
                    title="No classes Found"
                    description={
                      carsClassList?.length
                        ? "Try adjusting your search filters or clear all filters to see more results"
                        : "Start by creating your first class"
                    }
                    actionIcon={<PlusIcon className="mr-2 h-5 w-5" />}
                    actionLabel="Create First Class"
                    onAction={() => setOpenClassesModal(true)}
                  /> :
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
                  </>
                ) : <EmptyState
                  icon={<LuPointer className="h-10 w-10 text-white" />}
                  title="Select Car Makes"
                  description={
                    carsMakesList?.length
                      ? "select Car Makes to view it's classes list."
                      : "No car makes fount you can add from car makes page"
                  }
                />
            }
          </div>
        </div>
        <AddCarsClassesModal
          open={openClassesModal}
          onClose={() => { setOpenClassesModal(false); setSelectedCarClass(null); }}
          createCarClass={createCarClass}
          createCarClassesLoading={createCarClassesLoading}
          selectedCarClass={selectedCarClass}
          updateCarClass={updateCarClass}
          updateCarClassLoading={updateCarClassLoading}
          setAddModelOpen={setAddModelOpen}
        />

        <AddCarsModelsModal
          open={addModelOpen}
          onClose={() => { setAddModelOpen(false); }}
        />

      </main>
    </MainLayout>
  )
}

export default CarsClasses