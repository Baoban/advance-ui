<template>
  <ul class="el-sidebar">
    <slot></slot>
  </ul>
</template>

<script lang="babel">
  import emitter from 'advance-ui/src/mixins/emitter';

  export default {
    name: 'ElSidebar',
    componentName: 'ElSidebar',
    mixins: [emitter],
    props: {
      defaultActive: {
        type: String,
        default: ''
      },
      defaultOpeneds: Array,
      uniqueOpened: Boolean,
      router: Boolean,
    },
    data() {
      return {
        activedIndex: this.defaultActive,
        openedMenus: this.defaultOpeneds ? this.defaultOpeneds.slice(0) : [],
        items: {},
        submenus: {}
      };
    },
    watch: {
      '$route'(to, from) {
        if (this.router === false) {
          return
        }
        this.activedIndex = to.path
      },
      defaultActive(value) {
        const item = this.items[value];
        if (!item) return;

        this.activedIndex = item.index;
        this.initOpenedMenu();
      },
      defaultOpeneds(value) {
        this.openedMenus = value;
      },
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
      openMenu(index, indexPath) {
        let openedMenus = this.openedMenus;
        if (openedMenus.indexOf(index) !== -1) {
          return;
        }
        if (this.uniqueOpened) {
          this.openedMenus = openedMenus.filter(index => {
            return indexPath.indexOf(index) !== -1;
          });
        }
        this.openedMenus.push(index);
      },
      closeMenu(index, indexPath) {
        this.openedMenus.splice(this.openedMenus.indexOf(index), 1);
      },
      handleSubmenuClick(submenu) {
        const { index, indexPath } = submenu;
        let isOpened = this.openedMenus.indexOf(index) !== -1;

        if (isOpened) {
          this.closeMenu(index, indexPath);
          this.$emit('close', index, indexPath);
        } else {
          this.openMenu(index, indexPath);
          this.$emit('open', index, indexPath);
        }
      },
      handleItemClick(item) {
        this.activedIndex = item.index;
        if (this.router) {
          this.routeToItem(item);
        }
      },
      initOpenedMenu() {
        const index = this.activedIndex;
        const activeItem = this.items[index];
        if (activeItem) {
          const indexPath = activeItem.indexPath;
          indexPath.forEach(index => {
            let submenu = this.submenus[index];
            submenu && this.openMenu(index, submenu.indexPath);
          });
        }
      },
      routeToItem(item) {
        try {
          this.$router.push(item.index);
        } catch (e) {
          console.error(e);
        }
      }
    },
    mounted() {
      this.initOpenedMenu();
      this.$on('item-click', this.handleItemClick);
      this.$on('submenu-click', this.handleSubmenuClick);
    }
  };


</script>
