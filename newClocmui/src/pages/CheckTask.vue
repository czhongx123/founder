<template>
    <div class="page-wrapper">
        <Card>
            <Form :model="formItemCharts" :label-width="80">
                <Row :gutter="10">
                    <Col span="4">
                    <Select v-model="formItemCharts.select" :on-change="changeItem">
                        <Option value="1">全部客服组</Option>
                        <Option value="2">全部客服人员</Option>
                    </Select>
                    </Col>
                    <Col span="10" v-if="formItemCharts.moduleType=='年'">
                    <DatePicker type="year" :clearable=false v-model="formItemCharts.doTime" placeholder="选择年"
                                style="width: 200px"></DatePicker>
                    </Col>
                    <Col span="10" v-if="formItemCharts.moduleType=='月'">
                    <DatePicker type="month" :clearable=false v-model="formItemCharts.doTime" placeholder="选择月"
                                style="width: 200px"></DatePicker>
                    </Col>
                    <Col span="7">
                    <RadioGroup v-model="formItemCharts.moduleType" type="button"
                                :on-change="changeRadio(formItemCharts.moduleType)">
                        <Radio label="年"></Radio>
                        <Radio label="月"></Radio>
                    </RadioGroup>
                    </Col>
                </Row>
            </Form>
            <div id="container"></div>
        </Card>
    </div>
