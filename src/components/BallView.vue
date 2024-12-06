<template>
  <div 
    :style="ballStyle" 
    class="ball" 
    @mousedown="startDrag"
    @mouseup="stopDrag"
    @mousemove="dragBall"
  ></div>
</template>

<script>
export default {
  props: ['x', 'y', 'dragging'],
  data() {
    return {
      draggingState: false,
    };
  },
  computed: {
    ballStyle() {
      return {
        position: 'absolute',
        left: `${this.x}px`,
        top: `${this.y}px`,
        width: '50px',
        height: '50px',
        background: 'red',
        borderRadius: '50%',
        cursor: this.draggingState ? 'grabbing' : 'grab',
      };
    },
  },
  methods: {
    startDrag() {
      this.draggingState = true;
      this.$emit('update', { x: this.x, y: this.y });
    },
    stopDrag() {
      if (this.draggingState) {
        this.$emit('launch', { x: this.x, y: this.y });
      }
      this.draggingState = false;
      this.$emit('stop-drag');
    },
    dragBall(event) {
      if (this.draggingState) {
        this.$emit('update', { 
          x: event.clientX - 25, // Ajuste pour centrer
          y: event.clientY - 25 
        });
      }
    },
  },
};
</script>

<style>
.ball {
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
}
</style>