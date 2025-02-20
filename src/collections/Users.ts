import { superAdmin } from '@/access/superAdmin'
import { admin } from '@/access/admin'
import { checkRole } from '@/access/checkRole'
import { authenticated } from '@/access/authenticated'
import type { CollectionConfig } from 'payload'
import { generateSetPasswordEmailHTML, generateSetPasswordEmailSubject } from "@/email"


export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    forgotPassword: {
      generateEmailHTML: generateSetPasswordEmailHTML,
      generateEmailSubject: generateSetPasswordEmailSubject,
    },
    tokenExpiration: 28800, // 28800 secs = 8 hours
    verify: false, // Require email verification before being allowed to authenticate
    maxLoginAttempts: 10, // Automatically lock a user out after X amount of failed logins. Set to 0 to disable.
    lockTime: 600 * 1000, // Time period to allow the max login attempts. time (in milliseconds)
    loginWithUsername: {
      allowEmailLogin: true, // default: false. If set to true, users can log in with either their username or email address. If set to false, users can only log in with their username.
      requireEmail: true, // default: false. If set to true, an email address is required when creating a new user. If set to false, email is not required upon creation
    },
    cookies: {
      sameSite: 'None',
      secure: true,
      domain: process.env.COOKIE_DOMAIN,
    },
  },
  access: {
    read: admin, // only admin and above can read users collection
    create: () => true,
    update: admin,
    delete: authenticated,
    admin: ({ req: { user } }) => checkRole(['superadmin', 'admin', "manager"], user),
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'blocked',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['member'],
      saveToJWT: true,
      // hooks: {
      //   beforeChange: [protectRoles], // apply above update access rules here
      // },
      options: [
        {
          label: 'Super Admin',
          value: 'superadmin',
        },
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: "Manager",
          value: "manager"
        },
        {
          label: 'Member',
          value: 'member',
        },
      ],
    },
  ],
}
