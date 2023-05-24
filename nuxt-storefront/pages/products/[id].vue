<template>
  <div class="productDetails">
    <div class="imageContainer">
      <div class="prodImages">
        <img
          v-for="image in product?.images"
          :key="image.id"
          width="150"
          height="150"
          alt=""
          :src="image.url"
          @click="imageToShow = image.id"
          :class="imageToShow === image.id ? 'shown' : ''"
        />
      </div>

      <div class="shownImage">
        <div v-for="image in product?.images" :key="image.id">
          <div v-if="image.id === imageToShow">
            <img alt="" :src="image.url" width="400" />
          </div>
        </div>
      </div>
    </div>

    <div>
      <h1>
        {{ product?.title }}
      </h1>
      <p v-if="product?.variants">
        {{ product.variants[0].prices[0].amount / 100 }}
        {{ product.variants[0].prices[0].currency_code }}
      </p>
      <p v-else>10 USD</p>
      <p>
        {{ product?.description }}
      </p>
      <div v-for="option in getOptions()" :key="option.id">
        <div>
          <p>
            {{ option.title }}
          </p>
          <div>
            <button v-for="value in option.values" :key="value.id">
              {{ value.value }}
            </button>
          </div>
        </div>
      </div>
      <div>
        <div>
          <button
            @click="
              if (quantity > 0) {
                quantity = quantity - 1;
              }
            "
          >
            –
          </button>
          <span>{{ JSON.stringify(quantity) }}</span>
          <button @click="quantity = quantity + 1">+</button>
        </div>
        <button>Add to cart</button>
      </div>
      <div>
        <div>
          <h3>
            <button type="button" @click="showDetails = !showDetails">
              <span>Details</span>
              <span>
                <span>—</span>
              </span>
            </button>
          </h3>
          <div v-if="showDetails">
            <div>
              <ul>
                <li>
                  Weight:
                  {{ product.weight ? `${product.weight} g` : "Unknown" }}
                </li>
                <li>
                  Width:
                  {{ product.width ? `${product.width} cm` : "Unknown" }}
                </li>
                <li>
                  Height:
                  {{ product.height ? `${product.height} cm` : "Unknown" }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const productId = route.params.id;
const client = useMedusaClient();
const { product } = await client.products.retrieve(productId);
let showDetails = ref(false);
let imageToShow = ref(product?.images[0].id);
let quantity = ref(1);

const getOptions = () => {
  if (product?.options) {
    return product.options.map((option: any) => {
      option.values = option.values.reduce((acc: any, curr: any) => {
        if (!acc.find((val: { value: any }) => val.value === curr.value)) {
          return [...acc, { ...curr }];
        }
        return acc;
      }, []);

      return option;
    });
  }
};
</script>

<style>
.productDetails {
  width: 100vw;
  padding: 1em;
  display: flex;
  gap: 1em;
}
.imageContainer {
  display: flex;
  gap: 1em;
}

.prodImages {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}

.prodImages img {
  cursor: pointer;
  border: 1px solid var(--primary-main);
}

.prodImages img.shown {
  opacity: 0.6;
  border: 1px solid var(--secondary-main);
}

.shownImage {
  max-width: 400px;
  overflow: hidden;
}

.shownImage img {
  transition: 0.2s ease-in-out;
}

.shownImage:hover img {
  scale: 1.5;
  transition: 0.2s ease-in-out;
}
</style>
