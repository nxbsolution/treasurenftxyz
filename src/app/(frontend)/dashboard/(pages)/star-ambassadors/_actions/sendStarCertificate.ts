"use server"

import { getPayload } from 'payload'
import config from '@payload-config'
import { StarAmbassador } from '@/payload-types';

export async function sendStarData(formData: FormData, id: number | undefined) {

  if (!id) {
    return {
      success: false,
      error: "User not found. Try refreshing the page."
    }
  }

  const payload = await getPayload({ config })

  const membersScreenshot = formData.get('membersScreenshot');

  let screenshotFile: {
    data: Buffer;
    name: string;
    mimetype: string;
    size: number;
  } | undefined = undefined;

  if (membersScreenshot instanceof File) {
    const buffer = Buffer.from(await membersScreenshot.arrayBuffer())

    screenshotFile = {
      data: buffer,
      size: buffer.byteLength,
      name: membersScreenshot.name.replace(/[^a-zA-Z0-9_.-]/g, '_'),
      mimetype: membersScreenshot.type
    }
  }

  const uploadedScreenshot = await payload.create({
    collection: 'media',
    data: {
      alt: `Members Screenshot`,
    },
    file: screenshotFile,
  })

  try {
    const uploadedData = await payload.create({
      collection: 'star-ambassadors',
      data: {
        member: id,
        membersA: formData.get('membersA') as unknown as number,
        membersBC: formData.get('membersBC') as unknown as number,
        starApplyingFor: formData.get("starApplyingFor") as StarAmbassador["starApplyingFor"],
        membersScreenshot: uploadedScreenshot.id,
      },
    })
    return { success: true, data: null }
  } catch (error) {
    if (error instanceof Error && error.message === "The following field is invalid: member") {
      return { success: false, error: "Star Certificate already issued for this user." }
    }
    return { success: false, error: error instanceof Error ? error.message : 'An unknown error occurred' }
  }
}

export async function updateStarData(formData: FormData, id: number | undefined) {

  if (!id) {
    return {
      success: false,
      error: "User not found. Try refreshing the page."
    }
  }

  const payload = await getPayload({ config })

  const membersScreenshot = formData.get('membersScreenshot');

  let screenshotFile: {
    data: Buffer;
    name: string;
    mimetype: string;
    size: number;
  } | undefined = undefined;

  if (membersScreenshot instanceof File) {
    const buffer = Buffer.from(await membersScreenshot.arrayBuffer())

    screenshotFile = {
      data: buffer,
      size: buffer.byteLength,
      name: membersScreenshot.name.replace(/[^a-zA-Z0-9_.-]/g, '_'),
      mimetype: membersScreenshot.type
    }
  }

  const latestStarCertificate = formData.get('latestStarCertificate');

  let starCertificateFile: {
    data: Buffer;
    name: string;
    mimetype: string;
    size: number;
  } | undefined = undefined;

  if (latestStarCertificate instanceof File) {
    const buffer = Buffer.from(await latestStarCertificate.arrayBuffer())

    starCertificateFile = {
      data: buffer,
      size: buffer.byteLength,
      name: latestStarCertificate.name.replace(/[^a-zA-Z0-9_.-]/g, '_'),
      mimetype: latestStarCertificate.type
    }
  }

  const uploadedScreenshot = await payload.create({
    collection: 'media',
    data: {
      alt: `Members Screenshot`,
    },
    file: screenshotFile,
  })

  const uploadedCertificate = await payload.create({
    collection: 'media',
    data: {
      alt: `latest Star Certificate`,
    },
    file: starCertificateFile,
  })

  try {
    const uploadedData = await payload.update({
      collection: 'star-ambassadors',
      where: {
        member: {
          equals: id
        }
      },
      data: {
        membersA: formData.get('membersA') as unknown as number,
        membersBC: formData.get('membersBC') as unknown as number,
        starApplyingFor: formData.get("starApplyingFor") as StarAmbassador["starApplyingFor"],
        membersScreenshot: uploadedScreenshot.id,
        latestStarCertificate: uploadedCertificate.id,
      },
    })
    return { success: true, data: null }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'An unknown error occurred' }
  }
}