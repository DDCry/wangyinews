mui.init({
	pullRefresh: {
		container: "#refreshContainer", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
		up: {
			contentnomore: "没有更多数据了", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
			contentrefresh: "正在加载...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
			callback: pullfresh //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
		},
		down: {
			style: 'circle', //必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
			color: '#2BD009', //可选，默认“#2BD009” 下拉刷新控件颜色
			height: '50px', //可选,默认50px.下拉刷新控件的高度,
			range: '100px', //可选 默认100px,控件可下拉拖拽的范围
			offset: '0px', //可选 默认0px,下拉刷新控件的起始位置
			auto: true, //可选,默认false.首次加载自动上拉刷新一次
			callback: show //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
		}
	}
});

mui.plusReady(function() {

	mui.ajax('http://c.m.163.com/nc/article/headline/T1348647853363/0-20.html?from=toutiao&passport=&devId=OPdeGFsVSojY0ILFe6009pLR%2FMsg7TLJv5TjaQQ6Hpjxd%2BaWU4dx4OOCg2vE3noj&size=20&version=5.5.3&spever=false&net=wifi&lat=&lon=&ts=1456985286&sign=%2BY9lXIDh3W7j69unWYNEiSG3So2sMceBy%2B%2FiFf2ZfHh48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=appstore', {
		dataType: 'json',
		type: 'get', //请求方式
		timeout: 10000, //超时
		success: function(data) { //成功

			getdata(data)
		},
		error: function(error) { //失败

			console.log("返回失败");

		}
	});

	mui.ajax('http://c.m.163.com/nc/article/headline/T1348647853363/30-20.html?from=toutiao&passport=&devId=OPdeGFsVSojY0ILFe6009pLR%2FMsg7TLJv5TjaQQ6Hpjxd%2BaWU4dx4OOCg2vE3noj&size=20&version=5.5.3&spever=false&net=wifi&lat=&lon=&ts=1456985878&sign=oDwq9mBweKUtUuiS%2FPvB015PyTDKHSxuyuVq2076XQB48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=appstore', {
		dataType: 'json',
		type: 'get',
		timeout: 10000,
		success: function(data) {
			listDataAnalyze(data);
		},
		error: function(error) {
			console.log("列表返回失败");
		}
	});

})

//用来处理列表数据的函数
function listDataAnalyze(data) {

	var arrayObj = data.T1348647853363;
	console.log(arrayObj)
	var table = document.body.querySelector('.mui-table-view');
	var cells = document.body.querySelectorAll('.mui-table-view-cell');
	for(var i = 0; i < arrayObj.length; i++) {
		console.log(arrayObj[i].source)
		var li = document.createElement('li');
		li.className = 'mui-table-view-cell mui-media';
		li.innerHTML = '<a href="javascript:show()"><img class="mui-pull-right" src= ' + arrayObj[i].img + '><div class="mui-media-body"> ' + arrayObj[i].source + '<p class="mui-ellipsis-2"> ' + arrayObj[i].title + '</p></div></a>';

		table.appendChild(li);

	}
}

function show(e) {
	mui.ajax('http://c.m.163.com/nc/article/headline/T1348647853363/30-20.html?from=toutiao&passport=&devId=OPdeGFsVSojY0ILFe6009pLR%2FMsg7TLJv5TjaQQ6Hpjxd%2BaWU4dx4OOCg2vE3noj&size=20&version=5.5.3&spever=false&net=wifi&lat=&lon=&ts=1456985878&sign=oDwq9mBweKUtUuiS%2FPvB015PyTDKHSxuyuVq2076XQB48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=appstore', {
		dataType: 'json',
		type: 'get',
		timeout: 10000,
		success: function(data) {
			mui('#refreshContainer').pullRefresh().endPulldown();
			listDataAnalyze(data);
		},
		error: function(error) {
			console.log("列表返回失败");
		}
	});
}

//上拉加载更多刷新函数
function pullfresh() {
	//列表数据请求
	mui.ajax('http://c.m.163.com/nc/article/headline/T1348647853363/30-20.html?from=toutiao&passport=&devId=OPdeGFsVSojY0ILFe6009pLR%2FMsg7TLJv5TjaQQ6Hpjxd%2BaWU4dx4OOCg2vE3noj&size=20&version=5.5.3&spever=false&net=wifi&lat=&lon=&ts=1456985878&sign=oDwq9mBweKUtUuiS%2FPvB015PyTDKHSxuyuVq2076XQB48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=appstore', {
		dataType: 'json',
		type: 'get',
		timeout: 10000,
		success: function(data) {
			listDataAnalyze(data);
			//注意，加载完新数据后，必须执行如下代码，注意：若为ajax请求，则需将如下代码放置在处理完ajax响应数据之后
			mui('#refreshContainer').pullRefresh().endPullupToRefresh(); //结束刷新
		},
		error: function(error) {
			console.log("列表返回失败");
			alert("网络无连接");
		}
	});
}

function getdata(data) {
	var marqueeArray = data.T1348647853363[0].ads;
	var sliderMarquee = document.getElementById('productSlider');
	var sliderGroup = document.createElement('div');
	sliderGroup.className = 'mui-slider-group mui-slider-loop';
	sliderMarquee.appendChild(sliderGroup);
	var sliderIndicator = document.createElement('div');
	sliderIndicator.className = 'mui-slider-indicator mui-text-right';
	sliderMarquee.appendChild(sliderIndicator);

	for(var i = 0; i < marqueeArray.length; i++) {

		if(0 == i) {
			var sliderItemDuplicate = document.createElement('div');
			sliderItemDuplicate.className = 'mui-slider-item mui-slider-item-duplicate';
			sliderItemDuplicate.innerHTML = '<a href="#"><img src=' + marqueeArray[i].imgsrc + ' /><p class="mui-slider-title">' + marqueeArray[i].title + '</p></a>'
			sliderGroup.appendChild(sliderItemDuplicate);
		}

		var sliderItem = document.createElement('div');
		sliderItem.className = 'mui-slider-item';
		sliderItem.innerHTML = '<a href="#"><img src=' + marqueeArray[i].imgsrc + ' /><p class="mui-slider-title">' + marqueeArray[i].title + '</p></a>'
		sliderGroup.appendChild(sliderItem);

		var indicatorItme = document.createElement('div');
		if(i == 0) {
			indicatorItme.className = 'mui-indicator mui-active';
		} else {
			indicatorItme.className = 'mui-indicator';
		}
		sliderIndicator.appendChild(indicatorItme);

		if(marqueeArray.length - 1 == i) {
			var sliderItemDuplicate = document.createElement('div');
			sliderItemDuplicate.className = 'mui-slider-item mui-slider-item-duplicate';
			sliderItemDuplicate.innerHTML = '<a href="#"><img src=' + marqueeArray[i].imgsrc + ' /><p class="mui-slider-title">' + marqueeArray[i].title + '</p></a>'
			sliderGroup.appendChild(sliderItemDuplicate);
		}

		var slider = mui('.mui-slider');
		slider.slider({
			interval: 500
		});
	}
}