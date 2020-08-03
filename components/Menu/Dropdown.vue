<template>
  <div :id="id" class="dropdown relative inline-block">
    <slot name="toggler" />
    <div class="dropdown-menu border border-gray-200 absolute bg-white rounded-sm overflow-hidden shadow-md hidden">
      <slot name="menu" />
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      id: '',
      isOpen: false
    }
  },
  computed: {
  },
  watch: {
    id: (val, newval) => {
      const dropdown = document.getElementById(val)
      console.log(dropdown)
    }
  },
  created () {
  },
  mounted () {
    this.id = this.makeId(6)
    // dropdown.addEventListener('click', function (e) {
    //   console.log(this.id)
    // })
  },
  methods: {
    makeId (length) {
      let result = ''
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      const charactersLength = characters.length
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
      }
      return result
    },
    openMenu () {
    }
  }
}
</script>
<style lang="scss">
.dropdown-menu {
    top: 38px;
    min-width: 10rem;
    transition: all .2s;
}
.dropdown-item {
    display: block;
    width: 100%;
    clear: both;
    font-weight: 400;
    color: #212529;
    text-align: inherit;
    white-space: nowrap;
    background-color: transparent;
    border: 0;
}
</style>
