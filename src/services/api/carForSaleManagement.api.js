import { privateAxios } from "../config/axios.config";

function prepareQueryParams(input = {}, keyMap = {}) {
  const out = {};

  for (const [localKey, rawValue] of Object.entries(input)) {
    if (rawValue === undefined || rawValue === null) continue;
    if (typeof rawValue === "string" && rawValue.trim() === "") continue;

    const serverKey = keyMap[localKey] ?? localKey;

    // لو المين value مصفوفة -> نجمع بعلامة فاصلة
    if (Array.isArray(rawValue)) {
      if (rawValue.length === 0) continue;
      out[serverKey] = rawValue
        .map((v) =>
          typeof v === "object" ? v.id ?? v.value ?? JSON.stringify(v) : v
        )
        .join(",");
      continue;
    }

    // لو قيمة من نوع object (مثلاً option من select) -> نحاول ناخد id أو value أو label
    if (typeof rawValue === "object") {
      if ("value" in rawValue && rawValue.value !== undefined) {
        out[serverKey] = rawValue.value;
      } else if ("id" in rawValue && rawValue.id !== undefined) {
        out[serverKey] = rawValue.id;
      } else if ("label" in rawValue && rawValue.label !== undefined) {
        out[serverKey] = rawValue.label;
      } else {
        // لو object غير معروف، نبقيه JSON string
        out[serverKey] = JSON.stringify(rawValue);
      }
      continue;
    }

    // أرقام/بوول/ستِرِينج عادي
    out[serverKey] = rawValue;
  }

  return out;
}

export const managementAPI = {
  GetCars: (params) => {
    const keyMap = {
      partnerId: "PartnerId",
      PartnerId: "PartnerId",
      status: "Status",
      Status: "Status",
      searchType: "SearchType",
      SearchType: "SearchType",
      searchTerm: "SearchTerm",
      SearchTerm: "SearchTerm",
      pinToTop: "PinToTop",
    };

    const axiosParams = prepareQueryParams(params, keyMap);
    return privateAxios.get("/v1/CarForSaleManagement/GetCars", {
      params: axiosParams,
    });
  },

  postCreateRequest: (params, data) =>
    privateAxios.post(
      `/v1/CarForSaleManagement/CreateCarPost?createdBy=${params.createdBy}&partnerId=${params.partnerId}`,
      data
    ),
  getInitCarData: () => privateAxios.get("/v1/CarForSaleManagement/init-data"),
  putUpdatePost: (params, data) =>
    privateAxios.put(
      `/v1/CarForSaleManagement/UpdateCarForSale?updatedBy=${params.createdBy}`,
      data
    ),
  translate: (data) =>
    privateAxios.post("/v1/CarForSaleManagement/translate", data),
};
