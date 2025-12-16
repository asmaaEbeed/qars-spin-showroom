"use client";

import { Link, useParams } from "react-router-dom";


export default function PaymentFailed() {
  const params = useParams();
  const error = params.message;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-3xl font-bold text-red-600">Payment Failed ❌</h1>

      <p className="mt-4 text-gray-700">
        Unfortunately, your payment could not be processed.
      </p>

      {error && (
        <p className="mt-2 text-gray-500">Error: {error}</p>
      )}

      <Link
        to="/"
        className="mt-6 px-4 py-2 bg-red-600 text-white rounded-md shadow"
      >
        Try Again
      </Link>
    </div>
  );
}
