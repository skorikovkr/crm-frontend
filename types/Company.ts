import type { PortfolioItem } from "./PortfolioItem";

export interface Company {
  id: number;
  name: string;
  INN?: string,
  OGRN?: string,
  KPP?: string,
  BIK?: string,
  bank_name?: string,
  correspondent_account?: string,
  color_scheme?: string,
  logo_src?: string,
  description?: string,
  address?: string,
  schedule?: string,
  phone?: string,
  organization_type_id?: number,
  created_at?: Date,
  updated_at?: Date,
  portfolio: PortfolioItem[]
}