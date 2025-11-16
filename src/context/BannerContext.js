import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { bannerAPI } from "../services/api";
import { toast } from "react-toastify";
import { getDates } from "../utils/getDates";
import { formatDateTime } from "../utils/dateFormatter";

const BannerContext = createContext(null);

export const BigBannerProvider = ({ children }) => {
  const [bigBanners, setBigBanners] = useState([]);
  const [loadingBigBanner, setLoadingBigBanner] = useState(false);
  const [errorBigBanner, setErrorBigBanner] = useState(null);
  const [editingBanner, setEditingBanner] = useState(null);
  const [bannerType, setBannerType] = useState("");

  const [uploadSlot, setUploadSlot] = useState("");

  const [loadingUploadBigBanner, setLoadingUploadBigBanner] = useState(false);
  const [loadingAddBigBanner, setLoadingAddBigBanner] = useState(false);

  const [loadingApproveBigBanner, setLoadingApproveBigBanner] = useState(false);

  const initialFilterValues = useMemo(() => {
    return {
      bannerType: bannerType,
      targetType: "",
      status: "",
      startDate: getDates().lastMonth,
      endDate: getDates().today,
    };
  }, [bannerType]);

  const [filter, setFilter] = useState(initialFilterValues);

  useEffect(() => {
    setFilter(initialFilterValues);
  }, [initialFilterValues]);

  const initialValues = useMemo(() => {
    return {
      bannerTitle: editingBanner?.bannerTitle || "",
      targetUrlPl: editingBanner?.targetUrlPl || "",
      targetUrlSl: editingBanner?.targetUrlSl || "",
      targetType: editingBanner?.targetType || "Global",
      bannerRemarks: editingBanner?.bannerRemarks || "",
      startDate: formatDateTime(editingBanner?.startDate, { type: "date" }) || getDates().today,
      endDate: formatDateTime(editingBanner?.endDate, { type: "date" }) || getDates().nextWeek,
    };
  }, [editingBanner]);
  // Banner Info Modal
  const [formData, setFormData] = useState(initialValues);

  useEffect(() => {
    setFormData(initialValues);
  }, [initialValues]);

  const resetFilter = useCallback(() => setFilter(initialFilterValues), [initialFilterValues]);

  const fetchBigBanner = useCallback(async (params) => {
    setLoadingBigBanner(true);
    setErrorBigBanner(null);
    try {
      const res = await bannerAPI.getBanners(params);
      setBigBanners(res.data);
    } catch (e) {
      setErrorBigBanner(e);
    } finally {
      setLoadingBigBanner(false);
    }
  }, []);

  // Upload Banner Image
  const handleUploadConfirm = useCallback(async (uploadFile, slot, id) => {
    setLoadingUploadBigBanner(true);
    try {
      if (slot === "pl") {
        const res = await bannerAPI.uploadBigBannerPl(id, uploadFile);
        if (res.status === 200) {
          fetchBigBanner(filter);
          setBigBanners((prev) =>
            prev.map((banner) =>
              banner.bannerId === id
                ? { ...banner, imageUrlPl: res.data.imageUrl }
                : banner
            )
          );
          toast.success("Banner uploaded successfully!");
          return res;
        }
      } else {
        const res = await bannerAPI.uploadBigBannerSl(id, uploadFile);
        if (res.status === 200) {
          fetchBigBanner(filter);
          
          setBigBanners((prev) =>
            prev.map((banner) =>
              banner.bannerId === id
                ? { ...banner, imageUrlSl: res.data.imageUrl }
                : banner
            )
          );
          toast.success("Banner uploaded successfully!");
          return res;
        }
      }
      //setBigBanners(res.data);
    } catch (e) {
      setErrorBigBanner(e);
      console.log(e);
      toast.error(e.response?.data?.message || "Something went worng!");
    } finally {
      setLoadingUploadBigBanner(false);
    }
  }, []);

  const handleAddBanner = useCallback(async (data) => {
    setLoadingAddBigBanner(true);
    try {
      const res = await bannerAPI.createBigBanner(data);
      const newData = {
        ...data,
        bannerId: res.data.bannerId,
        bannerStatus: "Draft",
      };
      setBigBanners((prev) => [newData, ...prev]);
      // resetForm();
      toast.success(res.data.message || "Banner added successfully!");
      return res;
    } catch (e) {
      toast.error(e.response?.data?.title || "Something went worng!");
      setErrorBigBanner(e);
      console.log(e);
    } finally {
      setLoadingAddBigBanner(false);
    }
  }, []);

  const handleEditBanner = useCallback(async (id, data) => {
    setLoadingAddBigBanner(true);
    try {
      const res = await bannerAPI.editBigBanner(id, data);
      const newData = {
        ...data,
      };
      setBigBanners((prev) => prev.map((banner) => banner.bannerId === id ? { ...banner, ...newData } : banner));
      // resetForm();
      fetchBigBanner(filter);
      toast.success(res.data.message || "Banner updated successfully!");
      return res;
    } catch (e) {
      setErrorBigBanner(e);
      toast.error(e.response.data.title || "Something went worng!");
      console.log(e);
    } finally {
      setLoadingAddBigBanner(false);
    }
  }, []);

  const handleApproveBanner = useCallback(async (id, status) => {
    setLoadingApproveBigBanner(true);
    try {
      const res = await bannerAPI.approveBanner(id, status);
      
      setBigBanners((prev) => prev.map((banner) => banner.bannerId === id ? { ...banner, bannerStatus: "Approved" } : banner));
      // resetForm();
      toast.success(res.data.message || "Banner approved successfully!");
      return res;
    } catch (e) {
      setErrorBigBanner(e);
      console.log(e);
      toast.error(e.response.data.title || "Something went worng!");
    } finally {
      setLoadingApproveBigBanner(false);
    }
  }, []);

  const resetBannerForm = useCallback(() => {
    setEditingBanner(null);
    setFormData(initialValues);
  }, [initialValues]);


  const value = useMemo(
    () => ({
      bigBanners,
      loadingBigBanner,
      errorBigBanner,
      fetchBigBanner,
      setEditingBanner,
      editingBanner,
      handleUploadConfirm,
      loadingUploadBigBanner,
      loadingAddBigBanner,
      handleAddBanner,
      handleEditBanner,
      formData,
      setFormData,
      resetBannerForm,
      setUploadSlot,
      uploadSlot,
      bannerType,
      setBannerType,
      filter,
      setFilter,
      resetFilter,
      loadingApproveBigBanner,
      handleApproveBanner
    }),
    [
      bigBanners,
      loadingBigBanner,
      errorBigBanner,
      fetchBigBanner,
      setEditingBanner,
      editingBanner,
      handleUploadConfirm,
      loadingUploadBigBanner,
      loadingAddBigBanner,
      handleAddBanner,
      handleEditBanner,
      formData,
      setFormData,
      resetBannerForm,
      setUploadSlot,
      uploadSlot,
      bannerType,
      setBannerType,
      filter,
      setFilter,
      resetFilter,
      loadingApproveBigBanner,
      handleApproveBanner
    ]
  );

  return (
    <BannerContext.Provider value={value}>{children}</BannerContext.Provider>
  );
};

export const useBannerContext = () => {
  const context = useContext(BannerContext);
  if (!context) {
    throw new Error("useBannerContext must be used within a BigBannerProvider");
  }
  return context;
};
