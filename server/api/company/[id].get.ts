import { Company } from "~/types/Company";

export default defineEventHandler(async (event) => {
  const companies: Company[] = [{
    id: 1,
    fullName: "ООО \"COMPANY1\"",
    name: "Компания",
    phone: "88005553535",
    schedule: "Круглосуточно",
    inn: "123456789",
    logoSrc: "/test_logo.png",
    ogrn: "0987654321"
  },{
    id: 2,
    fullName: "ООО \"COMPANY2\"",
    name: "Компания2",
    phone: "88005553536",
    schedule: "Никогда",
    inn: "223456789",
    logoSrc: "/test_logo.png",
    ogrn: "0987654322"
  }]

  const id = Number.parseInt(getRouterParam(event, 'id') ?? "-1");
  const company = companies.find(c => c.id === id);
  return company;
})
