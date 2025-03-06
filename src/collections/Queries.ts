import { admin } from '@/access/admin';
import { authenticated } from '@/access/authenticated';
import { CollectionConfig } from 'payload';

export const Queries: CollectionConfig = {
  slug: 'queries',
  access: {
    read: authenticated,
    create: authenticated,
    update: authenticated,
    delete: admin,
  },
  fields: [
    {
      name: 'member',
      type: 'relationship',
      relationTo: 'members',
      hasMany: false,
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          label: 'Open',
          value: 'open',
        },
        {
          label: 'In Progress',
          value: 'in-progress',
        },
        {
          label: 'Resolved',
          value: 'resolved',
        },
        {
          label: 'Closed',
          value: 'closed',
        }
      ],
      defaultValue: 'open',
      required: true,
    },
    {
      name: 'question',
      type: 'text',
      required: true,
    },
    {
      name: 'answer',
      type: 'textarea',
    }
  ]
};
