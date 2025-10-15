import React, { useEffect, useState } from "react";
import {
  DocumentCheckIcon,
  PencilSquareIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { carAPI } from "../../../services/api/carForSaleProfile.api";
import { toast } from "react-toastify";
import { useCarContext } from "../../../context/CarContext";
import { useParams } from "react-router-dom";

const PostSpecifications = ({
  currentPost = null,
  code = null,
  styleFromSteps = "",
}) => {
  // reviewd
  const{code: postCode} = useParams()
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [postSpec, setPostSpec] = useState([]);
  const [editingSpec, setEditingSpec] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const { carSpecs, specLoading, fetchCarSpecification } = useCarContext();

  // Reviewed
  const handleEditClick = (spec) => {
    setEditingSpec(spec);
    setEditValues({
      specValuePl: spec.specValuePl || "",
    });
    setIsEditing(true);
  };

  useEffect(() => {
    setPostSpec(carSpecs);
  }, [carSpecs]);

  useEffect(() => {
    if ((code || postCode) && carSpecs.length === 0) {
      fetchCarSpecification(code || postCode);
    }
  }, [code, postCode, fetchCarSpecification, carSpecs]);

  // Reviewd
  const handleInputChange = (field, value) => {
    setEditValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Reviewd
  const handleSave = async () => {
    if (!editingSpec) return;

    const data = [
      {
        specId: editingSpec.specId,
        specType: editingSpec.specType,
        specNamePL: editingSpec.specHeaderPl,
        specNameSL: editingSpec.specHeaderSl,
        specValuePL: editValues.specValuePl,
        SpecValueSl: editingSpec.specValueSl,
        displayOrder: editingSpec.displayOrder,
      },
    ];

    try {
      setIsUpdateLoading(true);
      const response = await carAPI.putCarSpecs(
        currentPost ? currentPost?.postCode : code,
        data
      );
      setIsUpdateLoading(false);
      setIsEditing(false);
      setPostSpec((prev) =>
        prev.map((spec) =>
          spec.specId.toString() === editingSpec.specId.toString()
            ? { ...spec, specValuePl: editValues.specValuePl }
            : spec
        )
      );
      toast.success("Specification updated successfully");

    } catch (e) {
      setIsUpdateLoading(false);
      console.log(e);
    }
  };

  // Reviewd
  const handleCancel = () => {
    resetEditingState();
  };

  // Reviewd
  const resetEditingState = () => {
    setEditingSpec(null);
    setEditValues({});
    setIsEditing(false);
  };

  // Reviewd
  if (specLoading)
    return (
      <div className=" bg-gradient-to-br from-primary-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-lg font-medium text-secondary-600">
            Loading car specifications...
          </p>
        </div>
      </div>
    );

  return (
    <div className="lg:col-span-1 ">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
        <div className="bg-gradient-to-r from-primary-500/10 to-indigo-500/10 px-6 py-4 border-b border-secondary-100">
          <h2 className="text-xl font-bold text-secondary-800">
            Additional Specifications
          </h2>
        </div>

        <div className={`max-h-[calc(100vh-200px)] ${styleFromSteps.maxHeight} p-2 overflow-auto`}>
          {postSpec.length > 0 && !specLoading ? (
            <div className={`${styleFromSteps !== "" ? styleFromSteps.mainLayout : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 "}`}>
              {postSpec.map((spec, index) => (
                <div
                  key={index}
                  className=" py-1 my-1 mx-1 px-3 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
                >
                  <div className={`flex ${isEditing && styleFromSteps.internalSpec}   items-center justify-between`}>
                    <p className="basis-1/2 text-sm font-medium text-secondary-800">
                      {spec.specHeaderPl}
                    </p>

                    <div className="flex basis-1/2 gap-2 items-center justify-center">
                      {/* Value or edit Input */}
                      <div className="basis-1/3 m-0">
                        {isEditing && editingSpec?.specId === spec.specId ? (
                          <div className="flex space-x-2">
                            {spec.specType === "Text" ||
                            spec.specType === "Number" ? (
                              <input
                                value={editValues.specValuePl || ""}
                                onChange={(e) =>
                                  handleInputChange(
                                    "specValuePl",
                                    e.target.value
                                  )
                                }
                                className="w-full text-xs p-0.5 border rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent min-w-[100px]"
                                placeholder="Polish value"
                                type={
                                  spec.specType === "Number" ? "number" : "text"
                                }
                                min={spec.specType === "Number" ? 0 : null}
                              />
                            ) : spec.specType === "Yes - No" ? (
                              <select
                                value={editValues.specValuePl || ""}
                                onChange={(e) =>
                                  handleInputChange(
                                    "specValuePl",
                                    e.target.value
                                  )
                                }
                                className="w-full text-xs p-0.5 border rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent min-w-[100px]"
                                placeholder="Polish value"
                              >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select>
                            ) : (
                              spec.specType === "Color" && (
                                <input
                                  value={editValues.specValuePl || ""}
                                  onChange={(e) =>
                                    handleInputChange(
                                      "specValuePl",
                                      e.target.value
                                    )
                                  }
                                  className="w-full text-xs p-0.5 border rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent min-w-[100px]"
                                  placeholder="Polish value"
                                  type="color"
                                />
                              )
                            )}
                          </div>
                        ) : (
                          <div className="flex space-x-2 ">
                            <div className="text-xs text-green-800 font-semibold">
                              {spec.specType === "Color" ? <p style={{ backgroundColor: spec.specValuePl }} className="w-5 h-5 rounded-md"></p> :  spec.specValuePl}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Action Button */}
                      <div className="flex  basis-1/6">
                        {isEditing && editingSpec?.specId === spec.specId ? (
                          <>
                            <button
                              type="button"
                              onClick={handleSave}
                              className="p-1 text-green-600 hover:bg-red-50 rounded-lg transition-colors mx-1"
                              title="Confirm"
                            >
                              {isUpdateLoading ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-500 border-t-transparent mx-auto"></div>
                              ) : (
                                <DocumentCheckIcon className="h-4 w-4 fw-bold" />
                              )}
                            </button>
                            <button
                              type="button"
                              onClick={handleCancel}
                              className="p-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors mx-1"
                              title="Discard"
                            >
                              <XCircleIcon className="h-4 w-4 fw-bold" />
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleEditClick(spec)}
                            className={`p-1 text-primary-600 hover:bg-primary-100 rounded-sm transition-colors ${
                              isEditing ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                            title="Edit"
                            disabled={isEditing}
                          >
                            <PencilSquareIcon className="h-4 w-4 fw-bold" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="h-8 w-8 text-secondary-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <p className="text-secondary-500">
                No additional specifications available
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostSpecifications;
