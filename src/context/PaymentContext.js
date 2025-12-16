import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { PaymentApi } from "../services/api";
import { usePosts } from "./PostsContext";

const PaymentContext = createContext(null);

export const PaymentProvider = ({ children }) => {
  const [initiateData, setInitiateData] = useState({});
  const [paymentMethod, setPaymentMethod] = useState([]);
  const [paymentMethodLoading, setPaymentMethodLoading] = useState(false);
  const [paymentExecuteLoading, setPaymentExecuteLoading] = useState(false);
  const [servicesPrice, setServicesPrice] = useState({
    requestFeature: 0,
    request360: 0,
  });
  const [requestType, setRequestType] = useState({type: "", price: ""});

  const { showroomInitData } = usePosts();

  const onPaymentInitiate = useCallback(
    async (type, price) => {
      const mobile = showroomInitData.contactPhone
        .trim() // remove spaces at start/end
        .replace(/^\s*\+/, "00") // replace + even if preceded by spaces
        .replace(/[^\d]/g, ""); // remove non-digits
      setRequestType({type, price});
      const body = {
        amount: price,
        customerName: showroomInitData.partnerNamePl,
        email: showroomInitData.notificationEmail,
        mobile: mobile,
        //type
        // mobile: "01280077763",
      };
      setInitiateData(body);

      try {
        setPaymentMethodLoading(true);
        const res = await PaymentApi.initiatePayment(body);
        setPaymentMethod(res.data.Data.PaymentMethods);
        return res;
      } catch (e) {
        console.log(e);
      } finally {
        setPaymentMethodLoading(false);
      }
    },
    [showroomInitData]
  );

  const onPaymentExecute = useCallback(async (data) => {
    const body = {
      ...data,
      paymentMethodId: data.PaymentMethodId,
      returnUrl: `${process.env.REACT_APP_PAYMENT_RETURN_URL}?status=success`,
    };
    try {
      setPaymentExecuteLoading(true);
      const res = await PaymentApi.paymentExecute(body);
      return res;
    } catch (e) {
      return e;
    } finally {
      setPaymentExecuteLoading(false);
    }
  }, []);

  const onGetQarsServices = useCallback(async () => {
    try {
      const res = await PaymentApi.getQarsServices();
      let servicesPrices = { requestFeature: 0, request360: 0 };
      res.data.map(
        (service) =>
          service.qarsServiceType === "Partner" &&
          (service.qarsServiceName === "Request to feature"
            ? (servicesPrices = {
                ...servicesPrices,
                requestFeature: service.qarsServicePrice,
              })
            : service.qarsServiceName === "Request to 360" &&
              (servicesPrices = {
                ...servicesPrices,
                request360: service.qarsServicePrice,
              }))
      );
      setServicesPrice(servicesPrices);
      return servicesPrices;
    } catch (e) {
      console.log(e);
    }
  }, []);

  const value = useMemo(
    () => ({
      initiateData,
      onPaymentInitiate,
      paymentMethod,
      paymentMethodLoading,
      paymentExecuteLoading,
      onPaymentExecute,
      onGetQarsServices,
      servicesPrice,
      requestType
    }),
    [
      initiateData,
      onPaymentInitiate,
      paymentMethod,
      paymentMethodLoading,
      paymentExecuteLoading,
      onPaymentExecute,
      onGetQarsServices,
      servicesPrice,
      requestType
    ]
  );
  return (
    <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>
  );
};

export const usePaymentContext = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error("usePaymentContext must be used within a PaymentProvider");
  }
  return context;
};
