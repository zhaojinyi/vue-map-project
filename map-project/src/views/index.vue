<template>
    <div>
        <div>
            <h3 class="title">高德地图测试</h3>
        </div>
        <el-row :gutter="20">
            <el-col :span="6" :offset="14">
                <el-input v-model="keywords" value="keywords" @change="loadPlaceSearch()">
                    <template slot="prepend">请输入关键字</template>
                </el-input>
            </el-col>
        </el-row>
        <input type="text" id="input_tip">
        <div id="container" class="container">

        </div>
        <div id="panel" class="panel"></div>
    </div>
</template>
<script>
export default {
    data() {
        return{
            map: null,
            keywords: '',
            preMark: null
        }
    },
    mounted() {
        this.initMap()
        // this.loadSearchAddress() // 绑定输入框查询地址
        // this.loadPlaceSearch()
        // this.loadClickMap()
        // this.getCurrentLocation()
        this.loadInputTipPlaceSearch()
    },
    methods: {
        initMap() {
            this.map = new AMap.Map('container', {
                zoom:11,//级别
                center: [116.397428, 39.90923],//中心点坐标
            });
        },
        loadClickMap() {
            let vm = this
            this.map.on('click', function(e) {
                let lng = e.lnglat.getLng()
                let lat = e.lnglat.getLat()
                // 这里通过高德 SDK 完成。根据坐标点获取地址
                var geocoder = new AMap.Geocoder({
                    radius: 1000,
                    extensions: "all"
                });
                geocoder.getAddress([lng, lat], (status, result) => {
                    if (status === 'complete' && result.info === 'OK') {
                        if (result && result.regeocode) {
                            if(vm.preMark) { 
                                vm.map.remove(vm.preMark);
                            }
                            let serviceAddress = result.regeocode.formattedAddress;
                            var marker = new AMap.Marker({
                                map: vm.map,
                                icon : require("../assets/location.png"),
                                position: [e.lnglat.getLng(), e.lnglat.getLat()],
                                offset: new AMap.Pixel(-13, -30),
                                label: { 
                                    content: "<div class='infos'>"+serviceAddress+"</div>",
                                    direction: 'top' // 文本标注方位 可选值：'top'|'right'|'bottom'|'left'|'center'，默认值:'right'
                                }
                            });// 获取到位置
                            vm.preMark = marker;
                        }
                    }
                });
            
            });
        },
        getCurrentLocation() {
            let vm = this
            vm.map.plugin('AMap.Geolocation', function() {
                var geolocation = new AMap.Geolocation({
                    enableHighAccuracy: true,//是否使用高精度定位，默认:true
                    timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                    maximumAge: 0,           //定位结果缓存0毫秒，默认：0
                    convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                    showButton: true,        //显示定位按钮，默认：true
                    buttonPosition: 'RB',    //定位按钮停靠位置，默认：'LB'，左下角
                    buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                    showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
                    showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
                    panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
                    zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                });
                vm.map.addControl(geolocation)
                geolocation.getCurrentPosition(); // 获取用户当前的精确位置信息
                AMap.event.addListener(geolocation, 'complete', getLocationComplete);
                // AMap.event.addListener(geolocation, 'error', onError)
                
                function getLocationComplete(data) {
                    alert(data.formattedAddress)
                }
            })
        },
        searchAddress() {
            let keywords = this.keywords
            let vm = this
            AMap.plugin('AMap.Autocomplete', function(){
                // 实例化Autocomplete
                var autoOptions = {
                    //city 限定城市，默认全国
                    city: '全国',
                }
                var autoComplete= new AMap.Autocomplete(autoOptions);
                autoComplete.search(keywords, (status, result) => {vm.handleSearchResult(status, result)})
                
            })
        },
        loadSearchAddress() {
            let vm = this
            AMap.plugin('AMap.Autocomplete', function(){
                // 实例化Autocomplete
                var autoOptions = {
                    //city 限定城市，默认全国
                    city: '全国',
                    input: 'input_tip'
                }
                var autoComplete= new AMap.Autocomplete(autoOptions);
                AMap.event.addListener(autoComplete, 'select', function(e){
                    // 为了验证方法是否有效
                    alert(e)
                })
                
            })
        },
        handleSearchResult(status, result) {
            let vm = this
            // data 里包含info,count, tips
            if(status == "complete" && result && result.count > 0) {
                var markerList = []; // 标记列表
                let lng = 0, lat = 0; // 记录中心点
                for(let i=0; i<result.tips.length; i++) {
                    let item = result.tips[i]
                    // location 可能为空
                    if(item.location) {
                        if(lng == 0 && lat == 0) {
                            lng = item.location.lng
                            lat = item.location.lat
                        }
                        var marker = new AMap.Marker({ // 标记的是查询出来的坐标
                            map: this.map,
                            label: { 
                                content: "<div class='infos'>"+item.name+"</div>",direction: 'top' // 文本标注方位 可选值：'top'|'right'|'bottom'|'left'|'center'，默认值:'right'
                            },
                            clickable: true,
                            extData:item.name,
                            position: new AMap.LngLat(item.location.lng, item.location.lat),  
                            title: item.name
                        });
                        // 为标记添加监听事件
                        AMap.event.addListener(marker, 'click', function(e) {
                            if(vm.preMark) { // 移除上一个标记
                                vm.map.remove(vm.preMark);
                            }
                            let serviceAddress = e.target.getExtData()
                            var marker = new AMap.Marker({ // 点击标记当前点击的位置
                                    map: vm.map,
                                    icon : require("../assets/location.png"),
                                    position: [e.lnglat.lng, e.lnglat.lat],
                                    offset: new AMap.Pixel(-13, -30),
                                    label: { content: "<div class='infos'>"+serviceAddress+"</div>",
                                    direction: 'top' // 文本标注方位
                                                    // 可选值：'top'|'right'|'bottom'|'left'|'center'，默认值:'right'
                                }
                            });
                            // 记录当前标记，用作移除标记
                            vm.preMark = marker;
                            // 得到的数据
                        });        				
                        markerList.push(marker)
                    }
                }
                vm.map.setCenter(new AMap.LngLat(lng, lat))
                vm.map.add(markerList);
            }
        },
        loadPlaceSearch() {
            let vm = this
            AMap.service(["AMap.PlaceSearch"], function() {
                //构造地点查询类
                var placeSearch = new AMap.PlaceSearch({ 
                    pageSize: 5, // 单页显示结果条数
                    pageIndex: 1, // 页码
                    // city: "010", // 兴趣点城市
                    citylimit: false,  //是否强制限制在设置的城市内搜索
                    map: vm.map, // 展现结果的地图实例
                    panel: "panel", // 结果列表将在此容器中进行展示。
                    autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
                });
                //关键字查询
                placeSearch.search(vm.keywords);
            });
        },
        loadInputTipPlaceSearch() {
            let vm = this
            AMap.plugin(['AMap.Autocomplete','AMap.PlaceSearch'],function(){
                var autoOptions = {
                    city: "北京", //城市，默认全国
                    input: "input_tip"//使用联想输入的input的id
                };
                let autocomplete= new AMap.Autocomplete(autoOptions);
                var placeSearch = new AMap.PlaceSearch({
                    city:'北京',
                    map:vm.map
                })
                AMap.event.addListener(autocomplete, "select", function(e){
                    //TODO 针对选中的poi实现自己的功能
                    placeSearch.setCity(e.poi.adcode);
                    placeSearch.search(e.poi.name)
                });
            });
        }

   }
}
</script>

<style scoped>
.container {
    margin-left: 10%;
    width: 80%;
    height: 500px;
}
.panel {
    position: absolute;
    background-color: white;
    max-height: 90%;
    overflow-y: auto;
    top: 142px;
    right: 158px;
    width: 280px;
}
</style>