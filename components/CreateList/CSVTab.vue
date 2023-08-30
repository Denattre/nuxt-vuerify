<template>
  <div style="height: 90%">
    <p>
      Можно побаловаться с загрузкой файла. Формат csv выбран для отработки
      валидации. Можно перетаскивать мышью (Drag and Drop).
    </p>
    <UploadFile />
  </div>
</template>

<script>
import UploadFile from '../UploadFile.vue'
export default {
  components: {
    UploadFile,
  },
}
</script>

<style lang="scss" scoped></style>
