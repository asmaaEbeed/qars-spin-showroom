export function formatDateTime(dateStr, options = { type: "datetime" }) {
    if (!dateStr) return "";
  
    const date = new Date(dateStr);
  
    // تجهيز الأجزاء
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
  
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
  
    const formattedDate = `${month}-${day}-${year}`;
    const formattedTime = `${hours}:${minutes} ${ampm}`;
  
    switch (options.type) {
      case "date":
        return formattedDate;
      case "time":
        return formattedTime;
      case "datetime":
      default:
        return `${formattedDate}, ${formattedTime}`;
    }
  }
  