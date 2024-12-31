import { getPayload } from 'payload'
import config from '@payload-config'
const payload = await getPayload({ config })

export default async function PostForm() {
// The created Post document is returned
// const post = await payload.create({
//   collection: 'donations',
//   data,
//   disableVerificationEmail: true,
//   // // Alternatively, you can directly pass a File,
//   // // if file is provided, filePath will be omitted
//   // file: uploadedFile,
// })
// console.log(post)
// return post
// }

const data = {
  uid: "123" 
}

try {
  const payload = await getPayload({ config })
  const post = await payload.create({
    collection: 'donations',
    data,
    disableVerificationEmail: true,
  })
  return post
} catch (error) {
  console.error('Error creating donation:', error)
  throw error
}
}