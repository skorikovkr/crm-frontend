<template>
  <Dialog
    v-model:visible="visible"
    modal
    :draggable="false"
    header="Уровень наценки"
  >
    <Tree 
      :value="nodes"
      :pt="{
        'label': 'w-full'
      }"
      class="w-full md:w-30rem my-2 min-h-[500px] max-h-[500px] min-w-[400px]"
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
    <div class="flex justify-content gap-2">
      <Button
        type="button"
        label="Сохранить"
        @click="handleSaveButtonPressed"
      />
      <Button
        type="button"
        label="Отменить"
        severity="secondary"
        @click="visible = false"
      />
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { usePassThrough } from 'primevue/passthrough';
import inputnumber from '~/presets/wind-full/inputnumber';

const visible = defineModel<boolean>('visible');

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
const nodes = ref<TreeNode[]>([]);
const companyStore = useCompanyStore();
const updatedPricing = ref<{
    category_id: number|string,
    ratio: number
}[]>([]);

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
        const data = await $laravelFetch<PricingNode[]>(`/api/organizations/${companyStore.current.id}/pricings`);
        const map = (node: PricingNode): TreeNode => ({
            key: node.id,
            label: node.name,
            ratio: node.ratio,
            children: node.sub_categories.map(inner_node => map(inner_node))
        });
        nodes.value = createDataTree(data, 'id', 'category_id').map((node) => map(node));
    } else {
        nodes.value = [];
    }
};

watch(visible, async () => {
    if (visible.value) {
        await refresh();
    } else {
        updatedPricing.value = [];
    }
});

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
        await $laravelFetch(`/api/organizations/${companyStore.current.id}/pricings`, {
            method: 'POST',
            body: {
                pricings: updatedPricing.value
            }
        });
        console.log("Успешно");
    }
}

</script>

<style>

</style>