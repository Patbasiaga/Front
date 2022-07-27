<template src="./template.html"></template>
<style src="./style.scss" lang="scss"></style>

<script lang ="ts">
import { defineComponent, onMounted, ref, Ref } from "vue";
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'

export default
  defineComponent({
    name: "Navigation",
    watch: {

    },
    setup() {
      const mobile = ref(false);
      const mobileNav = ref(false);
      const windowWidth = ref(null) as unknown as Ref<number>;
      const scrollNav = ref(false);

      function toggleMobileNav() {
        mobileNav.value = !mobileNav.value;
        console.log('Jest click ' + mobileNav.value);
      }

      function checkWidth() {
        windowWidth.value = window.innerWidth;
        if (windowWidth.value <= 750) {
          mobile.value = true;
        } else {
          mobile.value = false;
          mobileNav.value = false;
        }
      }

      function updateScroll() {
        const scrollPosition = window.scrollY;
        if (scrollPosition > 50) {
          scrollNav.value = true;
          return;
        }
        scrollNav.value = false;
      }

      onBeforeRouteLeave( (to,from)=> {
        mobileNav.value = false;
      })

      window.addEventListener('resize', checkWidth);
      window.addEventListener('scroll', updateScroll);

      return {
        mobile,
        mobileNav,
        toggleMobileNav,
        scrollNav,
        updateScroll
      }
    }
  });
</script>
