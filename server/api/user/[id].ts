import { Company } from "~/types/Company";
import { Roles } from "~/types/Roles";
import { User } from "~/types/User";

const users: User[] = [{
  id: 1,
  currentCompanyId: 1,
  name: "Owner 1",
  role: Roles.Owner,
  companiesIds: [1, 2]
}, {
  id: 2,
  currentCompanyId: 1,
  name: "Admin 1",
  role: Roles.Admin
}];

export default defineEventHandler(async (event) => {
  const id = Number.parseInt(getRouterParam(event, 'id') ?? "-1");
  const user = {...users.find(u => u.id === id)};
  if (user?.role === Roles.Owner) {
    user.companies = [];
    for (let i = 0; i < (user.companiesIds?.length ?? 0); i++ ) {
      const ci = user.companiesIds?.at(i);
      const company = await $fetch<Company | null>(`/api/company/${ci}`);
      if (company) {
        user.companies.push(company);
      }
    }
  }
  return user;
})
