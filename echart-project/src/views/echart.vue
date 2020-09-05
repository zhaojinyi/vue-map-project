<template>
    <div>
        <div>
            <h1>echart展示</h1>
        </div>
        <div>
            <div id="bar" class="container">

            </div>
            <div id="twoYBar" class="container">

            </div>
        </div>
        <div>
            <div id="test" class="container">

            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            waterMarkGraphic: null,
            testContainer: null,
            echartContainer: null,
            twoYBarContainer: null,
            barData: [
                {
                    year: '2011',
                    peopleInitCount: 1604,
                    peopleQuitCount: 960,

                },
                {
                    year: '2012',
                    peopleInitCount: 1635,
                    peopleQuitCount: 966,
                },
                {
                    year: '2013',
                    peopleInitCount: 1640,
                    peopleQuitCount: 972,
                },
                {
                    year: '2014',
                    peopleInitCount: 1687,
                    peopleQuitCount: 974,
                },
                {
                    year: '2015',
                    peopleInitCount: 1655,
                    peopleQuitCount: 977,
                },
                {
                    year: '2016',
                    peopleInitCount: 1786,
                    peopleQuitCount: 977,
                },
                {
                    year: '2017',
                    peopleInitCount: 1723,
                    peopleQuitCount: 986,
                },
                {
                    year: '2018',
                    peopleInitCount: 1523,
                    peopleQuitCount: 993,
                }
            ]
        }
    },
    mounted() {
        this.initWaterMarkGraphic();
        this.initTestContainer();
        this.initBarContainer();
        this.initTwoYBarContainer();
    },
    methods: {
initWaterMarkGraphic() {
    this.waterMarkGraphic=[ {
        type : 'image',
        id : 'logo',
        right : 190,
        bottom : 50,
        z : 100,
        bounding : 'raw',
        origin : [ 0, 0 ],
        scale : [ 0.5, 0.5 ],
        rotation : Math.PI / 4,
        style : {
            image : require("../assets/graphic.jpg"),
            opacity : 0.3
        }
    }, {
        type : 'group',
        rotation : Math.PI / 4,
        bounding : 'raw',
        right : 110,
        bottom : 70,
        z : 100,
        children : [ {
            type : 'rect',
            left : 'center',
            top : 'center',
            z : 100,
            shape : {
                width : 400,
                height : 80
            },
            style : {
                fill : 'rgba(0,0,0,0.0)'
            }
        }]
    }]
},
        initTestContainer() {
            this.testContainer = echarts.init(document.getElementById("test"))
            var option = {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [120, 200, 150, 80, 70, 110, 130],
                    type: 'bar',
                    showBackground: true,
                    backgroundStyle: {
                        color: 'rgba(220, 220, 220, 0.8)'
                    }
                }]
            };
            this.testContainer.setOption(option)
        },
        initBarContainer() {
            this.echartContainer = echarts.init(document.getElementById("bar"))
            let xData = this.barData.map(element => {
                return element.year + "年"
            });
            let yData = this.barData.map(element => {
                return element.peopleInitCount
            })
            var option = {
                xAxis: {
                    type: 'category',
                    data: xData,
                    name: '年份'
                },
                yAxis: {
                    type: 'value',
                    name: '出生人口',
                    axisLabel : {
                        formatter : '{value}W'
                    }
                },
				tooltip : {
					trigger : 'axis',
					axisPointer : { // 坐标轴指示器，坐标轴触发有效
						type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
					},
				},
                // toolbox: { // 工具栏
                //     show: true,
                //     showTitle: true,
                //     feature: {
                //         saveAsImage: { // 保存图片
                //             type: 'png', // 图片格式
                //             show: true
                //         },
                //         dataView: {
                //             show: true
                //         },
                //         magicType: {
                //             type: ['line', 'bar', 'stack']
                //         }
                //     }
                // },
                series: [{
                    data: yData,
                    type: 'bar',
                    color: '#91BDC2',
                    name: '出生人口',
                    
                }]
            }
            this.echartContainer.setOption(option)
        },
        initTwoYBarContainer() {
            this.twoYBarContainer = echarts.init(document.getElementById("twoYBar"))
            let xData = this.barData.map(element => {
                return element.year + "年"
            });
            let y1Data = this.barData.map(element => {
                return element.peopleInitCount
            })
            let y2Data = this.barData.map(element => {
                return element.peopleQuitCount
            })
            var option = { 
                title: {
                    text: '出生死亡人口',
                    subtext: '数据仅为展示，纯属虚构',
                    textStyle: {// 主标题文本样式
                        color:'#61a0a8'
                    }
                },
                xAxis: {
                    type: 'category',
                    data: xData
                },
                yAxis: [
                    {
                        type: 'value',
                        name: '出生人口',
                        axisLabel : {
                            formatter : '{value}W'
                        }
                    },
                    {
                        type: 'value',
                        name: '死亡人口',
                        axisLabel : {
                            formatter : '{value}W'
                        }
                    }
                ],
                legend : {
                    top: '50',
                    data : [ '出生人口', '死亡人口' ]
                },
                graphic : this.waterMarkGraphic,
                grid: {
                    top: '100'
                },
				tooltip : {
					trigger : 'axis',
                    axisPointer : { // 坐标轴指示器，坐标轴触发有效
						type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    },
                    show: true,
                },
                toolbox: { // 工具栏
                    show: true,
                    showTitle: true,
                    feature: {
                        saveAsImage: { // 保存图片
                            type: 'png', // 图片格式
                            show: true
                        },
                        dataView: {
                            show: true
                        },
                        magicType: {
                            type: ['line', 'bar', 'stack']
                        }
                    }
                },
                series: [
                    {
                        data: y1Data,
                        type: 'bar',
                        color: '#91BDC2',
                        name: '出生人口',
                        itemStyle: {
                            normal : {
                                label : {
                                    show : true, // 开启显示
                                    position : 'top', // 在上方显示
                                    textStyle : { // 数值样式
                                        color : 'black',
                                        fontSize : 11
                                    }
                                }
                            }
                        }
                    },
                    {
                        data: y2Data,
                        type: 'bar',
                        color: '#E0A7A6',
					    yAxisIndex : 1,
                        name: '死亡人口',
                        itemStyle: {
                            normal : {
                                label : {
                                    show : true, // 开启显示
                                    position : 'top', // 在上方显示
                                    textStyle : { // 数值样式
                                        color : 'black',
                                        fontSize : 11
                                    }
                                }
                            }
                        }
                    }
                ]
            }
            this.twoYBarContainer.setOption(option)
        }
    }
}
</script>
<style scoped>
.container {
    padding-top: 20px;
    margin-left: 5%;
    width: 40%;
    height: 400px;
    float: left;
}
.twoYContainer {
    padding-top: 20px;
    margin-left: 5%;
    width: 40%;
    height: 400px;
    float: left;
}
.mapContainer {
    padding-top: 20px;
    margin-left: 1%;
    width: 80%;
    height: 400px;
    float: left;
}
</style>