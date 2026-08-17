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
import { useSearchParams } from 'react-router-dom';
import { useCarsManagement } from '../../../../context/CarsManagementContext';
import AddCarsModelsModal from '../../../../components/management/cars-management/AddCarsModelsModal';
import { usePosts } from '../../../../context/PostsContext';

const CarsModels = () => {
  // const [selectedCarMake, setSelectedCarMake] = useState(null);

  const [selectedCarModel, setSelectedCarModel] = useState("");
  const [openModelModal, setOpenModelModal] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const makeIdParams = Number(searchParams.get('makeid'));
  const classIdParams = Number(searchParams.get('classid'));


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
    setSelectedCarMakeId,
    setSelectedCarClassId,

    selectedCarClassId,
    createCarModelLoading,
    modelUpdateSuccess,
    createCarModel,
    updateCarModel,
    updateCarModelLoading,
    deleteCarModel,
    

  } = useCarsManagement()

  const { setCarsClassList } = usePosts()

  useEffect(() => {
    fetchCarsMakes()
  }, [fetchCarsMakes])

  useEffect(() => {

    if (makeIdParams) setSelectedCarMakeId(makeIdParams)
  }, [makeIdParams, setSelectedCarMakeId, classIdParams, setSelectedCarClassId])

  useEffect(() => {
    if (selectedCarMakeId && classIdParams && carsClassList.length > 0) setSelectedCarClassId(classIdParams)
  }, [selectedCarMakeId, classIdParams, setSelectedCarClassId, carsClassList])

  useEffect(() => {

    if (selectedCarMakeId) {
      fetchCarsClass(selectedCarMakeId);
    }
  }, [fetchCarsClass, selectedCarMakeId]);

  useEffect(() => {

    if (selectedCarClassId) {
      fetchCarsModel(selectedCarMakeId, selectedCarClassId);
    }
  }, [selectedCarMakeId, fetchCarsModel, selectedCarClassId]);

  const columns = useMemo(() => [
    {
      accessorKey: 'modelId',
      header: 'model ID',
    },
    {
      accessorKey: 'modelNamePl',
      header: 'Model Name En',
    },
    {
      accessorKey: 'modelNameSl',
      header: 'Model Name Ar',
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
            onClick={() => { setSelectedCarModel(row.original); setOpenModelModal(true) }}>
            Edit
          </button>
          <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => deleteCarModel(row.original.modelId)}>
            Delete
          </button>
        </div>
      ),
    },

  ], [])
  const table = useReactTable({
    data: carsModelList,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleExportCarMakes = () => {
    xlsxExport(carsModelList, `Car Models`);
  };

  return (
    <MainLayout>
      <main className="relative min-h-[calc(100vh-10rem)]">
        <div className="max-w-7xl m-auto my-4 overflow-x-auto">
          <div className="mb-2 pb-4 min-h-[calc(100vh-10rem)] bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-md">
            <h2 className="text-base font-semibold text-gray-700 flex items-center gap-2 px-4 py-2">Car Models List</h2>
            <div className="flex justify-between items-center px-4 py-2">
              <div className="flex gap-4 w-1/2">

                <div className="flex gap-1 w-full">
                  {carsMakesLoading ? <p className='border p-2 w-full'><span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mx-2"></span>Loading...</p> :
                    <Select
                      loadingState={carsMakesLoading}
                      options={carsMakesList}
                      getOptionLabel={(option) => option.makeNamePl}
                      getOptionValue={(option) => String(option.makeId)}
                      value={
                        carsMakesList.find((c) => c.makeId === selectedCarMakeId) || null
                      }
                      onChange={(selected) => {
                        setSelectedCarClassId(null);
                        setCarsClassList([])
                        if (selected) {
                          setSearchParams(prev => ({ ...prev, makeid: String(selected.makeId) }))
                          setSelectedCarMakeId(selected.makeId)
                        } else setSelectedCarMakeId("")
                      }
                      }
                      placeholder="Select Car Make"
                      isClearable
                      className='w-full'
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

                <div className="flex gap-1 w-full">
                  {carsClassLoading ? <p className='border p-2 w-full'><span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mx-2"></span>Loading...</p> : <Select
                    // loadingState={carsClassLoading}
                    disabled={!selectedCarMakeId}
                    options={carsClassList}
                    getOptionLabel={(option) => option.classNamePl}
                    getOptionValue={(option) => String(option.classId)}
                    value={
                      carsClassList.find((c) => c.classId === selectedCarClassId) || null
                    }
                    onChange={(selected) => {
                      if (selected) {
                        setSearchParams(prev => ({ ...prev, classid: String(selected.classId) }))
                        setSelectedCarClassId(selected.classId)
                      } else setSelectedCarClassId("")
                      // setSearchParams({
                      //   ...searchParams,
                      //   ...(selected
                      //     ? { classid: String(selected.classId) }
                      //     : {}),
                      // });
                      // setSelectedCarClassId(selected ? selected.classId : "")
                    }}
                    placeholder="Select Car Class"
                    isClearable
                    className='w-full'
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
                      <span className="col-span-2">{option.classNamePl}</span>
                    )}
                  />}
                </div>
              </div>
              {(selectedCarClassId) &&
                <div className="flex items-end gap-2 justify-end">
                  <button
                    disabled={!selectedCarClassId && carsModelList.length > 0}
                    className="bg-primary-500 text-white px-4 hight-auto py-2 rounded-lg text-sm disabled:bg-primary-200 disabled:cursor-not-allowed"
                    onClick={handleExportCarMakes}
                  >
                    <DocumentArrowUpIcon className="w-5 h-5 inline" /> Export
                  </button>
                  <button
                    disabled={!selectedCarClassId}
                    className="bg-primary-500 text-white px-4 hight-auto py-2 rounded-lg text-sm disabled:bg-primary-200 disabled:cursor-not-allowed"
                    onClick={() => setOpenModelModal(true)}
                  >
                    <PlusIcon className="w-5 h-5 inline" /> Add Car Model
                  </button>
                </div>}
            </div>

            {carsModelLoading ?
              // Loading Data
              <LoadingState title="Car Models" />
              :
              selectedCarMakeId && selectedCarClassId ?
                ((carsClassList.length === 0) ?
                  <EmptyState
                    icon={<FolderPlusIcon className="h-10 w-10 text-white" />}
                    title="No Models Found"
                    description={
                      carsModelList?.length
                        ? "Try adjusting your search filters or clear all filters to see more results"
                        : "Start by creating your first model"
                    }
                    actionIcon={<PlusIcon className="mr-2 h-5 w-5" />}
                    actionLabel="Create First Model"
                    onAction={() => setOpenModelModal(true)}
                  /> :
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
                  title="Select Car Class"
                  description={
                    carsClassList?.length
                      ? "select Car Class to view it's models list."
                      : "No car Models found you can add from car makes page"
                  }
                />
            }
          </div>
        </div>
        <AddCarsModelsModal
          open={openModelModal}
          onClose={() => { setOpenModelModal(false); setSelectedCarModel(null); }}
          selectedCarModel={selectedCarModel}
        />

      </main>
    </MainLayout>
  )
}

export default CarsModels