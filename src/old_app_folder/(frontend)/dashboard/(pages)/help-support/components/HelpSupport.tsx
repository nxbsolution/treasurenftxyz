"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useRouter } from "next/navigation"
import createQuery from "./createQuery"
import { Query } from "@/payload-types"
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";
import Loader from "@/app/(frontend)/_components/Loader"

const formSchema = z.object({
  question: z.string().min(10, "Please enter your question")
})

const getStatusStyle = (status: Query['status']) => {
  const styles = {
    'open': 'bg-blue-100 text-blue-800 border-blue-300 before:bg-blue-400',
    'closed': 'bg-red-100 text-red-800 border-red-300 before:bg-red-400',
    'in-progress': 'bg-amber-100 text-amber-800 border-amber-300 before:bg-amber-400',
    'resolved': 'bg-emerald-100 text-emerald-800 border-emerald-300 before:bg-emerald-400'
  };
  return styles[status];
};

export default function HelpSupport({ queries, memberId }: { queries: Query[], memberId: number }) {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { success, message } = await createQuery({ question: values.question, memberId })
      if (success) {
        form.reset()
        toast({
          title: 'Query submitted',
          description: message,
          variant: 'success'
        })
        router.refresh()
      } else {
        toast({
          title: "Couldn't submit query",
          description: message,
          variant: 'destructive'
        })
      }
    } catch (_) {
      toast({
        title: 'Something went wrong',
        description: "Ensure you're connected to the internet and try submitting your query again.",
        variant: 'destructive'
      })
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-primary text-center">Help & Support Center</h1>

      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 border border-gray-200">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Submit a New Query</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <textarea
                      {...field}
                      className="w-full p-3 sm:p-4 border rounded-lg resize-none outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows={4}
                      placeholder="Type your question here..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button
              disabled={form.formState.isSubmitting}
              type="submit"
              className="mt-4 w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {form.formState.isSubmitting ? <Loader /> : 'Submit Query'}
            </button>
          </form>
        </Form>
      </div>

      <div className="space-y-4 sm:space-y-6">
        <h2 className="text-lg sm:text-xl font-semibold">Your Queries</h2>
        {queries.map((query) => (
          <div key={query.id} className="bg-white rounded-lg shadow-lg p-4 sm:p-6 border border-gray-200">
            <div className="flex-1 mr-4 sm:mr-8">
              <div className="bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-100">
                <p className="font-medium text-blue-900 text-sm sm:text-base">{query.question}</p>
              </div>
            </div>
            {query.answer && (
              <div className="mt-4 ml-4 sm:ml-8">
                <div className="bg-green-50 p-3 sm:p-4 rounded-lg border border-green-100">
                  <p className="text-green-900 text-sm sm:text-base">{query.answer}</p>
                </div>
              </div>
            )}
            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs sm:text-sm text-gray-500">
                Submitted on: {format(new Date(query.createdAt), "MMM dd, yyyy")}
              </span>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium relative before:content-[''] before:w-2 before:h-2 before:rounded-full before:mr-2 ${getStatusStyle(query.status)}`}>
                {query.status}
              </span>
            </div>
          </div>
        ))}
        {queries.length === 0 && (
          <div className="text-center p-8 bg-gray-50 rounded-lg">
            <p className="text-lg text-gray-600 mb-2">Looking all clear!</p>
            <p className="text-gray-500">
              Have a question? Feel free to submit one above and our team will be happy to help.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}