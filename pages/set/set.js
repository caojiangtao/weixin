Page({
	data: {
		player: [],
		_number: 0,
	},
	onLoad: function() {
		var that = this;
		wx.getStorage({
			key: 'playerdata',
			success: function(res) {
				that.setData({
					player: res.data
				})
				var total = 0;
				for(let i = 0; i < res.data.length; i++) {
					total += that.data.player[i]["number"];
					console.log(total)
				}
				that.setData({
					_number: total
				})
			}
		})

	},

})