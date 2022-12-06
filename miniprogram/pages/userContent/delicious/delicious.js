// pages/userContent/delicious/delicious.js
import {froo} from '../../data/meals'
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    eatfro:[],
    active:'',
    isScoll:false,
    // 滚动数据
    scoData:[
        
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(froo);
    console.log(options.eat);
    let that = this
    that.setData({
        isScoll: true
    })

    let arr1 = [{
        foo:'dianxin',
        froodArr:[]
    },
    {
        foo:'xiaochao',
        froodArr:[]
    },
    {
        foo:'xiangcha',
        froodArr:[]
    },
    {
        foo:'danfan',
        froodArr:[]
    },
    {
        foo:'shuiguo',
        froodArr:[]
    }]

    db.collection('books').watch({
      onChange: function (snapshot) {
        console.log( snapshot.docs)
        let arr2 = snapshot.docs
        arr1.forEach(function(item){
            arr2.forEach(function(res) {
               if(item.foo == res.selname.title){
                item.froodArr.push(res)
               }
            });
        })
        that.setData({
            eatfro:froo,
            active:options.eat,
            scoData:arr1,
        
        })
        console.log(arr1);
        setTimeout(function () {
            that.setData({
              isScoll: false
            })
          },1)
      },
      onError:(err) => {
        console.error(err)
      }
    })


    
  },

  ceteactive:function(e){
    console.log(e.currentTarget.dataset.ac);
    const self = this;
    this.setData({
        isScoll: true
    })
    setTimeout(function(){
        self.setData({
            active:e.currentTarget.dataset.ac
        })
    },0)
    setTimeout(function () {
      self.setData({
        isScoll: false
      })
    },1)
  },

  gotoxian:function(e){
    console.log(e.currentTarget.dataset.ids);
    wx.navigateTo({
      url: '/pages/userContent/DataDetails/DataDetails?id='+e.currentTarget.dataset.ids,
      success: (res) => {
          console.log(res);
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