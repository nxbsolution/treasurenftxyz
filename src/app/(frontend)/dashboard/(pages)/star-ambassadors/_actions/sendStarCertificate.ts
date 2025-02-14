"use server"

import { getPayload } from 'payload'
import config from '@payload-config'

export async function sendStarData(formData: FormData) {
  const payload = await getPayload({ config })

  const totalReport = formData.get('totalReport');

  let totalReportFile: {
    data: Buffer;
    name: string;
    mimetype: string;
    size: number;
  } | undefined = undefined;

  if (totalReport instanceof File) {
    const buffer = Buffer.from(await totalReport.arrayBuffer())

    totalReportFile = {
      data: buffer,
      size: buffer.byteLength,
      name: totalReport.name.replace(/[^a-zA-Z0-9_.-]/g, '_'),
      mimetype: totalReport.type
    }
  }

  const uploadedReport = await payload.create({
    collection: 'media',
    data: {
      alt: `Total report`,
    },
    file: totalReportFile,
  })

  try {
    const uploadedData = await payload.create({
      collection: 'star',
      data: {
        member: 1,
        A: formData.get('A') as unknown as number,
        BC: formData.get('BC') as unknown as number,
        totalReport: uploadedReport.id,
      },
    })
    console.log(uploadedData)
    return { success: true, data: null }
  } catch (error) {
    console.error('Error uploading Star Data:', error)
    if (error instanceof Error && error.message === "The following field is invalid: member") {
      return { success: false, error: "Star Certificate already issued for this user" }
    }
    return { success: false, error: error instanceof Error ? error.message : 'An unknown error occurred' }
  }
}

export async function updateStarData(formData: FormData) {
  const payload = await getPayload({ config })

  const totalReport = formData.get('totalReport');
  const oldCertificate = formData.get('oldCertificate');

  let totalReportFile: {
    data: Buffer;
    name: string;
    mimetype: string;
    size: number;
  } | undefined = undefined;

  let oldCertificateFile: {
    data: Buffer;
    name: string;
    mimetype: string;
    size: number;
  } | undefined = undefined;

  if (totalReport instanceof File) {
    const buffer = Buffer.from(await totalReport.arrayBuffer())

    totalReportFile = {
      data: buffer,
      size: buffer.byteLength,
      name: totalReport.name.replace(/[^a-zA-Z0-9_.-]/g, '_'),
      mimetype: totalReport.type
    }
  }

  if (oldCertificate instanceof File) {
    const buffer = Buffer.from(await oldCertificate.arrayBuffer())

    oldCertificateFile = {
      data: buffer,
      size: buffer.byteLength,
      name: oldCertificate.name.replace(/[^a-zA-Z0-9_.-]/g, '_'),
      mimetype: oldCertificate.type
    }
  }

  const uploadedReport = await payload.create({
    collection: 'media',
    data: {
      alt: `Total report`,
    },
    file: totalReportFile,
  })

  const uploadedCertificate = await payload.create({
    collection: 'media',
    data: {
      alt: `old Certificate`,
    },
    file: oldCertificateFile,
  })

  try {
    const uploadedData = await payload.create({
      collection: 'star',
      data: {
        member: 1,
        A: formData.get('A') as unknown as number,
        BC: formData.get('BC') as unknown as number,
        totalReport: uploadedReport.id,
        oldStarCard: uploadedCertificate.id
      },
    })
    console.log(uploadedData)
    return { success: true, data: null }
  } catch (error) {
    console.error('Error uploading Star Data:', error)
    if (error instanceof Error && error.message === "The following field is invalid: member") {
      return { success: false, error: "Star Certificate already issued for this user" }
    }
    return { success: false, error: error instanceof Error ? error.message : 'An unknown error occurred' }
  }
}
