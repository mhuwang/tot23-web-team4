<!--
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-17 19:37:31
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-04-15 21:42:15
-->
<template>
  <div>
    <el-row style="item-align: center">
      <el-col :span="12"
        ><div
          ref="chart"
          style="height: 600px; width: 100%; border: solid 1px black"
        ></div
      ></el-col>
    </el-row>
  </div>
</template>

<script>
// import request from "@/utils/request";
export default {
  data() {
    return {};
  },

  created: function () {
    // init graph
    let chartDom = document.getElementById("echart");
    myChart = this.$echarts.init(chartDom);
  },

  mounted: function () {
    this.initEchart();
  },

  updated: function () {
    setTimeout(() => {
      myChart.setOption(option);
    }, 500);
  },

  methods: {
    initEchart: function () {
      const chart = this.$refs.chart;
      if (chart) {
        const myChart = this.$echarts.init(chart);
        // let graph = {
        //   nodes: [
        //     {
        //       id: "0",
        //       name: "master-1",
        //       symbolSize: 66,
        //       x: -87.93029,
        //       y: -6.8120565,
        //       value: "Master Node",
        //       category: 0,
        //     },
        //     {
        //       id: "1",
        //       name: "master-2",
        //       symbolSize: 66,
        //       x: 387.89572,
        //       y: 110.462326,
        //       value: "Master Node",
        //       category: 0,
        //     },
        //     {
        //       id: "2",
        //       name: "node-1",
        //       symbolSize: 50,
        //       value: "Node",
        //       category: 1,
        //     },
        //     {
        //       id: "3",
        //       name: "node-2",
        //       symbolSize: 50,
        //       x: 82.80825,
        //       y: -203.1144,
        //       value: "Node",
        //       category: 1,
        //     },
        //     {
        //       id: "4",
        //       name: "node-3",
        //       symbolSize: 50,
        //       x: 355.78366,
        //       y: -74.882454,
        //       value: "Node",
        //       category: 1,
        //     },
        //     {
        //       id: "5",
        //       name: "Pod",
        //       symbolSize: 35,
        //       x: 238.79364,
        //       y: -314.06345,
        //       value: "humi",
        //       category: 3,
        //     },
        //     {
        //       id: "6",
        //       name: "edge-1",
        //       symbolSize: 50,
        //       x: -266.82776,
        //       y: 299.6904,
        //       value: "Edge Node",
        //       category: 2,
        //     },
        //     {
        //       id: "7",
        //       name: "Pod",
        //       symbolSize: 35,
        //       x: -122.41348,
        //       y: 210.37503,
        //       value: "nginx",
        //       category: 3,
        //     },
        //     {
        //       id: "8",
        //       name: "Pod",
        //       symbolSize: 35,
        //       x: -252.99521,
        //       y: 129.87549,
        //       value: "crontab-job-1617440460-nhbdd",
        //       category: 3,
        //     },
        //     {
        //       id: "9",
        //       name: "Pod",
        //       symbolSize: 35,
        //       value: "hello-1618292280-2fppp",
        //       category: 3,
        //     },
        //     {
        //       id: "10",
        //       name: "Pod",
        //       symbolSize: 35,
        //       x: 437.939,
        //       y: 291.58234,
        //       value: "hello2-manual-bqf-xbck9",
        //       category: 3,
        //     },
        //     {
        //       id: "11",
        //       name: "Pod",
        //       symbolSize: 35,
        //       x: 597.6618,
        //       y: 135.18481,
        //       value: "pi-2-n77hl",
        //       category: 3,
        //     },
        //     {
        //       id: "12",
        //       name: "Pod",
        //       symbolSize: 35,
        //       x: 238.36697,
        //       y: -210.00926,
        //       value: "kubernetes-dashboard",
        //       category: 3,
        //     },
        //     {
        //       id: "13",
        //       name: "Pod",
        //       symbolSize: 35,
        //       x: -81.46074,
        //       y: -204.20204,
        //       value: "nginx-deployment-01-cdbc5548b-dsc6z",
        //       category: 3,
        //     },
        //     {
        //       id: "14",
        //       name: "Pod",
        //       symbolSize: 35,
        //       x: -385.2226,
        //       y: -393.5572,
        //       value: "hello2-manual-bqf-xbck10",
        //       category: 3,
        //     },
        //     {
        //       id: "15",
        //       name: "device",
        //       symbolSize: 35,
        //       x: -332.6012,
        //       y: 485.16974,
        //       value: "counter",
        //       category: 4,
        //     },
        //   ],
        //   links: [
        //     {
        //       source: "0",
        //       target: "7",
        //     },
        //     {
        //       source: "0",
        //       target: "8",
        //     },
        //     {
        //       source: "1",
        //       target: "9",
        //     },
        //     {
        //       source: "1",
        //       target: "10",
        //     },
        //     {
        //       source: "1",
        //       target: "11",
        //     },
        //     {
        //       source: "4",
        //       target: "12",
        //     },
        //     {
        //       source: "3",
        //       target: "5",
        //     },
        //     {
        //       source: "3",
        //       target: "13",
        //     },
        //     {
        //       source: "0",
        //       target: "14",
        //     },
        //     {
        //       source: "6",
        //       target: "15",
        //     },
        //   ],
        //   categories: [
        //     {
        //       name: "Master Node",
        //     },
        //     {
        //       name: "Node",
        //     },
        //     {
        //       name: "Edge Node",
        //     },
        //     {
        //       name: "Pod",
        //     },
        //     {
        //       name: "Device",
        //     },
        //   ],
        // };

        let graph = {
          nodes: [
            {
              id: "0",
              name: "master-1",
              symbolSize: 66,
              x: -100,
              y: -100,
              value: "Master Node",
              category: 0,
            },
            {
              id: "1",
              name: "master-2",
              symbolSize: 66,
              x: 0,
              y: 0,
              value: "Master Node",
              category: 0,
            },
            {
              id: "3",
              name: "Pod",
              symbolSize: 35,
              x: -2,
              y: 2,
              value: "nginx",
              category: 1,
            },
            {
              id: "4",
              name: "Pod",
              symbolSize: 35,
              x: 1,
              y: 1,
              value: "nginx-x",
              category: 1,
            },
            {
              id: "5",
              name: "Pod",
              symbolSize: 35,
              x: 1,
              y: 2,
              value: "nginx-y",
              category: 1,
            },
            {
              id: "6",
              name: "Pod",
              symbolSize: 35,
              x: 2,
              y: 3,
              value: "nginx-g",
              category: 1,
            }
          ],
          links: [
            {
              source: "3",
              target: "0",
            },
            {
              source: "4",
              target: "1",
            },
            {
              source: "5",
              target: "1",
            },
            {
              source: "6",
              target: "1",
            },
          ],
          categories: [
            {
              name: "Master Node",
            },
            {
              name: "Pod"
            }
          ],
        };

        graph.nodes.forEach(function (node) {
          node.label = {
            show: node.symbolSize > 30,
          };
        });

        let option = {
          title: {
            text: "集群节点拓扑图",
            subtext: "Default layout",
            top: "bottom",
            left: "right",
          },

          tooltip: {},
          legend: [
            {
              data: graph.categories.map(function (a) {
                return a.name;
              }),
            },
          ],
          // animationDuration: 1500,
          // animationEasingUpdate: "quinticInOut",
          series: [
            {
              type: "graph",
              layout: "none",
              data: graph.nodes,
              links: graph.links,
              categories: graph.categories,
              legendHoverLink: false,
              zoom: 0.5,
              roam: false,
              center: [0, 0],
              label: {
                show: true,
                position: "right",
                formatter: "{b}",
              },
              lineStyle: {
                color: "source",
                curveness: 0.3,
              },
              emphasis: {
                // scale: true,
                focus: "adjacency",
                blurScope: 'global',
                lineStyle: {
                  width: 10,
                },
              },
              animation: true,
              labelLayout: {
                hideOverlap: true,
              },
              // scaleLimit: {
              //   min: 0.4,
              //   max: 3,
              // },
            },
          ],
        };
        myChart.setOption(option);
      }
    },

    click: function () {
      this.$confirm("确认修改？")
        .then(() => {
          console.log("确定");
        })
        .catch(() => {
          console.log("cancel");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>