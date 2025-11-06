export function prepareQueryParams(input = {}, keyMap = {}) {
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