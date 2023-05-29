<template>
  <div class="productDetails">
    <div class="imageContainer">
      <div class="prodImages">
        <img
          v-for="image in product?.images"
          :key="image.id"
          width="150"
          height="150"
          :alt="product.title"
          :src="image.url"
          @click="imageToShow = image.id"
          :class="imageToShow === image.id ? 'shown' : ''"
        />
      </div>

      <div class="shownImage">
        <div v-for="image in product?.images" :key="image.id">
          <div v-if="image.id === imageToShow">
            <img :alt="product.title" :src="image.url" width="400" />
          </div>
        </div>
      </div>
    </div>

    <div class="prodActions">
      <h1>
        {{ product?.title }}
      </h1>
      <p v-if="product?.variants">
        {{ product.variants[0].prices[0].amount / 100 }}
        {{ product.variants[0].prices[0].currency_code.toUpperCase() }}
      </p>
      <p>
        {{ product?.description }}
      </p>
      <div v-for="option in getOptions()" :key="option.id">
        <div>
          <p>
            {{ option.title }}
          </p>
          <div class="optionPicker">
            <button
              :disabled="selected === value.value"
              v-for="value in option.values"
              :key="value.id"
              @click="setVariant(value.value)"
            >
              {{ value.value }}
            </button>
          </div>
        </div>
      </div>
      <div class="cartActions">
        <span>
          <button
            @click="
              if (quantity > 0) {
                quantity = quantity - 1;
              }
            "
          >
            –
          </button>
          <caption>
            {{
              JSON.stringify(quantity)
            }}
          </caption>
          <button @click="quantity = quantity + 1">+</button>
        </span>
        <label for="pickup">Check box for in-store pickup:</label>
        <input
          type="checkbox"
          name="pickup"
          @change="pickup = !pickup"
          :checked="pickup"
        />
        <button class="toCart" @click="addToCart()">Add to cart</button>
      </div>
      <div class="details">
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
                  {{ product.weight ? `${product.weight} g` : "--" }}
                </li>
                <li>
                  Width:
                  {{ product.width ? `${product.width} cm` : "--" }}
                </li>
                <li>
                  Height:
                  {{ product.height ? `${product.height} cm` : "--" }}
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
import { useMainStore } from "../../store/main";
const client = useMedusaClient();
const main = useMainStore();
const route = useRoute();
const productId = route.params.id.toString();
const { product } = await client.products.retrieve(productId);
let showDetails = ref(false);
let imageToShow = ref(product?.images[0].id);
let quantity = ref(1);
let selected = ref();
let variantId = ref();
let pickup = ref(false);

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

const setVariant = (value: string) => {
  selected.value = value;
  product.variants.forEach((variant: any) => {
    if (variant.title === value) {
      variantId = variant.id;
    }
  });
};

const addToCart = () => {
  const cartId = main.cart.id;
  if (cartId && variantId) {
    client.carts.lineItems
      .create(cartId, {
        variant_id: variantId,
        quantity: Number(quantity) || 1,
        metadata: {
          in_store_pickup: pickup.value,
        },
      })
      .then(({ cart }) => {
        main.setCart(cart);
        selected.value = "";
        pickup.value = false;
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

.prodActions {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}

.optionPicker {
  margin-top: 0.5em;
  display: flex;
  gap: 0.25em;
}

.optionPicker button {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 4px;
  color: #fefefe;
  background: var(--primary-main);
  cursor: pointer;
  box-shadow: 0 2px 0 #212121;
}

.optionPicker button:disabled {
  opacity: 0.8;
  box-shadow: none;
  transform: translateY(2px);
}

.cartActions {
  display: flex;
  align-items: center;
  gap: 0.5em;
  height: 40px;
}

.cartActions span {
  height: 100%;
  width: 100px;
  padding: 0.5em;
  display: flex;
  gap: 0.5em;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  color: #fefefe;
  background: var(--primary-main);
  font-size: 1.25em;
}

.cartActions span button {
  height: 100%;
  display: flex;
  align-items: center;
  border: none;
  background: none;
  color: #fefefe;
  font-size: 1em;
  cursor: pointer;
}

.cartActions button:active,
.cartActions button:hover {
  color: var(--secondary-main);
}

.toCart {
  border: none;
  border-radius: 4px;
  background: var(--primary-main);
  color: #fefefe;
  height: 40px;
  width: 100px;
  cursor: pointer;
  transition: 0.2s;
}

.cartActions .toCart:hover {
  color: #212121;
  background: var(--secondary-main);
  transition: 0.2s;
}

.toCart:active {
  opacity: 0.6;
}

.details {
  margin-top: 1.5em;
  border-top: 1px solid var(--primary-main);
  border-bottom: 1px solid var(--primary-main);
  padding: 0.5em;
}

.details button {
  width: 100%;
  display: flex;
  justify-content: space-between;
  border: none;
  background: none;
  cursor: pointer;
}

.details ul {
  list-style: none;
  margin: 1em;
}
</style>
