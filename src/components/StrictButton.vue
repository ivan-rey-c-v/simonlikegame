<template>
  <button
    class="pointer flex jc-center ai-center"
    :class="{'strict-mode': isStrict}"
    @click.prevent="toggle"
  >
    <p>Strict</p>
  </button>
</template>

<script>
export default {
  name: "StrictButton",
  data() {
    return {
      isStrict: false
    };
  },

  methods: {
    toggle() {
      this.isStrict = !this.isStrict;
      this.$emit("toggle");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button {
  border: none;
  box-shadow: 0 4px 6px hsla(0, 0%, 0%, 0.2);
  border-radius: 50%;
  padding: 5px 10px;
  letter-spacing: 1px;
  font-size: 50%;
  height: 2rem;
  width: 2rem;
  transition: all 200ms;
  color: rgb(58, 44, 44);
  background-color: rgb(88, 166, 173);
}
.strict-mode {
  transform: scale(1.2);
  color: #ffffff;
  font-weight: 700;
  background-color: #ff0033;
  border: none;
}
</style>
