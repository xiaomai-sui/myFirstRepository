// 引入mock路径

// 引入SDK核心类
var QQMapWX = require('../../qqmap-wx-jssdk1.2/qqmap-wx-jssdk');

// 实例化API核心类
var demo = new QQMapWX({
    key: 'D5SBZ-2DSCU-LGVVV-2FJXC-YKIA6-4CB2F' // 必填
});

//在Page({})中使用下列代码
//触发表单提交事件，调用接口

//获取应用实例
const app = getApp()

Page({
    data: {
        city: "获取中....",
        swiper: []
    },
    //事件处理函数
    getLocation() {
        let that = this;
        // 1通过微信api获得经纬度
        wx.getLocation({
            type: 'wgs84',
            success(res) {
                const latitude = res.latitude
                const longitude = res.longitude
                    // console.log(res);
                    // 2把经纬度转化为广州上海 通过腾讯地图实现
                demo.reverseGeocoder({
                    location: {
                        latitude: latitude,
                        longitude: longitude
                    },
                    success: function(ret) {
                        // console.log(ret);
                        if (ret.status == 0) {
                            let city = ret.result.address_component.city
                            console.log(city)
                            that.setData({
                                city: city
                            })
                        }

                    },
                    fail: function(ret) {
                        console.log(ret);
                    },
                    complete: function(ret) {
                        // console.log(res);
                    }
                });
            }
        })

    },

    // 获取轮播图
    getSwipeArr() {
        let that = this;
        // 发送请求获取数据
        wx.request({
            url: 'http://api.meituan.com/index/swiper', //仅为示例，并非真实的接口地址
            data: {
                x: '',
                y: ''
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                console.log(res)
                if (res.statusCode == 200) {
                    that.setData({ swiperArr: res.data })
                }

            }
        })
    },

    // 页面加载时会调用
    onLoad: function(options) {
        this.getLocation();
        this.getSwipeArr()
            // this.formSubmit(options)
    },
    getUserInfo: function(e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    }
})