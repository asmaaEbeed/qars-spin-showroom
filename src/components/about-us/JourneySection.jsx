import {
    MagnifyingGlassIcon,
    EyeIcon,
    CreditCardIcon,
    DocumentCheckIcon,
    TruckIcon,
} from "@heroicons/react/24/outline";

const journey = [
    {
        icon: MagnifyingGlassIcon,
        title: "Browse",
        description:
            "Explore a wide range of new and used vehicles with detailed information and 360° views.",
    },
    {
        icon: EyeIcon,
        title: "Inspect",
        description:
            "Request professional vehicle inspections to ensure confidence before making a purchase.",
    },
    {
        icon: CreditCardIcon,
        title: "Secure Payment",
        description:
            "Complete your transaction safely through our trusted payment process.",
    },
    {
        icon: DocumentCheckIcon,
        title: "Register",
        description:
            "We take care of registration paperwork and documentation for a hassle-free experience.",
    },
    {
        icon: TruckIcon,
        title: "Drive Away",
        description:
            "Enjoy your new vehicle with confidence, backed by our complete automotive services.",
    },
];

export default function JourneySection() {
    return (
        <section className="bg-white py-24">
           
            <div className="mx-auto max-w-7xl px-6 lg:px-8">

                {/* Heading */}
                <div className="mx-auto max-w-3xl text-center">

                    <span className="inline-flex rounded-full bg-primary-100 px-4 py-2 text-sm font-semibold text-primary-700">
                        HOW IT WORKS
                    </span>

                    <h2 className="mt-6 text-4xl font-bold text-secondary-900 md:text-5xl">
                        Your Journey Starts Here
                    </h2>

                    <p className="mt-6 text-lg leading-8 text-secondary-600">
                        Qars Spin simplifies every step of your automotive journey—from
                        finding the right vehicle to driving it home.
                    </p>

                </div>

                {/* Timeline */}
                <div className="relative mt-20">

                    {/* Desktop line */}
                    <div className="absolute left-0 right-0 top-12 hidden h-0.5 bg-gray-200 lg:block" />

                    <div className="grid gap-12 lg:grid-cols-5">

                        {journey.map((step, index) => {
                            const Icon = step.icon;

                            return (
                                <div
                                    key={step.title}
                                    className="relative text-center group"
                                >
                                    {/* Circle */}
                                    <div className="relative z-10 mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-lg ring-8 ring-gray-50 transition-all duration-300 group-hover:scale-110 group-hover:ring-primary-100">

                                        <Icon className="h-10 w-10 text-primary-600" />

                                    </div>

                                    {/* Step Number */}
                                    <div className="mt-6 text-sm font-semibold text-primary-600">
                                        Step {index + 1}
                                    </div>

                                    {/* Title */}
                                    <h3 className="mt-2 text-xl font-bold text-secondary-900">
                                        {step.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="mt-4 leading-7 text-secondary-600">
                                        {step.description}
                                    </p>
                                </div>
                            );
                        })}

                    </div>

                </div>

            </div>
        </section>
    );
}