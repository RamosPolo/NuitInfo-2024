<template>
  <div :style="targetStyle" class="target"></div>
</template>

<script>
export default {
  props: ['x', 'y'],
  computed: {
    targetStyle() {
      return {
        position: 'absolute',
        left: `${this.x}px`,
        top: `${this.y}px`,
        width: '50px',
        height: '50px',
        background: 'yellow',
        borderRadius: '50%',
        border: '2px solid black',
      };
    },
  },
};
</script>

<style>
.target {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
</style>