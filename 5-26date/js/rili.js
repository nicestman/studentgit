(function($){
	var link = $('<link rel="stylesheet" href="css/new_file.css" />');
	$('head').append(link);
	var opaction = {//默认参数对象
		week:['日','一','二','三','四','五','六'],
		dir:['left','right'],
		line:['/','/','/']
	}
	var setting = {};
	var parent = null;
	var num = 0;
	function rili(obj){
		obj = obj||{};
		setting = $.extend(opaction,obj);
		parent = this;
		creatrBox();
		time();
		createLi();
		next();
	}
	function creatrBox(){
		var html = '<div id="warp">'+
						'<div id="box">'+
							'<div id="nowtime"><h1></h1></div>'+
							'<div id="date"><p></p></div>'+
							'<div id="switch">'+
								'<p></p>'+
								'<ul>'+
									'<li><a href="javascript:;">'+setting.dir[0]+'</a></li>'+
									'<li><a href="javascript:;">'+setting.dir[1]+'</a></li>'+
								'</ul>'+
							'</div>'+
							'<div id="dates">'+
								'<ul id="week">';
									for(var i=0;i<setting.week.length;i++){
										html += '<li>'+setting.week[i]+'</li>'
									}
								html += '</ul>'+						
								'<ul id="day">'+
								'</ul>'+
							'</div>'+
						'</div>'+
					'</div>';
		parent.html(html);
	}
	function time(){
		cheangeTime();
		setInterval(cheangeTime,1000);
		function cheangeTime(){
			var date = new Date();
			var hms = $('#nowtime h1');
			var item1 = $('#date p');
			var y = date.getFullYear();
			var mon = date.getMonth()+1;
			var d = date.getDate();
			var day = date.getDay();
			var h = date.getHours();
			var m = date.getMinutes();
			var s = date.getSeconds();
			var str = toTime(h) +':'+ toTime(m) +':'+ toTime(s);
			var str2 = y+setting.line[0]+toTime(mon)+setting.line[1]+toTime(d)+setting.line[2]+'  星期'+setting.week[day];
			hms.html(str);
			item1.html(str2)
		}
	}
	function createLi(){
		var list = $('#day');
		list.html('');
		var date = new Date();
		date.setMonth(date.getMonth()+1+num);
		date.setDate(0);
		var nowDay = date.getDate();
		var date = new Date();
		date.setMonth(date.getMonth()+num);
		var item2 = $('#switch p');
		var y = date.getFullYear();
		var mon = date.getMonth()+1;
		var str = y +'年'+toTime(mon)+'月';
		item2.html(str);
		date.setDate(1)
		var m = date.getDay();
		var date = new Date();
		date.setMonth(date.getMonth()+num);
		date.setDate(0);
		var prevDay = date.getDate();
		//上个月剩余的天数
		for(var i=(prevDay-m);i<prevDay;i++){
			var li = $('<li>'+(i+1)+'</li>');
			li.addClass('prev');
			list.append(li);
		}
		//当前月的天数
		var date = new Date();
		var noeDate = date.getDate();
		for(var i=0;i<nowDay;i++){
			var li = $('<li>'+(i+1)+'</li>');
			if(i == noeDate-1&&num==0){
				li.addClass('selected');
			}
			list.append(li);
		}
		//下个月的天数
		var len = 42;
		var yet = list.find('li').length;
		for(var i=0;i<(len - yet);i++){
			var li = $('<li>'+(i+1)+'</li>');
			li.addClass('prev');
			list.append(li);
		}
	}
	function next(){
		var As = $('#switch a');
		As.eq(0).on('click',function(){
			num--;
			createLi();
		})
		As.eq(1).on('click',function(){
			num++;
			createLi();
		})
	}
	function toTime(n){
		return n>=10?''+n:'0'+n;
	}
	$.fn.extend({
		rili:rili
	})
})(jQuery)