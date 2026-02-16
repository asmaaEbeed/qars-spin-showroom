"use client";

import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { Link, useSearchParams } from "react-router-dom";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get("paymentId");
  const postCode = sessionStorage.getItem("postCode");
  return (
    <div className="overflow-hidden relative flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 px-4">
      {/* Decorative blur */}
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-green-300/30 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-emerald-300/30 blur-3xl" />

      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white p-8 shadow-2xl">
        {/* Success Ring */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
            <CheckBadgeIcon className="h-8 w-8 text-green-600" />
          </div>
        </div>

        {/* Title */}
        <h1 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Payment Complete
        </h1>

        {/* Subtitle */}
        <p className="mt-2 text-center text-sm text-gray-600">
          Thank you for your payment. Your transaction was processed
          successfully.
        </p>

        {/* Divider */}
        <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        {/* Payment ID */}
        {paymentId && (
          <div className="rounded-xl bg-gray-50 px-4 py-3 text-center text-sm text-gray-700">
            <p className="text-xs text-gray-500">Transaction ID</p>
            <p className="mt-1 font-mono font-medium">{paymentId}</p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-6 space-y-3">
          <Link
            to={`/showroom/posts/${postCode}`}
            className="block w-full rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-md transition hover:opacity-90"
          >
            Back to post
          </Link>

          <Link
            to="/"
            className="block w-full rounded-xl border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Back to Home
          </Link>
        </div>

        {/* Footer note */}
        <p className="mt-6 text-center text-xs text-gray-400">
          You may safely close this page
        </p>
      </div>
    </div>
  );
}
