import type { Access } from 'payload'

import { checkRole } from './checkRole'

export const manager: Access = ({ req: { user } }) => checkRole(
  ['superadmin', 'admin', "manager"]
  , user)
