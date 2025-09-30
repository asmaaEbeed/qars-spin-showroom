import {
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";

export default function ImageGallery({ setCurrentIndex, postImgs, currentIndex }) {
   const showPrev = () => {
     if (currentIndex !== null) {
       setCurrentIndex((prev) => (prev === 0 ? postImgs.length - 1 : prev - 1));
     }
   };
 
   const showNext = () => {
     if (currentIndex !== null) {
       setCurrentIndex((prev) => (prev === postImgs.length - 1 ? 0 : prev + 1));
     }
   };

  return (
    <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setCurrentIndex(null)} // close on overlay click
        >
          <div
            className="relative max-w-3xl w-full p-4 flex items-center"
            onClick={(e) => e.stopPropagation()} // stop closing when clicking image
          >
            {/* Left Arrow */}
            <button
              onClick={showPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2"
            >
              <ChevronLeftIcon className="h-6 w-6 text-black" />
            </button>

            {/* Image */}
            <img
              src={postImgs[currentIndex].mediaUrl}
              alt="Preview"
              className="w-full h-auto rounded-lg shadow-lg"
            />

            {/* Right Arrow */}
            <button
              onClick={showNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2"
            >
              <ChevronRightIcon className="h-6 w-6 text-black" />
            </button>

            {/* Close Button */}
            <button
              className="absolute top-2 right-2 bg-white text-black rounded-full p-2"
              onClick={() => setCurrentIndex(null)}
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
  );
}
