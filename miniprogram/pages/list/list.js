// miniprogram/pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexKey: '',
    tags: '',
    list: [],
    page: 1,
    num: 10,
    loading: false,
    isOver: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.tags //页面标题为路由参数
    })

    this.setData({
      tags: options.tags,
      indexKey: options.indexkey
    })
    this.loadList(options.tags)
  },

  lower () {
    this.loadList(this.data.tags)
  },

  loadList (tags) {
    if (!this.data.isOver) {
      let {indexKey, list, page, num} = this.data
      let that = this
      let condition = {}

      switch(indexKey)
      {
          case 'dynasty':
            condition = {dynasty: tags}
            break;
          case 'author':
            condition = {author: tags}
            break;
          case 'rhythmic' : 
            condition = {rhythmic: tags}
            break;
          default:
            condition = {category: tags}
      }

      this.setData({
        loading: true
      })
      wx.cloud.callFunction({
        name: 'collection_get',
        data: {
          database: 'gushici',
          page,
          num,
          condition
        },
      }).then(res => {
          if(!res.result.data.length) {
            that.setData({
              loading: false,
              isOver: true
            })
          } else {
            let res_data = res.result.data
            list.push(...res_data)
            that.setData({
              list,
              page: page + 1,
              loading: false
            })
          }
        })
        .catch(console.error)
    }

  },

  goDetail (e) {
    let _id = e.currentTarget.dataset.id
    wx.cloud.callFunction({
      name: 'collection_update',
      data: {
        id: _id
      },
    }).then(res => {
        wx.navigateTo({
          url: `/pages/detail/detail?id=${e.currentTarget.dataset.id}`,
        })
      })
      .catch(console.error)
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})