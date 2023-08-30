<template>
  <v-app>
    <v-app-bar fixed app flat>
      <div class="logo__wrapper" @click="logoReload">
        <v-img
          contain
          max-width="200"
          max-height="100"
          :src="require(`~/assets/images/logo.svg`)"
        />
      </div>
      <v-divider class="header__divider" vertical inset></v-divider>
      <v-btn text @click="openCreateListDialog">Модальное окно</v-btn>
      <v-btn
        text
        @click="$router.push({ name: 'lists' })"
        :color="$route.name === 'lists' ? 'primary' : ''"
      >
        Таблица
      </v-btn>
    </v-app-bar>
    <v-main style="background-color: ">
      <v-container>
        <Nuxt />
        <CreateList />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import CreateList from '../components/CreateList/CreateList.vue'
export default {
  name: 'DefaultLayout',
  components: {
    CreateList,
  },
  methods: {
    async logoReload() {
      console.log(this.$route)
      if (this.$route.name === 'index') {
        await location.reload(true)
      } else {
        await this.$router.push({ path: `/`, query: {} })
      }
    },
    openCreateListDialog() {
      this.$store.commit('createList/setIsAddIntoList', false)
      this.$store.commit('dialogs/setCreateListDialog', true)
    },
  },
}
</script>

<style lang="scss" scoped>
.logo {
  &__wrapper {
    max-width: 117px;
    min-width: 117px;
    min-height: 15px;
    margin-right: 15px;
    cursor: pointer;
  }
}
.header {
  &__divider {
    margin-left: 32px;
    margin-right: 32px;
  }
}
</style>
