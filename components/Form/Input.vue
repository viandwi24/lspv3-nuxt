<template>
  <div :class="`${classGroup}`">
    <label v-if="withTitle" class="block text-gray-700 text-sm font-bold mb-2" :for="options.id">
      {{ title }}
    </label>
    <input
      :id="options.id"
      v-model="valueModel"
      class="bg-gray-200 appearance-none border-2 border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
      :class="`${classSize} inputClass`"
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
    },
    size: {
      type: String,
      default: 'md'
    },
    withTitle: {
      type: Boolean,
      default: true
    },
    classGroup: {
      type: String,
      default: 'mb-4'
    }
  },
  data () {
    return {
      valueModel: '',
      options: {
        id: '',
        placeholder: ''
      }
    }
  },
  computed: {
    classSize () {
      const size = this.size
      let newClass = ''
      switch (size) {
        case 'md':
          newClass = 'text-md'
          break
        case 'lg':
          newClass = 'text-lg'
          break
        case 'sm':
          newClass = 'text-sm'
          break
        case 'xs':
          newClass = 'text-xs'
          break
        default:
          break
      }
      return newClass
    }
  },
  watch: {
    valueModel (val) {
      this.$emit('update:value', val)
    }
  },
  created () {
    this.options.id = this.title.split(' ').join('-').toLowerCase()
    this.options.placeholder = (typeof this.placeholder !== 'undefined')
      ? this.placeholder
      : `${this.title} ...`
    this.valueModel = this.value
  }
}
</script>
