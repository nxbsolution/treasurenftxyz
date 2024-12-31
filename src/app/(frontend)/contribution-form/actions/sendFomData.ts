"use server"

// import { headers } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function sendFormData(formData: FormData) {
    // const headersList = await headers()
    const payload = await getPayload({ config })

    console.log('Form data received:', Object.fromEntries(formData))

    try {

        // const { user } = await payload.auth({ headers: headersList })

        // if (!user) {
        //     throw new Error('Failed to authenticate')
        // }

        // Handle file uploads
        // const uploadStarCertificate = formData.get('uploadStarCertificate') as File
        // const screenShot = formData.get('screenShot') as File

        // const uploadedStarCertificate = await handleFileUpload(payload, uploadStarCertificate)
        // const uploadedScreenShot = await handleFileUpload(payload, screenShot)

        const contributionData = {
            // uploadStarCertificate: uploadedStarCertificate.id,
            realName: formData.get('realName'),
            nft_username: formData.get('nft_username'),
            uid: formData.get('uid'),
            mobile: formData.get('mobile'),
            cityName: formData.get('cityName'),
            uplineName: formData.get('uplineName'),
            star: formData.get('star'),
            amount: formData.get('amount'),
            depositAddress: formData.get('depositAddress'),
            transactionId: formData.get('transactionId'),
            // screenShot: uploadedScreenShot.id,
            verify: 'PENDING',
        }

        console.log('Donation data to be sent:', contributionData)

        const createdDonation = await payload.create({
            collection: 'contributions',
            data: contributionData,
        })

        console.log('Created donation:', createdDonation)

        return { success: true, data: createdDonation }
    } catch (error) {
        console.error('Error creating donation:', error)
        return { success: false, error: error instanceof Error ? error.message : 'An unknown error occurred' }
    }
}

// async function handleFileUpload(payload: any, file: File) {
//     const media = await payload.create({
//         collection: 'media',
//         data: {
//             alt: file.name,
//         },
//         file,
//     })

//     return media
// }

