export default function MeetingAnnouncement({ announcement }: { announcement: string }) {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          {/* Status Badge */}
          <div className="flex justify-between items-center mb-6">
            <span className="px-3 py-1 rounded-full text-sm bg-amber-100 text-amber-800">
              Important Announcement
            </span>
          </div>

          {/* Announcement Content */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-6">
              <svg className="h-8 w-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
              <h1 className="text-2xl font-bold text-gray-900">Meeting Notice</h1>
            </div>

            <div className="bg-amber-50 p-6 rounded-lg border border-amber-100">
              <p className="text-gray-700 text-lg">
                {announcement && "Hello valued team member! There are no active meetings scheduled at this moment. Keep checking your dashboard for upcoming meetings and events. You're an essential part of our team's success."}
              </p>
            </div>

            <div className="mt-8 text-center">
              <a
                href="/dashboard"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-amber-700 bg-amber-100 hover:bg-amber-200 transition duration-150"
              >
                Return to Dashboard
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
