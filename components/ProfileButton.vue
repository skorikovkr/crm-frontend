<template>
    <ClientOnly>
        <template 
            v-if="userStore.user"
        >
            <button
                class="profile-button bg-teal-500 rounded-lg h-[32px] w-[32px] flex items-center justify-center"
                @click="onProfileIconClick"
            >
            <div class="name-letter text-white font-medium text-center">
                {{ userStore.user?.name[0] }}
            </div>
            </button>
            <DefaultLayoutProfileDropdown
                :is-visible="isProfileDropdownVisible"
            />
        </template>
    </ClientOnly>
</template>

<script lang="ts" setup>
const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);

const isProfileDropdownVisible = ref(false);
const onProfileIconClick = () => {
  isProfileDropdownVisible.value = !isProfileDropdownVisible.value;
};

watch(isLoggedIn, () => {
  isProfileDropdownVisible.value = false;
})

</script>

<style>

</style>