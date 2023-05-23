<template>
  <div>
    <nuxt-link :to="`/products/${item.id}`">
      <div>
        <div>
          <div>
            <img alt="" :src="item.thumbnail" />
          </div>
        </div>
        <div>
          <h3>
            {{ item.title }}
          </h3>
          <p>
            from {{ lowestPrice.amount / 100 }}
            {{ lowestPrice.currency_code.toUpperCase() }}
          </p>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ProductCard',
  props: {
    item: {
      type: Object,
      default() {
        return {
          id: 1,
          title: 'Kitchen Table',
          thumbnail: 'https://picsum.photos/600/600',
          variants: [{ prices: [{ amount: 0 }] }],
        }
      },
    },
  },
  computed: {
    lowestPrice() {
      const lowestPrice = this.item.variants.reduce(
        (_acc: any, curr: any) => {
          return curr.prices.reduce((lowest: any, current: any) => {
            if (lowest.amount > current.amount) {
              return current
            }
            return lowest
          })
        },
        { amount: 0 }
      )

      return lowestPrice || { amount: 10, currency_code: 'usd' }
    },
  },
}
</script>
