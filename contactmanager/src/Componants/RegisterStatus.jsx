import React from "react";

export default function RegisterStatus({ loading, success, error }) {
  if (!loading && !success && !error) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md h-48 flex items-center justify-center text-center border border-gray-200">
        {loading && (
          <div className="flex flex-col items-center text-blue-600 font-medium">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
            <span className="text-lg">Registering...</span>
          </div>
        )}

        {success && (
          <div className="text-green-600 font-semibold text-xl">
            ✅ Registration Successful!
          </div>
        )}

        {error && (
          <div className="text-red-600 font-semibold text-xl">
            ❌ {error}
          </div>
        )}
      </div>
    </div>
  );
}
