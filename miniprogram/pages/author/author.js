const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    author: '',
    page: 1,
    num: 1,
    detail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      author: options.author
    })

    if (options.author) {
      this.loadDetail()
    }
  },

  loadDetail() {
    let { author, page, num } = this.data
    wx.showLoading({
      title: '详情加载中...',
    })

    wx.cloud.callFunction({
      name: 'collection_get',
      data: {
        database: 'author',
        page,
        num,
        condition: {
          name: author
        }
      },
    }).then(res => {
      if (!res.result.data.length) {
        wx.showToast({
          icon: 'warn',
          title: '加载失败',
        })
      } else {
        this.setData({
          detail: res.result.data[0]
        })

        wx.hideLoading()
      }
      that.setData({
        isDown: true
      })
    }).catch(err => {
        console.log('失败')
        that.setData({
          isExist: false
        })
    })
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