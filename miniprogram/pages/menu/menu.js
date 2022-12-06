const db = wx.cloud.database();
Page({
    data: {
        category: [
            {name:'水果',id:'guowei'},
            {name:'蔬菜',id:'shucai'},
            {name:'小炒',id:'chaohuo'},
            {name:'点心',id:'dianxin'},
            {name:'香茶',id:'cucha'},
            {name:'淡饭',id:'danfan'}
        ],
        detail:[],
        curIndex: 0,
        isScroll: false,
        toView: 'guowei',
        // 水果
        shuiguo:[],
        // 蔬菜
        shucai:[],
        // 小炒
        xiaochao:[],
        // 点心
        dianxin:[],
        // 香茶
        xiangcha:[],
        // 淡饭
        danfang:[]

    },
    onLoad:function(){
      console.log('sss');
      let that = this
      db.collection('books').watch({
        onChange:function(res){
          console.log(res.data);
          let shuiguo = [];
          let shucai = [];
          let xiaochao = [];
          let dianxin = [];
          let xiangcha = [];
          let danfan = [];
          // 过滤添加数据
          res.docs.filter(item => {
            if( item.selname.title == "shuiguo" ){
              shuiguo.push(item)
            }
            if(item.selname.title == "shucai"){
              shucai.push(item)
            }
            if( item.selname.title == "xiaochao" ){
              xiaochao.push(item)
            }
            if(item.selname.title == "dianxin"){
              dianxin.push(item)
            }
            if( item.selname.title == "xiangcha" ){
              xiangcha.push(item)
            }
            if(item.selname.title == "danfan"){
              danfan.push(item)
            }
          })



          that.setData({
              shuiguo:shuiguo,
              shucai:shucai,
              xiaochao:xiaochao,
              dianxin:dianxin,
              xiangcha:xiangcha,
              danfang:danfan
          })
        },
        onError: (err) => {
          console.error(err)
        }
      })

    },
    onReady(){
        var self = this;
        wx.request({
            success(res){
                self.setData({
                    detail : res.data
                })
            }
        });
    },
    switchTab(e){
      const self = this;
      this.setData({
        isScroll: true
      })
      setTimeout(function(){
        self.setData({
          toView: e.target.dataset.id,
          curIndex: e.target.dataset.index
        })
      },0)
      setTimeout(function () {
        self.setData({
          isScroll: false
        })
      },1)
        
    },
    gotushu: function (e) {
      console.log(e.currentTarget.dataset.it._id);
      wx.reLaunch({
        url: '/pages/userContent/DataDetails/DataDetails?id='+e.currentTarget.dataset.it._id,
      })
    },
    
})