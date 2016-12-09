Page({
  data: {
    imgUrls: [
      'http://ohcm6uzn6.bkt.clouddn.com/838ba61ea8d3fd1f67d612a6384e251f94ca5f4a.jpg',
      'http://ohcm6uzn6.bkt.clouddn.com/7aec54e736d12f2e489712fc47c2d56284356898.jpg',
      'http://ohcm6uzn6.bkt.clouddn.com/267f9e2f0708283893086c88b099a9014c08f121.jpg',
      'http://ohcm6uzn6.bkt.clouddn.com/b999a9014c086e06998599d70a087bf40ad1cb79.jpg',
      'http://ohcm6uzn6.bkt.clouddn.com/aec379310a55b31989b426e94ba98226cefc17d8.jpg'
    ],
    indicatorDots: true, //是否显示圆点
    autoplay: true, //是否自动切换
    interval: 5000, //自动切换时间间隔
    duration: 1000  //滑动动画时长
  },
  changeIndicatorDots: function(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function(e) {
    this.setData({
      duration: e.detail.value
    })
  }
})
