<template>
  <div>
    <div class="lists-cards">
      <v-card width="48%">
        <v-card-title>
          <span> Корзина 1 </span>
        </v-card-title>
        <v-card-text>
          <div v-for="list in basket1" :key="list.id">
            {{ list.fullname }}
          </div>
        </v-card-text>
      </v-card>
      <v-card width="48%">
        <v-card-title>
          <span> Корзина 2 </span>
        </v-card-title>
        <v-card-text>
          <div v-for="list in basket2" :key="list.id">
            {{ list.fullname }}
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  basket1: [],
  basket2: [],
}
</script>

<style lang="scss" scoped>
.lists-cards {
  display: flex;
  width: 100%;
  gap: 15px;
  min-height: 400px;
}
</style>
