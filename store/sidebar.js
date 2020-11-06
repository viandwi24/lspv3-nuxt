export const state = () => ({
  sidebarMenu: {
    admin: [
      {
        type: 'item-header',
        text: 'Menu'
      },
      {
        type: 'item',
        text: 'Dashboard',
        route: 'admin'
      },
      {
        type: 'item',
        text: 'Kategori',
        route: 'admin-kategori'
      },
      {
        type: 'item',
        text: 'Tuk',
        route: 'admin-tuk'
      },
      {
        type: 'item',
        text: 'Jadwal',
        route: 'admin-jadwal'
      },
      {
        type: 'item',
        text: 'Skema',
        route: 'admin-skema'
      },
      {
        type: 'item-header',
        text: 'User'
      },
      {
        type: 'item',
        text: 'Asesi',
        route: 'admin-user-asesi'
      },
      {
        type: 'item',
        text: 'Asesor',
        route: 'admin-user-asesor'
      }
    ],
    accession: [
      {
        type: 'item-header',
        text: 'Menu'
      },
      {
        type: 'item',
        text: 'Dashboard',
        route: 'asesi'
      },
      {
        type: 'item',
        text: 'Daftar Skema',
        route: 'asesi-daftar-skema'
      },
      {
        type: 'item',
        text: 'Asesmen Saya',
        route: 'asesi-asesmen'
      },
      {
        type: 'item',
        text: 'Berkas',
        route: 'asesi-berkas'
      },
      {
        type: 'item',
        text: 'Pengaturan',
        route: 'asesi-pengaturan'
      }
    ],
    asesor: [
      {
        type: 'item-header',
        text: 'Menu'
      },
      {
        type: 'item',
        text: 'Dashboard',
        route: 'dashboard'
      }
    ]
  }
})
