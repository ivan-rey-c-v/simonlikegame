<template>
  <div
    class="relative flex jc-center ai-center pointer box a-shape"
    :style="{color: color}"
    @click="onClick"
  >
    <div
      class="absolute top-0 left-0 h-full w-full circle"
    >
    </div>

    <p v-html="entity" class="f1 entity"></p>

  </div>
</template>

<script>
import {sleep} from '../utils/utils.js';

export default {
  name: 'IconImage',
  props: {
    entity: {
      type: String,
      default: 'box'
    },
    color: {
      type: String,
      default: 'gray'
    },
    index : {
      type: Number
    }
  },

  methods: {
    onClick() {
      this.$emit('onClick', this.index)
    }
  }
}
</script>

<style scoped>
.box {
  height: 3rem; width: 3rem;
}

@media screen and (min-width: 450px){
  .box {
    height: 4rem; width: 4rem
  }

}

.circle {
  opacity: 1;
  border-radius: 50%;
  border: 4px solid currentColor;
}

.animate > .circle {
  transition: all 300ms;
  animation: 1000ms ease-in-out ring;
  animation-fill-mode: forwards
}
.animate > p {
  transition: all 300ms;
  animation: 1000ms ease-in-out show-icon;
  animation-fill-mode: forwards
}
.on-click-true > .circle {
  transition: all 100ms;
  animation: 600ms ease-in-out onClickTrue;
  animation-fill-mode: forwards
}
.on-click-false > .circle {
  transition: all 100ms;
  animation: 600ms ease-in-out onClickFalse;
  animation-fill-mode: forwards
}

@keyframes ring {
  0% {
    opacity: 0;
  }
  20% {
    opacity: 0;
    transform: scale(0);
    background-color: currentColor
  }
  30% {
    background-color: currentColor;
    transform: scale(1);
    opacity: .75;
  }
  50% {
    opacity: 1;
    background-color: transparent
  }
  60% {
    opacity: 0;
  }
  100% {
    opacity: 0
  }
}

@keyframes show-icon {
  0% {
    transform: scale(0)
  }
  30% {
    transform: scale(0)
  }
  40% {
    transform: scale(1.20)
  }
  47% {
    transform: scale(1)
  }
  100% {
    transform: scale(1)
  }
}

@keyframes onClickTrue {
  0% {
    transform: scale(0)
  }
  30% {
    transform: scale(1.50);
    background-color: currentColor
  }
}
@keyframes onClickFalse {
  0% {
    transform: scale(0)
  }
  20% {
    transform: scale(1.30) translateX(4px);
    background-color: #ff00558f
  }
  25% {
    transform: scale(1.20) translateX(-8px);
    background-color: #ff00558f
  }
  30% {
    transform: scale(1) translateX(8px);
    background-color: #ff00558f
  }
  35% {
    transform: scale(1) translateX(-8px);
    background-color: #ff00558f
  }
}

</style>
