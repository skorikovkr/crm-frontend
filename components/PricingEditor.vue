<template>
  <div class="pricing-editor">
    <div class="flex flex-wrap gap-2 mb-4 justify-end">
      <Button
        type="button"
        severity="secondary"
        text
        size="small"
        icon="pi pi-plus"
        label="Развернуть все"
        @click="expandAll"
      />
      <Button
        type="button"
        severity="secondary"
        text
        size="small"
        icon="pi pi-minus"
        label="Свернуть все"
        @click="collapseAll"
      />
    </div>
    <div class="flex justify-between font-medium text-sm px-4">
      <div>Категория</div>
      <div>%</div>
    </div>
    <Divider />
    <Tree 
      v-if="!pending"
      v-model:expandedKeys="expandedKeys"
      :value="nodes"
      :pt="{
        'label': 'w-full'
      }"
      class="w-full my-2 max-h-[500px]"
    >
      <template #default="slotProps">
        <div class="flex justify-between w-full">
          <div class="flex justify-center items-center">
            <span>{{ slotProps.node.label }}</span>
          </div>
          <InputNumber
            input-id="minmax"
            :model-value="slotProps.node.ratio * 100 - 100"
            :min="0"
            :pt="customInputNumber"
            @input="(e) => handlePricingInput(slotProps.node.key, e.value)"
          />
        </div>
      </template>
    </Tree>
    <div class="flex flex-wrap justify-end gap-2 mb-4">
      <Button
        type="button"
        label="Сохранить"
        class="ml-2"
        @click="handleSaveButtonPressed"
      />
      <Button
        type="button"
        label="Отменить"
        severity="secondary"
        @click="refresh"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { usePassThrough } from 'primevue/passthrough';
import inputnumber from '~/presets/wind-full/inputnumber';
import { useToast } from "primevue/usetoast";

type PricingNode = {
    id: string|number,
    name: string,
    ratio: number,
    category_id: string|number,
    sub_categories: PricingNode[]
};
type TreeNode = {
    key: string|number,
    label: string,
    ratio: number,
    children: TreeNode[]
}

const toast = useToast();
const nodes = ref<TreeNode[]>([]);
const companyStore = useCompanyStore();
const updatedPricing = ref<{
    category_id: number|string,
    ratio: number
}[]>([]);
const expandedKeys = ref({});
const pending = ref(false);

const customInputNumber = usePassThrough(
    inputnumber,
    {
        input: {
            root: ({ parent }: { parent: any }) => {
                const res = inputnumber.input.root({ parent });
                const i = res.class.findIndex(c => c === 'py-1.5 px-3');
                res.class[i] = 'text-center w-[2.5rem] p-[3px]';
                return res;
            }
        }
    }
);

const refresh = async () => {
    if (companyStore.current) {
        pending.value = true;
        const data = await $laravelFetch<PricingNode[]>(`/api/organizations/${companyStore.current.id}/pricings`);
        pending.value = false;
        const map = (node: PricingNode): TreeNode => ({
            key: node.id,
            label: node.name,
            ratio: node.ratio,
            children: node.sub_categories.map(inner_node => map(inner_node))
        });
        nodes.value = createDataTree(data, 'id', 'category_id').map((node) => map(node));
    } else {
    toast.add({ severity: 'warn', summary: 'Ошибка', detail: 'Ошибка получения наценок.', life: 3000 });
    nodes.value = [];
    }
};

const handlePricingInput = (id: string|number, value: number) => {
    const p = updatedPricing.value.find(v => v.category_id == id);
    if (p) {
        p.ratio = value / 100 + 1;
    } else {
        updatedPricing.value.push({
            category_id: id,
            ratio: value / 100 + 1
        });
    }
}

const handleSaveButtonPressed = async () => {
    if (companyStore.current) {
        try {
          await $laravelFetch(`/api/organizations/${companyStore.current.id}/pricings`, {
              method: 'POST',
              body: {
                  pricings: updatedPricing.value
              }
          });
          toast.add({ severity: 'info', summary: 'Успешно', detail: 'Наценки успешно обновлены.', life: 3000 });
        } catch (e) {
          toast.add({ severity: 'warn', summary: 'Ошибка', detail: 'Ошибка обновления наценки.', life: 3000 });
        }
    }
}

const expandAll = () => {
    for (const node of nodes.value) {
        expandNode(node);
    }

    expandedKeys.value = { ...expandedKeys.value };
};

const collapseAll = () => {
    expandedKeys.value = {};
};

const expandNode = (node) => {
    if (node.children && node.children.length) {
        expandedKeys.value[node.key] = true;

        for (const child of node.children) {
            expandNode(child);
        }
    }
};

await refresh();

</script>

<style>

</style>