import React, { useEffect, useState } from "react";

const PostSearch = ({
  onFilterChange,
  filtersClearData,
  setFiltersClearData,
}) => {
  
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState(0);
  const [status, setStatus] = useState("");
  const [sortBy, setSortBy] = useState(0);
  const [pinToTop, setPinToTop] = useState(false);


  useEffect(() => {
    setSearchTerm("");
    setSearchBy(0);
    setStatus("");
    setSortBy(0);
  }, [filtersClearData]);

  const handleFilter = () => {
    setFiltersClearData(false);
    onFilterChange({
      searchBy,
      searchTerm,
      status,
      pinToTop,
      sortBy
    });
  };

  // const handleSort = (sortBy) => {
  //   onSortChange(sortBy);
  // };

  const searchOptions = [
    { value: 0, label: "Owner Mobile Number" },
    { value: 1, label: "Post Code" },
  ];

  const statusOptions = [
    "Approved",
    "Archived",
    "Draft",
    "Pending Approval",
    "Rejected",
    "Rejected Permanently",
    "Suspended",
    "Suspended Permanently",
  ];

  const sortByOptions = [
    { value: 1, label: "Newest" },
    { value: 2, label: "Oldest" },
    { value: 3, label: "Highest Price" },
    { value: 4, label: "Lowest Price" },
  ];

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
      <div className="space-y-3">
        {/* Search Section */}
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-secondary-700 mb-1">
              Search By
            </label>
            <select
              value={searchBy}
              onChange={(e) => setSearchBy(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs border border-secondary-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-white/80"
            >
              {searchOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-secondary-700 mb-1">
              Search Term
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs border border-secondary-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-white/80"
              placeholder="Enter search term"
            />
          </div>
        </div>

        {/* Filters Section */}
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-secondary-700 mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs border border-secondary-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-white/80"
            >
              <option value="">All Status</option>
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-secondary-700 mb-1">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs border border-secondary-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-white/80"
            >
              <option value={0}>All Sort By</option>
              {sortByOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={pinToTop}
                onChange={(e) => setPinToTop(e.target.checked)}
                className="w-3 h-3 text-primary-600 bg-white border-secondary-300 rounded focus:ring-primary-500 focus:ring-1"
              />
              <span className="ml-2 text-xs text-secondary-700">
                Show pinned only
              </span>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <button
            type="button"
            onClick={handleFilter}
            className="w-full px-3 py-2 text-xs font-medium text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Apply Filters
          </button>
          <button
            type="button"
            onClick={() => {
              setSearchTerm("");
              setSearchBy(0);
              setStatus("");
              setSortBy(0);
              setPinToTop(false);
              onFilterChange({
                searchBy: 0,
                searchTerm: "",
                status: "",
                sortBy: 0,
                pinToTop: false,
              });
            }}
            className="w-full px-3 py-2 text-xs font-medium hover:text-secondary-600 text-white bg-secondary-100 hover:bg-secondary-200 rounded-md focus:outline-none focus:ring-1 focus:ring-secondary-500 transition-all duration-200"
          >
            Clear
          </button>
        </div>

        <hr />
      </div>
    </form>
  );
};

export default PostSearch;
