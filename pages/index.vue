<template>
  <div class="bg-gray-100">
    <!-- section:main -->
    <!-- <img src="@/assets/images/main-background.svg" class="absolute z-0"> -->
    <section class="main relative">
      <div class="flex flex-col flex-grow h-full">
        <nav class="navbar">
          <div class="container md:mx-auto">
            <ul class="flex flex-row flex-grow md:justify-between justify-center py-4">
              <li>
                <nuxt-link to="/" tag="a" class="font-bold text-gray-800">LSP SMKN 1 MOJOKERTO</nuxt-link>
              </li>
              <li class="hidden md:block">
                <ul class="menu-right font-semibold text-gray-700 flex flex-row flex-grow space-x-8">
                  <li><nuxt-link to="/about" tag="a">Dokumentasi</nuxt-link></li>
                  <li><nuxt-link to="/about" tag="a">Tentang</nuxt-link></li>
                  <li><nuxt-link to="/contact" tag="a">Kontak</nuxt-link></li>
                  <li>
                    <nuxt-link to="/login" tag="a" class="bg-gray-300 text-gray-700 rounded px-4 py-2 font-semibold transition-all duration-100 ease-in hover:bg-gray-400 hover:text-gray-800 mr-2">
                      Daftar
                    </nuxt-link>
                    <nuxt-link to="/login" tag="a" class="bg-blue-400 text-gray-100 rounded px-4 py-2 font-semibold transition-all duration-100 ease-in hover:bg-blue-600 hover:text-gray-300">
                      Masuk
                    </nuxt-link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
        <div class="container md:mx-auto md:flex-1 mb-8 md:mb-0">
          <div class="flex flex-col-reverse md:flex-row flex-grow h-full text-center md:text-left">
            <div class="md:w-1/2 self-center md:pb-12">
              <h1 class="text-2xl md:text-4xl font-bold text-gray-700">
                LSP APP<br>
                SMKN 1 MOJOKERTO
              </h1>
              <p class="mt-4 mb-8 text-gray-600">
                LSP SMKN 1 MOJOKERTO adalah lembaga pelaksanaan kegiatan sertifikasi profesi yang memperoleh lisensi dari Badan Nasional Sertifikasi Profesi (BNSP).
              </p>
              <nuxt-link to="/login" tag="a" class="bg-blue-400 text-gray-100 rounded px-4 py-2 font-semibold transition-all duration-100 ease-in hover:bg-blue-600 hover:text-gray-300 mr-2">
                Masuk
              </nuxt-link>
              <nuxt-link to="/login" tag="a" class="bg-orange-400 text-gray-100 rounded px-4 py-2 font-semibold transition-all duration-100 ease-in hover:bg-orange-600 hover:text-gray-300 mr-2">
                Tentang Kami
              </nuxt-link>
            </div>
            <div class="md:w-1/2 self-center">
              <img src="@/assets/images/busy-marketing.svg" alt="D-IT Illustration">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- section:service -->
    <section class="bg-gray-200">
      <h2 class="text-center font-bold text-4xl">
        Layanan
      </h2>
    </section>
  </div>
</template>

<style lang="scss" scoped>
* {
  @apply font-sans;
}
section.main {
  height: 100vh;
}
@media (max-width: 768px) {
  nav.navbar {
    @apply bg-white;
    @apply shadow-md;
  }
}
</style>