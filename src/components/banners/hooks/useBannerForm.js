import { useCallback, useState } from "react";
import { validateBannerRules } from "../utils/validateBannerRules";
import { useBannerContext } from "../../../context/BannerContext";
import { useBannerUpload } from "./useBannerUpload";

export function useBannerForm(banner) {
  const [errors, setErrors] = useState({});

  const { formData, setEditingBanner } = useBannerContext();
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
    setErrors(newErrors);
    return isValid;
  }, [formData, rules]);

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
  return { rules, validateForm, errors, handleBlur, resetForm };
}
