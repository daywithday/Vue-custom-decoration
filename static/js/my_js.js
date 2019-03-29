$('.left_lead2_list_item').click(function() {
	$('.left_lead2_list_item').removeClass('active')
	$(this).addClass('active')
})

$('.content_lead_item').click(function() {
	$('.content_lead_item').removeClass('active')
	$(this).addClass('active')
})
$('.close').click(function() {
	$('.expire').hide()
})
//Date picker
$('#datepicker1').datepicker({
	autoclose: true
})
$('#datepicker2').datepicker({
	autoclose: true
})

//设置默认时间
var myDate = new Date();
var time = myDate.toLocaleDateString().split('/').join('-');
$('#datepicker1').val(time)
$('#datepicker2').val(time)

$('.flow_body_item').click(function() {
	var that = this
	if($(that).hasClass('active')) {
		$(that).removeClass('active')
	} else {
		$(that).addClass('active')
	}
})

try{
	if(echarts) {

	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('main'));

	// 指定图表的配置项和数据
	option = {
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			data: ['浏览量', '访客数', '新访客数', '平均访问深度', '人均停留时长']
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		toolbox: {
			feature: {
				saveAsImage: {}
			}
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: ['2018-11-23', '2018-11-24', '2018-11-25', '2018-11-26', '2018-11-27', '2018-11-28', '2018-11-29']
		},
		yAxis: {
			type: 'value'
		},
		series: [{
				name: '浏览量',
				type: 'line',
				stack: '总量',
				data: [0, 0, 0, 0, 0, 0, 0]
			},
			{
				name: '访客数',
				type: 'line',
				stack: '总量',
				data: [0, 0, 0, 0, 0, 0, 0]
			},
			{
				name: '新访客数',
				type: 'line',
				stack: '总量',
				data: [0, 0, 0, 0, 0, 0, 0]
			},
			{
				name: '平均访问深度',
				type: 'line',
				stack: '总量',
				data: [0, 0, 0, 0, 0, 0, 0]
			},
			{
				name: '人均停留时长',
				type: 'line',
				stack: '总量',
				data: [0, 0, 0, 0, 0, 0, 0]
			}
		]
	};

	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);

	// 基于准备好的dom，初始化echarts实例
	var myChart2 = echarts.init(document.getElementById('deal_data'));

	// 指定图表的配置项和数据
	option = {
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			data: ['付款金额', '付款人数', '付款笔数', '客单价', '访问-下单转化率', '下单-付款转化率', '访问-付款转化率']
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		toolbox: {
			feature: {
				saveAsImage: {}
			}
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: ['2018-11-23', '2018-11-24', '2018-11-25', '2018-11-26', '2018-11-27', '2018-11-28', '2018-11-29']
		},
		yAxis: {
			type: 'value'
		},
		series: [{
				name: '付款金额',
				type: 'line',
				stack: '总量',
				data: [0, 0, 0, 0, 0, 0, 0]
			},
			{
				name: '付款人数',
				type: 'line',
				stack: '总量',
				data: [0, 0, 0, 0, 0, 0, 0]
			},
			{
				name: '付款笔数',
				type: 'line',
				stack: '总量',
				data: [0, 0, 0, 0, 0, 0, 0]
			},
			{
				name: '客单价',
				type: 'line',
				stack: '总量',
				data: [0, 0, 0, 0, 0, 0, 0]
			},
			{
				name: '访问-下单转化率',
				type: 'line',
				stack: '总量',
				data: [0, 0, 0, 0, 0, 0, 0]
			},
			{
				name: '下单-付款转化率',
				type: 'line',
				stack: '总量',
				data: [0, 0, 0, 0, 0, 0, 0]
			},
			{
				name: '访问-付款转化率',
				type: 'line',
				stack: '总量',
				data: [0, 0, 0, 0, 0, 0, 0]
			}
		]
	};

	// 使用刚指定的配置项和数据显示图表。
	myChart2.setOption(option);
}
}catch(e){
	//TODO handle the exception
}


