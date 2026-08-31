import {
  ArrowRightIcon,
  MagnifyingGlassCircleIcon,
  CreditCardIcon,
  WrenchScrewdriverIcon,
  IdentificationIcon,
  TruckIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";

const services = [
  {
    title: "Buy & Sell Cars",
    icon: ShoppingBagIcon,
    description:
      "Browse new and used vehicles with detailed specifications, high-quality photos and immersive 360° viewing.",
    features: [
      "Large vehicle inventory",
      "360° vehicle experience",
      "Seller assistance",
    ],
  },
  {
    title: "Vehicle Inspection",
    icon: MagnifyingGlassCircleIcon,
    description:
      "Professional inspections performed by certified specialists to help buyers and sellers make informed decisions.",
    features: [
      "Certified inspection centers",
      "Detailed reports",
      "Buy with confidence",
    ],
  },
  {
    title: "Roadside Assistance",
    icon: TruckIcon,
    description:
      "Reliable 24/7 breakdown support for all vehicles, including luxury and low-clearance cars.",
    features: [
      "24/7 emergency support",
      "Luxury vehicle handling",
      "Fast response",
    ],
  },
  {
    title: "Vehicle Registration",
    icon: IdentificationIcon,
    description:
      "We handle documentation, insurance and registration procedures for a hassle-free experience.",
    features: [
      "Traffic department process",
      "Insurance assistance",
      "Fast registration",
    ],
  },
  {
    title: "Secure Payments",
    icon: CreditCardIcon,
    description:
      "Protected payment solutions designed to keep every transaction transparent and secure.",
    features: [
      "Buyer protection",
      "Seller protection",
      "Secure transactions",
    ],
  },
  {
    title: "Financing & EMI",
    icon: WrenchScrewdriverIcon,
    description:
      "Flexible financing solutions with competitive EMI options tailored to your budget.",
    features: [
      "Easy application",
      "Flexible installments",
      "Financial guidance",
    ],
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">

          <span className="inline-flex rounded-full bg-primary-100 px-4 py-2 text-sm font-semibold text-primary-700">
            OUR SERVICES
          </span>

          <h2 className="mt-6 text-4xl font-bold text-secondary-900 md:text-5xl">
            Everything You Need,
            <span className="block text-primary-600">
              All in One Platform
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-secondary-600">
            From finding your next vehicle to financing, inspection,
            registration and secure payments, Qars Spin simplifies every step
            of your automotive journey.
          </p>

        </div>

        {/* Cards */}

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {services.map(({ title, icon: Icon, description, features }) => (

            <div
              key={title}
              className="group flex flex-col rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-primary-200 hover:shadow-2xl"
            >

              {/* Icon */}

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 transition-all duration-300 group-hover:bg-primary-600">

                <Icon className="h-8 w-8 text-primary-600 transition-all duration-300 group-hover:text-white group-hover:scale-110" />

              </div>

              {/* Title */}

              <h3 className="mt-8 text-2xl font-bold text-secondary-900">
                {title}
              </h3>

              {/* Description */}

              <p className="mt-4 flex-grow leading-7 text-secondary-600">
                {description}
              </p>

              {/* Features */}

              <div className="mt-8 space-y-3">

                {features.map((feature) => (

                  <div
                    key={feature}
                    className="flex items-center gap-3"
                  >

                    <div className="h-2 w-2 rounded-full bg-primary-500"></div>

                    <span className="text-sm text-secondary-700">
                      {feature}
                    </span>

                  </div>

                ))}

              </div>

              {/* Footer */}

              {/* <button
                className="mt-8 inline-flex w-fit items-center font-semibold text-primary-600 transition-all duration-300 hover:text-primary-700"
              >
                Learn More

                <ArrowRightIcon className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />

              </button> */}

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}