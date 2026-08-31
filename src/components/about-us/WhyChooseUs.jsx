import {
  CheckCircleIcon,
  ShieldCheckIcon,
  SparklesIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  TruckIcon,
} from "@heroicons/react/24/solid";

const reasons = [
  {
    icon: SparklesIcon,
    title: "360° Vehicle Experience",
    description:
      "Explore vehicles from every angle with immersive technology before making your decision.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Trusted & Transparent",
    description:
      "Every service is designed around security, honesty and complete transparency.",
  },
  {
    icon: UserGroupIcon,
    title: "Customer First",
    description:
      "Our experienced team is dedicated to supporting you throughout your entire journey.",
  },
  {
    icon: CurrencyDollarIcon,
    title: "Flexible Financing",
    description:
      "Convenient payment and financing options that fit your budget.",
  },
  {
    icon: TruckIcon,
    title: "Complete Automotive Services",
    description:
      "Inspection, registration, roadside assistance and secure payments in one place.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-secondary-900 py-24 text-white">
      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-primary-500/20 blur-[120px]" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-primary-600/10 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        <div className="grid items-center gap-20 lg:grid-cols-2">

          {/* Left Side */}
          <div>

            <span className="inline-flex rounded-full bg-primary-500/20 px-4 py-2 text-sm font-semibold text-primary-300">
              WHY CHOOSE QARS SPIN
            </span>

            <h2 className="mt-6 text-4xl font-bold leading-tight md:text-5xl">
              More Than a Marketplace.
              <span className="mt-2 block text-primary-400">
                Your Trusted Automotive Partner.
              </span>
            </h2>

            <p className="mt-8 text-lg leading-8 text-gray-300">
              At Qars Spin, we combine innovative technology with trusted
              automotive services to make buying, selling and owning a vehicle
              easier than ever. Every service is designed to provide confidence,
              convenience and peace of mind.
            </p>

            <div className="mt-12 space-y-8">

              {reasons.map(({ icon: Icon, title, description }) => (
                <div key={title} className="flex gap-5">

                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-primary-500/15">
                    <Icon className="h-7 w-7 text-primary-400" />
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold">
                      {title}
                    </h3>

                    <p className="mt-2 leading-7 text-gray-400">
                      {description}
                    </p>
                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* Right Side */}
          <div className="relative">

            <div className="rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl">

              <h3 className="text-3xl font-bold">
                Our Commitment
              </h3>

              <p className="mt-5 leading-8 text-gray-300">
                We believe every customer deserves a transparent, secure and
                enjoyable automotive experience. Whether you're buying your
                first car or upgrading to your next one, we're here to simplify
                every step.
              </p>

              <div className="mt-10 space-y-5">

                {[
                  "Trusted vehicle listings",
                  "Certified inspection services",
                  "Secure payment solutions",
                  "Fast registration process",
                  "Flexible financing options",
                  "Dedicated customer support",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 rounded-xl bg-white/5 p-4"
                  >
                    <CheckCircleIcon className="h-6 w-6 text-primary-400" />

                    <span className="text-gray-200">
                      {item}
                    </span>
                  </div>
                ))}

              </div>

              {/* Bottom Card */}

              <div className="mt-10 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 p-6">

                <h4 className="text-2xl font-bold">
                  Driven by Trust.
                </h4>

                <p className="mt-3 leading-7 text-primary-100">
                  Our goal is simple: provide a seamless automotive experience
                  that customers can rely on today and in the future.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}