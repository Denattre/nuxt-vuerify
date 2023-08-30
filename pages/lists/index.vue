<template>
  <div>
    <v-overlay v-if="isLoading">
      <v-progress-circular indeterminate></v-progress-circular>
    </v-overlay>
    <div v-else>
      <h1 v-if="isError" style="text-align: center">Произошла ошибка =(</h1>
      <div
        v-else-if="tableData.length === 0"
        class="d-flex flex-column justify-space-between align-center"
      >
        <v-container class="search-container">
          <v-row class="justify-space-between">
            <v-col cols="10" class="px-0">
              <v-text-field
                v-model="search"
                clearable
                dense
                background-color="white"
                filled
                outlined
                :label="'Поиск'"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <div
          class="empty-page-image-and-text d-flex flex-column justify-space-between align-center"
        >
          <v-img
            contain
            max-width="93"
            max-height="93"
            :src="require(`~/assets/images/empty-page-folder.svg`)"
            class="mb-10"
          />
          <span>Нет сохранённых элементов</span>
        </div>
      </div>
      <div v-else>
        <v-container class="search-container">
          <v-row class="justify-space-between">
            <v-col cols="10" class="px-0">
              <v-text-field
                v-model="search"
                clearable
                dense
                background-color="white"
                filled
                outlined
                :label="'Поиск'"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-data-table
          class="row-pointer"
          v-model="selectedItems"
          show-select
          :headers="headers"
          :items="tableData"
          :loading="isLoading"
          :search="search"
          :item-class="'table-item'"
          :selectable-key="'Link'"
          :item-key="'Link'"
          :footer-props="{ 'items-per-page-options': [5, 10, 15] }"
          @click:row="openList($event.API)"
        >
          <template v-slot:item.API="{ item }">
            <div class="d-flex align-center">
              <span> {{ item.API }}</span>
            </div>
          </template>
          <template v-slot:item.Category="{ item }">
            <div class="px-2">
              <span @click.stop>
                <span>{{ item.Category }}</span>
              </span>
            </div>
          </template>
          <template v-slot:item.Link="{ item }">
            <div class="px-2">
              <span @click.stop>
                <a :href="item.Link" target="_blanc">{{ item.Link }}</a>
              </span>
            </div>
          </template>
          <template v-slot:item.buttons="{ item }">
            <div>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-hover v-slot="{ hover }">
                    <button
                      v-bind="attrs"
                      v-on="on"
                      class="mr-7"
                      @click="openList(item.API)"
                    >
                      <v-icon :color="hover ? 'primary' : undefined">
                        mdi-folder-arrow-up-outline
                      </v-icon>
                    </button>
                  </v-hover>
                </template>
                <span>Открыть элемент</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-hover v-slot="{ hover }">
                    <button
                      v-bind="attrs"
                      v-on="on"
                      @click="deleteItem($event, item)"
                    >
                      <v-icon :color="hover ? 'primary' : undefined">
                        mdi-delete-outline
                      </v-icon>
                    </button>
                  </v-hover>
                </template>
                <span>Удалить элемент</span>
              </v-tooltip>
            </div>
          </template>
          <template v-slot:footer.prepend>
            <div class="footer-buttons">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-hover v-slot="{ hover }">
                    <button v-bind="attrs" v-on="on" @click="deleteSelected()">
                      <v-icon :color="hover ? 'primary' : undefined">
                        mdi-delete-outline
                      </v-icon>
                    </button>
                  </v-hover>
                </template>
                <span>Удалить выбранные элементы</span>
              </v-tooltip>
            </div>
          </template>
        </v-data-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      selectedItems: [],
      headers: [
        { text: 'Название', value: 'API', sortable: true },
        { text: 'Категория', value: 'Category', sortable: true },
        { text: 'Ссылка', value: 'Link', sortable: false },
        { text: 'Кнопки', value: 'buttons', sortable: false },
      ],
      listsHistory: [
        {
          id: '1',
          name: 'ООО ТЕСТ',
          creationDate: '12.12.1222 12:12',
          changeDate: '12.12.1222 12:12',
        },
        {
          id: '2',
          name: 'ОАО ТЕСТ',
          creationDate: '12.12.1222 12:12',
          changeDate: '12.12.1222 12:12',
        },
        {
          id: '3',
          name: 'ОАО ТЕСТ',
          creationDate: '12.12.1222 12:12',
          changeDate: '12.12.1222 12:12',
        },
        {
          id: '4',
          name: 'ОАО ТЕСТ',
          creationDate: '12.12.1222 12:12',
          changeDate: '12.12.1222 12:12',
        },
        {
          id: '5',
          name: 'ОАО ТЕСТ',
          creationDate: '12.12.1222 12:12',
          changeDate: '12.12.1222 12:12',
        },
        {
          id: '6',
          name: 'ОАО ТЕСТ',
          creationDate: '12.12.1222 12:12',
          changeDate: '12.12.1222 12:12',
        },
        {
          id: '7',
          name: 'ОАО ТЕСТ',
          creationDate: '12.12.1222 12:12',
          changeDate: '12.12.1222 12:12',
        },
        {
          id: '8',
          name: 'ОАО ТЕСТ',
          creationDate: '12.12.1222 12:12',
          changeDate: '12.12.1222 12:12',
        },
        {
          id: '9',
          name: 'ОАО ТЕСТ',
          creationDate: '12.12.1222 12:12',
          changeDate: '12.12.1222 12:12',
        },
        {
          id: '10',
          name: 'ОАО ТЕСТ',
          creationDate: '12.12.1222 12:12',
          changeDate: '12.12.1222 12:12',
        },
        {
          id: '11',
          name: 'ОАО ТЕСТ',
          creationDate: '12.12.1222 12:12',
          changeDate: '12.12.1222 12:12',
        },
      ],
      showRenameById: '',
      isLoading: false,
      isError: false,
      tableData: [],
    }
  },
  methods: {
    openList(item) {
      this.$router.push('/lists/' + item)
    },
    deleteItem(event, item) {
      event.stopPropagation()
      this.tableData.splice(item, 1)
    },
    deleteSelected() {
      let links = []
      this.selectedItems.map((m) => {
        links.push(m.Link)
      })
      this.tableData = this.tableData.filter((f) => {
        return !links.includes(f.Link)
      })
    },
  },
  async mounted() {
    this.isLoading = true
    await this.$axios
      .get('https://api.publicapis.org/entries')
      .then((res) => {
        this.tableData = res.data.entries
        this.isLoading = false
      })
      .catch((err) => {
        this.tableData = []
        this.isError = true
        console.log(err)
      })
      .finally(() => {
        this.isLoading = false
      })
  },
}
</script>

<style lang="scss" scoped>
.search-container {
  margin: 0;
  max-width: 100%;
}
.enquires-history-page {
  margin: 0 50px;
}
.empty-page-image-and-text {
  position: absolute;
  top: 40%;
}

::v-deep tr:hover{ cursor: pointer; }
//Следующие 3 селектора для того что поменять пагинацию и кнопки местами
.footer-buttons {
  order: 4;
}
.v-data-table > .v-data-footer > .v-data-footer__select {
  margin-left: 0;
}
.v-data-table > .v-data-footer > .v-data-footer__icons-after {
  margin-right: auto;
}

.v-data-table > .v-data-footer {
  padding: 0 20px;
}

.prepend-icon {
  margin-right: 14px;
}
.table-item {
  cursor: pointer;
}
</style>
