/*
h.js 1.2.1
作者 : 深海 5213606@qq.com
官网 : http://www.hcoder.net/h
*/
var h = (function(selector, undefined){
	var isId = /^#([\w-]+)$/, isClass = /^\.([\w-]+)$/, isTag = /^[\w-]+$/;
	var hbase = function(selector){
		if(!selector){return addFuns(new Array(document));}
		if(typeof(selector) == 'string'){selector = selector.trim(); return getDoms(selector);}
		if(typeof(selector) == 'object'){return addFuns(new Array(selector));}
		return null;
	}
	var getDoms = function(selector){
		if(isId.test(selector)){var dom = document.getElementById(RegExp.$1); var doms = new Array(); if(dom){doms[0] = dom;} return addFuns(doms);}
		if(isClass.test(selector)){var doms = document.getElementsByClassName(RegExp.$1); return addFuns(doms);}
		if(isTag.test(selector)){var doms = document.getElementsByTagName(selector); return addFuns(doms);}
	}
	var addFuns = function(doms){
		if(!doms){doms = new Array();} if(!doms[0]){doms = new Array();}
		var reObj = {dom:doms, length:doms.length}; reObj.__proto__ = hExtends; return reObj;
	}
	var hExtends = {
		val : function(vars){
			if(typeof(vars) != 'undefined'){for(var i = 0; i < this.length; i++){this.dom[i].value = vars;} return this;}
			return this.dom[0].value;
		},
		hasClass : function(cls){
			if(this.length != 1){return false;}
			if(this.dom[0].className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'))){
				return true;
			}
			return false;
		},
		addClass : function(cls){
			if(this.length < 1){return this;}
			for(var i = 0; i < this.length; i++){
				if(!this.dom[i].className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))){this.dom[i].className += " " + cls;}
			}
			return this;
		},
		removeClass : function(cls){
			if(this.length < 1){return this;} var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)'); 
			for(var i = 0; i < this.length; i++){this.dom[i].className = this.dom[i].className.replace(reg, ' ');}
			return this;
		},
		hide : function(){
			if(this.length < 1){return this;}
			for(var i = 0; i < this.length; i++){this.dom[i].style.display = 'none';}
			return this;
		},
		show : function(){
			if(this.length < 1){return this;}
			for(var i = 0; i < this.length; i++){this.dom[i].style.display = 'block';} return this;
		},
		each : function(callBack){for(var i = 0; i < this.length; i++){this.dom[i].index = i; callBack(this.dom[i]);}},
		size : function(){return this.length;},
		html : function(html){
			if(this.length < 1){return this;}
			if(typeof(html) != 'undefined'){for(var i = 0; i < this.length; i++){this.dom[i].innerHTML = html;} return this;}
			return this.dom[0].innerHTML;
		},
		find : function(selector){
			if(this.length != 1){return this;}
			if(isId.test(selector)){var dom = document.getElementById(RegExp.$1); var doms = new Array(); if(dom){doms[0] = dom;} return addFuns(doms);}
			if(isClass.test(selector)){var doms = this.dom[0].getElementsByClassName(RegExp.$1); return addFuns(doms);}
			if(isTag.test(selector)){var doms = this.dom[0].getElementsByTagName(selector); return addFuns(doms);}
		},
		eq : function(index){return addFuns(new Array(this.dom[index]));},
		last : function(){return addFuns(new Array(this.dom[this.length - 1]));},
		first : function(){return addFuns(new Array(this.dom[0]));},
		next : function(){return addFuns(new Array(this.dom[0].nextElementSibling || this.dom[0].nextSibling));},
		parent : function(){return addFuns(new Array(this.dom[0].parentNode));},
		siblings : function(){
			if(!this.dom[0]){return addFuns();}
			var nodes=[], startNode = this.dom[0], nextNode, preNode;
			var currentNode = startNode;
			while(nextNode = currentNode.nextElementSibling){nodes.push(nextNode); currentNode = nextNode;}
			currentNode = startNode;
			while(preNode = currentNode.previousElementSibling){nodes.push(preNode); currentNode = preNode;}
			return addFuns(nodes);
		},
		css : function(cssObj){
			if(this.length < 1){return this;}
			for(var i = 0; i < this.length; i++){var styleObj = this.dom[i].style; for(var k in cssObj){eval('styleObj.'+k+' = "'+cssObj[k]+'";');}} return this;
		},
		clone : function(){if(this.length < 1){return this;} var nodeClone = this.dom[0].cloneNode(true); return addFuns(new Array(nodeClone));},
		appendTo : function(parentObj){
			if(this.length < 1){return this;}
			if(typeof(parentObj) == 'object'){parentObj.dom[0].appendChild(this.dom[0]);}else if(typeof(parentObj) == 'string'){
				var parentDom = h(parentObj); if(parentDom.length >= 1){parentDom.dom[0].appendChild(this.dom[0]);}
			}
		},
		prependTo : function(parentObj){
			if(this.length < 1){return this;}
			if(typeof(parentObj) == 'object'){parentObj.dom[0].insertBefore(this.dom[0], parentObj.dom[0].firstChild);}
			else if(typeof(parentObj) == 'string'){
				var parentDom = h(parentObj); if(parentDom.length >= 1){parentDom.dom[0].insertBefore(this.dom[0], parentDom.dom[0].firstChild);}
			}
		},
		animate : function(animateObj, timer, callBack){
			if(this.length != 1){return this;} if(!timer){timer = 300;}
			var interVal = null, styleObj = this.dom[0].style, i = 0, start = {};
			if(this.dom[0].getAttribute('isAnimate')){return false;}
			this.dom[0].setAttribute('isAnimate', 'Yes');
			var thisObj = this, styleVal = 0;
			for(var k in animateObj){
				if(k.indexOf('scroll') != -1){
					eval('styleVal = thisObj.dom[0].'+k);
					eval('start.'+k+' = Number(styleVal);');
				}else{
					eval('styleVal = styleObj.'+k);
					if(!styleVal){styleVal = 0;}else{styleVal = styleVal.toLowerCase(); styleVal = styleVal.replace(/px|%/,'');}
					eval('start.'+k+' = Number(styleVal);');
				}
			}
			interVal = setInterval(function(){
				for(var k in animateObj){
					eval('var startVal = start.'+k+';');
					var endVal = animateObj[k];
					if(k.indexOf('scroll') != -1){
						console.log(endVal);
						if(startVal!= endVal){eval('thisObj.dom[0].'+k+' = "'+(startVal + (endVal - startVal)* i / timer)+'";');}
					}else{
						endVal = endVal.toString();
						if(endVal.indexOf('px') != -1){
							endVal = Number(endVal.replace('px',''));
							if(startVal != animateObj[k]){eval('styleObj.'+k+' = "'+(startVal + (endVal - startVal)* i / timer)+'px";');}
						}else if(endVal.indexOf('%') != -1){
							endVal = Number(endVal.replace('%',''));
							if(startVal != animateObj[k]){eval('styleObj.'+k+' = "'+(startVal + (endVal - startVal)* i / timer)+'%";');}
						}else{
							
							if(startVal != animateObj[k]){eval('styleObj.'+k+' = "'+(startVal + (endVal - startVal)* i / timer)+'";');}
						}
					}
				}
				if(i >= timer){clearInterval(interVal); thisObj.dom[0].removeAttribute('isAnimate'); if(callBack){callBack();}}; i += 20;
			}, 20);
		},
		remove : function(){if(this.length < 1){return this;} for(var i = 0; i < this.length; i++){this.dom[0].parentNode.removeChild(this.dom[0]);}},
		attr : function(attrName, val){
			if(this.length < 1){return this;}
			if(typeof(val) != 'undefined'){for(var i = 0; i < this.length; i++){this.dom[i].setAttribute(attrName, val);} return this;}
			return this.dom[0].getAttribute(attrName);
		},
		removeAttr : function(attrName){
			if(this.length < 1){return this;}for(var i = 0; i < this.length; i++){this.dom[i].removeAttribute(attrName);}
			return this;
		},
		height : function(isOffset){
			if(this.length != 1){return 0;}
			if(isOffset){return this.dom[0].offsetHeight;} return this.dom[0].clientHeight;
		},
		width : function(isOffset){
			if(this.length != 1){return 0;}
			if(isOffset){return this.dom[0].offsetWidth;} return this.dom[0].clientWidth;
		},
		offset : function(){if(this.length != 1){return {left:0, top:0};} return h.offset(this.dom[0]);},
		isShow : function(){
			if(this.length != 1){return true;}
			if(this.dom[0].currentStyle){
				var showRes = this.dom[0].currentStyle.display;
			}else{
				var showRes = getComputedStyle(this.dom[0], null).display;
			}
			if(showRes == 'none'){return false;} return true;
		},
		tap : function(callBack){
			if(this.length < 1){return true;}
			this.dom[0].addEventListener('tap',  callBack);
		}
	}
	hbase.extend  = function(funName, fun){eval('hExtends.'+funName+' = fun;');}
	hbase.offset = function(e){
		var offset  = {left:0, top:0}; offset.left = e.offsetLeft; offset.top  = e.offsetTop;
		while(e = e.offsetParent){offset.top += e.offsetTop; offset.left += e.offsetLeft;} return offset;
	}
	hbase.scrollTop = function(val){document.body.scrollTop = val;};
	hbase.winInfo = function(){
		var winInfo = {height:0, width:0, scrollTop:0};
		if(window.innerHeight){winInfo.height = window.innerHeight;}else if((document.body)&&(document.body.clientHeight)){winInfo.height = document.body.clientHeight;}
		if(window.innerWidth){winInfo.width = window.innerWidth;}else if((document.body)&&(document.body.clientWidth)){winInfo.width = document.body.clientWidth;}
		if(document.documentElement && document.documentElement.scrollTop){winInfo.scrollTop = document.documentElement.scrollTop;}else if(document.body){winInfo.scrollTop = document.body.scrollTop;}
		return winInfo;
	}
	hbase.getItem = function(keyName){return plus.storage.getItem(keyName);}
	hbase.setItem = function(keyName, val){plus.storage.setItem(keyName, val);}
	hbase.removeItem = function(keyName){plus.storage.removeItem(keyName);}
	hbase.clearItem = function(keyName){plus.storage.clear();}
	hbase.currentView = function(){return plus.webview.currentWebview();}
	hbase.indexView = function(){return plus.webview.getLaunchWebview();}
	hbase.topView = function(){return plus.webview.getTopWebview();}
	hbase.device = function(){
		return {imei:plus.device.imei, imsi:plus.device.imsi, model:plus.device.model, vendor:plus.device.vendor, uuid:plus.device.uuid};
	};
	hbase.version = function(){return plus.runtime.version;}
	return hbase;
})(document);