import {
  CheckBadgeIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import aboutUsImg from "../../assets/images/about-car.png"

const features = [
  "Immersive 360° vehicle viewing experience",
  "Complete automotive services in one platform",
  "Trusted inspections and secure transactions",
  "Dedicated support throughout your journey",
];

export default function AboutSection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="grid items-center gap-20 lg:grid-cols-2">

          {/* Left Image */}
          <div className="relative">

            <div className="absolute -top-6 -left-6 h-32 w-32 rounded-full bg-primary-100 blur-3xl"></div>

            <img
              src={aboutUsImg}
              alt="Qars Spin"
               aria-hidden="true"
        fetchpriority="high"
        loading="eager"
        decoding="async"
              className="relative h-[520px] w-full rounded-3xl object-cover shadow-2xl "
            />
            {/* <img
        src="/images/auth-bg.jpg"
        alt=""
        aria-hidden="true"
        fetchpriority="high"
        loading="eager"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      /> */}

            {/* Floating Card */}
            <div className="absolute -bottom-8 left-8 rounded-2xl bg-white p-6 shadow-2xl">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-100">
                  <SparklesIcon className="h-7 w-7 text-primary-600" />
                </div>

                <div>
                  <h3 className="font-bold text-secondary-800">
                    First in Qatar
                  </h3>

                  <p className="text-sm text-secondary-500">
                    360° Automotive Marketplace
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* Right Content */}
          <div>

            <span className="inline-flex rounded-full bg-primary-100 px-4 py-2 text-sm font-semibold text-primary-700">
              WHO WE ARE
            </span>

            <h2 className="mt-6 text-4xl font-bold leading-tight text-secondary-900 lg:text-5xl">
              Redefining the Way
              <span className="block text-primary-600">
                Qatar Buys & Sells Cars
              </span>
            </h2>

            <p className="mt-8 text-lg leading-8 text-secondary-600">
              Welcome to <strong>Qars Spin</strong>, your ultimate destination
              for everything automotive. We make buying, selling, inspecting,
              financing and registering vehicles simple through one integrated
              platform designed around transparency, trust and innovation.
            </p>

            <p className="mt-6 text-lg leading-8 text-secondary-600">
              As Qatar's first platform featuring immersive 360° vehicle
              technology, we help customers explore cars with confidence while
              providing every service needed before and after purchase.
            </p>

            {/* Features */}

            <div className="mt-10 space-y-5">

              {features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-start gap-4"
                >
                  <CheckBadgeIcon className="mt-0.5 h-6 w-6 text-primary-600 flex-shrink-0" />

                  <p className="text-secondary-700">
                    {feature}
                  </p>
                </div>
              ))}

            </div>

            {/* Buttons */}

            {/* <div className="mt-12 flex flex-wrap gap-4">

              <button className="rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 px-7 py-4 font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
                Explore Vehicles
              </button>

              <button className="rounded-xl border border-secondary-200 px-7 py-4 font-semibold text-secondary-700 transition hover:border-primary-500 hover:text-primary-600">
                Contact Us
              </button>

            </div> */}

          </div>

        </div>

      </div>
    </section>
  );
}