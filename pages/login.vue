<script setup lang="ts">
definePageMeta({ middleware: ["guest"] });

//TODO: тут тоже не должно быть layout

const router = useRouter();
const route = useRoute();
const { login } = useUserStore();

const data = reactive({
  email: "",
  password: "",
  remember: false,
});
const status = ref(
  (route.query.reset ?? "").length > 0 ? atob(route.query.reset as string) : ""
);

const {
  submit,
  inProgress,
  validationErrors: errors,
} = useSubmit(
  () => {
    status.value = "";
    return login(data);
  },
  {
    onSuccess: () => router.push("/"),
  }
);
</script>

<template>
  <div>
    <NuxtLink to="/">
      HOME
    </NuxtLink>
    
    <div>{{ status }}</div>

    <form @submit.prevent="submit">
      <div>
        <label for="email">Email</label>
        <div>{{ errors.email?.[0] }}</div>
        <input
          id="email"
          type="email"
          class="block mt-1 w-full"
          v-model="data.email"
          required
          autoFocus
        />
      </div>

      <div class="mt-4">
        <label for="password">Password</label>
        <div v-for="err in errors.password" :key="err">{{ err }}</div>
        <input
          id="password"
          type="password"
          class="block mt-1 w-full"
          v-model="data.password"
          required
          autoComplete="current-password"
        />
      </div>

      <!-- Remember Me -->
      <div class="block mt-4">
        <label for="remember" class="inline-flex items-center">
          <input
            id="remember"
            type="checkbox"
            name="remember"
            class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            v-model="data.remember"
          />
          <span class="ml-2 text-sm text-gray-600"> Remember me </span>
        </label>
      </div>

      <div class="flex items-center justify-end mt-4">
        <NuxtLink
          href="/forgot-password"
          class="underline text-sm text-gray-600 hover:text-gray-900"
        >
          Forgot your password?
        </NuxtLink>

        <input class="ml-3" type="submit" :disabled="inProgress" value="Login" />
      </div>
    </form>
  </div>
</template>