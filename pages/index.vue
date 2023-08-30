<template>
  <div class="home">
    <div class="home__wrap">
      <div class="home__content">
        <div>
          <v-img
            contain
            max-width="200"
            max-height="100"
            :src="require(`~/assets/images/logo.svg`)"
          ></v-img>
          <h1>Тестовое приложение на Vuetify</h1>
          <v-card>
            <v-card-title>Небольшое приложение на Вьютифай</v-card-title>
            <v-card-text>1. Можно побаловаться с модальным окном</v-card-text>
            <v-card-text>2. Или с таблицей</v-card-text>
          </v-card>

          <v-btn color="primary" x-large @click="openCreateListDialog">
            <v-icon>mdi-plus-circle-outline</v-icon>
            <span style="margin-left: 10px">Модальное окно</span>
          </v-btn>
          <v-btn
            color="primary"
            x-large
            @click="$router.push({ name: 'lists' })"
          >
            <v-icon>mdi-plus-circle-outline</v-icon>
            <span style="margin-left: 10px">Таблица</span>
          </v-btn>
        </div>
        <Particles style="width: 45%" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  components: {
    Particles: () => import('@/components/Particles'),
  },
  methods: {
    openCreateListDialog() {
      this.$store.commit('dialogs/setCreateListDialog', true)
    },
  },
}
</script>
<style lang="scss" scoped>
.home {
  //width: 100%
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  margin: 0 50px;
  &__wrap {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    transform: translateY(-100px);
  }
  &__content {
    display: flex;
    flex-direction: column;
    gap: 50px;
    align-items: center;
    width: 100%;
    margin-top: 15%;
  }
  &__animation {
    width: 800px;
    max-width: 800px;
  }
}
</style>
