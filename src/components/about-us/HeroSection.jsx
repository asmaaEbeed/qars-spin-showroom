import { IoLogoApple } from "react-icons/io";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { Link } from "react-router-dom";

const stats = [
  { value: "360°", label: "Vehicle Experience" },
  { value: "24/7", label: "Support" },
  { value: "100%", label: "Secure Transactions" },
  { value: "All-in-One", label: "Automotive Services" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <img
        src="/images/auth-bg.jpg"
        alt="Luxury cars"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/50" />

      {/* Decorative Blur */}
      <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-primary-500/20 blur-[120px]" />
      <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-primary-600/20 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 w-full">
        <div className="max-w-3xl">

          {/* Badge */}
          <div className="inline-flex items-center rounded-full border border-primary-400/30 bg-primary-500/15 px-4 py-2 backdrop-blur-md">
            <span className="text-sm font-medium text-primary-200">
              Qatar's First 360° Automotive Marketplace
            </span>
          </div>

          {/* Title */}
          <h1 className="mt-8 text-5xl font-black leading-tight text-white md:text-7xl">
            Discover Cars
            <br />
            <span className="bg-gradient-to-r from-primary-400 to-primary-200 bg-clip-text text-transparent">
              Like Never Before
            </span>
          </h1>

          {/* Description */}
          <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-300 md:text-xl">
            Qars Spin transforms the way people buy, sell and manage vehicles
            through immersive <strong>360° technology</strong>, certified
            inspections, secure payments, registration services and flexible
            financing—all in one trusted platform.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">

            <Link target="_blank" to="https://play.google.com/store/apps/details?id=com.qarsspin.mobile" className="group space-x-3 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 px-7 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <IoLogoGooglePlaystore className="h-8 w-8 transition-transform duration-300 group-hover:translate-x-1" />
              Download on Google Play

            </Link>
            <Link target="_blank"  to="https://apps.apple.com/eg/app/qars-spin/id6630392818" className="group space-x-3 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 px-7 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <IoLogoApple className=" h-8 w-8 transition-transform duration-300 group-hover:translate-x-1" />
              Download on IOS

            </Link>

            {/* <button className="rounded-xl border border-white/30 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-secondary-800">
              Contact Us
            </button> */}
            <a
              href="https://wa.me/97466288388"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/30 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-secondary-800"
            >

              <div>
                Contact Us
              </div>
            </a>

          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 gap-6 md:grid-cols-4">

            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-md transition duration-300 hover:bg-white/15"
              >
                <h3 className="text-3xl font-bold text-white">
                  {item.value}
                </h3>

                <p className="mt-2 text-sm text-gray-300">
                  {item.label}
                </p>
              </div>
            ))}

          </div>

        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}