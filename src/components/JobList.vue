<template>
  <div class="job-list">
    <p>Ordered by {{ order }}</p>
    <transition-group name="list" tag="ul">
      <li v-for="job in orderedJobs" :key="job.id">
        <h2>{{ job.title }} in {{ job.location }}</h2>
        <div class="salary">{{ job.salary }}</div>
      </li>
    </transition-group>
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent, PropType } from 'vue'
import Job from '@/types/job'
import OrderTerm from '@/types/OrderTerm'

export default defineComponent({
  props: {
    jobs: {
      required: true,
      type: Array as PropType<Job[]>
    },
    order: {
      required: true,
      type: String as PropType<OrderTerm>
    }
  },
  setup(props) {
    const orderedJobs = computed(
      () => {
        return [...props.jobs].sort(
          (a: Job, b: Job) => {
            return a[props.order] > b[props.order] ? 1 : -1;
          }
        )
      }
    );
    return { orderedJobs };
  }
});
</script>

<style>
.list-move {
  transition: all 1s;
}
</style>