import { useMemo } from 'react'
import { usePayments } from '../../../hooks/admin/reports/usePayments'
import MainLayout from '../../../components/layout/MainLayout'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import LoadingState from '../../../components/common/LoadingState'
import Pagination from '../../../components/layout/Pagination'
import { formatDateTime } from '../../../utils/dateFormatter'
import PaymentReportFilter from '../../../components/reports/payment-reports/PaymentReportFilter'
import xlsxExport from '../../../hooks/xlsxExport'
import { DocumentArrowUpIcon } from '@heroicons/react/24/solid'
import PaymentReportHeader from '../../../components/reports/payment-reports/PaymentReportHeader'
import PaymentReportStatistics from '../../../components/reports/payment-reports/PaymentReportStatistics'

const PaymentReports = () => {
  const {
    paymentReportLoading,
    paymentReportData,
    filter,
    setFilter,
    resetFilter,
  } = usePayments()

  console.log(filter  )


  const payments = useMemo(() => paymentReportData.payments || [], [paymentReportData.payments])
  const totalPages = paymentReportData.totalPages

  const handleExportOffers = () => {
    xlsxExport(payments, `Payment Reports`);
  };

  const columns = useMemo(() => [
    // {
    //   accessorKey: 'paymentId',
    //   header: 'ID',

    // },
    {
      accessorKey: 'invoiceId',
      header: 'Invoice ID',
      cell: ({ row }) => <div className="text-center">{row.original.invoiceId}</div>
    },
    {
      accessorKey: 'paymentDate',
      header: 'Payment Date',
      cell: ({ row }) => <div className="text-center space-y-1">
        <div>
          {formatDateTime(row.original.paymentDate, { type: "date" })}</div>
        <div className="text-gray-500">
          {formatDateTime(row.original.paymentDate, { type: "time" })}</div>
      </div>,
    },

    // {
    //   accessorKey: 'paymentMethod',
    //   header: 'Payment Method',
    //   cell: ({ row }) => (
    //     <div className="max-w-40 truncate" title={row.original.paymentMethod || '-'}>
    //       {row.original.paymentMethod || '-'}
    //     </div>
    //   ),
    // },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ row }) => <Amount data={row.original} />,
    },
    {
      accessorKey: 'paymentStatus',
      header: 'Status',
      cell: ({ row }) => <PaymentStatus status={row.original.paymentStatus} />,
    },

    {
      accessorKey: 'transactionId',
      header: 'Transaction ID',
      cell: ({ row }) => (
        <div className="max-w-44 truncate" title={row.original.transactionId || '-'}>
          {row.original.transactionId || '-'}
        </div>
      ),
    },
    {
      accessorKey: 'orderMasterId',
      header: 'Order ID',
    },
    {
      accessorKey: 'customerName',
      header: 'User Name',
      cell: ({ row }) => (
        <div className="max-w-40 truncate" title={row.original.customerName || '-'}>
          {row.original.customerName || '-'}
        </div>
      ),
    },
    {
      accessorKey: 'customerEmail',
      header: 'Email',
      cell: ({ row }) => (
        <div className="max-w-48 truncate" title={row.original.customerEmail || '-'}>
          {row.original.customerEmail || '-'}
        </div>
      ),
    },
    {
      accessorKey: 'customerMobile',
      header: 'Mobile',
    },
    {
      accessorKey: 'serviceName',
      header: 'Service',
      cell: ({ row }) => (
        <div className="max-w-40 text-wrap" title={row.original.serviceName || '-'}>
          {row.original.serviceName === "Request to Feature a Post" ? "Feature Service" :
            row.original.serviceName === "Request 360 Photo Session" ? "360° Service" : "-"}
        </div>
      ),
    },
    {
      accessorKey: 'serviceType',
      header: 'Type',
    },
  ], [])

  const table = useReactTable({ data: payments, columns, getCoreRowModel: getCoreRowModel() })

  return (
    <MainLayout>
      <PaymentReportHeader description="Track your payment requests" />
      <PaymentReportStatistics data={paymentReportData} />
      <main className="relative min-h-[calc(100vh-10rem)]">
        <div className="max-w-7xl m-auto my-4 overflow-x-auto">
          <div className="mb-2 pb-4 bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-md">
            <PaymentReportFilter
              filter={filter}
              setFilter={setFilter}
              resetFilter={resetFilter}
            />
            <div className="flex justify-between items-center px-4 py-2">
              <h2 className="text-base font-semibold text-gray-700 flex items-center gap-2">Payments List</h2>
              {payments.length > 0 && !paymentReportLoading &&
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
                      {/* <option value="">All</option> */}
                      <option value="20">20</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                      <option value={paymentReportData.totalCount}>All</option>
                    </select>
                  </div>
                  <button
                    className="bg-primary-500 text-white px-4 hight-auto py-2 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700"
                    onClick={handleExportOffers}
                  >
                    <DocumentArrowUpIcon className="w-5 h-5 inline" /> Export
                  </button>
                </div>}
            </div>

            {paymentReportLoading ?
              // Loading Data
              <LoadingState title="Payments" />
              :
              (payments.length === 0 ?
                // When  payment records length 0
                <main className="relative min-h-[calc(100vh-10rem)]">
                  <div className="text-center py-12">
                    <div className="text-gray-500 text-lg">No Payments found</div>
                    <div className="mt-2 text-gray-400">No payment records are available.</div>
                  </div>
                </main> :
                // When payment tabe list available
                <>
                  <div className="rounded-xl border border-gray-200 shadow-sm mb-4 overflow-x-auto">
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
                  /></>)
            }
          </div>
        </div>


      </main>
    </MainLayout>
  )
}

export default PaymentReports

const Amount = ({ data }) => {
  const currency = data.currency || 'QAR'
  const amount = Number(data.amount || 0).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return <div className='text-green-700'>{amount} {currency}</div>
}

const PaymentStatus = ({ status }) => {
  const currentStatus = status || '-'
  const statusClass = currentStatus === 'Paid' || currentStatus === 'Success'
    ? 'bg-green-500'
    : currentStatus === 'Failed'
      ? 'bg-red-500'
      : currentStatus === 'Pending'
        ? 'bg-yellow-500'
        : 'bg-gray-500'

  return (
    <div className={`text-xs font-semibold inline-flex items-center justify-center text-white px-2 py-1 rounded-full ${statusClass}`}>
      {currentStatus}
    </div>
  )
}
