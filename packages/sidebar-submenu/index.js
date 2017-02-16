import SidebarSubmenu from '../sidebar/src/sidebar-submenu';

/* istanbul ignore next */
SidebarSubmenu.install = function(Vue) {
  Vue.component(SidebarSubmenu.name, SidebarSubmenu);
};

export default SidebarSubmenu;
