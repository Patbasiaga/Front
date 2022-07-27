import { defineStore } from "pinia";

export const useTelemetryFrameStore = defineStore({
  id: 'telemetryFrame',
  state: () => ({
    active: false,
    frame_type: -1,
    frame_version: -1,
    device_id: -1,
    device_type: -1,
    ground_speed: 0,
    lon: 0,
    lat: 0,
    roll: 0,
    pitch: 0,
    head: 0,
    alt: 0,
    relative_alt: 0,
    timestamp: 0,
    battery_current_consumed: 0,
    random_dev: 0
  }),
  getters: {
  }
     
  
});