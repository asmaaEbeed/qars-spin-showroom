"use client";

import { XCircleIcon } from "@heroicons/react/24/solid";
import { Link, useSearchParams } from "react-router-dom";

export default function PaymentFailed() {
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get("paymentId");
  const postCode = sessionStorage.getItem("postCode");

  return (
    <div
      className="relative flex min-h-screen w-screen items-center justify-center 
      overflow-hidden 
      bg-gradient-to-br from-red-50 via-white to-rose-50 px-4"
    >
      {/* Decorative blur */}
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-red-300/30 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-rose-300/30 blur-3xl" />

      <div className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        {/* Error ring */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-rose-500 shadow-lg">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
            <XCircleIcon className="h-8 w-8 text-red-600" />
          </div>
        </div>

        {/* Title */}
        <h1 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Payment Failed
        </h1>

        {/* Message */}
        <p className="mt-2 text-center text-sm text-gray-600">
          Unfortunately, your payment could not be processed.
          Please try again or choose a different payment method.
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

        {/* Actions */}
        <div className="mt-6 space-y-3">
          <Link
            to={`/showroom/posts/${postCode}`}
            className="block w-full rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-md transition hover:opacity-90"
          >
            Back to post
          </Link>

          <Link
            to="/dashboard"
            className="block w-full rounded-xl border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Go to Dashboard
          </Link>
        </div>

        {/* Footer note */}
        <p className="mt-6 text-center text-xs text-gray-400">
          No charges were made to your account
        </p>
      </div>
    </div>
  );
}

