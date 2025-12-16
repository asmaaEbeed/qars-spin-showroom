import { useState, useCallback, useMemo, useEffect } from "react";
import { validationRules } from "../utils/validationRules";
import { validateField } from "../utils/validateField";
import { usePosts } from "../../../context/PostsContext";

export function usePostForm(post, showroomInitData) {
  // Hooks
  const { fetchCarsClass, fetchCarsModel } = usePosts();
  const rules = validationRules(!!post);

  // InitialData
  const initialData = useMemo(
    () => ({
      carNamePl: post?.carNamePl || "",
      makeId: post?.makeId || "",
      classId: post?.classId || "",
      modelId: post?.modelId || "",
      categoryId: post?.categoryId || "",
      manufactureYear: post?.manufactureYear || new Date().getFullYear(),
      askingPrice: post?.askingPrice || "",
      minimumPrice: post?.minimumPrice || "",
      mileage: post?.mileage || "",
      warrantyIsAvailable: post?.warrantyIsAvailable || "",
      colorExterior: post?.colorExterior || "#000",
      exteriorColorNamePl: post?.exteriorColorNamePl || "",
      exteriorColorNameSl: post?.exteriorColorNameSl || "",
      colorInterior: post?.colorInterior || "#000",
      interiorColorNamePl: post?.interiorColorNamePl || "",
      interiorColorNameSl: post?.interiorColorNameSl || "",
      technicalDescriptionPl: post?.technicalDescriptionPl || "",
      technicalDescriptionSl: post?.technicalDescriptionSl || "",
      plateNumber: post?.plateNumber || "",
      chassisNumber: post?.chassisNumber || "",
      ownerMobile: post?.ownerMobile || showroomInitData?.contactPhone || "",
      ownerName: post?.ownerName || showroomInitData?.partnerNamePl || "",
      ownerEmail: post?.ownerEmail || showroomInitData?.notificationEmail || "",
      internalRemarks: post?.internalRemarks || "",
    }),
    [post, showroomInitData]
  );

  // States
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

  // in edit fill car models and classes to fill selects with correct option 
  useEffect(() => {
    if (post?.makeId) {
      fetchCarsClass(post?.makeId);
    }
  }, [fetchCarsClass, post]);

  useEffect(() => {
    if (post?.classId) {
      fetchCarsModel(post?.makeId, post?.classId);
    }
  }, [fetchCarsModel, post]);

  const validateForm = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(rules).forEach((field) => {
      const error = validateField(
        field,
        formData[field],
        rules[field],
        post,
        formData.askingPrice
      );
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [formData, rules, post]);

  const handleBlur = (field) => {
    const error = validateField(field, formData[field], rules[field], post);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  return { formData, setFormData, errors, setErrors, validateForm, handleBlur };
}
