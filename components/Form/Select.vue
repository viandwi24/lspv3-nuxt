<template>
  <div class="input-group" :class="`${classGroup}`">
    <label v-if="withTitle" class="block text-gray-700 text-sm font-bold mb-2" :for="options.id">
      {{ title }}
    </label>
    <select :id="options.id" :ref="ref" v-model="valueModel" class="select">
      <option v-for="(item, index) in data" :key="`item-${index}`" :value="index">
        {{ item }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    data: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    },
    placeholder: {
      type: String,
      default: undefined
    },
    value: {
      type: String,
      default: ''
    },
    classGroup: {
      type: String,
      default: 'mb-4'
    },
    withTitle: {
      type: Boolean,
      default: true
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
  watch: {
    valueModel (val) {
      this.$emit('update:value', val)
    }
  },
  created () {
    this.options.id = this.title.split(' ').join('-').toLowerCase()
    this.ref = 'select-' + this.options.id
    this.options.placeholder = (typeof this.placeholder !== 'undefined')
      ? this.placeholder
      : `${this.title} ...`
    this.valueModel = this.value
  }
}
</script>
