<template>
  <div class="bg-gray-200 min-h-screen">
    <!-- navbar -->
    <nav class="navbar bg-gray-100 fixed min-w-full max-w-full z-30 py-4 border-b-2 border-gray-300">
      <div class="container mx-auto px-4 md:px-0 items-center">
        <!-- <img class="inline-block" style="height: 32px ;" src="https://i.pinimg.com/236x/1d/35/10/1d35108c091b75c86c3707a4c16852f0--classic-simple.jpg" alt="Logo"> -->
        <div class="flex flex-row flex-grow justify-between">
          <!-- left -->
          <div>
            <div class="flex flex-row flex-grow divide-x-2 divide-gray-300">
              <div class="mr-8">
                <a href="#" class="font-semibold text-lg">
                  {{ app.name.toUpperCase() }} DASHBOARD
                </a>
              </div>
              <div class="flex-1 pl-8 hidden md:block">
                <div class="flex flex-row flex-grow items-center">
                  <icon icon="search" class="text-gray-500 mr-2" />
                  <input type="text" name="q" class="outline-none bg-gray-100" placeholder="Search...">
                </div>
              </div>
            </div>
          </div>
          <!-- right -->
          <div>
            <a href="#" class="bg-blue-500 text-gray-100 rounded px-4 py-2 font-semibold transition-all duration-200 ease-in hover:bg-blue-700 hover:text-gray-300 sm:hidden" @click.prevent="openSidebar">
              <icon v-if="!sidebarState" icon="bars" />
              <icon v-else icon="times" />
            </a>
          </div>
        </div>
      </div>
    </nav>
    <!-- body -->
    <div class="sm:flex flex-row flex-grow">
      <!-- sidebar -->
      <div ref="sidebar" class="sidebar fixed bg-gray-100 min-h-screen max-h-screen border-r-2 border-gray-300 text-sm z-20">
        <div class="sidebar-container flex flex-col flex-grow overflow-y-auto">
          <!-- sidebar:profile -->
          <div class="text-center mt-4">
            <div class="rounded-full bg-gray-400 inline-block p-2">
              <img src="@/assets/images/avatar.png" alt="Avatar" class="avatar" style="height: 64px;">
            </div>
            <div class="text-blue-500 font-mono mt-2">
              Alfian Dwi Nugraha
            </div>
            <div class="mt-2">
              <a href="#" class="bg-blue-400 text-gray-100 rounded px-3 py-1 mx-1 transition-all duration-100 ease-in hover:bg-blue-600 hover:text-gray-300 text-xs">
                Profil
              </a>
              <a href="#" class="bg-red-400 text-gray-100 rounded px-3 py-1 mx-1 transition-all duration-100 ease-in hover:bg-red-600 hover:text-gray-300 text-xs">
                Keluar
              </a>
            </div>
          </div>
          <!-- sidebar:menu -->
          <ul class="flex-1 mt-4">
            <li v-for="(item, i) in sidebarMenuRole" :key="i" :class="{ 'item-header font-semibold text-gray-600 pl-10 mb-2 mt-2': item.type === 'item-header', 'item': item.type === 'item', 'active': (item.route && $route.name === item.route) }">
              <span v-if="item.type == 'item-header'">Menu</span>
              <nuxt-link v-else-if="item.type == 'item'" tag="a" :to="{ name: item.route }">
                {{ item.text }}
              </nuxt-link>
            </li>
          </ul>
          <!-- sidebar:footer -->
          <div class="mx-4 mb-4 px-8">
            <img src="@/assets/images/illustration/hello.svg" alt="Illustration">
          </div>
        </div>
      </div>

      <!-- content -->
      <div class="content container mx-auto px-10 pt-4">
        <Nuxt />
      </div>
    </div>
    <!-- footer -->
    <div class="footer z-10 fixed bottom-0 left-0 min-w-full max-w-full bg-gray-100 border-t-2 border-gray-300 px-4 py-2">
      <span class="text-gray-700 text-center sm:text-left">
        &copy; <a href="#" class="font-semibold">D-IT Soft</a> 2020. All rights reserved. {{ app.name.toUpperCase() }} {{ app.version }} and
        made with
        <div class="inline-block">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13">
            <path fill="#F56565" fill-rule="nonzero" d="M13.59 1.778c-.453-.864-3.295-3.755-6.59.431C3.54-1.977.862.914.41 1.778c-.825 1.596-.33 4.014.823 5.18L7.001 13l5.767-6.043c1.152-1.165 1.647-3.582.823-5.18z" />
          </svg>
        </div>
      </span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      sidebarState: false
    }
  },
  computed: {
    ...mapState(['app']),
    sidebarMenu () {
      return this.$store.state.sidebar.sidebarMenu
    },
    sidebarMenuRole () {
      return this.sidebarMenu[this.$auth.user.role.toLowerCase()]
    }
  },
  mounted () {
    window.addEventListener('resize', this.windRezise)
  },
  destroyed () {
    window.removeEventListener('resize', this.windRezise)
  },
  methods: {
    windRezise (e) {
      const w = window.innerWidth
      if (w > 640) {
        this.$refs.sidebar.style.display = 'block'
      } else {
        this.$refs.sidebar.style.display = 'none'
      }
    },
    getSidebarState () {
      return this.$refs.sidebar.style.display || false
    },
    openSidebar () {
      if (this.getSidebarState() === 'block') {
        this.$refs.sidebar.style.display = 'none'
        this.sidebarState = false
      } else {
        this.$refs.sidebar.style.display = 'block'
        this.sidebarState = true
      }
    }
  },
  middleware: ['auth']
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/layouts/_dashboard.scss";
</style>
