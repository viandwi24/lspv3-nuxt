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
        route: 'accession'
      },
      {
        type: 'item',
        text: 'Asesmen Saya',
        route: 'accession-asesmen'
      },
      {
        type: 'item',
        text: 'Berkas',
        route: 'accession-berkas'
      },
      {
        type: 'item',
        text: 'Pengaturan',
        route: 'accession-pengaturan'
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
