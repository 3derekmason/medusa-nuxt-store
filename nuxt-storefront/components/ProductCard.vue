<template>
  <div>
    <NuxtLink :to="`/products/${item.id}`">
      <div>
        <div>
          <div>
            <img alt="" :src="item.thumbnail" width="300" height="300" />
          </div>
        </div>
        <div>
          <h3>
            {{ item.title }}
          </h3>
          <p>
            from {{ getLowestPrice(item).amount / 100 }}
            {{ getLowestPrice(item).currency_code.toUpperCase() }}
          </p>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  item: {
    type: Object,
    default() {
      return {
        id: 1,
        title: "Kitchen Table",
        thumbnail: "https://picsum.photos/600/600",
        variants: [{ prices: [{ amount: 0 }] }],
      };
    },
  },
});

const getLowestPrice = (item: any) => {
  const lowestPrice = item.variants.reduce(
    (acc: any, curr: any) => {
      return curr.prices.reduce((lowest: any, current: any) => {
        if (lowest.amount > current.amount) {
          return current;
        }
        return lowest;
      });
    },
    { amount: 0 }
  );

  return lowestPrice || { amount: 10, currency_code: "usd" };
};
</script>
