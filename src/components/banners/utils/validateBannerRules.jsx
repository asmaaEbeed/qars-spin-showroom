export const validateBannerRules = (isEdit) => ({
    bannerTitle: { required: true },
    targetUrlPl: { required: true },
    targetUrlSl: { required: true },
    targetType: { required: true },
    bannerRemarks: { required: false },
    startDate: { required: true },
    endDate: { required: true },
});