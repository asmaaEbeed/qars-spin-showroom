import { useState, useCallback } from "react";
import { validationRules } from "../utils/validationRules";
import { validateField } from "../utils/validateField";

export function usePostForm(post) {
  const [formData, setFormData] = useState({
    carNamePl: post?.carNamePl || "",
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
    ownerMobile: post?.ownerMobile || "",
    ownerName: post?.ownerName || "",
    internalRemarks: post?.internalRemarks || "",
  });

  const [errors, setErrors] = useState({});
  const rules = validationRules(!!post);

  const validateForm = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(rules).forEach((field) => {
      const error = validateField(field, formData[field], rules[field], post, formData.askingPrice);
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
