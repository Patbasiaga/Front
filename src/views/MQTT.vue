<template>
  <div class="main-content">
    <div class="mqtt-status-box">
      Odpowiedź endpointa: {{ mqttStatus }}
    </div>
    <component :is="DroneBox"/>
  </div>
</template>
<style src="./mainContent.scss" lang="scss"></style>

<script lang="ts">

import DroneBox from '@/components/DroneBox/setup.vue'
import { defineComponent, ref, Ref, defineAsyncComponent, watch, Component, onMounted } from "vue";
import axios from 'axios'

export default
  defineComponent({
    setup() {
      const mqttStatus = ref(null);

      axios("https://localhost:5051/api/MqttStatus")
        .then(data => mqttStatus.value = data.data)

      return { mqttStatus, DroneBox }
    }
  });

</script>


