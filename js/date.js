(function ($) {
	var opation = {
		week:['日','一','二','三','四','五','六'],
		line:['/','/',' '],
		dir:['<','>']
	}
	var setting = null;
	var parent = null;
	var num = 0;
	function date(obj) {
		obj = obj || {};
		setting = $.extend(opation,obj);
		parent = this;
		createDate();
		time();
		createDay();
		createLi();
		setMonth();
	}
	function createDate() {
		var html = '<div id="date">'+
						'<div class="showTime">'+
							'<p></p>'+
							'<p></p>'+
						'</div>'+
						'<div class="setMonth">'+
							'<p>2017年05月</p>'+
							'<p>'+
								'<span>'+setting.dir[0]+'</span>'+
								'<span>'+setting.dir[1]+'</span>'+
							'</p>'+
						'</div>'+
						'<div class="newDate">'+
							'<div class="day">'+
								'<ul></ul>'+
							'</div>'+
							'<div class="showDate">'+
								'<ul></ul>'+
							'</div>'+
						'</div>'+
					'</div>';
		parent.html(html);
	}
	function time() {
		getTime();
		setInterval(getTime,1000)
		function getTime() {
			var timeP = $('.showTime p');
			var date = new Date();
			var h = date.getHours();
			var min = date.getMinutes();
			var s = date.getSeconds();
			var hms = toTime(h) + ':' + toTime(min) + ':' + toTime(s);
			timeP.eq(0).html(hms);
			var year = date.getFullYear();
			var mon = date.getMonth()+1;
			var d = date.getDate();
			var day = date.getDay();
			var ymdd = year + setting.line[0] + toTime(mon) + setting.line[1] + toTime(d) + setting.line[2] + '星期' + setting.week[day];
			timeP.eq(1).html(ymdd);
		}
	}
	function setMonth() {
		var btn = $('.setMonth span');
		btn.eq(0).on('click',function () {
			num--;
			console.log(num)
			createLi();
		})
		btn.eq(1).on('click',function () {
			num++;
			console.log(num)
			createLi();
		})
	}
	function createDay() {
		var days = $('.day ul');
		for (var i=0;i<setting.week.length;i++) {
			days.html(days.html()+('<li>'+setting.week[i]+'</li>'));
		}
	}
	function createLi() {
		var list = $('.showDate ul');
		list.html('');
		var date = new Date();
		var year = date.getFullYear();
		var mon = date.getMonth();
		var lastDay = new Date(year,mon+1+num,0).getDate();//当月的天数
		var week = new Date(year,mon+num,1).getDay()-1;//当月的1号星期几
		var prevLastDay = new Date(year,mon+num,0).getDate();//上月的天数
		var item = $('.setMonth p').eq(0);
		date.setMonth(date.getMonth()+num);
		var newYear = date.getFullYear();
		var newMon = date.getMonth()+1;
		var ym = newYear + '年' + toTime(newMon) + '月';
		item.html(ym);
		for (var i=week;i>=0;i--) {
			li = $('<li>'+(prevLastDay-i)+'</li>');
			li.addClass('otherMon');
			list.append(li);
		}
		for (var i=1;i<=lastDay;i++) {
			li = $('<li>'+i+'</li>');
			if (i==date.getDate()) {
				li.addClass('selected');
			}
			list.append(li);
		}
		var liLength = 42 - list.children('li').size();
		for (var i=1;i<=liLength;i++) {
			li = $('<li>'+i+'</li>');
			li.addClass('otherMon');
			list.append(li);
		}
	}
	function toTime(n) {
		return n<10 ? '0'+n:n;
	}
	$.fn.extend({
		date:date
	})
})(jQuery)