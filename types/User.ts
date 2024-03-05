import type { Roles } from "./Roles";

export interface User {
  id: number,
  name: string,
  email: string,
  role: Roles,
}