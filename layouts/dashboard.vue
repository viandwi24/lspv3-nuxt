<template>
  <div class="dashboard-layout bg-gray-200 min-h-screen">
    <overlay-loading v-if="loading" />
    <!-- navbar -->
    <nav class="navbar bg-gray-100 fixed min-w-full max-w-full z-30 py-4 border-b-2 border-gray-300">
      <div class="container mx-auto px-4 md:px-0 items-center">
        <!-- <img class="inline-block" style="height: 32px ;" src="https://i.pinimg.com/236x/1d/35/10/1d35108c091b75c86c3707a4c16852f0--classic-simple.jpg" alt="Logo"> -->
        <div class="flex flex-row flex-grow justify-between">
          <!-- left -->
          <div>
            <div class="flex flex-row flex-grow divide-x-2 divide-gray-300">
              <div class="mr-8">
                <nuxt-link tag="a" :to="{ name: 'dashboard' }" class="font-semibold text-lg">
                  {{ app.name.toUpperCase() }} DASHBOARD
                </nuxt-link>
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
            <div class="toggle-wrapper hidden sm:block">
              <input id="theme-toggler" v-model="theme" name="provide_muffins" class="toggle" type="checkbox">
              <label for="theme-toggler" class="toggle--label" />
              <div class="foux-toggle" />
            </div>
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
            <li v-for="(item, i) in sidebarMenuRole" :key="i" :class="{ 'item-header font-semibold text-gray-600 pl-10 mb-1 mt-3': item.type === 'item-header', 'item': item.type === 'item', 'active': (item.route && $route.name === item.route) }">
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
        &copy; <a href="#" class="font-semibold">D-IT Soft</a> 2020.
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
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  data () {
    return {
      sidebarState: false,
      theme: false
    }
  },
  computed: {
    ...mapState(['app', 'loading']),
    sidebarMenu () {
      return this.$store.state.sidebar.sidebarMenu
    },
    sidebarMenuRole () {
      return this.sidebarMenu[this.$auth.user.role.toLowerCase()]
    },
    profilRoute () {
      const role = this.$auth.user.role
      return (`${role}-profil`).toLowerCase()
    }
  },
  watch: {
    theme: (val) => {
      document.body.classList.toggle('dark-theme')
    }
  },
  mounted () {
    window.addEventListener('resize', this.windRezise)
  },
  destroyed () {
    window.removeEventListener('resize', this.windRezise)
  },
  methods: {
    ...mapGetters(['GET_APP']),
    windRezise (e) {
      const w = window.innerWidth
      if (w > 640) {
        this.$refs.sidebar.style.display = 'block'
        this.sidebarState = true
      } else {
        this.$refs.sidebar.style.display = 'none'
        this.sidebarState = false
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
  middleware: ['auth']
}
</script>

<style lang="scss" scoped>
body.dark-theme {
  nav.navbar {
    background: theme('colors.gray.800') !important;
    color: theme('colors.gray.100') !important;
    input {
      background: theme('colors.gray.800') !important;
    }
  }
  div.sidebar {
    background: theme('colors.gray.800') !important;
    color: theme('colors.gray.100') !important;
    .item {
      color: theme('colors.gray.100') !important;
    }
  }
  .dashboard-layout, div.content {
    background: theme('colors.gray.800') !important;
    color: theme('colors.gray.100') !important;
  }
  div.footer, div.footer span {
    background: theme('colors.gray.800') !important;
    color: theme('colors.gray.100') !important;
  }
}
@import "@/assets/scss/layouts/_dashboard.scss";
// Variables

$toggle-width: 65;
$toggle-height: 25;

$toggle--knob--spacing: 5;
$toggle--knob--diameter: $toggle-height - $toggle--knob--spacing * 2;

$toggle--animation-duration: 0.2s;
$toggle--animation-easing: cubic-bezier(.34,.93,.85,.91);
$toggle--label--animation-duration-in: 0.4s;
$toggle--label--animation-duration-out: 0.05s;
$toggle--label--animation-easing: linear;

$toggle-off: (
  color: #222222,
  bg-color: #F7F7F7,
  border-color: #E4E4E4
);

$toggle-on: (
  color: white,
  bg-color: theme('colors.blue.700'),
  border-color: theme('colors.blue.600')
);

// Functions

@function to-rem($size) {
  @return $size / 16 * 1rem;
}

// Styles

.toggle-wrapper {
  position: relative;
  width: to-rem($toggle-width);
  height: to-rem($toggle-height);
  font-family: sans-serif;
  font-size: to-rem(12);
  font-weight: 100;
}

.toggle {
  display: none;
}

.foux-toggle {
  position: relative;
  width: to-rem($toggle-width);
  height: to-rem($toggle-height);
  border-radius: to-rem($toggle-height);
  margin: 0;
  border-width: 1px;
  border-style: solid;
  border-color: map-get($toggle-off, border-color);
  background-color: map-get($toggle-off, bg-color);
  transition: background-color $toggle--animation-duration $toggle--animation-easing;

  // Toggle Knob
  &:before {
    $top: $toggle--knob--spacing - 1;

    content:"";
    position:absolute;
    top: to-rem($top);
    left: to-rem($toggle--knob--spacing);
    display: block;
    width: to-rem($toggle--knob--diameter);
    height: to-rem($toggle--knob--diameter);
    border-radius: to-rem($toggle--knob--diameter);
    background-color: white;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    transition: left $toggle--animation-duration $toggle--animation-easing;
  }

  // Checked State
  .toggle:checked ~ &{
    border-color: map-get($toggle-on, border-color);
    background-color: map-get($toggle-on, bg-color);
    &:before {
      $left: $toggle-width - $toggle--knob--spacing - $toggle--knob--diameter - 1;
      left: to-rem($left);
    }
  }
}

%toggle--label--copy {
  position: absolute;
  top: 0;
  bottom: 0;
  transition: opacity $toggle--label--animation-duration-in $toggle--label--animation-easing;
}

.toggle--label {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  text-align: center;
  line-height: to-rem($toggle-height);
  cursor: pointer;
  z-index: 10;
  letter-spacing: to-rem(1);
  &:before {
    @extend %toggle--label--copy;
    content: 'Dark';
    right: 40%;
    left: 0;
    color: map-get($toggle-on, color);
    opacity: 0;
    .toggle:checked + & {
      opacity: 1;
    }
  }
  &:after {
    @extend %toggle--label--copy;
    content: 'Light';
    position: absolute;
    right: 0;
    left: 40%;
    opacity: 1;

    .toggle:checked + & {
      opacity: 0;
      transition-duration: $toggle--label--animation-duration-out;
    }
  }
  @apply text-xs;
}

html {
  background-color: #FBFBFB;
}
</style>
