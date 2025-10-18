import {
  Bell,
  ChartColumn,
  ChevronRight,
  CircleQuestionMark,
  DollarSign,
  LayoutDashboard,
  Megaphone,
  Ticket,
  TrendingUp,
  Trophy,
  User,
} from 'lucide-angular';

export interface MenuItem {
  id: string;
  label: string;
  icon: any;
  link?: string;
  badge?: number;
  subSections?: boolean;
  secondIcon?: any;
}

const menuData: MenuItem[] = [
  { id: 'dashboard',    label: 'Dashboard',         icon: LayoutDashboard,    link: '/dashboard/admin' },
  { id: 'raffles',      label: 'Rifas',             icon: Ticket,             link: '/dashboard/admin/', badge: 5 },
  { id: 'users',        label: 'Usuarios',          icon: User,               link: '/dashboard/admin/' },
  { id: 'afiliates',    label: 'Afiliados',         icon: TrendingUp,         link: '/dashboard/admin/' },
  { id: 'transactions', label: 'Transacciones',     icon: DollarSign,         link: '/dashboard/admin/', badge: 12 },
  { id: 'winners',      label: 'Ganadores',         icon: Trophy,             link: '/dashboard/admin/' },
  { id: 'marketing',    label: 'Marketing',         icon: Megaphone,          link: '/dashboard/admin/' },
  { id: 'reports',      label: 'Reportes',          icon: ChartColumn,        link: '/dashboard/admin/' },
  { id: 'notify',       label: 'Notificaciones',    icon: Bell,               link: '/dashboard/admin/' },
  { id: 'config',       label: 'Configuracion',     icon: CircleQuestionMark, subSections: true },
];

const configItems: MenuItem[] = [
  { id: 'lists',        label: 'Listas',            icon: CircleQuestionMark, link: '/dashboard/admin/lists' }
];

export const sideItems: MenuItem[] = menuData.map(item => {
  if (item.subSections) {
    return {
      ...item,
      secondIcon: item.secondIcon || ChevronRight
    };
  }
  return item;
});

export function subSectionsItems( subSectionType : string ){
  switch (subSectionType) {
    case "config":
      return configItems;
  }
  return null;
}
