export default defineNuxtPlugin(async () => {
    const enumsStore = useMiscEnumsStore();
    await enumsStore.refresh();
})
