<template>
  <div class="enquire-tabs-container">
    <v-btn
      outlined
      class="tab-btn"
      depressed
      :color="currentTab === '1' ? 'primary' : ''"
      @click="selectTab('1')"
    >
      <v-icon>mdi-folder-outline</v-icon>
      Выбрать из каталога
    </v-btn>
    <v-btn
      outlined
      class="tab-btn"
      :color="currentTab === '2' ? 'primary' : ''"
      @click="selectTab('2')"
    >
      <v-icon>mdi-file-upload-outline</v-icon>
      CSV
    </v-btn>
  </div>
</template>

<script>
export default {
  computed: {
    currentTab() {
      return this.$store.state.tabs.currentTab
    },
  },
  methods: {
    selectTab(tabNumber) {
      this.$store.commit('tabs/setCurrentTab', tabNumber)
    },
  },
}
</script>

<style lang="scss" scoped></style>
