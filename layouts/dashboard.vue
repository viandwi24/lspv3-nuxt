<template>
  <div class="dashboard">
    <div class="dashboard-layout bg-gray-200 min-h-screen">
      <overlay-loading v-if="loading" />
      <!-- navbar -->
      <nav class="navbar">
        <div class="container mx-auto px-4 md:px-0 items-center">
          <!-- <img class="inline-block" style="height: 32px ;" src="https://i.pinimg.com/236x/1d/35/10/1d35108c091b75c86c3707a4c16852f0--classic-simple.jpg" alt="Logo"> -->
          <div class="flex flex-row flex-grow justify-between">
            <!-- left -->
            <div>
              <div class="flex flex-row flex-grow divide-x-2 divide-gray-400">
                <div class="mr-8">
                  <nuxt-link tag="a" :to="{ name: 'dashboard' }" class="font-semibold text-lg">
                    {{ app.name.toUpperCase() }} DASHBOARD
                  </nuxt-link>
                </div>
                <div class="flex-1 pl-8 hidden md:block">
                  <div class="font-semibold text-lg">
                    {{ app.institute.toUpperCase() }}
                    <span class="mx-2"><icon icon="chevron-right" /></span>
                    {{ $auth.user.role }}
                  </div>
                  <!-- <div class="flex flex-row flex-grow items-center">
                    <icon icon="search" class="text-gray-500 mr-2" />
                    <input type="text" name="q" class="outline-none bg-gray-100" placeholder="Search...">
                  </div> -->
                </div>
              </div>
            </div>
            <!-- right -->
            <div>
              <div class="toggle-wrapper hidden sm:block">
                <input id="theme-toggler" v-model="themeState.theme" name="provide_muffins" class="toggle" type="checkbox">
                <label for="theme-toggler" class="toggle--label" />
                <div class="foux-toggle" />
              </div>
              <a href="#" class="bg-blue-500 text-gray-100 rounded px-4 py-2 font-semibold transition-all duration-200 ease-in hover:bg-blue-700 hover:text-gray-300 sm:hidden" @click.prevent="sidebarOpen">
                <icon v-if="!sidebarState.state" icon="bars" />
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
          <overlay-scrollbars :options="{ autoUpdate: null, autoUpdateInterval: 33, nativeScrollbarsOverlaid : { showNativeScrollbars: false }, scrollbars: { autoHide: 'scroll' } }" class="sidebar-container flex flex-col flex-grow overflow-y-auto">
            <!-- sidebar:profile -->
            <div class="text-center mt-4">
              <div class="rounded-full bg-gray-400 inline-block p-2">
                <img src="@/assets/images/avatar.png" alt="Avatar" class="avatar" style="height: 64px;">
              </div>
              <div class="text-blue-500 font-mono mt-2">
                {{ $auth.user.name }}
              </div>
              <div>
                {{ $auth.user.email }}
              </div>
              <div class="mt-2">
                <tw-button text="Profil" type="primary" size="xs" :route="profilRoute" />
                <tw-button text="Keluar" type="danger" size="xs" route="auth-logout" />
              </div>
            </div>
            <!-- sidebar:menu -->
            <ul class="flex-1 mt-4 max-h-full">
              <li v-for="(item, i) in sidebarMenu" :key="i" :class="{ 'item-header font-semibold text-gray-600 pl-10 mb-1 mt-3': item.type === 'item-header', 'item': item.type === 'item', 'active': (item.route && $route.name === item.route) }">
                <span v-if="item.type == 'item-header'">{{ item.text }}</span>
                <nuxt-link v-else-if="item.type == 'item'" tag="a" :to="{ name: item.route }">
                  {{ item.text }}
                </nuxt-link>
              </li>
            </ul>
            <!-- sidebar:footer -->
            <div class="mx-4 mb-4 px-12 text-center">
              <img src="@/assets/images/illustration/hello.svg" alt="Illustration" style="max-height: 100px;height: 100%;" class="inline-block">
            </div>
          </overlay-scrollbars>
        </div>

        <!-- content -->
        <div class="content container">
          <Nuxt />
        </div>
      </div>
      <!-- footer -->
      <div class="footer z-10 fixed bottom-0 left-0 min-w-full max-w-full bg-gray-100 border-t-2 border-gray-300 px-4 py-2">
        <span class="text-gray-700 text-center sm:text-left">
          &copy; 2020 <a href="#" class="font-semibold">D-IT Soft</a>.
          <span class="hidden md:inline-block">
            All rights reserved. {{ app.name.toUpperCase() }} {{ app.version }} and made with
            <div class="inline-block">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13">
                <path fill="#F56565" fill-rule="nonzero" d="M13.59 1.778c-.453-.864-3.295-3.755-6.59.431C3.54-1.977.862.914.41 1.778c-.825 1.596-.33 4.014.823 5.18L7.001 13l5.767-6.043c1.152-1.165 1.647-3.582.823-5.18z" />
              </svg>
            </div>
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, watch, onMounted, onUnmounted } from '@vue/composition-api'
export default {
  head () {
    const app = this.GET_APP()
    return {
      titleTemplate: `%s - ${app.name.toUpperCase()} ${app.institute.toUpperCase()}`,
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap'
        }
      ]
    }
  },
  middleware: ['auth'],
  setup (props, { root, refs }) {
    const { themeState, changeTheme } = useOurTheme(root)
    const {
      sidebarState,
      sidebarMenu,
      sidebarGetState,
      sidebarOpen
    } = useOurSidebar(root, refs)

    const app = computed(() => root.$store.state.app)
    const GET_APP = () => root.$store.getters.GET_APP
    const loading = computed(() => root.$store.state.loading)
    const profilRoute = computed(() => {
      const role = root.$auth.user.role
      return (`${role}-profil`).toLowerCase()
    })

    return {
      app,
      GET_APP,
      loading,
      profilRoute,
      sidebarState,
      sidebarMenu,
      sidebarGetState,
      sidebarOpen,
      themeState,
      changeTheme
    }
  }
}

