import React, { useEffect, useState } from "react";
import BannerFilters from "../../../components/banners/BannerFilters";
import BannerTable from "../../../components/banners/BannerTable";
import BannerInfoModal from "../../../components/banners/modals/BannerInfoModal";
import BannerUploadModal from "../../../components/banners/modals/BannerUploadModal";
import BannerApproveModal from "../../../components/banners/modals/BannerApproveModal";
import MainLayout from "../../../components/layout/MainLayout";
import BannersHeader from "../../../components/banners/BannersHeader";
import { useBannerContext } from "../../../context/BannerContext";
import { useLocation } from "react-router-dom";

export default function BigBanners() {

    const [isInfoOpen, setIsInfoOpen] = useState(false);
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [isApproveOpen, setIsApproveOpen] = useState(false);

    const [uploadSlot, setUploadSlot] = useState("");

    const { fetchBigBanner,
        editingBanner,
        setEditingBanner,
        setFormData,
        resetBannerForm,
        setBannerType,
        handleApproveBanner,
        filter } = useBannerContext();

    const path = useLocation().pathname;

    useEffect(() => {
        if (path.includes("big-banners")) {
            setBannerType("big");
        } else if (path.includes("small-banners")) {
            setBannerType("small");
        } else if (path.includes("big-fillers")) {
            setBannerType("bigFiller");
        } else if (path.includes("small-fillers")) {
            setBannerType("smallFiller");
        }

    }, [path, setBannerType]);

    useEffect(() => {
        if (!filter.bannerType) return;      // avoid empty initial runs  
        fetchBigBanner(filter);
    }, [filter, fetchBigBanner]);



    const handleOpenCreate = () => {
        setEditingBanner(null);
        resetBannerForm()
        setIsInfoOpen(true);
    };

    const handleEdit = (banner) => {
        setEditingBanner(banner);
        setFormData(banner);
        setIsInfoOpen(true);
    };

    const handleOpenUpload = (banner, slot) => {
        setEditingBanner(banner);
        setUploadSlot(slot);
        setIsUploadOpen(true);
    };

    const handleApprove = (banner) => {
        setEditingBanner(banner);
        setIsApproveOpen(true);
    };

    // const handleDelete = async (bannerId) => {
    //     const result = await Swal.fire({
    //         title: "Are you sure?",
    //         text: "Delete this item?",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonText: "Yes, delete it!",
    //         cancelButtonText: "Cancel",
    //         confirmButtonColor: "#d33",
    //         cancelButtonColor: "#3085d6",
    //     });

    //     if (result.isConfirmed) {
    //         setBanners((prev) => prev.filter((b) => b.id !== bannerId));
    //     }
    // };

    const handleUploadConfirm = () => {
        setIsUploadOpen(false);
        // loadBanners();
    };

    const confirmApprove = async () => {
        const res = await handleApproveBanner(editingBanner.bannerId, "Approved");
        if (res.status === 200) {
            setIsApproveOpen(false);
        }
    };

    const handleSaveInfo = () => {
        setIsInfoOpen(false);
        //loadBanners();
    };

    return (
        <MainLayout>
            <main className="relative min-h-[calc(100vh-6rem)] bg-gradient-to-br from-primary-50 via-white to-indigo-50">
                <BannersHeader
                    // loadBanners={loadBanners}
                    handleOpenCreate={handleOpenCreate}
                />
                <div className="max-w-7xl mx-auto px-6 py-8">


                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        <aside className="lg:col-span-1">
                            <BannerFilters />
                        </aside>

                        <main className="lg:col-span-3">
                            <BannerTable
                                onEdit={handleEdit}
                                onApprove={handleApprove}
                                onUpload={handleOpenUpload}
                                // onDelete={handleDelete}
                                handleOpenCreate={handleOpenCreate}
                            />
                        </main>
                    </div>

                    <BannerInfoModal
                        open={isInfoOpen}
                        setOpen={setIsInfoOpen}
                        editingBanner={editingBanner}
                        handleSaveInfo={handleSaveInfo}
                        handleApprove={handleApprove}
                    />

                    <BannerUploadModal
                        open={isUploadOpen}
                        setOpen={setIsUploadOpen}
                        uploadSlot={uploadSlot}
                        editingBanner={editingBanner}
                        handleUploadConfirm={handleUploadConfirm}
                    />

                    <BannerApproveModal
                        open={isApproveOpen}
                        setOpen={setIsApproveOpen}
                        confirmApprove={confirmApprove}
                    />
                </div>
            </main>
        </MainLayout>
    );
}