</template>
<script>
import Highcharts from "highcharts/highstock";
import HighchartsMore from "highcharts/highcharts-more";
import $ from "jquery";
HighchartsMore(Highcharts);
export default {
  name: "CheckTask",
  data() {
    return {
      formItemCharts: {
        select: "1",
        doTime: "" + new Date().getFullYear(),
        moduleType: "年"
      }
    };
  },
  mounted() {
    this.getInitData(); //初始化数据
    // this.initCharts()
  },
  methods: {
    changeRadio(value) {
      if (value == "月") {
        this.formItemCharts.doTime =
          new Date().getFullYear() + "-" + (new Date().getMonth() + 1);
      }
      this.getInitData(this.formItemCharts);
    }, //切换月份和年份
    changeItem() {
      this.getInitData(this.formItemCharts);
    }, //切换人员或分组
    changeColor(item) {
      switch (item) {
        case "5":
          return "#ff0033";
        case "4":
          return "#3300cc";
        case "3":
          return "#FFA500";
        case "2":
          return "#00ccff";
        case "1":
          return "#009966";
      }
    }, //设置颜色
    getInitData(item) {
      console.log(item, "调取数据，渲染接口");
      this.initCharts();
    }, //获取初始化数据
    initCharts() {
      var _this = this;
      // Define tasks
      var tasks = [
        {
          name: "Sleep",
          intervals: [
            {
              // From-To pairs
              from: Date.UTC(2018, 8, 15),
              to: Date.UTC(2018, 8, 18),
              num: "5",
              data: [
                {
                  taskName: "一次外呼一次一次外呼外呼一次外呼一次外呼",
                  taskTotal: "12121",
                  taskPercent: "12%"
                },
                {
                  taskName: "一次外呼",
                  taskTotal: "12121",
                  taskPercent: "12%"
                },
                {
                  taskName: "一次外呼",
                  taskTotal: "12121",
                  taskPercent: "12%"
                }
              ]
            },
            {
              from: Date.UTC(2018, 8, 19),
              to: Date.UTC(2018, 8, 29),
              num: "4",
              data: [
                {
                  taskName: "一第三方接口是否快速分解的看法",
                  taskTotal: "12121",
                  taskPercent: "12%"
                },
                {
                  taskName: "一次外呼",
                  taskTotal: "12121",
                  taskPercent: "12%"
                },
                {
                  taskName: "一次外呼",
                  taskTotal: "12121",
                  taskPercent: "12%"
                }
              ]
            }
          ]
        },
        {
          name: "Family time",
          intervals: [
            {
              // From-To pairs
              from: Date.UTC(2018, 8, 15, 6),
              to: Date.UTC(2018, 8, 19, 8),
              num: "3",
              data: [
                {
                  taskName: "大萨达撒多撒多所速分解的看法",
                  taskTotal: "12121",
                  taskPercent: "12%"
                },
                {
                  taskName: "一次外呼",
                  taskTotal: "12121",
                  taskPercent: "12%"
                },
                {
                  taskName: "一次外呼",
                  taskTotal: "12121",
                  taskPercent: "12%"
                }
              ]
            },
            {
              from: Date.UTC(2018, 8, 22, 16),
              to: Date.UTC(2018, 8, 25, 22),
              num: "2"
            }
          ]
        },
        {
          name: "Work",
          intervals: [
            {
              // From-To pairs
              from: Date.UTC(2018, 8, 15, 8),
              to: Date.UTC(2018, 8, 15, 16),
              num: "2"
            }
          ]
        },
        {
          name: "Run",
          intervals: [
            {
              // From-To pairs
              from: Date.UTC(2018, 8, 15, 6),
              to: Date.UTC(2018, 8, 15, 16),
              num: "1"
            }
          ]
        },
        {
          name: "Run1",
          intervals: [
            {
              // From-To pairs
              from: Date.UTC(2018, 8, 15, 6),
              to: Date.UTC(2018, 8, 15, 16),
              num: "1"
            }
          ]
        },
        {
          name: "Run2",
          intervals: [
            {
              // From-To pairs
              from: Date.UTC(2018, 8, 15),
              to: Date.UTC(2018, 8, 19),
              num: "1"
            }
          ]
        },
        {
          name: "Run3",
          intervals: [
            {
              // From-To pairs
              from: Date.UTC(2018, 8, 15),
              to: Date.UTC(2018, 8, 17),
              num: "1"
            }
          ]
        },
        {
          name: "Run4",
          intervals: [
            {
              // From-To pairs
              from: Date.UTC(2018, 8, 15),
              to: Date.UTC(2018, 8, 17),
              num: "1"
            }
          ]
        },
        {
          name: "Run5",
          intervals: [
            {
              // From-To pairs
              from: Date.UTC(2018, 8, 15),
              to: Date.UTC(2018, 8, 17),
              num: "1"
            }
          ]
        },
        {
          name: "Run6",
          intervals: [
            {
              // From-To pairs
              from: Date.UTC(2018, 8, 15),
              to: Date.UTC(2018, 8, 17),
              num: "1"
            }
          ]
        },
        {
          name: "Run7",
          intervals: [
            {
              // From-To pairs
              from: Date.UTC(2018, 8, 15),
              to: Date.UTC(2018, 8, 17),
              num: "1"
            }
          ]
        },
        {
          name: "Run8",
          intervals: [
            {
              // From-To pairs
              from: Date.UTC(2018, 8, 15),
              to: Date.UTC(2018, 8, 17),
              num: "1"
            }
          ]
        },
        {
          name: "Run9",
          intervals: [
            {
              // From-To pairs
              from: Date.UTC(2018, 8, 15),
              to: Date.UTC(2018, 8, 17),
              num: "1"
            }
          ]
        },
        {
          name: "Run10",
          intervals: [
            {
              // From-To pairs
              from: Date.UTC(2018, 8, 15),
              to: Date.UTC(2018, 8, 17),
              num: "1"
            }
          ]
        },
        {
          name: "Run11",
          intervals: [
            {
              // From-To pairs
              from: Date.UTC(2018, 8, 15),
              to: Date.UTC(2018, 8, 17),
              num: "1"
            }
          ]
        },
        {
          name: "Run12",
          intervals: [
            {
              // From-To pairs
              from: Date.UTC(2018, 8, 15),
              to: Date.UTC(2018, 8, 17),
              num: "1"
            }
          ]
        },
        {
          name: "Run13",
          intervals: [
            {
              // From-To pairs
              from: Date.UTC(2018, 8, 15),
              to: Date.UTC(2018, 8, 17),
              num: "1"
            }
          ]
        },
        {
          name: "Run14",
          intervals: [
            {
              // From-To pairs
              from: Date.UTC(2018, 8, 15),
              to: Date.UTC(2018, 8, 17),
              num: "1"
            }
          ]
        },
        {
          name: "Run15",
          intervals: [
            {
              // From-To pairs
              from: Date.UTC(2018, 8, 15),
              to: Date.UTC(2018, 8, 17),
              num: "1"
            }
          ]
        },
        {
          name: "Run16",
          intervals: [
            {
              // From-To pairs
              from: Date.UTC(2018, 8, 15),
              to: Date.UTC(2018, 8, 17),
              num: "1"
            }
          ]
        },
        {
          name: "Run17",
          intervals: [
            {
              // From-To pairs
              from: Date.UTC(2018, 8, 15),
              to: Date.UTC(2018, 8, 17),
              num: "1"
            }
          ]
        },
        {
          name: "Run18",
          intervals: [
            {
              // From-To pairs
              from: Date.UTC(2018, 8, 15),
              to: Date.UTC(2018, 8, 17),
              num: "1"
            }
          ]
        },
        {
          name: "Run19",
          intervals: [
            {
              // From-To pairs
              from: Date.UTC(2018, 8, 15),
              to: Date.UTC(2018, 8, 17),
              num: "1"
            }
          ]
        },
        {
          name: "Run20",
          intervals: [
            {
              // From-To pairs
              from: Date.UTC(2018, 8, 15),
              to: Date.UTC(2018, 8, 17),
              num: "1"
            }
          ]
        }
      ];

      var series = []; //设置整个表格数据
      var arrLabel = []; //设置纵坐标的信息

      $.each(tasks.reverse(), function(i, task) {
        // console.log(task.name)
        arrLabel.push(task.name);
        var item = {
          name: task.name,
          data: []
        };
        $.each(task.intervals, function(j, interval) {
          // console.log(interval, i)
          item.color = _this.changeColor(interval.num);
          //数据设置完毕后，将下面的颜色设置打开
          // item.color = _this.changeColor(interval.data.length)
          item.data.push(
            {
              x: interval.from,
              y: i,
              from: interval.from,
              to: interval.to
            },
            {
              x: interval.to,
              y: i,
              from: interval.from,
              to: interval.to
            }
          );
          // add a null value between intervals//添加一个空值
          if (task.intervals[j]) {
            // console.log(task.intervals[j + 1], 999)
            item.data.push([(interval.to + task.intervals[j].from) / 2, null]);
          }
          series.push(item);
          item = {
            name: task.name,
            data: []
          };
        });
      });

      setTimeout(() => {
        var chart = new Highcharts.Chart({
          chart: {
            renderTo: "container" //图表加载的位置，是页面上的一个DOM对象。
          },
          title: {
            text: "任务俯瞰图"
          },
          xAxis: {
            type: "datetime"
          },
          yAxis: {
            tickInterval: 1, //刻度的步进值
            categories: arrLabel, //y轴坐标轴显示值
            scrollbar: {
              enabled: true
            }, //开启滚动条
            startOnTick: false,
            endOnTick: false,
            title: {
              text: "人员/小组"
            },
            max: 7, //设置最大显示条数
            minPadding: 0.1,
            maxPadding: 0.2
          },
          legend: {
            enabled: false //是否允许图注
          },
          tooltip: {
            useHTML: true, //提示框信息用html渲染
            formatter: function() {
              //							console.log(this)
              // 							console.log(tasks[this.y-1])
              //                             console.log(this.point)
              var _this = this;

              var tabHtml =
                "<tr><td>任务名称</td><td>被分配任务量</td><td>完成百分比</td></tr>";
              $.each(tasks[this.y].intervals, function(i, item) {
                if (_this.point.from == item.from) {
                  $.each(item.data, function(j, itm) {
                    tabHtml +=
                      "<tr><td>" +
                      itm.taskName +
                      "</td><td>" +
                      itm.taskTotal +
                      "</td><td>" +
                      itm.taskPercent +
                      "</td></tr>";
                  });
                }
              });
              var showHtml =
                '<b style="text-align: center;display: block;">区间任务详情</b><br/><table width="400" style="text-align: center">' +
                tabHtml +
                "</table>";
              return showHtml;
            }
          }, //设置提示框信息
          plotOptions: {
            line: {
              lineWidth: 9,
              marker: {
                enabled: false
              },
              dataLabels: {
                enabled: true,
                align: "left",
                formatter: function() {
                  return this.point.options && this.point.options.label;
                }
              }
            }
          },
          credits: {
            enabled: false
          }, //版权信息设置
          series: series
        });
      }, 200);
      $("#container").append(
        '<div style="text-align: center"><span class="tit1" style="background-color: #ff0033;"></span>五个任务<span class="tit1" style="background-color: #3300cc;"></span>四个任务<span class="tit1" style="background-color: #FFA500;"></span>三个任务<span class="tit1" style="background-color: #00ccff;"></span>二个任务<span class="tit1" style="background-color: #009966;"></span>一个任务</div>'
      );
    } //渲染图表
  },
  computed: {
    // list () {
    //   return this.$store.state.clkm.list
    // }
  }
};
</script>
<style lang="stylus" scoped>
#container {
    width: 100%;
    height: 500px;
    margin: 10px auto;
}

.tit1 {
    display: inline-block;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    margin: 0 10px;
}
</style>