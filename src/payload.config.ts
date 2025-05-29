// storage-adapter-import-placeholder
import { s3Storage } from '@payloadcms/storage-s3';
import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from "@payloadcms/email-nodemailer"
// import { sqliteAdapter } from '@payloadcms/db-sqlite'
// import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import collections from './collections'
import globals from './globals';
import { Users } from './collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    // meta: {
    //   titleSuffix: '- Team Of Ninjas',
    // },
    // components: {
    //   graphics: {
    //     Logo: "/graphics/Logo",

    //   }
    // },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections,
  globals,
  upload: {
    limits: {
      fileSize: 2 * 1024 * 1024, // 2MB, written in bytes
    },
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // db: sqliteAdapter({
  //   client: {
  //     url: process.env.DATABASE_URI || '',
  //   },
  // }),
  email: nodemailerAdapter({
    defaultFromAddress: process.env.DEFAULT_EMAIL_ADDRESS!,
    defaultFromName: process.env.DEFAULT_EMAIL_NAME!,
    transportOptions: {
      host: process.env.SMTP_HOST!,
      port: process.env.SMTP_PORT!,
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
      },
    },
  }),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URI || '',
    },
  }),
  sharp,
  plugins: [
    // payloadCloudPlugin(),
    s3Storage({
      collections: {
        media: {
          prefix: 'media',
        },
      },
      bucket: process.env.S3_BUCKET!,
      config: {
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
        },
        region: process.env.S3_REGION!,
        endpoint: process.env.S3_ENDPOINT!,
      },
    })
  ],
  async onInit(payload) {
    const existingUsers = await payload.find({
      collection: 'users',
      limit: 1,
    })

    if (existingUsers.docs.length === 0) {
      await payload.create({
        collection: 'users',
        data: {
          username: 'admin',
          email: 'admin@nexusberry.com',
          password: 'nxb@123.',
          roles: ["superadmin", "admin"],
        },
      })
    }
  },
})
