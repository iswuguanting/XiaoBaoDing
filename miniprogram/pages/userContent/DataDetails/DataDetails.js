// pages/userContent/DataDetails/DataDetails.js
const db = wx.cloud.database()
import {timer} from '../../data/times'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tuijian: [],
        // 内容数据
        datas: {},
        // id的编号
        thid: null,
        // 购物车的数据
        gwche:[],
        // 购物车数量
        gwcnum:0,
        // 重新创建购物车id
        gwid:null,
        gwidshow:false,
        // 数量
        gwcnum2:1
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        
        let ids = options.id;
        console.log(ids);

        let that = this
        db.collection('books').watch({
            onChange: function (snapshot) {
                let arr1 = [];
                let str1 = {};
                let thid = 0;
                arr1 = snapshot.docs.sort(function () {
                    return Math.random() - 0.5;
                });
                // console.log(arr1.slice(0,4));

                snapshot.docs.filter(item => {
                    // console.log(item);
                    if (item._id == ids ) {
                        str1 = item
                    }
                })
                // console.log(str1,123);
                that.setData({
                    tuijian: arr1.slice(0, 6),
                    datas: str1,
                    gwid:new Date().getTime(),
                    gwidshow:false
                })
            },
            onError: (err) => {
                console.error(err)
            }
        })
        // const db = wx.cloud.database()
        db.collection('submitOK').watch({
            onChange: function (snapshot) {
                // console.log(snapshot.docs);
                let num1 = 0;
                snapshot.docs.filter(item => {
                    // console.log(item);
                    // 这里要多加一个判断
                    if(item.shop._id == options.id&&item.wc==2){
                        num1 = num1 + item.number1;
                    }
                })
                console.log(num1,5555555);
                that.setData({
                    gwche:snapshot.docs,
                    gwcnum:num1
                })
            },
            onError: (err) => {
                console.error(err)
            }
        })
    },

    // 抢购
    qiangou: function () {
        let self = this
        wx.navigateTo({
            url: "/pages/userContent/startshopping/startshopping",
            events: {
                shopingData: function (data) {
                    console.log(data);
                }
            },
            success: function (res) {
                // console.log(res);
                res.eventChannel.emit('shopingData', {
                    data: self.data.datas
                })
            }
        })
    },

    gotushu: function (e) {
        console.log(e.currentTarget.dataset.it._id);
        wx.reLaunch({
            url: '/pages/userContent/DataDetails/DataDetails?id=' + e.currentTarget.dataset.it._id,
        })
    },

    //   加入购物车
    jiarugwc: function () {
        let that = this
        if(this.data.gwidshow==false){
            that.setData({
                gwidshow:true
            })
            console.log(this.data.datas);
            db.collection('submitOK').add({
                data: {
                _id:that.data.gwid,
                  shop:that.data.datas,
                  everymoney:that.data.datas.foodmony,
                  number1:that.data.gwcnum2,
                  // 2是购物车
                  wc:2,
                  timer:timer(new Date().getTime())
                }
              })
              .then(res => {
                console.log(res)
              })
              .catch(console.error)
        }else{
            let num2 = this.data.gwcnum2 + 1
            this.setData({
                gwcnum2:num2
            })
            let that = this
            
            db.collection('submitOK').doc(that.data.gwid).update({
                data:{
                    number1:num2,
                    everymoney:num2 * that.data.datas.foodmony
                }
            })
        }

    },

    gogouwuch:function(){
      console.log(111);
      wx.switchTab({
        url: '/pages/home/home'
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