import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { LucideBell } from 'lucide-react';
import { format } from 'date-fns';

export default function NotificationCard({
  LinkTo = "Message", variant = "info", statement, time
}: {
  LinkTo?: string, variant?: string, statement: string, time: string
}) {

  const getStyle = (variant: string) => {
    switch (variant) {
      case 'success':
        return 'bg-green-500/30';
      case 'error':
        return 'bg-red-500/30';
      case 'warning':
        return 'bg-yellow-500/30';
      case 'info':
        return 'bg-blue-500/30';
      default:
        return 'bg-gray-500/30';
    }
  }

  return (
    <Alert className={`${getStyle(variant)} border-2 border-black`}>
      <LucideBell className="h-6 w-6 mt-4" />
      <div className='flex justify-between'>
        <AlertTitle className="text-lg font-bold">{LinkTo}</AlertTitle>
        <p className="text-xs text-muted-foreground">{format(new Date(time), 'MMM d, yyyy h:mm a')}</p>
      </div>
      <AlertDescription>
        {statement}
      </AlertDescription>
    </Alert>
  )
}