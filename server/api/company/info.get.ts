export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  return {
    logoSrc: "/test_logo.png",
    name: "Мебель " + query.id,
    phone: "+1234567899",
    schedule: "Пн-Пт: 8:00-17:00"
  }
})
