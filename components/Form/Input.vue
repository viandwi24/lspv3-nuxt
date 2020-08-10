<template>
  <div class="mb-4">
    <label class="block text-gray-700 text-sm font-bold mb-2" :for="options.id">
      {{ title }}
    </label>
    <input
      :id="options.id"
      v-model="value"
      class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
      :class="inputClass"
      :type="type"
      :placeholder="options.placeholder"
    >
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: undefined
    },
    inputClass: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      options: {
        id: '',
        placeholder: ''
      }
    }
  },
  watch: {
    value (val) {
      this.$emit('update:value', val)
    }
  },
  created () {
    this.options.id = this.title.split(' ').join('-').toLowerCase()
    this.options.placeholder = (typeof this.placeholder !== 'undefined')
      ? this.placeholder
      : `${this.title} ...`
  }
}
</script>
