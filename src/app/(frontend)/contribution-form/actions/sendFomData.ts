"use server"

import { getPayload } from 'payload'
import config from '@payload-config'

export async function sendFormData(formData: FormData) {
    const payload = await getPayload({ config })
    console.log('formdata received in form action: ', Object.fromEntries(formData))

    try {
        const contributionData = {
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
            verify: 'PENDING'
        }

        console.log('Contribution data in form action:', contributionData)

        const certificateFormDataEntryValue = formData.get('uploadStarCertificate') ;
        
        let certificateFileData: { data: Buffer; filename: string; mimeType: string; } | undefined = undefined;

        let certificateFile: File | undefined = undefined;

        let temp: { data: Buffer; name: string; mimetype: string; size: number} | undefined = undefined;
        
        if (certificateFormDataEntryValue instanceof File) {

            const buffer = Buffer.from(await certificateFormDataEntryValue.arrayBuffer())
            
            certificateFileData = {
                data: buffer,
                filename: certificateFormDataEntryValue.name,
                mimeType: certificateFormDataEntryValue.type,
            }

            certificateFile =  new File([certificateFileData.data], certificateFileData.filename, {
                type: certificateFileData.mimeType
            });

           temp = {
                data: certificateFileData.data,
                name: certificateFileData.filename,
                mimetype: certificateFileData.mimeType,
                size: 10000
            }
        }

        console.log(certificateFileData);
        console.log(certificateFile);
        
        // const paymentFile = formData.get('screenShot');
        // let paymentFileData: { data: Buffer; filename: string; mimeType: string; } | null = null;
        // if (paymentFile instanceof File) {
        //     const buffer = Buffer.from(await paymentFile.arrayBuffer())
        //     paymentFileData = {
        //         data: buffer,
        //         filename: paymentFile.name,
        //         mimeType: paymentFile.type,
        //     }
        // }

        const createdDonation = await payload.create({
            collection: 'contributions',
            data: {...contributionData},
            // file: certificateFile,
            // file: certificateFileData
            file: temp
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

