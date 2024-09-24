<template>
  <div style="width:600px;">
    <VueDataUi
      component="VueUiVerticalBar"
      :dataset="dataset"
      :config="config"
    />
  </div>
</template>


<script setup>
  import { ref } from "vue";
  import { VueDataUi } from "vue-data-ui";
  import "vue-data-ui/style.css";

  const dataset = ref([
    {
        name: "Serie 1",
        value: 100,
        children: [
        {
            name: "serie 1 child 1",
            value: 80
        },
        {
            name: "serie 1 child 2",
            value: 20
        },
        ]
    },
    {
        name: "Serie 2",
        value: 345,
    },
    {
        name: "Serie 3",
        value: 210,
    },
    {
        name: "Serie 4",
        value: 188,
    },
    {
        name: "Serie 5",
        value: 120,
        children: [
        {
            name: "Serie 5 child 1",
            value: 60,
        },
        {
            name: "Serie 5 child 2",
            value: 20,
        },
        {
            name: "Serie 5 child 3",
            value: 40,
        },
        ]
    }
]);
  const config = ref({});
</script>
