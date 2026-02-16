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
  const [masterOrderId, setMasterOrderId] = useState("");
  const [paymentExecuteLoading, setPaymentExecuteLoading] = useState(false);
  const [servicesPrice, setServicesPrice] = useState({
    requestFeaturePrice: 0,
    request360Price: 0,
  });
  const [requestType, setRequestType] = useState({type: "", price: ""});

  const { showroomInitData } = usePosts();

  const onPaymentInitiate = useCallback(
    async (type, price, serviceId, postId) => {
      const mobile = showroomInitData.contactPhone
        .trim() // remove spaces at start/end
        .replace(/^\s*\+/, "00") // replace + even if preceded by spaces
        .replace(/[^\d]/g, ""); // remove non-digits
      setRequestType({type, price});
      const body = {
        postId: postId,
        qarsServiceIds: [serviceId],
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
        setPaymentMethod(res.data.myFatoorahRawJson.Data.PaymentMethods);
        setMasterOrderId(res.data.masterOrderId);
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
      // ...data,
      ordermasterId: data.masterOrderId,
      paymentMethodId: data.PaymentMethodId,
      returnUrl: `${process.env.REACT_APP_PAYMENT_RETURN_URL}`,
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
      let servicesPrices;
      res.data.map(
        (service) =>
          service.qarsServiceType === "Partner" &&
          (service.qarsServiceName === "Request to Feature a Post"
            ? (servicesPrices = {
                ...servicesPrices,
                requestFeaturePrice: service.qarsServicePrice,
                requestFeatureId: service.qarsServiceId,
              })
            : service.qarsServiceName === "Request 360 Photo Session" &&
              (servicesPrices = {
                ...servicesPrices,
                request360Price: service.qarsServicePrice,
                request360Id: service.qarsServiceId,
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
      masterOrderId,
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
      masterOrderId,
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
