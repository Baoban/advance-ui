<template>
  <div class="headerWrapper">
    <header class="header" ref="header" :style="headerStyle" :class="{ 'header-home': isHome }">
      <div class="container">
        <h1>
          <router-link to="/">Advance UI</router-link>
        </h1>
        <ul class="nav">
          <li class="nav-item">
            <router-link active-class="active" to="/component">Components</router-link>
          </li>
        </ul>
      </div>
    </header>
  </div>
</template>

<script lang="babel">
  export default {
    data() {
      return {
        active: '',
        isHome: false,
        headerStyle: {}
      };
    },
    watch: {
      '$route.path': {
        immediate: true,
        handler() {
          this.isHome = /^home/.test(this.$route.name);
          this.headerStyle.backgroundColor = `rgba(115, 188, 57, ${ this.isHome ? '0' : '1' })`;
        }
      }
    },
    mounted() {
      function scroll (fn) {
        window.addEventListener('scroll', () => {
          fn();
        }, false);
      }

      scroll(() => {
        if (this.isHome) {
          const threshold = 200;
          let alpha = Math.min(document.body.scrollTop, threshold) / threshold;
          this.$refs.header.style.backgroundColor = 'rgba(32, 160, 255, ${ alpha })';
        }
      });
    }
  };
</script>

<style lang="postcss" scoped>
  .headerWrapper {
    height: 80px;
  }

  .header {
    height: 80px;
    background-color: #71BE2D;
    color: #fff;
    top: 0;
    left: 0;
    width: 100%;
    /*line-height: @height;*/
    z-index: 100;
    position: relative;

    .container {
      height: 100%;
      box-sizing: border-box;
    }

    h1 {
      padding-top: 20px;
      margin: 0;
      float: left;
      font-size: 32px;
      font-weight: normal;

      a {
        color: #fff;
        text-decoration: none;
        display: block;
      }

      span {
        font-size: 12px;
        display: inline-block;
        width: 34px;
        height: 18px;
        border: 1px solid rgba(255, 255, 255, .5);
        text-align: center;
        line-height: 18px;
        vertical-align: middle;
        margin-left: 10px;
        border-radius: 3px;
      }
    }
    .nav {
      float: right;
      height: 100%;
      line-height: 80px;
      background: transparent;
      @utils-clearfix ;
      padding: 0;
      margin: 0;
    }
    .nav-logo,
    .nav-logo-small {
      vertical-align: sub;
    }
    .nav-logo-small {
      display: none;
    }
    .nav-item {
      margin: 0;
      float: left;
      list-style: none;
      position: relative;
      cursor: pointer;
      margin-left: 20px;

      &:last-child {
        cursor: default;
        margin-left: 34px;
        span {
          opacity: .8;
        }

        .nav-lang {
          cursor: pointer;
          display: inline-block;
          height: 100%;
          &:hover {
            opacity: 1;
          }
          &.active {
            font-weight: 700;
            opacity: 1;
          }
        }
      }

      a {
        text-decoration: none;
        color: #fff;
        display: block;
        padding: 0 20px;
        opacity: .8;
        &.active,
        &:hover {
          opacity: 1;
        }

        &.active {
          font-weight: 700;
        }

        &.active::before {
          content: '';
          display: block;
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: #71BE2D;
        }
      }
    }
  }

  .header-home {
    position: fixed;
    top: 0;
    background-color: #71BE2D;
  }

  @media (max-width: 850px) {
    .header {
      .nav-logo {
        display: none;
      }
      .nav-logo-small {
        display: inline-block;
      }
      .nav-item {
        margin-left: 6px;

        &:last-child {
          margin-left: 10px;
        }

        a {
          padding: 0 5px;
        }
      }
    }
  }

  @media (max-width: 700px) {
    .header {
      .container {
        padding: 0 12px;
      }
      .nav-item a,
      .nav-lang {
        font-size: 12px;
        vertical-align: top;
      }
    }
  }
</style>
