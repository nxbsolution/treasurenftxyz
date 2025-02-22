import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { LucideBell } from 'lucide-react';
import { format } from 'date-fns';

export default function NotificationCard({
  LinkTo = "Message", variant = "info", statement, time
}: {
  LinkTo?: string, variant?: string, statement: string, time?: string
}) {

  const getStyle = (variant: string) => {
    switch (variant) {
      case 'success':
        return 'bg-emerald-100 border-emerald-500 text-emerald-900';
      case 'error':
        return 'bg-rose-100 border-rose-500 text-rose-900';
      case 'warning':
        return 'bg-amber-100 border-amber-500 text-amber-900';
      case 'info':
        return 'bg-sky-100 border-sky-500 text-sky-900';
      default:
        return 'bg-slate-100 border-slate-500 text-slate-900';
    }
  }

  return (
    <Alert className={`${getStyle(variant)} border-2 border-black`}>
      <LucideBell className="h-6 w-6 mt-4" />
      <div className='flex justify-between'>
        <AlertTitle className="text-lg font-bold">{LinkTo}</AlertTitle>
        {time && <p className="text-xs text-muted-foreground">{format(new Date(time), 'MMM d, yyyy h:mm a')}</p>}
      </div>
      <AlertDescription>
        {statement}
      </AlertDescription>
    </Alert>
  )
}