export interface User {
  id: number,
  name: string,
  email: string,
  phone?: null,
  logo_src?: null,
  email_verified_at?: Date,
  created_at?: Date,
  updated_at?: Date,
  last_organization_id?: number,
  roles_in_organizations: {
    organization_id: number,
    furniture_maker_role_id: number
  }[],
  roles: {
    id: number
  }[]
}