function useOurSidebar ($root, $refs) {
  const sidebarState = reactive({
    state: false
  })
  const sidebarMenu = computed(() => $root.$store.state.sidebar.sidebarMenu[$root.$auth.user.role.toLowerCase()])
  // const sidebarMenuRole = computed(() => sidebarMenu[])
  const windRezise = (e) => {
    const w = window.innerWidth
    if (w > 640) {
      $refs.sidebar.style.display = 'block'
      sidebarState.state = true
    } else {
      $refs.sidebar.style.display = 'none'
      sidebarState.state = false
    }
  }
  const sidebarGetState = () => {
    return $refs.sidebar.style.display || false
  }
  const sidebarOpen = () => {
    if (sidebarGetState() === 'block') {
      $refs.sidebar.style.display = 'none'
      sidebarState.state = false
    } else {
      $refs.sidebar.style.display = 'block'
      sidebarState.state = true
    }
  }

  onMounted(() => {
    window.addEventListener('resize', windRezise)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', windRezise)
  })

  return {
    sidebarState,
    sidebarMenu,
    sidebarGetState,
    sidebarOpen
  }
}

function useOurTheme ($root) {
  const themeState = reactive({
    theme: false
  })

  const changeTheme = (theme) => {
    if (theme === 'dark') {
      document.body.classList.add('dark-theme')
    } else {
      document.body.classList.remove('dark-theme')
    }
  }

  watch(themeState, (val) => {
    const newTheme = (val.theme) ? 'dark' : 'light'
    $root.$store.commit('SET_THEME', newTheme)
    changeTheme(newTheme)
  })

  onMounted(() => {
    if ($root.$store.state.theme === 'dark') { themeState.theme = true }
  })

  return {
    themeState,
    changeTheme
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/layouts/_dashboard.scss";
</style>
