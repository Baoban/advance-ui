<template>
  <transition name="dialog-fade">
    <div class="el-dialog__wrapper" v-show="visible" @click.self="handleWrapperClick" v-on:scroll="handleScroll">
      <div
        class="el-dialog"
        :class="[sizeClass, customClass]"
        ref="dialog"
        :style="style">
        <div class="el-dialog__header">
          <span class="el-dialog__title">{{title}}</span>
          <div class="el-dialog__close" @click='close()'>
            <i v-if="showClose" class="el-icon el-icon-close"></i>
          </div>
        </div>
        <div class="el-dialog__body" v-if="rendered">
          <slot></slot>
        </div>
        <div class="el-dialog__footer" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="babel">
  import Popup from 'advance-ui/src/utils/popup';

  export default {
    name: 'ElDialog',

    mixins: [Popup],

    props: {
      title: {
        type: String,
        default: ''
      },

      modal: {
        type: Boolean,
        default: true
      },

      lockScroll: {
        type: Boolean,
        default: true
      },

      closeOnClickModal: {
        type: Boolean,
        default: true
      },

      closeOnPressEscape: {
        type: Boolean,
        default: true
      },

      showClose: {
        type: Boolean,
        default: true
      },

      size: {
        type: String,
        default: 'small'
      },

      customClass: {
        type: String,
        default: ''
      },

      top: {
        type: String,
        default: '15%'
      }
    },
    data() {
      return {
        visible: false,
      };
    },

    watch: {
      value(val) {
        this.visible = val;
      },
      visible(val) {
        this.$emit('input', val);
        if (val) {
          this.$emit('open');
          this.$nextTick(() => {
            this.$refs.dialog.scrollTop = 0;
          });
        } else {
          this.$emit('close');
        }
      }
    },

    computed: {
      sizeClass() {
        return `el-dialog--${ this.size }`;
      },
      style() {
        return this.size === 'full' ? {} : { 'margin-bottom': '50px', 'top': this.top };
      }
    },

    methods: {
      handleWrapperClick() {
        if (this.closeOnClickModal) {
          this.close();
        }
      },
      handleScroll(e) {
        const dialogElement = e.srcElement.childNodes[0]
        const top = parseInt(window.getComputedStyle(dialogElement).top, 10)
        const gapY = top - e.srcElement.scrollTop
        const closeElement = e.srcElement.getElementsByClassName('el-dialog__close')[0]
        if (gapY > 0) {
          // in viewport
          closeElement.style.top = '0px'
        } else {
          // out of viewport
          closeElement.style.top = `${Math.abs(gapY)}px`
        }
      },
    },
    mounted() {
      if (this.value) {
        this.rendered = true;
        this.open();
      }
    },
  };
</script>
