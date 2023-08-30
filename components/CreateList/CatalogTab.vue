<template>
  <div>
    <h1 v-if="isLoading" style="margin-bottom: 20px">
      Идёт загрузка данных...
    </h1>
    <v-autocomplete
      v-else
      v-model="autocompleteRequest"
      :items="autoсompleteItems"
      :search-input.sync="search"
      prepend-inner-icon="mdi-magnify"
      background-color="#F9F9F9"
      no-data-text="По вашему запросу ничего не найдено"
      filled
      clear-icon="fa-times"
      clearable
      no-filter
      item-text="fullname"
      item-value="id"
      label="Введите что-нибудь по-английски, например 'animals' или 'bac'"
      return-object
      class="search-box--input"
      @change="addItem($event)"
    >
      <template v-slot:item="data">
        <v-list-item-avatar
          class="icon"
          max-height="20"
          max-width="20"
          min-width="20"
        >
          <v-img contain :src="require(`~/assets/images/status-1.png`)"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ data.item.API }}</v-list-item-title>
          <v-list-item-subtitle>{{ data.item.Category }}</v-list-item-subtitle>
          <v-list-item-subtitle>{{
            data.item.Description
          }}</v-list-item-subtitle>
        </v-list-item-content>
      </template>
    </v-autocomplete>
    <v-card style="height: 380px; overflow-y: scroll">
      <v-card-title>Выбранные элементы:</v-card-title>
      <v-card-text>
        <div
          v-for="item in selectedItemsStore"
          :key="item.id"
          class="d-flex align-center"
        >
          <div>
            <span>{{ item.API }}.</span>
            <a :href="item.Link" target="_blanc">Link: {{ item.Link }}</a>
          </div>
          <v-tooltip top>
            <template #activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" icon @click="deleteItem(item)">
                <v-icon dense> mdi-close </v-icon>
              </v-btn>
            </template>
            <span>Удалить из списка</span>
          </v-tooltip>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      autocompleteRequest: [],
      autoсompleteItems: [],
      searchedItems: [],
      selectedItems: [],
      isLoading: false,
      search: '',
    }
  },
  computed: {
    listName() {
      return this.$store.state.createList.listName
    },
    selectedItemsStore() {
      return this.$store.state.createList.selectedItems
    },
    searchedItemsStore() {
      return this.$store.state.createList.searchedItems
    },
  },
  watch: {
    search(val) {
      this.autoсompleteItems = []
      // const self = this
      if (val) {
        console.log('search val', this.search)
        this.fetchEntriesDebounced(val)
      }
    },

    selectedItemsStore() {
      if (this.selectedItemsStore.length > 0) {
        this.$store.commit('createList/setCatalogValid', true)
      } else {
        this.$store.commit('createList/setCatalogValid', false)
      }
      console.log('ISVALID', this.$store.state.createList.catalogValid)
    },
  },
  mounted() {
    if (this.searchedItemsStore.length) {
      this.searchedItems = [...this.searchedItemsStore]
    } else {
      this.makeAutocompleteRequest()
    }
  },
  methods: {
    async makeAutocompleteRequest() {
      this.isLoading = true
      await this.$axios
        .get('https://api.publicapis.org/entries')
        .then((res) => {
          console.log('res', res.data)
          this.searchedItems = res.data.entries
          this.$store.commit('createList/setSearchedItems', this.searchedItems)
        })
        .catch((err) => {
          this.searchedItems = []
          console.log(err)
        })
        .finally(() => (this.isLoading = false))
    },

    findInSearchedItems(query) {
      this.autoсompleteItems = this.searchedItems.filter((item) => {
        return (
          item.API.toLowerCase().includes(query.toLowerCase()) ||
          item.Category.toLowerCase().includes(query.toLowerCase())
        )
      })
      console.log('RESULT', this.autoсompleteItems)
    },
    fetchEntriesDebounced(val) {
      clearTimeout(this._searchTimerId)
      this._searchTimerId = setTimeout(async () => {
        await this.findInSearchedItems(val)
      }, 500)
    },

    addItem(item) {
      let wasAdded
      this.selectedItems.forEach((el) => {
        if (el.API === item.API) wasAdded = true
      })
      if (!wasAdded) {
        if (!this.listName)
          this.$store.commit('createList/setListName', item.API)
        this.selectedItems.push(item)
        this.autocompleteRequest = ''
        this.search = ''
        this.$store.commit('createList/setSelectedItems', this.selectedItems)
      }
    },
    deleteItem(item) {
      console.log('ITEM', item)
      console.log('this.selectedItems', this.selectedItems)
      this.selectedItems = this.selectedItems.filter((el) => {
        console.log(el)
        return el !== item
      })
      this.$store.commit('createList/setSelectedItems', this.selectedItems)
    },
  },
}
</script>

<style lang="scss" scoped></style>
