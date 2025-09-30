// PostDetails.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import PostDetailsModals from "../components/posts/PostDetailsModals";
import PostHeader from "../components/posts/details/PostHeader";
import PostTabs from "../components/posts/details/PostTabs";
import PostMedia from "../components/posts/details/PostMedia";
import PostOffers from "../components/posts/details/PostOffers";
import PostOverview from "../components/posts/details/PostOverview";

import { useCar360Request } from "./hooks/useCar360Request";
import { useCarContext } from "../context/CarContext";
import { useCarOffers } from "./hooks/useCarOffers";

const LoadingState = () => (
  <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-indigo-50 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-500 border-t-transparent mx-auto mb-4"></div>
      <p className="text-lg font-medium text-secondary-600">
        Loading car details...
      </p>
    </div>
  </div>
);

const ModalWrapper = ({ children }) => (
  <div className="fixed inset-0 bg-secondary-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
    {children}
  </div>
);

const PostDetails = () => {
  const { code } = useParams();
  // const { postDetails, isLoading } = useCarProfile(code);
  const { fetchCarProfile, carDetails, isLoading, fetchCarSpecification } = useCarContext();

  useCarOffers(code);

  const [activeTab, setActiveTab] = useState("overview");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalData, setModalData] = useState({});
  const [postDetails, setPostDetails] = useState(null);
  const [selectedCover, setSelectedCover] = useState(null);

  const handle360Request = useCar360Request(postDetails?.car);
  useEffect(() => {
    fetchCarProfile(code);
    fetchCarSpecification(code);
  }, [code])

  useEffect(() => {
    setPostDetails(carDetails)
  }, [carDetails])


  if (isLoading || !postDetails) {
    return (
      <MainLayout>
        <LoadingState />
      </MainLayout>
    );
  }


  const tabContent = {
    overview: (
      <PostOverview
        currentPost={postDetails?.car}
        setModalOpen={setModalOpen}
        setModalType={setModalType}
        setModalData={setModalData}
        setSelectedCover={setSelectedCover}
      />
    ),
    offers: <PostOffers currentPost={postDetails?.car} />,
    media: <PostMedia currentPost={postDetails?.car} />,
    // compare: <CarComparison currentPost={postDetails?.car} />,
  };

  return (
    <MainLayout>
      {postDetails === null ? (
        <LoadingState />
      ) : (
        <>

          {/* Modal */}
          {modalOpen && (
            <ModalWrapper>
              {postDetails !== null && <PostDetailsModals
                currentPost={postDetails?.car}
                onClose={() => setModalOpen(false)}
                modalType={modalType}
                modalData={modalData}
                setModalData={setModalData}
                selectedCover={selectedCover}
              />}
            </ModalWrapper>
          )}

          {postDetails !== null && <div className="bg-gradient-to-br from-primary-50 via-white to-indigo-50">
            <PostHeader currentPost={postDetails?.car} setSelectedCover={setSelectedCover} setModalType={setModalType}
              setModalOpen={setModalOpen}
              setModalData={setModalData} modalOpen={modalOpen} modalType={modalType} modalData={modalData} selectedCover={selectedCover} />
            <PostTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              setModalOpen={setModalOpen}
              setModalType={setModalType}
              handle360Request={handle360Request}
            />
          </div>}

          {postDetails !== null && <div className="max-w-7xl mx-auto px-6 py-8">
            {tabContent[activeTab]}
          </div>}
        </>)}
    </MainLayout>
  );
};

export default PostDetails;
