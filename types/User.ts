import type { Company } from "./Company";
import type { Roles } from "./Roles";

export interface User {
  id: number,
  name: string,
  currentCompanyId: number,
  role: Roles,
  companiesIds?: number[],
  companies?: Company[]
}