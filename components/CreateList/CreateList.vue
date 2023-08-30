<template>
  <div>
    <v-dialog
      v-model="createListDialog"
      scrollable
      @click:outside="closeCreateListDialog"
    >
      <v-card>
        <v-card-title>
          <div class="d-flex justify-space-between" style="width: 100%">
            <span> Создание нового списка </span>
            <v-btn icon @click="closeCreateListDialog">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
          <v-text-field
            clearable
            ref="listName"
            :rules="[rules.required]"
            label="Введите название списка"
            v-model="listName"
          ></v-text-field>
        </v-card-title>
        <v-card-actions class="mb-2 pl-6">
          <TabsCreateList />
        </v-card-actions>
        <v-card-text style="height: 500px">
          <CatalogTab v-if="currentTab === '1'" />
          <CSVTab v-if="currentTab === '2'" />
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
          <v-btn @click="closeAndClearDialog">Отмена</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import CatalogTab from './CatalogTab.vue'
import CSVTab from './CSVTab.vue'
import TabsCreateList from './TabsCreateList.vue'

export default {
  components: {
    TabsCreateList,
    CatalogTab,
    CSVTab,
  },
  data() {
    return {
      rules: {
        required: (value) => !!value || 'Введите название списка',
      },
    }
  },
  computed: {
    createListDialog() {
      return this.$store.state.dialogs.createListDialog
    },
    currentTab() {
      return this.$store.state.tabs.currentTab
    },
    isCatalogValid() {
      return this.$store.state.createList.catalogValid
    },
    isCsvValid() {
      return this.$store.state.createList.csvValid
    },
 
    addedListName() {
      return this.$store.state.createList.addedListName
    },
    listName: {
      get() {
        return this.$store.state.createList.listName
      },
      set(val) {
        this.$store.commit('createList/setListName', val)
      },
    },
  },
  methods: {
    closeCreateListDialog() {
      this.$store.commit('dialogs/setCreateListDialog', false)
    },

    closeAndClearDialog() {
      this.$store.commit('createList/setIsAddIntoList', false)
      this.$store.commit('createList/setDefaultCreateListStore')
      this.closeCreateListDialog()
    },
  },
}
</script>

<style lang="scss" scoped></style>
