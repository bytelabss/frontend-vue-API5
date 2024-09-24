<script>
import Chart from 'chart.js/auto'
import { onMounted, onUnmounted, ref, watch } from 'vue'

export default {
  props: {
    imageUrl: {
      type: String,
      required: false
    },
    chartData: {
      type: Object,
      required: false,
      default: () => ({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'My First dataset',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45]
          }
        ]
      })
    },
    chartType: {
      type: String,
      required: false,
      default: 'pie'
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    }
  },
  setup(props) {
    const chartInstance = ref(null)

    const createChart = () => {
      const ctx = document.getElementById('myChart').getContext('2d')
      chartInstance.value = new Chart(ctx, {
        type: props.chartType,
        data: props.chartData,
        options: {}
      })
    }

    const destroyChart = () => {
      if (chartInstance.value) {
        chartInstance.value.destroy()
        chartInstance.value = null
      }
    }

    onMounted(() => {
      createChart()
    })

    onUnmounted(() => {
      destroyChart()
    })

    // Watch for changes in chartData or chartType and recreate the chart
    watch(
      () => [props.chartData, props.chartType],
      () => {
        destroyChart()
        createChart()
      },
      { deep: true } // Deep watching for nested object changes
    )
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

      <div class="chart-container">
        <canvas id="myChart" aria-label="Chart Display" role="img"></canvas>
      </div>

      <div v-if="description">
        <p class="card-description">{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-top-cards {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 30px;
}

@media (max-width: 768px) {
  .dashboard-top-cards {
    flex-direction: column;
  }
}

.card {
  border: 1px solid var(--sombra_cinza-pro4tech);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 3vh;
  text-align: left;
  background: var(--branco2-pro4tech);
  min-height: 5vh;
  max-height: 45vh;
  min-width: 10vw;
  max-width: 90vw;
}

.chart-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px; /* Ajuste conforme necessário */
}

canvas {
  max-width: 100%;
  max-height: 100%;
}

.card-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
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

@media (min-width: 1024px) {
  .card {
    min-width: 50vw;
    max-width: 80vw;
    text-align: left;
  }
}
</style>
