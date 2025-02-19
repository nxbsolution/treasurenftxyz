/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  collections: {
    users: User;
    members: Member;
    contributions: Contribution;
    salary: Salary;
    notifications: Notification;
    star: Star;
    media: Media;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {
    members: {
      contributions: 'contributions';
    };
  };
  collectionsSelect: {
    users: UsersSelect<false> | UsersSelect<true>;
    members: MembersSelect<false> | MembersSelect<true>;
    contributions: ContributionsSelect<false> | ContributionsSelect<true>;
    salary: SalarySelect<false> | SalarySelect<true>;
    notifications: NotificationsSelect<false> | NotificationsSelect<true>;
    star: StarSelect<false> | StarSelect<true>;
    media: MediaSelect<false> | MediaSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: number;
  };
  globals: {
    'salary-form-settings': SalaryFormSetting;
  };
  globalsSelect: {
    'salary-form-settings': SalaryFormSettingsSelect<false> | SalaryFormSettingsSelect<true>;
  };
  locale: null;
  user: User & {
    collection: 'users';
  };
  jobs: {
    tasks: unknown;
    workflows: unknown;
  };
}
export interface UserAuthOperations {
  forgotPassword:
    | {
        email: string;
      }
    | {
        username: string;
      };
  login:
    | {
        email: string;
        password: string;
      }
    | {
        password: string;
        username: string;
      };
  registerFirstUser: {
    password: string;
    username: string;
    email: string;
  };
  unlock:
    | {
        email: string;
      }
    | {
        username: string;
      };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: number;
  blocked?: boolean | null;
  roles?: ('superadmin' | 'admin' | 'manager' | 'member')[] | null;
  updatedAt: string;
  createdAt: string;
  email: string;
  username: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "members".
 */
export interface Member {
  id: number;
  user: number | User;
  uid: string;
  nft_username: string;
  country:
    | 'india'
    | 'pakistan'
    | 'bangladesh'
    | 'rusia'
    | 'italy'
    | 'australia'
    | 'dubai'
    | 'saudiArabia'
    | 'afghanistan'
    | 'others';
  level: 'level1' | 'level2' | 'level3' | 'level4' | 'level5' | 'level6';
  uplineName: string;
  uplineUid: string;
  realName: string;
  mobile?: string | null;
  city?: string | null;
  depositAddress: {
    'TRC-20': string;
    'BEP-20': string;
  };
  star?: ('star1' | 'star2' | 'star3' | 'star4' | 'star5' | 'star6') | null;
  contributions?: {
    docs?: (number | Contribution)[] | null;
    hasNextPage?: boolean | null;
  } | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "contributions".
 */
export interface Contribution {
  id: number;
  verify?: ('PENDING' | 'APPROVED' | 'REJECTED') | null;
  member: number | Member;
  uid?: string | null;
  realName?: string | null;
  depositAddress: 'TRC-20' | 'BEP-20';
  star: '1star' | '2star' | '3star' | '4star' | '5star' | '6star';
  transactionId: string;
  screenShot: number | Media;
  uploadStarCertificate: number | Media;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: number;
  alt: string;
  prefix?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "salary".
 */
export interface Salary {
  id: number;
  status?: ('pending' | 'partialApproved' | 'fullApproved' | 'rejected') | null;
  member: number | Member;
  uid?: string | null;
  realName?: string | null;
  'TRC-20'?: string | null;
  /**
   * Number of members added in A group.
   */
  membersA: number;
  /**
   * Number of members added in B + C group.
   */
  membersBC: number;
  star: '1star' | '2star' | '3star' | '4star' | '5star' | '6star';
  starCertificate?: (number | null) | Media;
  membersScreenshot?: (number | null) | Media;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "notifications".
 */
export interface Notification {
  id: number;
  statement: string;
  assignToStars?: ('1star' | '2star' | '3star' | '4star' | '5star' | '6star')[] | null;
  assignToUid?: (number | Member)[] | null;
  linkTo?: ('SALARY' | 'CONTRIBUTION') | null;
  assignToDefaulters?: 'CONTRIBUTION' | null;
  priority?: ('HIGH' | 'NORMAL') | null;
  display?: boolean | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "star".
 */
export interface Star {
  id: number;
  member: number | Member;
  A: number;
  BC: number;
  totalReport: number | Media;
  oldStarCard?: (number | null) | Media;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: number;
  document?:
    | ({
        relationTo: 'users';
        value: number | User;
      } | null)
    | ({
        relationTo: 'members';
        value: number | Member;
      } | null)
    | ({
        relationTo: 'contributions';
        value: number | Contribution;
      } | null)
    | ({
        relationTo: 'salary';
        value: number | Salary;
      } | null)
    | ({
        relationTo: 'notifications';
        value: number | Notification;
      } | null)
    | ({
        relationTo: 'star';
        value: number | Star;
      } | null)
    | ({
        relationTo: 'media';
        value: number | Media;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: number;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: number;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
  blocked?: T;
  roles?: T;
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  username?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "members_select".
 */
export interface MembersSelect<T extends boolean = true> {
  user?: T;
  uid?: T;
  nft_username?: T;
  country?: T;
  level?: T;
  uplineName?: T;
  uplineUid?: T;
  realName?: T;
  mobile?: T;
  city?: T;
  depositAddress?:
    | T
    | {
        'TRC-20'?: T;
        'BEP-20'?: T;
      };
  star?: T;
  contributions?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "contributions_select".
 */
export interface ContributionsSelect<T extends boolean = true> {
  verify?: T;
  member?: T;
  uid?: T;
  realName?: T;
  depositAddress?: T;
  star?: T;
  transactionId?: T;
  screenShot?: T;
  uploadStarCertificate?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "salary_select".
 */
export interface SalarySelect<T extends boolean = true> {
  status?: T;
  member?: T;
  uid?: T;
  realName?: T;
  'TRC-20'?: T;
  membersA?: T;
  membersBC?: T;
  star?: T;
  starCertificate?: T;
  membersScreenshot?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "notifications_select".
 */
export interface NotificationsSelect<T extends boolean = true> {
  statement?: T;
  assignToStars?: T;
  assignToUid?: T;
  linkTo?: T;
  assignToDefaulters?: T;
  priority?: T;
  display?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "star_select".
 */
export interface StarSelect<T extends boolean = true> {
  member?: T;
  A?: T;
  BC?: T;
  totalReport?: T;
  oldStarCard?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media_select".
 */
export interface MediaSelect<T extends boolean = true> {
  alt?: T;
  prefix?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "salary-form-settings".
 */
export interface SalaryFormSetting {
  id: number;
  openSalaryForm?: boolean | null;
  teamAPrompt: string;
  teamBCPrompt: string;
  minGrowthRate: number;
  progressReportPrompt: string;
  uploadStarPrompt: string;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "salary-form-settings_select".
 */
export interface SalaryFormSettingsSelect<T extends boolean = true> {
  openSalaryForm?: T;
  teamAPrompt?: T;
  teamBCPrompt?: T;
  minGrowthRate?: T;
  progressReportPrompt?: T;
  uploadStarPrompt?: T;
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}