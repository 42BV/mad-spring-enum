// @flow

export type EnumValues = Array<string>;

/**
 * The enums should have the following signature:
 *
 * {
 *   "UserRole": [
 *     "ADMIN",
 *     "USER"
 *  ],
 *  "BillingInterval": [
 *    "MONTHLY", "WEEKLY", "DAILY"
 *  ]
 * }
 *
 * The keys represent the name of the enum, in the above case 'UserRole',
 * and 'BillingInterval'. The array points to the possible values 
 * of the enum.
 */
export type Enums = {
  [key: string]: EnumValues
};

