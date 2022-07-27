<template>
  <router-view name="navigation"></router-view>
  <router-view name="content"></router-view>
</template>

<script lang="ts">
import { createApp, ref, defineComponent, watch, Ref } from 'vue'
import router from "@/router/router";
import { RouteLocationNormalized } from 'vue-router';


export default
  defineComponent({
    name: "App",
    setup() {
      let authenticationRequired = ref(router.currentRoute.value.meta ? true : router.currentRoute.value.meta);

      watch(router.currentRoute, (currentValue) => {
        console.log(isAuthenticationRequired(currentValue));
      })
      return { authenticationRequired }
    },
    components: {
    }
  });

function isAuthenticationRequired(metaRef: RouteLocationNormalized): boolean {
  const key = "authenticationRequired";
  if (!metaRef ||
    !metaRef.meta ||
    Object.prototype.hasOwnProperty.call(metaRef.meta, key)) {
    return true;
  }
  return metaRef.meta[key] as boolean;
}
</script>