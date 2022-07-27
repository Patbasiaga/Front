<template>
<div id="mapDiv" style="width: 400px; height: 400px;"></div>
</template>

<script lang="ts" setup >

import { fromLonLat } from 'ol/proj';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { computed, ref, watch, inject, onMounted } from 'vue';
import { useTelemetryFrameStore } from '@/stores/telemetryFrameStore';

const name = ref("FlightMap");
const telemetryFrame = useTelemetryFrameStore();

const map= new Map({
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center: [0, 0],
    zoom: 14
  })
});

onMounted(()=>{
  map.setTarget('mapDiv');

  console.log(map.getView());
});

watch(
  telemetryFrame.$state,
  (state) => {
    //const newCenter = fromLonLat([telemetryFrame.lon + telemetryFrame.random_dev, telemetryFrame.lat + telemetryFrame.random_dev]);
    const newCenter = fromLonLat([telemetryFrame.lon, telemetryFrame.lat]);
    map.getView().setCenter(newCenter);
  });



const projection = ref('EPSG:3857');
const rotation = ref(0);
const zoom = ref(14);

</script>