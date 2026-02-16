import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { RequestsApi } from "../services/api";

const RequestContext = createContext(null);

export const RequestProvider = ({ children }) => {
  const [requests, setRequests] = useState([]);
  const [allRequests, setAllRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [errorRequests, setErrorRequests] = useState(null);
  const [editingBanner, setEditingBanner] = useState(null);
  const [bannerType, setBannerType] = useState("");

  const [uploadSlot, setUploadSlot] = useState("");

  const initialFilterValues = useMemo(() => {
    return {
      requestType: "",
      status: "",
      requestBy: "",
      sortDate: "",
      sourceKind: "",
    };
  }, []);

  const [filter, setFilter] = useState(initialFilterValues);
  const [sortDate, setSortDate] = useState("desc");

  const resetFilter = useCallback(() => {
    setSortDate("desc");
    setFilter(initialFilterValues);
  }, [initialFilterValues]);

  useEffect(() => {
    let result = [...allRequests];

    // 🔹 FILTER
    result = result.filter((request) => {
      if (filter.requestType && request.requestType !== filter.requestType)
        return false;

      if (filter.status && request.status !== filter.status) return false;

      if (filter.sourceKind && request.sourceKind !== filter.sourceKind)
        return false;

      return true;
    });

    // 🔹 SORT BY DATE
    if (sortDate === "asc") {
      result.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
    }

    if (sortDate === "desc") {
      result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    }

    setRequests(result);
  }, [filter, sortDate, allRequests]);

  const fetchRequests = useCallback(async (params) => {
    setLoadingRequests(true);
    setErrorRequests(null);
    try {
      const res = await RequestsApi.getRequests();
      console.log(res.data);
      setAllRequests(res.data);
      setRequests(res.data);
      // setRequests(dummyData);
    } catch (e) {
      setErrorRequests(e);
    } finally {
      setLoadingRequests(false);
    }
  }, []);

  const fetchUserRequests = useCallback(async (userName) => {
    setLoadingRequests(true);
    setErrorRequests(null);
    try {
      const res = await RequestsApi.getUserRequests(userName);
      console.log(res.data);
      setAllRequests(res.data);
      setRequests(res.data);
      // setRequests(dummyData);
    } catch (e) {
      setErrorRequests(e);
    } finally {
      setLoadingRequests(false);
    }
  }, []);

  const updateRequestStatus = useCallback((id, status) => {
    setRequests((prev) =>
      prev.map((request) =>
        request.id === id ? { ...request, status } : request,
      ),
    );
  }, []);

  const value = useMemo(
    () => ({
      allRequests,
      requests,
      loadingRequests,
      errorRequests,
      fetchRequests,
      setEditingBanner,
      editingBanner,
      setUploadSlot,
      uploadSlot,
      bannerType,
      setBannerType,
      filter,
      setFilter,
      resetFilter,
      sortDate,
      setSortDate,
      updateRequestStatus,
      fetchUserRequests,
    }),
    [
      allRequests,
      requests,
      loadingRequests,
      errorRequests,
      fetchRequests,
      setEditingBanner,
      editingBanner,
      setUploadSlot,
      uploadSlot,
      bannerType,
      setBannerType,
      filter,
      setFilter,
      resetFilter,
      sortDate,
      setSortDate,
      updateRequestStatus,
      fetchUserRequests,
    ],
  );

  return (
    <RequestContext.Provider value={value}>{children}</RequestContext.Provider>
  );
};

export const useRequestContext = () => {
  const context = useContext(RequestContext);
  if (!context) {
    throw new Error(
      "useRequestContext must be used within a BigBannerProvider",
    );
  }
  return context;
};
