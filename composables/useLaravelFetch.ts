import type { UseFetchOptions } from "nuxt/app";

export function useLaravelFetch<T>(
  url: string | (() => string),
  options: UseFetchOptions<T> = {}
) {
  return useFetch(url, {
    $fetch: $laravelFetch,
    async onResponseError({ response }) {
      const status = response.status;
      if ([500].includes(status)) {
        console.error("[Laravel Error]", response.statusText, response._data);
      }

      if ([401, 419].includes(status)) {
        navigateTo("/login");
      }

      if ([409].includes(status)) {
        navigateTo("/verify-email");
      }
    },
    ...options,
  });
}