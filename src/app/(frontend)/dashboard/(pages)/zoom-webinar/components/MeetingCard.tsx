import { Meeting } from "@/payload-types";

export default function MeetingCard({ meeting }: { meeting: Meeting }) {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          {/* Status Badge */}
          <div className="flex justify-between items-center mb-6">
            <span className={`px-3 py-1 rounded-full text-sm ${meeting.status === 'start' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
              {meeting.status === 'start' ? 'Meeting in Progress' : 'Meeting Starts Soon - Stay Tuned!'}
            </span>
          </div>

          {/* Meeting Details */}
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Meeting Details</h1>
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Agenda</h2>
              <p className="text-gray-600">{meeting.agenda}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-700">Participants</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                {
                  meeting.assignToAll ? (
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      All Members
                    </span>
                  ) : (
                    meeting.assignToStars?.map((star) => (
                      <span key={star} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {star}
                      </span>
                    ))
                  )
                }
              </div>
            </div>
          </div>

          {/* Join Button */}
          {meeting.status === 'start' &&
            <div className="mt-8">
              <a
                href={meeting.link}
                className="w-full flex justify-center items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition duration-150"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join Meeting Room
              </a>
            </div>}
        </div>
      </div>
    </div>
  )
}
