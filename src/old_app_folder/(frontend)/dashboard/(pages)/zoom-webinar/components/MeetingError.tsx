"use client";
export default function MeetingError() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100">
        <div className="p-8 text-center">
          <div className="mb-6">
            <svg className="mx-auto h-16 w-16 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Meeting Not Available</h1>
          <p className="text-gray-600 mb-8">
            The meeting details you&#39;re looking for aren&#39;t available right now. Our team has been notified.
          </p>
          <div className="space-y-4">
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Try Again
            </button>
            <div className="mt-4">
              <a href="/dashboard" className="text-blue-600 hover:text-blue-800 font-medium">
                Return to Dashboard
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
