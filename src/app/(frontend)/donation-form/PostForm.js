"use server"
import { getPayload } from 'payload'
import config from '@payload-config'
const payload = await getPayload({ config })

export default async function PostForm({data}) {
// The created Post document is returned
const post = await payload.create({
  collection: 'donations',
  data,
  disableVerificationEmail: true,
  // file: uploadedFile,
})
// console.log(post)
return post
}
