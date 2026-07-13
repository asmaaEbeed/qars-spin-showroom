import {
  CubeTransparentIcon,
  ShieldCheckIcon,
  WrenchScrewdriverIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";

const stats = [
  {
    icon: CubeTransparentIcon,
    title: "360° Technology",
    description:
      "Experience every vehicle from every angle with immersive 360° viewing.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Trusted Platform",
    description:
      "Transparent processes and secure transactions you can rely on.",
  },
  {
    icon: WrenchScrewdriverIcon,
    title: "Complete Services",
    description:
      "Inspection, registration, roadside assistance, financing and more.",
  },
  {
    icon: CreditCardIcon,
    title: "Secure Payments",
    description:
      "Safe payment solutions designed to protect buyers and sellers.",
  },
];

export default function StatsSection() {
  return (
    <section className="relative -mt-10 z-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          {stats.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group rounded-3xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-primary-200 hover:shadow-2xl"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 transition-all duration-300 group-hover:bg-primary-500">
                <Icon className="h-8 w-8 text-primary-600 transition-colors duration-300 group-hover:text-white" />
              </div>

              <h3 className="mt-6 text-xl font-bold text-secondary-900">
                {title}
              </h3>

              <p className="mt-3 leading-7 text-secondary-600">
                {description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}