let configs = {}
const setting = {
  insert: (val) => {
    configs = Object.assign({}, configs, val)
  },
  set: (key, val) => {
    configs[key] = val
    return configs[val]
  },
  get: (key, defaultValue = null) => {
    if (typeof configs[key] !== 'undefined') {
      return configs[key]
    }
    return defaultValue
  },
  all: () => {
    return configs
  }
}

// Vue.prototype.$config = config
export default ({ app }, inject) => {
  inject('setting', setting)

  setting.insert({
    // modal
    deleteModal: {
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete'
    },

    // tes
    tes: 'h3h3'
  })
}
