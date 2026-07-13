import {
    ArrowRightIcon,
    PhoneIcon,
} from "@heroicons/react/24/outline";
import bgImg from "../../assets/images/bg.jpg"

export default function CTASection() {
    return (
        <section className="relative overflow-hidden py-24">
            <img
                src={bgImg}
                alt=""
                aria-hidden="true"
                fetchpriority="high"
                loading="eager"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Background */}

            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-white/0" />

            <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

                <div className="overflow-hidden rounded-[40px] border border-white/10 bg-black/20 backdrop-blur-md">

                    <div className="grid items-center gap-12 p-10 lg:grid-cols-2 lg:p-16">

                        {/* Left */}

                        <div>

                            <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white">
                                START YOUR JOURNEY
                            </span>

                            <h2 className="mt-6 text-4xl font-bold leading-tight text-white md:text-5xl">
                                Ready to Find
                                <span className="block">
                                    Your Next Vehicle?
                                </span>
                            </h2>

                            <p className="mt-8 max-w-xl text-lg leading-8 text-primary-100">
                                Whether you're buying your first car, selling your current
                                vehicle, or looking for trusted automotive services, Qars Spin
                                is here to make every step simple, secure and stress-free.
                            </p>

                        </div>

                        {/* Right */}

                        <div className="rounded-3xl bg-white p-8 shadow-2xl">

                            <h3 className="text-3xl font-bold text-secondary-900">
                                Let's Get Started
                            </h3>

                            <p className="mt-4 leading-7 text-secondary-600">
                                Join thousands of drivers discovering a better way to buy,
                                sell and manage vehicles.
                            </p>

                            <div className="mt-10 space-y-4">

                                <button className="group flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

                                    Explore Vehicles

                                    <ArrowRightIcon className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />

                                </button>

                                <button className="flex w-full items-center justify-center rounded-xl border border-secondary-200 px-6 py-4 font-semibold text-secondary-700 transition hover:border-primary-500 hover:text-primary-600">

                                    <PhoneIcon className="mr-2 h-5 w-5" />

                                    Contact Our Team

                                </button>

                            </div>

                            <div className="mt-10 border-t border-gray-200 pt-6">

                                <div className="grid grid-cols-2 gap-6">

                                    <div>

                                        <h4 className="text-3xl font-bold text-primary-600">
                                            360°
                                        </h4>

                                        <p className="mt-2 text-sm text-secondary-500">
                                            Interactive Vehicle Experience
                                        </p>

                                    </div>

                                    <div>

                                        <h4 className="text-3xl font-bold text-primary-600">
                                            All-in-One
                                        </h4>

                                        <p className="mt-2 text-sm text-secondary-500">
                                            Automotive Services Platform
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}