import SidebarItem from '../sidebar/src/sidebar-item';

/* istanbul ignore next */
SidebarItem.install = function(Vue) {
  Vue.component(SidebarItem.name, SidebarItem);
};

export default SidebarItem;
