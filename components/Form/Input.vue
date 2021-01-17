<template>
  <div class="input-group" :class="`${classGroup}`">
    <label v-if="withTitle" class="block text-gray-700 text-sm font-bold mb-2" :for="options.id">
      {{ title }}
    </label>
    <input
      v-if="type === 'text' || type === 'password' || type === 'email'"
      :id="options.id"
      :ref="ref"
      v-model="valueModel"
      class="input bg-gray-200 appearance-none border-2 border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
      :class="`${classSize} ${inputClass}`"
      :type="type"
      :placeholder="options.placeholder"
      :disabled="disabled"
    >
    <textarea
      v-if="type === 'textarea'"
      :id="options.id"
      :ref="ref"
      v-model="valueModel"
      class="input bg-gray-200 appearance-none border-2 border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
      :class="`${classSize} ${inputClass}`"
      :type="type"
      :placeholder="options.placeholder"
      :disabled="disabled"
    />
    <slot v-if="type === 'custom'" />
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
    disabled: {
      type: Boolean,
      default: false
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
    iserror: {
      type: Boolean,
      default: false
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
      ref: '',
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
    this.ref = 'input-' + this.options.id
    this.options.placeholder = (typeof this.placeholder !== 'undefined')
      ? this.placeholder
      : `${this.title} ...`
    this.valueModel = this.value
    this.iserrorModel = this.iserror
  }
}
</script>
