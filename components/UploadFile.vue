<template>
  <div
    id="drop-area"
    :class="isHighlight ? 'highlight' : ''"
    @dragenter.prevent.stop="isHighlight = true"
    @dragover.prevent.stop="isHighlight = true"
    @dragleave.prevent.stop="isHighlight = false"
    @drop.prevent.stop="drop($event)"
  >
    <div class="drag-n-drop-content">
      <v-file-input
        accept=".csv"
        :rules="rules"
        v-model="file"
        :color="isHighlight ? 'primary' : ''"
        chips
        label="Выберите файл"
      ></v-file-input>
      <v-icon :color="isHighlight ? 'primary' : ''" size="100">
        mdi-upload
      </v-icon>
      <div :class="isHighlight ? 'highlight' : ''">или перенесите его сюда</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isHighlight: false,
      rules: [
        (value) =>
          !value ||
          value.name.slice(value.name.length - 4) == '.csv' ||
          'Файл должен быть формата csv',
      ],
    }
  },
  watch: {
    file() {
      if (
        this.file &&
        this.file.name.slice(this.file.name.length - 4) === '.csv'
      ) {
        console.log('true CSS')
        this.$store.commit('createList/setCsvValid', true)
      } else {
        console.log('false CSS')
        this.$store.commit('createList/setCsvValid', false)
      }
    },
  },
  computed: {
    file: {
      get() {
        return this.$store.state.createList.file
      },
      set(val) {
        this.$store.commit('createList/setFile', val)
      },
    }
  },
  methods: {
    drop(e) {
      e.preventDefault()
      e.stopPropagation()
      this.isHighlight = false
      this.$store.commit('createList/setFile', e.dataTransfer.files[0])
      // this.file = e.dataTransfer.files[0]
      if (!this.$store.state.createList.listName)
        this.$store.commit(
          'createList/setListName',
          'Список - ' + this.file.name.slice(0, -4)
        )
      // this.handleFiles(files)
      this.uploadFile()
    },
    uploadFile() {
      let url = 'YOUR URL HERE'
      let formData = new FormData()

      formData.append('file', this.file)

      this.$axios
        .post(url, formData)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    checkFileFormat(event) {
      console.log('EVENT', event)
      if (
        this.file &&
        this.file.name.slice(this.file.name.length - 4) !== '.csv'
      ) {
        console.log('FALSE CSS')
        this.$store.commit('createList/setCsvValid', false)
      } else {
        console.log('TRUE CSS')
        this.$store.commit('createList/setCsvValid', true)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
#drop-area {
  border: 2px dashed #ccc;
  border-radius: 20px;
  width: 100%;
  height: 100%;
  font-family: sans-serif;
  margin: 20px auto;
  padding: 20px;
}
#drop-area.highlight {
  border-color: #1976d2;
  color: #1976d2;
}

.drag-n-drop-content {
  margin: 5% auto;
  width: 60%;
  text-align: center;
  font-size: 18px;
}
</style>
