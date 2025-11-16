import { useCallback, useState } from "react";
import { validateBannerRules } from "../utils/validateBannerRules";
import { useBannerContext } from "../../../context/BannerContext";

export function useBannerForm(banner) {
  const TODAY = new Date().toISOString().split('T')[0];
  const [errors, setErrors] = useState({});

  const { formData, setEditingBanner, editingBanner } = useBannerContext();
  // const { reset } = useBannerUpload();

  const rules = validateBannerRules(!!banner);

  const validateForm = useCallback(() => {
    let isValid = true;
    let newErrors = {};
    Object.keys(rules).forEach((field) => {
      const error = () => {
        if (rules[field].required && formData[field].trim() === "") return true;
      };
      if (error()) {
        newErrors[field] = "This field is required";
        isValid = false;
      }
    });
    // Handle start date validation in 3 cases

    // In Case Expired And need to republish start date can't be less than today OR
    // New banner start date can't be less than today
    if (
      (editingBanner?.bannerId && formData.startDate < TODAY && editingBanner.endDate < TODAY) ||
      (!editingBanner?.bannerId && formData.startDate < TODAY)
    ) {

      newErrors.startDate = "Start date can't be less than today";
      isValid = false;
    }
    // Check start date is less than end date
    if(formData.startDate > formData.endDate){
      newErrors.startDate = "Start date can't be greater than end date";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  }, [formData, rules, TODAY, editingBanner]);

  const handleBlur = useCallback(
    (field) => {
      const error =
        rules[field].required && formData[field].trim() === ""
          ? "This field is required"
          : "";

      setErrors((prev) => {
        const newErrors = { ...prev };
        if (error) newErrors[field] = error;
        else delete newErrors[field];
        return newErrors;
      });
    },
    [rules, formData]
  );

  const resetForm = () => {
    setEditingBanner(null);
    // reset();
    setErrors({});
  };
  return { rules, validateForm, errors, handleBlur, resetForm, setErrors };
}
