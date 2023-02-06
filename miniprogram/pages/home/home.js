// pages/home/home.js
const db = wx.cloud.database();
import {
  timer
} from '../data/times'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 数据库数据购物车 wc=2的
    datas: [],
    active: [],
    // 全选
    qxshow: false,
    // 总价格
    mony: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this
    db.collection('submitOK').watch({
      onChange: function (snapshot) {
        console.log(snapshot.docs);
        let arr1 = []
        // 渲染的数据

        snapshot.docs.filter(item => {
          if (item.wc == 2) {
            arr1.push({
              data: item,
              time: item._id,
              name: item.shop.foodname,
              mony: item.shop.foodmony,
              img: item.shop.img,
              times: timer(item._id)[1].setti,
              shiout: timer(item._id)[1].shi,
              fenout: timer(item._id)[1].fen,
              number1: item.number1

            })
          }
        })

        // 总价格
        let mon1 = 0
        that.data.active.forEach(item => {
          arr1.filter(res => {
            if (res.time == item) {
              mon1 = mon1 + Number(res.data.everymoney)
            }
          })
        })

        that.setData({
          datas: arr1,
          mony: mon1
        })
        console.log(arr1);
      },
      onError: (err) => {
        console.error(err)
      }
    })
  },

  check: function (e) {
    let arr1 = this.data.active
    let id = e.currentTarget.dataset.ids
    // console.log(e.currentTarget.dataset.ids);
    let tr = false
    arr1.filter((item, index) => {
      if (item == id) {
        tr = true
        arr1.splice(index, 1)
      } 
    })
    if (tr == false) {
      arr1.push(id)
    }
    // console.log(arr1);
    this.setData({
      active: arr1
    })
    // 全选高亮
    if (arr1.length == this.data.datas.length) {
      this.setData({
        qxshow: true
      })
    } else {
      this.setData({
        qxshow: false
      })
    }
    // 总价格
    let mon1 = 0
    this.data.active.forEach(item => {
      this.data.datas.filter(res => {
        if (res.time == item) {
          mon1 = mon1 + Number(res.data.everymoney)
        }
      })
    })
    this.setData({
      mony: mon1,

    })
    // console.log('总价格',mon1);
    // console.log(arr1);
  },

  jianshao: function (e) {
    let id = e.currentTarget.dataset.idd
    let num = e.currentTarget.dataset.num
    let mon = e.currentTarget.dataset.mon

    if (num <= 1) {
      console.log(1);
      wx.showModal({
        title: '提示',
        content: '是否从购物车删除该商品',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定');
            wx.showLoading({
              title: '加载中',
            })


            db.collection('submitOK').doc(id).remove({
              success: function (res) {
                console.log(res.data)

                setTimeout(function () {
                  wx.hideLoading()
                }, 0)
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 2000
                })
              }
            })

          } else if (res.cancel) {
            console.log('用户点击取消')
            wx.showToast({
              title: '您取消了',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
      return
    }

    num = num - 1

    db.collection('submitOK').doc(id).update({
      data: {
        number1: num,
        everymoney: num * mon

      }
    })

  },

  jiazhi: function (e) {
    let id = e.currentTarget.dataset.idd
    let num = e.currentTarget.dataset.num
    let mon = e.currentTarget.dataset.mon

    num = num + 1

    db.collection('submitOK').doc(id).update({
      data: {
        number1: num,
        everymoney: num * mon
      }
    })
  },

  quanx: function () {
    let arr1 = []
    this.data.datas.forEach(item => {
      arr1.push(item.time)
    })
    // console.log(arr1);
    if (this.data.qxshow == false) {
      this.setData({
        active: arr1,
        qxshow: true
      })
    } else {
      this.setData({
        active: [],
        qxshow: false
      })
    }
    // 总价格
    let mon1 = 0
    this.data.active.forEach(item => {
      this.data.datas.filter(res => {
        if (res.time == item) {
          mon1 = mon1 + Number(res.data.everymoney)
        }
      })
    })
    this.setData({
      mony: mon1
    })
    console.log(mon1);
    console.log(this.data.active);

  },

  // 结算价格
  jiesuan:function(){
    console.log(111);
    if( this.data.mony == 0 ){
      wx.showToast({
        title: '您没有可结算的菜品',
        icon: 'none',
        duration: 2000
      })
      return
    }

    let arr1 = this.data.active

    wx.showModal({
      title: '提示',
      content: '这是您的订单物品',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.showLoading({
            title: '加载中',
          })
          
         
          arr1.filter(item => {
            db.collection('submitOK').doc(item).update({
              data: {
                wc:1,
                timer:timer(new Date().getTime())
              },
              success: function(res) {
                console.log(res.data)
                setTimeout(function () {
                  wx.hideLoading()
                }, 0)
                wx.showToast({
                  title: '付款成功',
                  icon: 'success',
                  duration: 2000
                })
              }
            })
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
          wx.showToast({
            title: '取消付款',
            icon: 'none',
            duration: 2000
          })
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