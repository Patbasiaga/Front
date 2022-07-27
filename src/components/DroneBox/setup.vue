
<template>
<component :is="FlightMap" :Lattitude='0' :Longitude='0'/> 
<div v-if="telemetryFrame.active" class="drone-info-box">
  <div class="headline">UAV BOX</div>
  <div class="uav-data">
    <div class="attr-row">
      <div class="attr-name">ID urządzenia</div>
      <div class="attr-value">{{telemetryFrame.device_id}}</div>
    </div>
    <div class="attr-row">
      <div class="attr-name">Typ urządzenia</div>
      <div class="attr-value">{{telemetryFrame.device_type}}</div>
    </div>
    <div class="attr-row">
      <div class="attr-name">Typ ramki</div>
      <div class="attr-value">{{telemetryFrame.frame_type}}</div>
    </div>
    <div class="attr-row">
      <div class="attr-name">Wersja ramki</div>
      <div class="attr-value">{{telemetryFrame.frame_version}}</div>
    </div>
    <div class="attr-row">
      <div class="attr-name">Wysokość</div>
      <div class="attr-value">{{telemetryFrame.alt}}</div>
    </div>
    <div class="attr-row">
      <div class="attr-name">Prędkość względem ziemi</div>
      <div class="attr-value">{{telemetryFrame.ground_speed}}</div>
    </div>
    <div class="attr-row">
      <div class="attr-name">Bieżące zużycie baterii</div>
      <div class="attr-value">{{telemetryFrame.battery_current_consumed}}</div>
    </div>

    <div class="attr-row">
      <div class="attr-name">Znacznik czasu wysłania</div>
      <div class="attr-value">{{telemetryFrame.timestamp}}</div>
    </div>
    <div class="attr-row">
      <div class="attr-name">Czas wysłania po konwersji</div>
      <div class="attr-value">{{customFormat(telemetryFrame.timestamp)}}</div>
    </div>
    <div class="attr-row">
      <div class="attr-name">Czas dotarcia</div>
      <div class="attr-value">{{customFormat(Date.now())}}</div>
    </div>
    <div class="attr-row">
      <div class="attr-name">Lag</div>
      <div class="attr-value">{{Date.now()-telemetryFrame.timestamp}}</div>
    </div>
  </div>
</div>
<div v-if="telemetryFrame.active" class="drone-control-box">
  <Attitude class="indicator" :size="200" :roll="telemetryFrame.roll/Math.PI*180" :pitch="telemetryFrame.pitch/Math.PI*180"/>
  <Heading class="indicator" :size="200" :heading="telemetryFrame.head/100" />
  <Variometer class="indicator" :size="200" :vario="0" />
  <Airspeed class="indicator" :size="200" :airspeed="telemetryFrame.ground_speed/100" />
  <Altimeter class="indicator" :size="200" :altitude="telemetryFrame.relative_alt/100" :pressure="3500" />
</div>
</template>
<style src="./style.scss" lang="scss">
</style>

<script lang="ts" setup>

import { ref } from "vue";
import FlightMap from '@/components/FlightMap/setup.vue';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { Airspeed, Attitude, Heading, Variometer, Altimeter } from 'vue-flight-indicators';
import { useTelemetryFrameStore } from '@/stores/telemetryFrameStore';

const name = ref("DroneBox");

const telemetryFrame = useTelemetryFrameStore();
//const dateNow = computed(() => );

const connection = new HubConnectionBuilder()
  .withUrl('https://localhost:5051/mqtt_hub')
  .configureLogging(LogLevel.Information)
  .withAutomaticReconnect()
  .build()

connection.on("mqtt_frame", data => {
  try {
    const newData = JSON.parse(data);
    Object.assign(telemetryFrame, newData);
    telemetryFrame.active= true;
    telemetryFrame.random_dev+= 0.001;
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.log(error);
  }
});

connection.on("mqtt_fast", data => {
  try {
    const newData = JSON.parse(data);
    newData.relative_alt = newData.alt;
    telemetryFrame.active= true;
    delete newData.alt;
    Object.assign(telemetryFrame, newData);
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.log(error);
  }
});

function customFormat(timestamp: number): string {
  let date: Date = new Date(timestamp);
  return ''
    + date.getFullYear()
    + '-' + (date.getMonth() + 1).toString().padStart(2, "0")
    + '-' + date.getDate().toString().padStart(2, "0") + ' '
    + date.getHours().toString().padStart(2, "0") + ':'
    + date.getMinutes().toString().padStart(2, "0") + ':'
    + date.getSeconds().toString().padStart(2, "0") + '.'
    + date.getMilliseconds().toString().padStart(3, "0");
}

connection.start();




</script>