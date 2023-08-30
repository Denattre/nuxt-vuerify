<template>
  <div>
    <v-text-field label="Поиск" outlined v-model="search" @input="filterItems"></v-text-field>
    <v-btn color="primary" @click="openCreateListDialog">
      Добавить в список
    </v-btn>
    <h1>Список {{ $route.params.id }}</h1>
    <v-list>
      <v-list-item class="list-item" v-for="item in filteredItems" :key="item.id">
        <v-list-item-action>
          <v-checkbox :value="item.id" v-model="selected"></v-checkbox>
        </v-list-item-action>
        <v-list-item-content class="list-item-content">
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: [],
      search: '',
      filteredItems: [],
      list: [
        {
          id: 1,
          name: 'КОМПАНИЯ РАЗ',
          inn: 232323232232,
          address: 'Ул. Такаята, д. 1',
        },
        {
          id: 2,
          name: 'Петров',
          inn: 232323232232,
          address: 'Ул. Такаята, д. 1',
        },
        {
          id: 3,
          name: '-7968532',
          ogrn: 232323232232,
          address: 'Ул. Такаята, д. 1',
        },
        {
          id: 4,
          name: 'КОМПАНИЯ РАЗ',
          inn: 232323232232,
        },
        {
          id: 5,
          name: 'КОМПАНИЯ РАЗ',
        },
      ],
    }
  },
  mounted() {
    this.filteredItems = this.list
  },
  methods: {
    filterItems() {
      this.filteredItems = this.list.filter((el) => {
        return el.name.toLowerCase().includes(this.search.toLowerCase())
      })
    },
    getListById() {
      this.$axios.get('api/').then((res) => {
        this.list = res.data
      })
    },
    openCreateListDialog() {
      this.$store.commit('createList/setIsAddIntoList', true)
      this.$store.commit('dialogs/setCreateListDialog', true)
      this.$store.commit(
        'createList/setAddedListName',
        `Список ${this.$route.params.id}`
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.list-item {
  border: 1px solid black;
  margin-bottom: 15px;
}
</style>
