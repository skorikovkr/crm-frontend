import { defineStore } from 'pinia'
import type { MiscEnum } from '~/types/MiscEnum';

export const useMiscEnumsStore = defineStore(
    'miscEnums',
        () => {
        const calculators = ref<MiscEnum[] | undefined | null>(undefined);
        const furnitureMakerRoles = ref<MiscEnum[] | undefined | null>(undefined);
        const orderStatuses = ref<MiscEnum[] | undefined | null>(undefined);
        const organizationTypes = ref<MiscEnum[] | undefined | null>(undefined);
        const roles = ref<MiscEnum[] | undefined | null>(undefined);

        const refresh = async () => {
            const result = await $laravelFetch<{
                calculators: MiscEnum[],
                furnitureMakerRoles: MiscEnum[],
                orderStatuses: MiscEnum[],
                organizationTypes: MiscEnum[],
                roles: MiscEnum[],
            }>("/api/misc/enums");
            calculators.value = result.calculators;
            furnitureMakerRoles.value = result.furnitureMakerRoles;
            orderStatuses.value = result.orderStatuses;
            organizationTypes.value = result.organizationTypes;
            roles.value = result.roles;
        };

        return {
            calculators,
            furnitureMakerRoles,
            orderStatuses,
            organizationTypes,
            roles,
            refresh,
        };
    }
)
