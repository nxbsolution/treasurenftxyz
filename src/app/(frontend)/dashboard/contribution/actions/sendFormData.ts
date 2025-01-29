"use server"

import { getPayload } from 'payload'
import config from '@payload-config'

export async function sendFormData(formData: FormData) {
	const payload = await getPayload({ config })

	// --------------------- Upload Start Certificate File ---------------------
	const certificateFormDataEntryValue = formData.get('uploadStarCertificate');
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
	const payFormDataEntryValue = formData.get('screenShot');
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

	// ------------------- Create contribution Now ------------------------------
	type StarRating = "1star" | "2star" | "3star" | "4star" | "5star" | "6star";

	try {
		const contributionData = {
			member: Number(formData.get('member')),
			nft_username: formData.get('nft_username') as string,
			transactionId: formData.get('transactionId') as string,
			star: formData.get('star') as StarRating,
		}
		console.log(contributionData)

		const uploadStarCertificate = certificateMedia.id;
		const screenShot = payMedia.id;

		const newContribution = await payload.create({
			collection: 'contributions',
			data: {
				...contributionData,
				uploadStarCertificate,
				screenShot
			},
		})

		return { success: true, data: newContribution }
	} catch (error) {
		console.error('Error creating donation:', error)
		return { success: false, error: error instanceof Error ? error.message : 'An unknown error occurred' }
	}
}
