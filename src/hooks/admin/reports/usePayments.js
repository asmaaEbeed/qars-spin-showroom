import { useCallback, useState } from "react";
import { PaymentReportApi } from "../../../services/api/payment/paymentReports.api";
import { useEffect } from "react";
import getCurrentDateTime from "../../../utils/getCurrentDateTime";
import { getFirstDayOfCurrentMonth } from "../../../utils/getFirstDayOfCurrentMonth";

const initialFilter = {
  serviceName: "",
  serviceType: "",
  paymentStatus: "",
  userName: "",
  startDate: getFirstDayOfCurrentMonth(),
  endDate: getCurrentDateTime(),
  pageNumber: 1,
  pageSize: 20,
  totalCount: 0,
};

const buildPaymentReportParams = (filter) => {
  const params = {};

  if (filter.serviceName) params.ServiceName = filter.serviceName;
  if (filter.serviceType) params.serviceType = filter.serviceType;
  if (filter.paymentStatus) params.PaymentStatus = filter.paymentStatus;
  if (filter.userName) params.UserName = filter.userName;
  if (filter.startDate)
    params.StartDate = new Date(filter.startDate).toISOString();
  if (filter.endDate) params.EndDate = new Date(filter.endDate).toISOString();
  params.PageNumber = filter.pageNumber;
  params.PageSize = filter.pageSize;
  return params;
};

export const usePayments = () => {
  const [paymentReportLoading, setPaymentReportLoading] = useState(false);
  const [filter, setFilter] = useState(initialFilter);

  const [paymentReportData, setPaymentReportData] = useState({
    pageNumber: 1,
    pageSize: 10,
    payments: [],
    totalCount: 0,
    totalPages: 0,
    summary: {
      totalAmount: null,
      paidAmount: null,
      pendingAmount: null,
      failedAmount: null,
      totalCount: null,
      paidCount: null,
      pendingCount: null,
      failedCount: null,
    },
  });
  const getPaymentsReport = useCallback(async () => {
    try {
      setPaymentReportLoading(true);
      const params = buildPaymentReportParams(filter);

      const res = await PaymentReportApi.getPaymentReport(params);

      if (res.status === 200 || res.status === 201) {
        const totalPages = Math.ceil(res.data.totalCount / filter.pageSize);
        setPaymentReportData({
          ...res.data,
          totalPages,
        });
      }

      return res;
    } catch (e) {
      console.log(e);
    } finally {
      setPaymentReportLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    getPaymentsReport();
  }, [filter, getPaymentsReport]);

  const resetFilter = () => {
    setFilter(initialFilter);
  };

  return {
    getPaymentsReport,
    paymentReportLoading,
    paymentReportData,
    filter,
    setFilter,
    resetFilter,
  };
};
