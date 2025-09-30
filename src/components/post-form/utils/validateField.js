export const validateField = (name, value, rules, post, askingPrice) => {
    if (!rules) return "";
  
    if (name.includes("color") && rules.required && !value) {
      return `Please select ${name.replace(/([A-Z])/g, " $1")}`;
    }
    if (rules.required && !value) return "This field is required";
    if (rules.min !== undefined && Number(value) < rules.min)
      return `Must be at least ${rules.min}`;
    if (rules.pattern && !rules.pattern.test(value)) return "Invalid format";
    if (name === "images" && !post && value.length === 0)
      return "At least one image is required";
    if (name === "images" && value.length > rules.maxCount)
      return `Maximum ${rules.maxCount} images allowed`;

    if(name === "minimumPrice" && (Number(value) > Number(askingPrice) || Number(value) === Number(askingPrice)))
      return `Value less than ${askingPrice} QAR`;
  
    return "";
  };
  