import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { AdminPartnerAPI } from "../services/api";
import { toast } from "react-toastify";

const ShowroomContext = createContext(null);

export const ShowroomProvider = ({ children }) => {
  const [partnerUsers, setPartnerUsers] = useState([]);
  const [loadingPartnerUsers, setLoadingPartnerUsers] = useState(false);
  const [errorPartnerUsers, setErrorPartnerUsers] = useState(null);
  const [editUserStatusLoading, setEditUserStatusLoading] = useState(false);

  const addNewShowroomUser = useCallback(async (formData) => {
    try {
      const res = await AdminPartnerAPI.addParnerUser(formData);
      if (res.status === 200 || res.status === 201) {
        toast.success(res.data.message || "User added successfully");
      }
      return res;
    } catch (e) {
      if (e.status === 409) {
        toast.error(e.response.data || "Failed to add user");
      }
    }
  }, []);

  const getPartnerUsers = useCallback(async (id) => {
    try {
      setLoadingPartnerUsers(true);
      const res = await AdminPartnerAPI.getPartnerUsers(id);
      if (res.status === 200 || res.status === 201) {
        console.log(res.data);
        setPartnerUsers(res.data);
      }
      return res;
    } catch (e) {
      console.log(e);
      setErrorPartnerUsers(e);
    } finally {
      setLoadingPartnerUsers(false);
    }
  }, []);

  const editPartnerUserStatus = useCallback(async (data) => {
    try {
      setEditUserStatusLoading(true);
      const res = await AdminPartnerAPI.editPartnerUserStatus(data);
      console.log(res);
      if (res.status === 200 || res.status === 201) {
        toast.success(res.data.message || "User status updated successfully");
        const value = data.action === "Unsuspend";
        setPartnerUsers((prev) =>
          prev.map((e) =>
            e.userName === data.userName ? { ...e, approved: value } : e
          )
        );
      }
      return res;
    } catch (e) {
      console.log(e);
    } finally {
      setEditUserStatusLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      addNewShowroomUser,
      getPartnerUsers,
      loadingPartnerUsers,
      editPartnerUserStatus,
      editUserStatusLoading,
      errorPartnerUsers,
      partnerUsers,
    }),
    [
      addNewShowroomUser,
      getPartnerUsers,
      loadingPartnerUsers,
      editPartnerUserStatus,
      editUserStatusLoading,
      errorPartnerUsers,
      partnerUsers,
    ]
  );
  return (
    <ShowroomContext.Provider value={value}>
      {children}
    </ShowroomContext.Provider>
  );
};

export const useShowroomContext = () => {
  const context = useContext(ShowroomContext);
  if (!context) {
    throw new Error(
      "useShowroomContext must be used within a ShowroomProvider"
    );
  }
  return context;
};
