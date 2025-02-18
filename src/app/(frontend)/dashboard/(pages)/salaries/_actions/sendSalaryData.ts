"use server"

import { getPayload } from 'payload'
import config from '@payload-config'

export async function sendSalaryData(formData: FormData) {
  const payload = await getPayload({ config })

  const totalReport = formData.get('membersScreenshot');
  const oldCertificate = formData.get('starCertificate');

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

  try {

    if (formData.has("depositeAddress")) {
      const updatedMember = await payload.update({
        collection: 'members',
        id: Number(formData.get('id')),
        data: {
          depositAddress: {
            "TRC-20": formData.get('TRC-20') as string,
          }
        }
      })
      console.log(updatedMember)
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

    const uploadedData = await payload.create({
      collection: 'salary',
      data: {
        member: Number(formData.get('id')),
        uid: formData.get('uid') as string,
        realName: formData.get('realName') as string,
        "TRC-20": formData.get('TRC-20') as string,
        membersA: formData.get('membersA') as unknown as number,
        membersBC: formData.get('membersBC') as unknown as number,
        star: formData.get('star') as "1star" | "2star" | "3star" | "4star" | "5star" | "6star",
        membersScreenshot: uploadedReport.id,
        starCertificate: uploadedCertificate.id
      },
    })

    return { success: true, error: null }
  } catch (error) {
    console.error('Error uploading Star Data:', error)
    return { success: false, error: error instanceof Error ? error.message : 'An unknown error occurred' }
  }
}
