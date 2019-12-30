// $(function() {
// 	var doc = $(document),
// 		body = $("body"),
// 		docWidth = doc.width(),
// 		docHeight = doc.height(),
// 		horiz = 0,
// 		vert = 0,
// 		x,
// 		y,
// 		range = 12;
//
// 	function noTransition() {
// 		body.removeClass("transition-reset"); //addClass("notransition");
// 	}
//
// 	function followMouse() {
// 		horiz = range * 2 * (x / docWidth) - range;
// 		vert = -(range * 2 * (y / docHeight) - range);
//
// 		$(".content-inner").css(
// 				"transform",
// 				"rotateX(" + vert + "deg) rotateY(" + horiz + "deg)"
// 			);
//
// 		noTransition();
// 	}
//
// 	function reset() {
// 		body.removeClass("notransition").addClass("transition-reset");
// 		$(".content-inner").css("transform", "");
// 	}
//
// 	doc.mousemove(function(e) {
// 		x = e.pageX;
// 		y = e.pageY;
// 	});
//
// 	doc.mousemove($.throttle(50, followMouse));
//
// 	doc.on({
// 		mouseleave: function() {
// 			reset();
// 		},
// 		mousedown: function() {
// 			reset();
// 		}
// 	});
// });
//
// /*
//  * jQuery throttle / debounce - v1.1 - 3/7/2010
//  * http://benalman.com/projects/jquery-throttle-debounce-plugin/
//  *
//  * Copyright (c) 2010 "Cowboy" Ben Alman
//  * Dual licensed under the MIT and GPL licenses.
//  * http://benalman.com/about/license/
//  */
// (function(b, c) {
// 	var $ = b.jQuery || b.Cowboy || (b.Cowboy = {}), a;
// 	$.throttle = a = function(e, f, j, i) {
// 		var h, d = 0;
// 		if (typeof f !== "boolean") {
// 			i = j;
// 			j = f;
// 			f = c;
// 		}
// 		function g() {
// 			var o = this, m = +new Date() - d, n = arguments;
// 			function l() {
// 				d = +new Date();
// 				j.apply(o, n);
// 			}
// 			function k() {
// 				h = c;
// 			}
// 			if (i && !h) {
// 				l();
// 			}
// 			h && clearTimeout(h);
// 			if (i === c && m > e) {
// 				l();
// 			} else {
// 				if (f !== true) {
// 					h = setTimeout(i ? k : l, i === c ? e - m : e);
// 				}
// 			}
// 		}
// 		if ($.guid) {
// 			g.guid = j.guid = j.guid || $.guid++;
// 		}
// 		return g;
// 	};
// 	$.debounce = function(d, e, f) {
// 		return f === c ? a(d, e, false) : a(d, f, e !== false);
// 	};
// })(this);
