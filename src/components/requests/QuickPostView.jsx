import { useNavigate } from "react-router-dom";
import { useCarContext } from "../../context/CarContext";
import BaseModal from "../common/BaseModal";
import LoadingState from "../common/LoadingState";
import { CameraIcon } from "@heroicons/react/24/solid";
import { BiEditAlt } from "react-icons/bi";
import { useAddCar360Url } from "../../pages/hooks/useCar360Request";
import { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../context/AuthContext";

const QuickPostView = ({ open, setOpen }) => {
    const navigate = useNavigate();
    const { carDetails, isLoading } = useCarContext();
    const { user } = useAuth()
    const [link360, setLink360] = useState("");
    const { car } = carDetails;
    const handleAdd360 = useAddCar360Url(car?.postId);

    const onAdd360Click = async () => {
        const enteredUrl = await handleAdd360();
        if (enteredUrl) {
            setLink360(enteredUrl);
        }
    }

    // useeffect to update when user change 360 instant
    useEffect(() => {
        setLink360(carDetails?.car?.spin360Url);

    }, [carDetails]);

    if (isLoading) {
        return (
            <BaseModal title="Car Details" open={open} setOpen={setOpen}>
                <LoadingState description="Loading Post" title="Post" />
            </BaseModal>
        );
    }



    return (
        <BaseModal title="Car Details" open={open} setOpen={setOpen} className="max-w-4xl">
            <div className="max-h-[calc(100vh-160px)] overflow-y-auto">

                {/* ===== Sticky Header ===== */}
                <div className="sticky top-0 bg-white z-10 border-b p-4 flex gap-4">
                    <img
                        src={car?.rectangleImageUrl}
                        alt={car?.carNamePl}
                        className="w-44 h-32 object-cover rounded-lg border"
                    />

                    <div className="flex flex-col justify-between flex-1">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">
                                {car?.carNameWithYearPl}
                            </h2>
                            <p className="text-sm text-gray-500">
                                {car?.categoryNamePl} • {car?.manufactureYear}
                            </p>
                        </div>

                        <div className="text-2xl font-bold text-main-blue">
                            {car?.askingPrice.toLocaleString()} QAR
                        </div>
                    </div>
                </div>

                {/* ===== Content ===== */}
                <div className="p-4 space-y-6">

                    {/* Overview */}
                    <Section title="Car Overview">
                        <Grid>
                            <Fact label="Mileage" value={`${car?.mileage.toLocaleString()} km`} />
                            <Fact label="Warranty" value={car?.warrantyIsAvailable ? "Yes" : "No"} />
                            <Fact label="Ready for Sale" value={car?.isReadyForSale ? "Yes" : "No"} />
                            <Fact label="Bidding" value={car?.isBiddingEnabled ? "Enabled" : "Disabled"} />
                        </Grid>
                    </Section>

                    {/* Pricing */}
                    <Section title="Pricing & Sale">
                        <Grid>
                            <Info label="Asking Price" value={`${car?.askingPrice.toLocaleString()} QAR`} />
                            <Info label="Sold" value={car?.isSold ? "Yes" : "No"} />
                            <Info label="Visits" value={car?.visitsCount} />
                            <Info label="Offers" value={car?.offersCount} />
                        </Grid>
                    </Section>

                    {/* Colors */}
                    <Section title="Colors">
                        <Grid>
                            <Fact label="Exterior Color" value={car?.colorExterior} />
                            <Fact label="Interior Color" value={car?.colorInterior} />
                        </Grid>
                    </Section>

                    {/* Post Info */}
                    <Section title="Post Information">
                        <Grid>
                            <Info label="Post Code" value={car?.postCode} />
                            <Info label="Status" value={car?.postStatus} highlight />
                            <Info label="Source" value={car?.sourceKind} />
                            <Info label="Pinned" value={car?.pinToTop ? "Yes" : "No"} />
                            <Info label="Created At" value={car?.createdDateTime} />
                            <Info label="Approved By" value={car?.approvedBy} />
                        </Grid>
                    </Section>

                    {/* Technical Notes */}
                    {car?.technicalDescriptionPl && (
                        <Section title="Technical Notes">
                            <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-4 leading-relaxed">
                                {car?.technicalDescriptionPl}
                            </p>
                        </Section>
                    )}

                    {/* 360 View */}
                    {link360 ? (
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-sm font-semibold text-gray-700 mb-3">360° View</h3>
                                {user.role === "superAdmin" && <button className="flex relative items-center group bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors md:text-md text-sm md:px-4 px-1 py-2" onClick={() => { onAdd360Click() }}>
                                    <CameraIcon className="h-6 w-6 mx-1" />
                                    <BiEditAlt className="h-4 w-4 left-3 text-indigo-700 absolute  bg-indigo-100 rounded-full group-hover:bg-indigo-200 " />

                                    Edit 360
                                </button>}
                            </div>
                            <div className="w-full h-[240px] rounded-xl overflow-hidden border">
                                <iframe
                                    src={link360}
                                    title="360° View"
                                    className="w-full h-full border-0"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    ) :
                        user.role === "superAdmin" && <>
                            <h3 className="text-sm font-semibold text-gray-700 mb-3">360° View</h3>
                            <div className="flex flex-col items-center justify-center py-4 h-full border rounded-md">
                                <p className="text-sm font-medium text-secondary-600">No 360° link added yet</p>
                                <p className="text-secondary-500 text-sm">You can add from here</p>
                                <button className="my-2 flex relative items-center group bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors md:text-md text-sm md:px-4 px-1 py-2" onClick={() => { handleAdd360() }}>
                                    <CameraIcon className="h-6 w-6 mx-1" />
                                    <PlusIcon className="h-3 w-3 text-indigo-700 absolute  bg-indigo-100 rounded-full group-hover:bg-indigo-200 " />

                                    Add 360
                                </button>
                            </div>
                        </>
                    }
                </div>
            </div>
            <div className="flex justify-end p-4 gap-2">
                <button onClick={() => navigate(`/showroom/posts/${car.postCode}`)} className="bg-primary-500 text-white px-4 py-2 rounded-lg mt-4">View full details</button>
                <button onClick={() => setOpen(false)} className="bg-white border border-primary-500 text-primary-500 px-4 py-2 rounded-lg mt-4">Close</button>
            </div>
        </BaseModal>
    );
};

export default QuickPostView;

/* ===== Helpers ===== */

const Section = ({ title, children }) => (
    <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">{title}</h3>
        {children}
    </div>
);

const Grid = ({ children }) => (
    <div className="grid grid-cols-2 gap-3 text-sm">
        {children}
    </div>
);

const Fact = ({ label, value }) => (
    <div className="flex justify-between items-center bg-gray-50 rounded-md px-3 py-2">
        <span className="text-gray-500">{label}</span>
        {(label === "Exterior Color" || label === "Interior Color") ? (
            <span
                className="w-4 h-4 rounded-full border"
                style={{ backgroundColor: value }}
            />
        ) : (
            <span className="font-medium text-gray-900">{value}</span>
        )}
    </div>
);

const Info = ({ label, value, highlight }) => (
    <div className="flex justify-between bg-gray-50 rounded-md px-3 py-2">
        <span className="text-gray-500">{label}</span>
        <span className={highlight ? "font-semibold text-green-600" : "text-gray-900"}>
            {value}
        </span>
    </div>
);
