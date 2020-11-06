<template>
  <div class="bg-gray-100">
    <!-- section:main -->
    <section class="main relative">
      <div class="flex flex-col flex-grow h-full">
        <nav class="navbar">
          <div class="container md:mx-auto">
            <ul class="flex flex-row flex-grow md:justify-between justify-center py-4">
              <li>
                <nuxt-link to="/" tag="a" class="font-bold text-gray-800">
                  {{ app.name.toUpperCase() }} {{ app.institute.toUpperCase() }}
                </nuxt-link>
              </li>
              <li class="hidden md:block">
                <ul class="menu-right font-semibold text-gray-700 flex flex-row flex-grow space-x-8">
                  <li>
                    <nuxt-link to="/dokumentasi" tag="a" class="link">
                      Dokumentasi
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link to="/about" tag="a" class="link">
                      Tentang
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link to="/contact" tag="a" class="link">
                      Kontak
                    </nuxt-link>
                  </li>
                  <li v-if="!this.$auth.loggedIn">
                    <nuxt-link to="/auth/register" tag="a" class="bg-gray-300 text-gray-700 rounded px-4 py-2 font-semibold transition-all duration-100 ease-in hover:bg-gray-400 hover:text-gray-800 mr-2">
                      Daftar
                    </nuxt-link>
                    <nuxt-link to="/auth/login" tag="a" class="bg-blue-400 text-gray-100 rounded px-4 py-2 font-semibold transition-all duration-100 ease-in hover:bg-blue-600 hover:text-gray-300">
                      Masuk
                    </nuxt-link>
                  </li>
                  <li v-else>
                    <nuxt-link to="/dashboard" tag="a" class="bg-blue-400 text-gray-100 rounded px-4 py-2 font-semibold transition-all duration-100 ease-in hover:bg-blue-600 hover:text-gray-300">
                      Dashboard
                    </nuxt-link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
        <div class="container md:mx-auto md:flex-1 mb-8 md:mb-0 mt-4 md:mt-0">
          <div class="flex flex-col-reverse md:flex-row flex-grow h-full text-center md:text-left">
            <div class="md:w-1/2 self-center md:pb-12">
              <h1 class="text-2xl md:text-4xl font-bold text-gray-700">
                {{ app.name.toUpperCase() }}<br>
                {{ app.institute.toUpperCase() }}
              </h1>
              <hr class="tw-hr lg hidden md:block">
              <p class="mt-4 mb-8 text-gray-600">
                {{ app.name.toUpperCase() }} {{ app.institute.toUpperCase() }} adalah lembaga pelaksanaan kegiatan sertifikasi profesi yang memperoleh lisensi dari Badan Nasional Sertifikasi Profesi (BNSP).
              </p>
              <nuxt-link v-if="!this.$auth.loggedIn" to="/auth/login" tag="a" class="bg-blue-400 text-gray-100 rounded px-4 py-2 font-semibold transition-all duration-100 ease-in hover:bg-blue-600 hover:text-gray-300">
                <icon icon="sign-in-alt" />
                Masuk
              </nuxt-link>
              <nuxt-link v-else to="/dashboard" tag="a" class="bg-blue-400 text-gray-100 rounded px-4 py-2 font-semibold transition-all duration-100 ease-in hover:bg-blue-600 hover:text-gray-300">
                <icon icon="home" />
                Dashboard
              </nuxt-link>
              <nuxt-link to="/login" tag="a" class="bg-orange-400 text-gray-100 rounded px-4 py-2 font-semibold transition-all duration-100 ease-in hover:bg-orange-600 hover:text-gray-300 ml-2">
                <icon icon="info-circle" />
                Tentang Kami
              </nuxt-link>
            </div>
            <div class="md:w-1/2 self-center">
              <img v-lazy-load src="@/assets/images/busy-marketing.svg" alt="D-IT Illustration">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- section:service -->
    <section class="bg-blue-500">
      <svg class="md:mt-20 md:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#f7fafc" fill-opacity="1" d="M0,64L12,85.3C24,107,48,149,72,154.7C96,160,120,128,144,106.7C168,85,192,75,216,85.3C240,96,264,128,288,138.7C312,149,336,139,360,154.7C384,171,408,213,432,234.7C456,256,480,256,504,240C528,224,552,192,576,160C600,128,624,96,648,90.7C672,85,696,107,720,122.7C744,139,768,149,792,138.7C816,128,840,96,864,69.3C888,43,912,21,936,32C960,43,984,85,1008,117.3C1032,149,1056,171,1080,197.3C1104,224,1128,256,1152,224C1176,192,1200,96,1224,69.3C1248,43,1272,85,1296,112C1320,139,1344,149,1368,154.7C1392,160,1416,160,1428,160L1440,160L1440,0L1428,0C1416,0,1392,0,1368,0C1344,0,1320,0,1296,0C1272,0,1248,0,1224,0C1200,0,1176,0,1152,0C1128,0,1104,0,1080,0C1056,0,1032,0,1008,0C984,0,960,0,936,0C912,0,888,0,864,0C840,0,816,0,792,0C768,0,744,0,720,0C696,0,672,0,648,0C624,0,600,0,576,0C552,0,528,0,504,0C480,0,456,0,432,0C408,0,384,0,360,0C336,0,312,0,288,0C264,0,240,0,216,0C192,0,168,0,144,0C120,0,96,0,72,0C48,0,24,0,12,0L0,0Z" />
      </svg>
      <h2 class="text-4xl text-center text-gray-200">
        Layanan
      </h2>
      <div class="flex flex-wrap justify-center mt-4">
        <div class="w-full md:w-3/12 bg-gray-100 rounded transition-all duration-100 mx-2 my-2 p-4 text-center hover:shadow-2xl hover:bg-gray-200">
          <div class="font-semibold text-xl mb-4 text-gray-900">
            Customer Support
          </div>
          <div class="text-center mb-4">
            <img v-lazy-load class="inline-block" src="@/assets/images/landingpage/contact.svg" alt="Icon" width="120">
          </div>
          <p>
            Kami berusaha melayani dengan sebaik - baiknya.
          </p>
        </div>
        <div class="w-full md:w-3/12 bg-gray-100 rounded transition-all duration-100 mx-2 my-2 p-4 text-center hover:shadow-2xl hover:bg-gray-200">
          <div class="font-semibold text-xl mb-4 text-gray-900">
            Fast
          </div>
          <div class="text-center mb-4">
            <img v-lazy-load class="inline-block" src="@/assets/images/landingpage/clock.svg" alt="Icon" width="120">
          </div>
          <p>
            Kami melakukannya dengan cepat dan tepat waktu.
          </p>
        </div>
        <div class="w-full md:w-3/12 bg-gray-100 rounded transition-all duration-100 mx-2 my-2 p-4 text-center hover:shadow-2xl hover:bg-gray-200">
          <div class="font-semibold text-xl mb-4 text-gray-900">
            Accuracy Assessment
          </div>
          <div class="text-center mb-4">
            <img v-lazy-load class="inline-block" src="@/assets/images/landingpage/exam.svg" alt="Icon" width="120">
          </div>
          <p>
            Ketepatan dan kejujuran kami dalam melakukan asesmen.
          </p>
        </div>
      </div>
    </section>

    <!-- section:docs -->
    <section class="bg-blue-500">
      <div class="container mx-auto pt-12 md:px-24 px-4">
        <div class="flex md:flex-row flex-col">
          <div class="w-full md:w-1/2 p-4">
            <div class="bg-gray-200 p-4 rounded-md shadow-md">
              <img src="@/assets/images/slides/1.jpeg" alt="Documentations">
            </div>
          </div>
          <div class="w-full md:w-1/2 pl-4 self-center">
            <h1 class="text-4xl font-semibold text-gray-200">
              Ensure Your Competency
            </h1>
            <p class="text-gray-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, dolore eligendi? Blanditiis, unde? Id quisquam minima inventore officia deleniti eum fugit ad cumque ex quod deserunt, veritatis commodi! A, expedita.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- section:company -->
    <section class="bg-blue-500">
      <div class="container mx-auto pt-20">
        <div class="flex flex-wrap">
          <div class="w-full md:w-6/12 self-center">
            <img v-lazy-load src="@/assets/images/landingpage/remote-team.svg" alt="Illustration">
          </div>
          <div class="w-full md:w-6/12 self-center text-center md:text-left bg-gray-100 py-4 px-6 rounded shadow-xl mx-2 md:mx-0">
            <h2 class="font-semibold text-4xl mb-8 text-gray-800">
              Tentang Kami
            </h2>
            <p class="text-gray-700 mb-8">
              <strong>{{ app.name.toUpperCase() }}</strong> adalah aplikasi yang dibuat untuk
              membantu proses pengujian (asesmen) yang disesuaikan dengan
              standar dari <strong>BNSP</strong> untuk melakukan pengujian
              profesi. <strong>{{ app.name.toUpperCase() }}</strong> di kembangkan langsung oleh
              <a href="#">D-IT Soft</a>, Sebuah tim Software Developer dan
              IT Tech.
            </p>
            <button class="bg-blue-500 hover:bg-blue-700 py-2 px-4 font-bold text-white rounded">
              Kontak Kami
            </button>
          </div>
        </div>
      </div>
      <div class="bg-blue-600">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#4299e1" fill-opacity="1" d="M0,288L0,224L60,224L60,32L120,32L120,224L180,224L180,256L240,256L240,288L300,288L300,96L360,96L360,320L420,320L420,32L480,32L480,96L540,96L540,224L600,224L600,32L660,32L660,96L720,96L720,128L780,128L780,224L840,224L840,192L900,192L900,96L960,96L960,256L1020,256L1020,256L1080,256L1080,32L1140,32L1140,64L1200,64L1200,288L1260,288L1260,256L1320,256L1320,288L1380,288L1380,288L1440,288L1440,0L1380,0L1380,0L1320,0L1320,0L1260,0L1260,0L1200,0L1200,0L1140,0L1140,0L1080,0L1080,0L1020,0L1020,0L960,0L960,0L900,0L900,0L840,0L840,0L780,0L780,0L720,0L720,0L660,0L660,0L600,0L600,0L540,0L540,0L480,0L480,0L420,0L420,0L360,0L360,0L300,0L300,0L240,0L240,0L180,0L180,0L120,0L120,0L60,0L60,0L0,0L0,0Z" />
        </svg>
        <div class="bg-blue-700">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#3182ce" fill-opacity="1" d="M0,0L0,224L60,224L60,0L120,0L120,192L180,192L180,32L240,32L240,256L300,256L300,64L360,64L360,160L420,160L420,288L480,288L480,288L540,288L540,96L600,96L600,128L660,128L660,160L720,160L720,128L780,128L780,160L840,160L840,64L900,64L900,256L960,256L960,256L1020,256L1020,160L1080,160L1080,320L1140,320L1140,64L1200,64L1200,288L1260,288L1260,288L1320,288L1320,64L1380,64L1380,192L1440,192L1440,0L1380,0L1380,0L1320,0L1320,0L1260,0L1260,0L1200,0L1200,0L1140,0L1140,0L1080,0L1080,0L1020,0L1020,0L960,0L960,0L900,0L900,0L840,0L840,0L780,0L780,0L720,0L720,0L660,0L660,0L600,0L600,0L540,0L540,0L480,0L480,0L420,0L420,0L360,0L360,0L300,0L300,0L240,0L240,0L180,0L180,0L120,0L120,0L60,0L60,0L0,0L0,0Z" />
          </svg>
        </div>
      </div>
    </section>

    <!-- section:tech -->
    <section>
      <div class="container mx-auto my-32">
        <div class="flex flex-wrap justify-center">
          <div class="w-full md:w-6/12 text-center">
            <h2 class="font-semibold text-4xl mb-8 text-gray-800">
              Teknologi
            </h2>
            <p class="text-gray-700">
              Kami menggunakan teknologi untuk mendukung terlaksananya asesmen
              dengan baik dengan performa tinggi dan terjamin produktif nya.
            </p>
          </div>
        </div>
        <div class="flex flex-wrap mt-20 -mx-2">
          <!-- laravel -->
          <div class="w-full md:w-1/4 px-2 py-2">
            <div class=" bg-red-500 text-center rounded-lg shadow-xl hover:shadow-2xl transition duration-200 hover:bg-indigo-400 cursor-default ease-in p-4">
              <div class="mb-2">
                <img v-lazy-load class="inline-block" src="@/assets/images/tech/laravel.svg" alt="Laravel Logo" width="64">
              </div>
              <p class="text-gray-200">
                Laravel merupakan framework php dengan performa tinggi terbukti,
                laravel membantu dalam masalah security, dan lainnya. Kami menggunakan Lumen.
              </p>
            </div>
          </div>
          <!-- vue -->
          <div class="w-full md:w-1/4 px-2 py-2">
            <div class=" bg-green-500 text-center rounded-lg shadow-xl hover:shadow-2xl transition duration-200 hover:bg-indigo-400 cursor-default ease-in p-4">
              <div class="mb-2">
                <img v-lazy-load class="inline-block" src="@/assets/images/tech/vue.svg" alt="Vue Logo" width="64">
              </div>
              <p class="text-gray-200">
                Kami menggunakan Vue sebagai javascript progresif
                framework untuk meningkatkan pengalaman UI dan UX user dengan
                menggunakan Nuxt dan SSR.
              </p>
            </div>
          </div>

          <!-- postgreSQL -->
          <div class="w-full md:w-1/4 px-2 py-2">
            <div class=" bg-blue-500 text-center rounded-lg shadow-xl hover:shadow-2xl transition duration-200 hover:bg-indigo-400 cursor-default ease-in p-4">
              <div class="mb-2">
                <img v-lazy-load class="inline-block" src="@/assets/images/tech/postgre.svg" alt="Postgres Logo" width="64">
              </div>
              <p class="text-gray-200">
                Secara default kami sudah menetapkan postgre sebagai layanan
                database utama kami, karena kecepatan performanya. Anda
                bisa mengubahnya.
              </p>
            </div>
          </div>

          <!-- nodejs -->
          <div class="w-full md:w-1/4 px-2 py-2">
            <div class=" bg-green-600 text-center rounded-lg shadow-xl hover:shadow-2xl transition duration-200 hover:bg-indigo-400 cursor-default ease-in p-4">
              <div class="mb-2">
                <img v-lazy-load class="inline-block" src="@/assets/images/tech/nodejs.svg" alt="Nodejs Logo" width="64">
              </div>
              <p class="text-gray-200">
                Nodejs kami gunakan untuk membantu melakukan utilitas antarmuka,
                seperti membundle script demi kenyamanan user dalam mengakses.
              </p>
            </div>
          </div>

          <!-- wkhtmltopdf -->
          <div class="w-full md:w-1/4 px-2 py-2">
            <div class=" bg-blue-600 text-center rounded-lg shadow-xl hover:shadow-2xl transition duration-200 hover:bg-indigo-400 cursor-default ease-in p-4">
              <div class="mb-2">
                <img v-lazy-load class="inline-block my-5" src="@/assets/images/tech/wkhtmltopdf.png" alt="WKhtmlTOpdf Logo" width="146">
              </div>
              <p class="text-gray-200">
                WKhtmlTOpdf membantu dalam pembuatan dan pencetakan dokumen
                berbasis PDF, Memberikan kemudahan dalam pembuatan dokumen rumit.
              </p>
            </div>
          </div>

          <!-- git -->
          <div class="w-full md:w-1/4 px-2 py-2">
            <div class=" bg-gray-800 text-center rounded-lg shadow-xl hover:shadow-2xl transition duration-200 hover:bg-indigo-400 cursor-default ease-in p-4">
              <div class="mb-2">
                <img v-lazy-load class="inline-block" src="@/assets/images/tech/git.svg" alt="Git Logo" width="64">
              </div>
              <p class="text-gray-200">
                Kode Sumber disimpan dalam git server, yang memudahkan dalam
                proses maintenance dan update. Dengan begini mempermudah admin.
              </p>
            </div>
          </div>

          <!-- redis -->
          <div class="w-full md:w-1/4 px-2 py-2">
            <div class=" bg-red-500 text-center rounded-lg shadow-xl hover:shadow-2xl transition duration-200 hover:bg-indigo-400 cursor-default ease-in p-4">
              <div class="mb-2">
                <img v-lazy-load class="inline-block" src="@/assets/images/tech/redis.svg" alt="Redis Logo" width="64">
              </div>
              <p class="text-gray-200">
                Kami menggunakan Redis juga sebagai Cache Driver, membantu
                kinerja database dalam melayani para pengguna dan meningkatkan performa.
              </p>
            </div>
          </div>

          <!-- docker -->
          <div class="w-full md:w-1/4 px-2 py-2">
            <div class=" bg-blue-400 text-center rounded-lg shadow-xl hover:shadow-2xl transition duration-200 hover:bg-indigo-400 cursor-default ease-in p-4">
              <div class="mb-2">
                <img v-lazy-load class="inline-block" src="@/assets/images/tech/docker.svg" alt="Docker Logo" width="64">
              </div>
              <p class="text-gray-200">
                Aplikasi dibungkus dalam sistem berbasis container, kami menggunakan
                docker sebagai sarana container manajer. Instalasi yang sangat mudah di server.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- section:hehe -->
    <section class="bg-blue-700">
      <div class="container mx-auto p-4">
        <div class="flex flex-wrap">
          <div class="w-full md:w-1/2 self-center">
            <h2 class="font-semibold text-4xl mb-8 text-gray-100 py-20 pr-32">
              Kenapa Menggunakan Kami?
            </h2>
          </div>
          <div class="w-full md:w-1/2 self-center p-2 md:p-10">
            <div class="bg-gray-100 shadow-xl rounded p-8">
              <h3 class="font-semibold text-2xl mb-2 text-gray-800">
                Lorem ipsum dolor sit amet.
              </h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate dolor maxime, possimus architecto neque repellendus cumque, pariatur, quam non delectus incidunt porro corporis! Incidunt a adipisci nesciunt quia suscipit optio!
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-blue-600">
        <div class="bg-blue-700 text-center p-2">
          <span class="text-gray-200">
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
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['app'])
  },
  mounted () {
  },
  head: {
    title: 'Home'
  },
  transition: 'default'
}
</script>

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
.dropdown:hover .dropdown-menu {
  display: block;
}
nav.navbar a.link {
  @apply border-b-2;
  @apply border-gray-100;
  @apply transition-all;
  @apply duration-200;
  @apply ease-in-out;
  &:hover {
    @apply border-blue-500;
  }
}
</style>
