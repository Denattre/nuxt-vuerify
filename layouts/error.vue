<template>
  <v-app dark class="error-page">
    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
    <div class="error-page__link" @click="logoReload()">
      <p>перейти на главную страницу</p>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: 'Страница не найдена',
      otherError: 'Произошла ошибка',
    }
  },
  methods: {
    // если url пустой просто перезагрузка стр., если нет $router `/` + перезагрузка стр. с задержкой
    async logoReload() {
      console.log(this.$route)
      // проверка обьекта на пустоту
      if (this.$route.name === 'index') {
        await location.reload(true)
      } else {
        await this.$router.push({ path: `/`, query: {} })
      }
    },
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style lang="scss" scoped>
h1 {
  font-size: 20px;
}
.error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 10%;
  &__link {
    cursor: pointer;
    text-decoration: underline;
  }
}
</style>
