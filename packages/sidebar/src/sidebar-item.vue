<template>
  <li class="el-sidebar-item" :style="paddingStyle" @click="handleClick"
      :class="{
      'is-active': active,
      'is-disabled': disabled
    }">
    <slot></slot>
  </li>
</template>

<script lang="babel">
  import Menu from './sidebar-mixin';
  import Emitter from 'advance-ui/src/mixins/emitter';

  module.exports = {
    name: 'ElSidebarItem',
    componentName: 'ElSidebarItem',
    mixins: [Menu, Emitter],
    props: {
      index: {
        type: String,
        required: true
      },
      disabled: {
        type: Boolean,
        required: false
      }
    },
    computed: {
      active() {
        return this.index === this.rootMenu.activedIndex;
      }
    },
    methods: {
      handleClick() {
        this.dispatch('ElSidebar', 'item-click', this);
      }
    },
    created() {
      this.parentMenu.addItem(this);
      this.rootMenu.addItem(this);
    },
    beforeDestroy() {
      this.parentMenu.removeItem(this);
      this.rootMenu.removeItem(this);
    }
  };
</script>
