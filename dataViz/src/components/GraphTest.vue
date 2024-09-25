<template>
  <div style="width:600px;">
    <VueUiQuickChart
      :dataset="dataset"
      :config="config"
    />
  </div>
</template>


<script setup>
  import { ref } from "vue";
  import { VueUiQuickChart } from "vue-data-ui";
  import "vue-data-ui/style.css";

  const dataset = ref([1, 2, -3, 5, 25, 8, 4]);

  const config = ref({ 
    "responsive": false,
    "backgroundColor": "#fff",
    "barAnimated": true,
    "barGap": 12,
    "barStrokeWidth": 1,
    "blurOnHover": true,
    "chartIsBarUnderDatasetLength": 12,
    "color": "#2c2c2c",
    "dataLabelFontSize": 14,
    "dataLabelRoundingPercentage": 1,
    "dataLabelRoundingValue": 1,
    "donutHideLabelUnderPercentage": 3,
    "donutLabelMarkerStrokeWidth": 1,
    "donutRadiusRatio": 0.4,
    "donutShowTotal": true,
    "donutStrokeWidth": 2,
    "donutThicknessRatio": 0.18,
    "donutTotalLabelFontSize": 24,
    "donutTotalLabelOffsetY": 0,
    "donutTotalLabelText": "Total",
    "donutUseShadow": false,
    "donutShadowColor": "#1A1A1A",
    "fontFamily": "inherit",
    "height": 338,
    "legendFontSize": 12,
    "legendIcon": "circleFill",
    "legendIconSize": 12,
    "lineAnimated": true,
    "lineSmooth": true,
    "lineStrokeWidth": 2,
    "paletteStartIndex": 0,
    "showDataLabels": true,
    "showLegend": true,
    "showTooltip": true,
    "showUserOptions": true,
    "userOptionsButtons": { "tooltip": true, "pdf": true, "img": true, "fullscreen": true },
    "userOptionsButtonTitles": { "open": "Open options", "close": "Close options", "tooltip": "Toggle tooltip", "pdf": "Download PDF", "img": "Download PNG", "fullscreen": "Toggle fullscreen" },
    "title": "Tempo Médio de Contratação",
    "titleBold": true,
    "titleFontSize": 16,
    "titleTextAlign": "center",
    "tooltipCustomFormat": null,
    "tooltipBorderRadius": 4,
    "tooltipBorderColor": "#3A3A3A",
    "tooltipBorderWidth": 1,
    "tooltipFontSize": 14,
    "tooltipBackgroundOpacity": 100,
    "useCustomLegend": false,
    "valuePrefix": "",
    "valueSuffix": "",
    "width": 512,
    "xyAxisStroke": "#4A4A4A",
    "xyAxisStrokeWidth": 1,
    "xyGridStroke": "#5A5A5A",
    "xyGridStrokeWidth": 0.5,
    "xyHighlighterColor": "#FFFFFF",
    "xyHighlighterOpacity": 0.05,
    "xyLabelsXFontSize": 8,
    "xyLabelsYFontSize": 12,
    "xyPaddingBottom": 48,
    "xyPaddingLeft": 48,
    "xyPaddingRight": 12,
    "xyPaddingTop": 24,
    "xyPeriods": ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
    "xyPeriodLabelsRotation": 0,
    "xyScaleSegments": 10,
    "xyShowAxis": true,
    "xyShowGrid": true,
    "xyShowScale": true,
    "yAxisLabel": "Quantity",
    "xAxisLabel": "Time",
    "axisLabelsFontSize": 12,
    "zoomXy": true,
    "zoomColor": "#CCCCCC",
    "zoomHighlightColor": "#4A4A4A",
    "zoomFontSize": 14,
    "zoomUseResetSlot": false
  });
</script>
