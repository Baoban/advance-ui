import SidebarGroup from '../sidebar/src/sidebar-group';

/* istanbul ignore next */
SidebarGroup.install = function(Vue) {
  Vue.component(SidebarGroup.name, SidebarGroup);
};

export default SidebarGroup;
