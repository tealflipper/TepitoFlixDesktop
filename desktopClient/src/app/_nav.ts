import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    name: 'Pelicula',
    url: '/pelicula',
    icon: 'cil-asterisk-circle',
    children: [
      {
        name: 'Consultar Peliculas',
        url: '/pelicula/pelicula-list',
        icon: 'cil-filter'
      },
      {
        name: 'Agregar Pelicula',
        url: '/pelicula/pelicula-edit/0',
        icon: 'cil-factory'
      }
    ]
  },
  /*
  {
    name: 'Download CoreUI',
    url: 'http://coreui.io/angular/',
    icon: 'icon-cloud-download',
    class: 'mt-auto',
    variant: 'success',
    attributes: { target: '_blank', rel: 'noopener' }
  },
  
  {
    name: 'Try CoreUI PRO',
    url: 'http://coreui.io/pro/angular/',
    icon: 'icon-layers',
    variant: 'danger',
    attributes: { target: '_blank', rel: 'noopener' }
  }
  */
];
