<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    resume: {
      type: String,
      required: true
    }
  }
}
</script>

<template>
  <div class="card">
    <div v-if="imageUrl">
      <img :src="imageUrl" alt="Card Image" class="card-image" />
    </div>

    <div class="card-content">
      <h2 class="card-title">{{ title }}</h2>

      <canvas id="myChart" aria-label="Chart Display" role="img"></canvas>

      <div v-if="description">
        <p class="card-description">{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid var(--sombra_cinza-pro4tech);
  border-radius: 8px;
  padding: 16px;
  margin-right: 1rem;
  margin-bottom: 1rem;
  text-align: left;
  background: var(--branco2-pro4tech);
  max-width: 100%;
  max-height: 100%;
}

canvas {
  max-width: 100%;
  max-height: 80%;
}

.card-image {
  width: 100%;
  height: auto;
  border-radius: var(--raio_border-default);
  margin-bottom: 8px;
}

.card-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
  color: var(--vt-c-black-mute);
}

.card-description {
  font-size: 14px;
  color: var(--vt-c-text-light-1);
}
</style>
