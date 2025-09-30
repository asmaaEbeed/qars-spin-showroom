import PostMediaGallery from "./PostMediaGallery";

const PostMedia = ({ currentPost }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <PostMediaGallery currentPost={currentPost} />
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
        <div className="bg-gradient-to-r from-primary-500/10 to-indigo-500/10 px-6 py-4 border-b border-secondary-100">
          <h2 className="text-xl font-bold text-secondary-800">360° View</h2>
        </div>
        <div className="p-6">
          <div className="relative w-full h-96 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-secondary-100 flex items-center justify-center">
              <svg
                className="h-16 w-16 text-secondary-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-indigo-500/10 rounded-2xl shadow-lg">
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-secondary-800 mb-2">
                  360° View Coming Soon
                </h3>
                <div className="text-secondary-500">
                  <p>Interactive 360° car view will be available here</p>

                  <div className="w-full h-[500px] mt-4">
                    <iframe
                      src={currentPost?.spin360Url}
                      title="360° View"
                      className="w-full h-full rounded-2xl border-0"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostMedia;
