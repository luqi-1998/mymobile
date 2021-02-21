<template>
  <div class="echart">
    <div class="pie">
      <div ref="myEchart" class="echart1"></div>
      <p>近1年 32613 份样本 / 可信度：高</p>
    </div>
    <div class="line">
      <div ref="myEchart2" class="echart2"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { statistics } from '@/api/find.js'
export default {
  props: {
    form: {
      type: Object,
      default: function () {
        return { city: '北京', position: '技术经理' }
      }
    }
  },
  data () {
    return {
      options: '',
      options1: '',
      employmentNum: [],
      experienceSalary: [],
      percentSalary: []
    }
  },
  methods: {
    async getEchart () {
      try {
        const res = await statistics(this.form)
        this.percentSalary = res.data.percentSalary
        this.experienceSalary = res.data.experienceSalary
        this.getLine()
        // console.log(res)
        /* eslint-disable */
        var arr = []
        var data1 = []
        var nums = []
        this.percentSalary.forEach((item, index) => {
          //   console.log(item, index)
          data1.push(item.assetType)
          nums.push(item.percent)
          arr.push({ name: item.assetType, value: item.percent })
        })
        if (
          this.options != null &&
          this.options != '' &&
          this.options != undefined
        ) {
          this.options.dispose() //销毁
        }
        // console.log(arr)
        this.options = echarts.init(this.$refs.myEchart)
        this.options.setOption({
          title: {
            text: '工资收入',
            left: '15',
            top: '18',
            textStyle: {
              fontSize: '18px'
            }
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: '55%',
            top: '30%',
            itemWidth: 14,
            itemHeight: 14,
            data: data1,
            formatter: function (name) {
              for (var i = 0; i < data1.length; i++) {
                if (name === arr[i].name) {
                  return (
                    '{rate|' + name + '}{name|' + nums[i].toFixed(2) + '%' + '}'
                  )
                }
              }
            },
            textStyle: {
              rich: {
                name: {
                  fontSize: 14,
                  fontWeight: 400,
                  width: 200,
                  height: 35,
                  padding: [0, 0, 0, 40]
                },
                rate: {
                  fontSize: 15,
                  fontWeight: 500,
                  height: 35,
                  width: 40,
                  padding: [0, 0, 0, 20]
                }
              }
            }
          },
          series: [
            {
              name: '收入',
              type: 'pie',
              radius: ['28px', '64px'],
              center: ['25%', '65%'],
              label: {
                show: false
              },
              labelLine: {
                show: false
              },
              itemStyle: {
                // borderWidth: 3,
                // borderColor: '#fff'
              },
              data: arr
            }
          ]
        })
        /* eslint-enable */
      } catch (err) {
        console.log(err)
      }
    },
    getLine () {
      var data2 = []
      var nums2 = []
      var value2 = []
      this.experienceSalary.forEach((item, index) => {
        data2.push(item.info)
        nums2.push(item.num)
        value2.push(item.value)
      })
      /* eslint-disable */
      if (
        this.options1 != null &&
        this.options1 != '' &&
        this.options1 != undefined
      ) {
        this.options1.dispose() // 销毁
      }
      this.options1 = echarts.init(this.$refs.myEchart2)
      var fontColor = '#30eee9'
      this.options1.setOption({
        title: {
          text: '工作经验',
          left: '15',
          top: '18',
          textStyle: {
            fontSize: '18px'
          }
        },
        xAxis: {
          type: 'category',
          data: data2
        },
        yAxis: {
          type: 'value',
          offset: -5
        },
        tooltip: {
          trigger: 'axis'
        },
        series: [
          {
            name: '平均收入',
            data: value2,
            type: 'line'
          }
        ]

        /* eslint-enable */
      })
    }
  },
  created () {
    this.getEchart()
  }
}
</script>

<style lang="less" scoped>
.echart {
  .pie {
    .echart1 {
      width: 749/2px;
      height: 400/2px;
    }
    p {
      padding-top: 51/2px;
      font-size: 12px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: center;
      color: #b4b4bd;
      line-height: 33/2px;
      letter-spacing: 0px;
    }
  }
  .line {
    .echart2 {
      margin-left: 15px;
      width: 740/2px;
      height: 500/2px;
    }
    padding: 21px 0 43px;
  }
}
</style>
