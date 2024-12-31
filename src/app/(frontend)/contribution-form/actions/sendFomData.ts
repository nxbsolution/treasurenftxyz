"use server"

import { getPayload } from 'payload'
import config from '@payload-config'

export async function sendFormData(formData: FormData) {
const payload = await getPayload({ config })

// --------------------- Upload Start Certificate File ---------------------
	const certificateFormDataEntryValue = formData.get('uploadStarCertificate') ;
	let certificateFile: { 
			data: Buffer; 
			name: string; 
			mimetype: string; 
			size: number;
		} | undefined = undefined;

	if (certificateFormDataEntryValue instanceof File) {
			const buffer = Buffer.from(await certificateFormDataEntryValue.arrayBuffer())
			
			certificateFile = {
					data: buffer,
					size: buffer.byteLength,
					name: certificateFormDataEntryValue.name,
					mimetype: certificateFormDataEntryValue.type
			}
	}

	const certificateMedia = await payload.create({
		collection: 'media',
		data: {
			alt: `Star Certificate`,
		},
		file: certificateFile,
	})

// --------------------- Upload Payment Screenshot File ---------------------
const payFormDataEntryValue = formData.get('screenShot') ;
let payFile: { 
		data: Buffer; 
		name: string; 
		mimetype: string; 
		size: number;
	} | undefined = undefined;

if (payFormDataEntryValue instanceof File) {
		const buffer = Buffer.from(await payFormDataEntryValue.arrayBuffer())
		
		payFile = {
				data: buffer,
				size: buffer.byteLength,
				name: payFormDataEntryValue.name,
				mimetype: payFormDataEntryValue.type
		}
}

const payMedia = await payload.create({
	collection: 'media',
	data: {
		alt: `payment screenshot`,
	},
	file: payFile,
})

// ------------------------------------------------------
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
			}
			// const verify: "PENDING" | "APPROVED" | "REJECTED" = 'PENDING';
			const uploadStarCertificate = certificateMedia.id;
			const screenShot = payMedia.id;

	const row = await payload.create({
			collection: 'contributions',
			data: {
				...contributionData, 
				uploadStarCertificate,
				screenShot
			},
	})

	console.log('Created contribution:', row)

	return { success: true, data: row }
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

