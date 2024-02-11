export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  return {
    logoSrc: "/test_logo.png",
    name: "Мебель " + query.id
  }
})
