import {
  froo
} from '../data/meals'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperData: [{
        img: 'cloud://tianxuan-3gaixj5u932de649.7469-tianxuan-3gaixj5u932de649-1314595407/swiper-zhuye/hongbei.jpg',
        id: 1
      },
      {
        img: 'cloud://tianxuan-3gaixj5u932de649.7469-tianxuan-3gaixj5u932de649-1314595407/swiper-zhuye/liangcai.jpg',
        id: 2
      },
      {
        img: 'cloud://tianxuan-3gaixj5u932de649.7469-tianxuan-3gaixj5u932de649-1314595407/swiper-zhuye/chuangyicai.jpg',
        id: 3
      }
    ],
    froods: [],
    froodlkeData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(froo);

    

    let that = this
    const db = wx.cloud.database()
    db.collection('books').watch({
      onChange: function (snapshot) {
        let datass = []
        // 打乱datas数组
        datass = snapshot.docs.sort(function () {
          return Math.random() - 0.5;
        });

        console.log(snapshot.docs);
        that.setData({
          froods: froo,
          froodlkeData: datass.slice(0, 10)
        })
      },
      onError: (err) => {
        console.error(err)
      }
    })
  },

  gotushu: function (e) {
    console.log(e.currentTarget.dataset.it._id);
    wx.reLaunch({
      url: '/pages/userContent/DataDetails/DataDetails?id='+e.currentTarget.dataset.it._id,
    })
  },

  gotueat:function(e){
    console.log(e.currentTarget.dataset.eat);
    wx.navigateTo({
      url: '/pages/userContent/delicious/delicious?eat='+e.currentTarget.dataset.eat,
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