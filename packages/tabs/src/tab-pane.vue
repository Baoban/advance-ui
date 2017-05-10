<script>
  module.exports = {
    name: 'ElTabPane',

    componentName: 'ElTabPane',

    props: {
      method: String, // 'if' 'show'
      label: String,
      labelContent: Function,
      name: String,
      closable: Boolean,
      disabled: Boolean
    },
    render(h) {
      if (this.method === 'if') {
        if (this.active) {
          return h('div', {
            'class': {
              'el-tab-pane': true,
            },
          }, this.$slots.default)
        }
      }
      return h('div', {
        'class': {
          'el-tab-pane': true,
        },
        directives: [{
          name: 'show',
          value: this.active,
          expression: 'active',
        }],
      }, this.$slots.default)
    },

    data() {
      return {
        index: null
      };
    },

    computed: {
      isClosable() {
        return this.closable || this.$parent.closable;
      },
      active() {
        return this.$parent.currentName === (this.name || this.index);
      }
    },

    mounted() {
      this.$parent.addPanes(this);
    },

    destroyed() {
      if (this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
      }
      this.$parent.removePanes(this);
    },

    watch: {
      label() {
        this.$parent.$forceUpdate();
      }
    }
  };
</script>
