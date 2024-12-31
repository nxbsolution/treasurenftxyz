"use server"
import { getPayload } from 'payload'
import config from '@payload-config'
const payload = await getPayload({ config })

export const postData = async () => {
  const payload = await getPayload({ config })

  const post = await payload.create({
    collection: 'donations',
    data:{
      uid: "ali"
    },
    // disableVerificationEmail: true,
  })

  console.log(post)
  return post
}