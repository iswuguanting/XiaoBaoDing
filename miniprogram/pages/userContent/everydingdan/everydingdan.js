const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 高亮
    active: 'daifukuan',
    // 内容数据
    datas: [],
    isScoll: false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    let that = this
    this.setData({
      isScoll: true
    })


    db.collection('submitOK').watch({
      onChange: function (snapshot) {
        console.log(snapshot.docs);

        let arr1 = [{
            name: '待付款',
            title: 'daifukuan',
            num: 0,
            content: []
          },
          {
            name: '已付款',
            title: 'yifukuan',
            content: [],
            num: 1
          },
          {
            name: '全部订单',
            title: 'qunbudindan',
            content: snapshot.docs,
            num: 3
          }
        ]

        arr1.forEach(item => {
          snapshot.docs.filter(res => {
            if (item.num == res.wc) {
              item.content.push(res)
            }
          })
        })

        that.setData({
          datas: arr1,
          active: options.title
        })

        setTimeout(function () {
          that.setData({
            isScoll: false
          })
        }, 1)

        console.log(arr1);

      },
      onError: (err) => {
        console.error(err)
      }
    })
  },

  gaoliang: function (e) {
    console.log(e.currentTarget.dataset.title);
    const self = this;
    this.setData({
      isScoll: true
    })
    setTimeout(function () {
      self.setData({
        active: e.currentTarget.dataset.title
      })
    }, 0)
    setTimeout(function () {
      self.setData({
        isScoll: false
      })
    }, 1)
  },

  fukuan:function(e){
    console.log(e.currentTarget.dataset.id);
    let ids = e.currentTarget.dataset.id

    wx.showModal({
      title: '支付',
      content: '是否确认付款',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.showLoading({
            title: '加载中',
          })
         
          db.collection('submitOK').doc(ids).update({
            data: {
              wc:1
            },
            success: function(res) {
              console.log(res.data)
 
              setTimeout(function () {
                wx.hideLoading()
              }, 0)

              wx.showToast({
                title: '支付成功',
                icon: 'success',
                duration: 2000
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
          wx.showToast({
            title: '取消支付',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  zailaiyd:function(e){
    let id = e.currentTarget.dataset.it.content[0].shop._id
    console.log(id);
    wx.navigateTo({
      url: "/pages/userContent/DataDetails/DataDetails?id="+id,
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