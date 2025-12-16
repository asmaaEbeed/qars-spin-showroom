"use client";

import { Link, useParams } from "react-router-dom";

export default function PaymentSuccess() {
  const params = useParams();
  const paymentId = params.paymentId;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful 🎉</h1>

      <p className="mt-4 text-gray-700">
        Thank you! Your payment has been completed successfully.
      </p>

      {paymentId && (
        <p className="mt-2 text-gray-500">Payment ID: {paymentId}</p>
      )}

      <Link
        to="/dashboard"
        className="mt-6 px-4 py-2 bg-green-600 text-white rounded-md shadow"
      >
        Back to Home
      </Link>
    </div>
  );
}
