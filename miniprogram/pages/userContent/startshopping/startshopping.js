// pages/userContent/startshopping/startshopping.js
import {
    timer
} from '../../data/times'
const db = wx.cloud.database()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        shop: {},
        // 总价
        everymoney: 0,
        // 购买数量
        number1: 1
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(timer(new Date()));
        let that = this
        const eventChannel = this.getOpenerEventChannel()
        eventChannel.on('shopingData', function (data) {
            console.log(data.data, 22222)
            // 拿到组件传过来的值，防止重复请求
            that.setData({
                shop: data.data,
                everymoney: data.data.foodmony
            })
        })
    },

    jiansu: function () {
        console.log(45);
        let num1 = this.data.number1

        if (num1 <= 1) {
            return
        } else {
            num1 = num1 - 1
        }
        // 总价格
        let moni1 = this.data.shop.foodmony
        let moni2 = moni1 * num1

        this.setData({
            number1: num1,
            everymoney: moni2
        })
        console.log(num1);
    },

    jiahao: function () {
        console.log(55);
        let num1 = this.data.number1;
        num1 = num1 + 1;
        // 总价格
        let moni1 = this.data.shop.foodmony;
        let moni2 = moni1 * num1;
        this.setData({
            number1: num1,
            everymoney: moni2
        })
    },

    tijaiodd: function () {
        let that = this
        wx.showModal({
            title: '提示',
            content: '确定提交订单吗',
            success: function (res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                    wx.showLoading({
                        title: '加载中',
                    })
                    // 提交到数据库
                    db.collection('submitOK').add({
                            data: {
                                shop: that.data.shop,
                                everymoney: that.data.everymoney,
                                number1: that.data.number1,
                                // 0是未完成
                                wc: 1,
                                timer:timer(new Date().getTime())
                            }
                        })
                        .then(res => {
                            console.log(res)
                            wx.hideLoading()

                            wx.showToast({
                                title: '成功',
                                icon: 'success',
                                duration: 1500,
                                success: function () {
                                    setTimeout(function () {
                                        wx.navigateBack({
                                            delta: 1
                                        })
                                    }, 2000)
                                }
                            })
                        })
                        .catch(console.error)

                    // 取消的
                } else if (res.cancel) {
                    console.log('用户点击取消')
                    wx.showLoading({
                        title: '加载中',
                    })
                    // 提交到数据库
                    db.collection('submitOK').add({
                            data: {
                                shop: that.data.shop,
                                everymoney: that.data.everymoney,
                                number1: that.data.number1,
                                // 1是完成
                                wc: 0,
                                timer:timer(new Date().getTime())
                            }
                        })
                        .then(res => {
                            console.log(res);
                            wx.hideLoading()

                            wx.showToast({
                                title: '取消付款',
                                icon: 'error',
                                duration: 1500,
                                success: function () {
                                    setTimeout(function () {
                                        wx.navigateBack({
                                            delta: 1
                                        })
                                    }, 2000)
                                }
                            })
                        })
                        .catch(console.error)

                }
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})