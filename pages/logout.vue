<script lang="ts" setup>
  const userStore = useUserStore();
  await userStore.logout();
  navigateTo('/login');
</script>

<style>

</style>