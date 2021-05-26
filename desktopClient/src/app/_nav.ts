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
];
