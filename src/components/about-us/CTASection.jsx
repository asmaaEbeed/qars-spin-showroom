import {
  PhoneIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import bgImg from "../../assets/images/bg.jpg";

export default function ContactSupportSection() {
  return (
    <section className="relative overflow-hidden py-24">
      <img
        src={bgImg}
        alt=""
        aria-hidden="true"
        loading="eager"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-black/10" />

      <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="overflow-hidden rounded-[40px] border border-white/10 bg-black/20 backdrop-blur-md">
          <div className="grid items-center gap-12 p-10 lg:grid-cols-2 lg:p-16">
            {/* Left */}
            <div>
              <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white">
                CUSTOMER SUPPORT
              </span>

              <h2 className="mt-6 text-4xl font-bold leading-tight text-white md:text-5xl">
                Need Help with
                <span className="block text-primary-300">Qars Spin?</span>
              </h2>

              <p className="mt-8 max-w-xl text-lg leading-8 text-gray-200">
                Our support team is here to help with account issues, car
                listings, showroom inquiries, payments, technical problems, and
                general app usage.
              </p>

              <div className="mt-10 rounded-2xl border border-white/10 bg-white/10 p-6">
                <h3 className="mb-4 text-lg font-semibold text-white">
                  We can help you with:
                </h3>

                <ul className="grid gap-3 text-gray-200 sm:grid-cols-2">
                  <li>• Account issues</li>
                  <li>• Car listings</li>
                  <li>• Showroom inquiries</li>
                  <li>• Payments</li>
                  <li>• Technical support</li>
                  <li>• General app usage</li>
                </ul>
              </div>
            </div>

            {/* Right */}
            <div className="rounded-3xl bg-white p-8 shadow-2xl">
              <h3 className="text-3xl font-bold text-secondary-900">
                Contact Us
              </h3>

              <p className="mt-3 text-secondary-600">
                Reach out through any of the following channels.
              </p>

              <div className="mt-8 space-y-5">
                <a
                  href="mailto:support@qarsspin.com"
                  className="flex items-center gap-4 rounded-xl border border-gray-200 p-4 transition hover:border-primary-500"
                >
                  <EnvelopeIcon className="h-6 w-6 text-primary-600" />

                  <div>
                    <p className="text-sm text-secondary-500">Email</p>
                    <p className="font-semibold text-secondary-900">
                      support@qarsspin.com
                    </p>
                  </div>
                </a>

                <a
                  href="tel:+97466288388"
                  className="flex items-center gap-4 rounded-xl border border-gray-200 p-4 transition hover:border-primary-500"
                >
                  <PhoneIcon className="h-6 w-6 text-primary-600" />

                  <div>
                    <p className="text-sm text-secondary-500">Phone</p>
                    <p className="font-semibold text-secondary-900">
                      +974 6628 8388
                    </p>
                  </div>
                </a>

                <a
                  href="https://wa.me/97466288388"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 rounded-xl border border-gray-200 p-4 transition hover:border-primary-500"
                >
                  <ChatBubbleLeftRightIcon className="h-6 w-6 text-primary-600" />

                  <div>
                    <p className="text-sm text-secondary-500">WhatsApp</p>
                    <p className="font-semibold text-secondary-900">
                      +974 6628 8388
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-4 rounded-xl bg-primary-50 p-4">
                  <ClockIcon className="mt-1 h-6 w-6 text-primary-600" />

                  <div>
                    <p className="font-semibold text-secondary-900">
                      Working Hours
                    </p>

                    <p className="text-secondary-600">
                      Sunday – Thursday
                      <br />
                      9:00 AM – 6:00 PM
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-2xl bg-secondary-50 p-5">
                <p className="text-sm leading-7 text-secondary-200">
                  You can also contact us directly through the{" "}
                  <span className="font-semibold text-white">
                    Contact Us
                  </span>{" "}
                  section inside the Qars Spin app.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}