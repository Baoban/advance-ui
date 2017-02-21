<template>
  <li class="el-sidebar-submenu" :class="{
      'is-active': active,
      'is-opened': opened
    }">
    <div class="el-sidebar-submenu__title" ref="submenu-title" :style="paddingStyle">
      <slot name="title"></slot>
      <i class="el-sidebar-submenu__icon-arrow el-icon-arrow-down"></i>
    </div>
    <collapse-transition>
      <ul class="el-sidebar" v-show="opened">
        <slot></slot>
      </ul>
    </collapse-transition>
  </li>
</template>

<script lang="babel">
  import menuMixin from './sidebar-mixin';
  import Emitter from 'advance-ui/src/mixins/emitter';
  import CollapseTransition from 'advance-ui/src/transitions/collapse-transition';

  module.exports = {
    name: 'ElSidebarSubmenu',
    componentName: 'ElSidebarSubmenu',
    mixins: [menuMixin, Emitter],
    components: {
      CollapseTransition
    },
    props: {
      index: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        timeout: null,
        items: {},
        submenus: {}
      };
    },
    computed: {
      opened() {
        return this.rootMenu.openedMenus.indexOf(this.index) > -1;
      },
      active: {
        cache: false,
        get() {
          let isActive = false;
          const submenus = this.submenus;
          const items = this.items;

          Object.keys(items).forEach(index => {
            if (items[index].active) {
              isActive = true;
            }
          });

          Object.keys(submenus).forEach(index => {
            if (submenus[index].active) {
              isActive = true;
            }
          });

          return isActive;
        }
      }
    },
    methods: {
      addItem(item) {
        this.$set(this.items, item.index, item);
      },
      removeItem(item) {
        delete this.items[item.index];
      },
      addSubmenu(item) {
        this.$set(this.submenus, item.index, item);
      },
      removeSubmenu(item) {
        delete this.submenus[item.index];
      },
      handleClick() {
        this.dispatch('ElSidebar', 'submenu-click', this);
      },
      handleMouseenter() {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.rootMenu.openMenu(this.index, this.indexPath);
        }, 300);
      },
      handleMouseleave() {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.rootMenu.closeMenu(this.index, this.indexPath);
        }, 300);
      },
      initEvents() {
        let {
          rootMenu,
          handleMouseenter,
          handleMouseleave,
          handleClick
        } = this;
        const triggerElm = this.$refs['submenu-title'];
        triggerElm.addEventListener('click', handleClick);
      }
    },
    created() {
      this.parentMenu.addSubmenu(this);
      this.rootMenu.addSubmenu(this);
    },
    beforeDestroy() {
      this.parentMenu.removeSubmenu(this);
      this.rootMenu.removeSubmenu(this);
    },
    mounted() {
      this.initEvents();
    }
  };

</script>
