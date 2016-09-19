/*!
 * library v2.0.0 (https://github.com/johnlucita/Lucita)
 * Copyright 2015-2016 Lucita, Private.
 * Licensed under MIT (https://github.com/johnlucita/Lucita/blob/master/LICENSE)
 */

/*-----------------------------------------------------------------------------------
 * 库函数
 * 
 -----------------------------------------------------------------------------------*/
/**
 * 主库函数
 * 
 */
var library = {
    link: function (path, mark) {
        if (!isEmpty(path)) {
            if (path.match(/\.(css)$/i) == null) {
                path += '.css';
            }

            this.link_clear(mark);
            var _head = document.getElementsByTagName('head')[0];
            var _link = document.createElement('link');
            _link.href = path;
            _link.setAttribute('library-link', mark);
            _link.rel = 'stylesheet';
            _link.type = 'text/css';
            _link.media = 'screen';
            _head.appendChild(_link);
        }
    }, 
    link_clear: function(mark) {
        var _$libs = $('head > link[library-link="' + mark + '"]');

        if (_$libs.length) {
            _$libs.remove();
        }
    }, 
    script: function (path, mark) {
        if (!isEmpty(path)) {
            if (path.match(/\.(js)$/i) == null) {
                path += '.js';
            }

            this.script_clear(mark);
            var _head = document.getElementsByTagName('head')[0];
            var _script = document.createElement('script');
            _script.src = path;
            _script.setAttribute('library-script', mark);
            _script.type = 'text/javascript';
            _head.appendChild(_script);
        }
    }, 
    script_clear: function (mark) {
        var _$libs = $('head > script[library-script="' + mark + '"]');

        if (_$libs.length) {
            _$libs.remove();
        }
    }, 
    consummate_image: function (path) {
        if (path) {
            var _$imgs = $('img.incomplete_image');

            if (_$imgs.length) {
                $.each(_$imgs, function (i, img) {
                    var _imgName = $(img).attr('alt');

                    if (_imgName) {
                        _imgName += '?' + Math.random();
                    }

                    $(img).attr('src', path + _imgName);
                });
            }
        }

        return false;
    }
};

/*-----------------------------------------------------------------------------------
 * 浏览器版本函数
 * 
 -----------------------------------------------------------------------------------*/
// 获取浏览器名称
var browserName = navigator.userAgent.toLowerCase();

/**
 * 判断浏览器是否为IE
 * 
 * @returns 是返回true，不是返回false.
 */
function isIE() {
	var _result = false;
	if (browserName.indexOf('msie') > -1) {
		_result = true;
	}
	return _result;
}
/**
 * 判断浏览器是否为FireFox
 * 
 * @returns 是返回true，不是返回false.
 */
function isFireFox() {
	var _result = false;
	if (browserName.indexOf('firefox') > -1) {
		_result = true;
	}
	return _result;
}
/**
 * 判断浏览器是否为Chrome
 * 
 * @returns 是返回true，不是返回false.
 */
function isChrome() {
	var _result = false;
	if (browserName.indexOf('chrome') > -1) {
		_result = true;
	}
	return _result;
}
/**
 * 判断浏览器是否为Safari
 * 
 * @returns 是返回true，不是返回false.
 */
function isSafari() {
	var _result = false;
	if (browserName.indexOf('safari') > -1) {
		_result = true;
	}
	return _result;
}
/**
 * 判断浏览器是否为Opera
 * 
 * @returns 是返回true，不是返回false.
 */
function isOpera() {
	var _result = false;
	if (browserName.indexOf('opera') > -1) {
		_result = true;
	}
	return _result;
}
/**
 * 判断浏览器是否支持CSS3属性
 * 
 * @param p 属性名
 * @param v 属性值
 * @returns true/false
 */
function supportCSS3(p, v) {
	var _result = false;
	if (p) {
		var _element = document.createElement('div');
		if (p in _element.style) {
			_element.style[p] = v;
			_result = _element.style[p] === v;
		}
	}
	
	return _result;
}
/**
 * 判断浏览器是否支持HTML5
 * 
 * @returns true/false
 */
function supportHTML5() {
	return window.applicationCache ? true : false;
}
/**
 * 添加收藏夹
 * 
 * @param url 收藏的地址
 * @param alias 别名
 */
function addFavorite(url, alias) {
	try {
		window.external.addFavorite(url, alias);
	} catch(e) {
		try {
			window.sidebar.addPanel(alias, url, '');
		} catch(e) {
			alert("加入收藏失败，请使用Ctrl+D进行添加");
		}
	}
}
/**
 * 设为首页
 * 
 * @param obj 首页对象
 * @param url 首页地址
 * @returns
 */
function setBrowserHomePage(obj, url) {
	try {
		obj.style.behavior = 'url(#default#homepage)';
		obj.setHomePage(url);
	} catch(e) {
		if (window.netscape) {
			try {
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
			} catch(e) {
				alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true', 双击即可。"); 
			}
			var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
			prefs.setCharPref('browser.startup.homepage', url);
		}
	}
}
/*-----------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------
 * 字符串校验函数
 * 
 -----------------------------------------------------------------------------------*/
/**
 * 判断字符串是否为空串
 * 
 * @param str 字符串
 * @returns true/false
 */
function isEmpty(str) {
	return str === null || str === undefined || (typeof str === 'string' && (str === '' || $.trim(str) === '')) || false;
}
/**
 * 判断字符串是否为正整数
 * 
 * @param str
 * @returns true/false
 */
function isInteger(str) {
	return /^\d+$/.test(str);
}
/**
 * 判断字符串是否为手机号码
 * 
 * @param str
 * @returns true/false
 */
function isPhoneNumber(str){
	var _reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
	return _reg.test(str);
}

/**
 * 判断字符串是否为电子邮箱地址
 * 
 * @param str
 * @returns true/false
 */
function isEMailAddress(str){
	var _reg = /^\w+([-_.]\w+)*@\w+([-.]\\w+)*\.\w+([-.]\w+)*$/;
	return _reg.test(str);
}

/**
 * 判断对象是否为JSON对象
 * 
 * @param obj
 */
function isJson(obj) {
    return typeof (obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
}
/*-----------------------------------------------------------------------------------*/


/*-----------------------------------------------------------------------------------
 * URL函数
 * 
 -----------------------------------------------------------------------------------*/
/**
 * 获取url地址中指定参数名称的参数值
 * 
 * @param name 参数名称
 * @returns 参数值
 */
function getQueryString(name) {
	var _reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var _r = window.location.search.substr(1).match(_reg);
	
	return _r && unescape(_r[2]) || null;
}
/**
 * 超文本引用
 * 
 * @param option 
 * {
 * 	field type 'GET' or 'POST'
 * 	field url 引用地址
 * 	field data 参数json串
 * 	field datatype 返回数据类型
 * 	field isjump 是否跳转
 * 	field $matrix 承载对象
 * 	field fun 回调函数
 * }
 */
function hypertextReference(option) {
	var _opt = {
			type: 'GET', 
			url: '', 
			data: {}, 
			xhrFields: {
				withCredentials: true
			}, 
			crossDomain: true, 
			datatype: 'jason', 
			isjump: true, 
			position: '_self', /*_blank 表示新开一个窗口，_parent表示父框架窗口，_self表示覆盖该窗口，xxx表示覆盖名字为xxx的窗口 */
			features: '', /* 属性控制字符串，在此控制窗口的各种属性，属性之间以逗号隔开。
							fullscreen= { yes/no/1/0 } 是否全屏，默认no
							channelmode= { yes/no/1/0 } 是否显示频道栏，默认no
							toolbar= { yes/no/1/0 } 是否显示工具条，默认no
							location= { yes/no/1/0 } 是否显示地址栏，默认no
							directories = { yes/no/1/0 } 是否显示转向按钮，默认no
							status= { yes/no/1/0 } 是否显示窗口状态条，默认no
							menubar= { yes/no/1/0 } 是否显示菜单，默认no
							scrollbars= { yes/no/1/0 } 是否显示滚动条，默认yes
							resizable= { yes/no/1/0 } 是否窗口可调整大小，默认no
							width=number 窗口宽度（像素单位）
							height=number 窗口高度（像素单位）
							top=number 窗口离屏幕顶部距离（像素单位）
							left=number 窗口离屏幕左边距离（像素单位） */
			$matrix: undefined, 
			fun: undefined
	}
	
	$.extend(true, _opt, option);
	if (_opt.url) {
		if (_opt.isjump) {
			var _url = _opt.url;
			if (!$.isEmptyObject(_opt.data)) {
				var _param = changeJsonToUrlParameter(_opt.data);
				_url += '?' + _param;
			}
			window.open(_url, _opt.position, _opt.features);
			if (_opt.fun != undefined 
					&& typeof _opt.fun === 'function') {
				_opt.fun();
			}
		} else {
			if (_opt.$matrix instanceof jQuery 
					&& _opt.$matrix.length) {
				loadAfter = function() {
					if (_opt.fun && 
							$.isFunction(_opt.fun)) {
						setTimeout(_opt.fun, 100);
					}
				};
				_opt.$matrix.load(
						_opt.url, 
						($.isEmptyObject(_opt.data) ? null : _opt.data), 
						loadAfter
				);
			}
		}
	}
}
/**
 * 把JSON对象转换成URL参数字符串
 * 
 * @param json json对象
 * @returns {String} url参数字符串
 */
function changeJsonToUrlParameter(json) {
	var _result = '';
	
	if (!$.isEmptyObject(json)) {
		var _strJson = JSON.stringify(json).replace('{', '').replace('}', '');
		var _arrJson = _strJson.split(',');
		
		if (_arrJson.length) {
			$.each(_arrJson, function(i, jsonString) {
				var _key = jsonString.split(':')[0];
				var _value = jsonString.split(':')[1];
				_result += _result ? '&' + (_key + '=' + _value) :  (_key + '=' + _value);
			});
		}
	}
	
	return _result.replace(/\"/g, "");
}
/**
 * 把URL参数字符串转换成JSON对象
 * 
 * @param url url参数字符串
 * @returns {___anonymous4552_4553} json对象
 */
function changeUrlParameterToJsonObject(url) {
	var _result = {};
	
	if (url) {
		var _arrParam = url.split('&');
		if (_arrParam.length) {
			$.each(_arrParam, function(i, paramString) {
				var _key = paramString.split('=')[0];
				var _value = paramString.split('=')[1];
				_result[_key] = _value;
			});
		}
	}
	
	return _result;
}
/*-----------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------
 * 系统函数
 * 
 -----------------------------------------------------------------------------------*/
/**
 * 获取触发事件
 * 
 * @param e 事件实例
 * @returns 触发事件
 */
function getEvent(e) {
	return e || window.Event;
}
/**
 * 获取触发事件的对象
 * 
 * @param e 事件实例
 * @returns 触发事件的对象
 */
function getEventObject(e) {
	var _event = getEvent(e);
	return _event.srcElement || _event.target || undefined;
}
/**
 * 获取系统当前时间戳
 * 
 * @returns 系统当前时间戳
 */
function getTimestamp(){
	var _time = new Date();
	return _time.getTime();
}
/**
 * 复制到剪贴板
 * 
 * @param content 复制内容
 */
function setClipboard(content) {
	if (isIE()) {
		window.clipboardData.setData('text', content);
	} else {
		netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
		var _clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
		if (_clip) {
			var _trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
			if (_trans) {
				_trans.addDataFlavor('text/unicode');
				_clip.getData(_trans, _clip.kGlobalClipboard);
				var _str = new Object();
				_str = Components.classes['@mozilla.org/supports-string;1'].createInstance(Components.interfaces.nsISupportsString);
				_str.data = content;
				_trans.setTransferData("text/unicode", _str, content.length * 2);
				var _clipid = Components.interfaces.nsIClipboard;
				_clip.setData(_trans, null, _clipid.kGlobalClipboard);
			}
		}
	}
}
/**
 * 获取剪贴板内容
 * 
 * @return 剪贴板内容
 */
function getClipboard() {
	var _content = '';
	if (isIE()) {
		_content = window.clipboardData.getData('text');
	} else {
		netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
		var _clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
		if (_clip) {
			var _trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
			if (_trans) {
				_trans.addDataFlavor('text/unicode');
				_clip.getData(_trans, _clip.kGlobalClipboard);
				var _str = new Object();
				var _len = new Object();
				try {
					_trans.getTransferData('text/unicode', _str, _len);
				} catch (error) {
					
				}
				if (_str) {
					var _result = null;
					if (Components.interfaces.nsISupportsWString) {
						_result = _str.value.QueryInterface(Components.interfaces.nsISupportsWString);
					} else if (Components.interfaces.nsISupportsString) {
						_result = _str.value.QueryInterface(Components.interfaces.nsISupportsString);
					}
					
					if (_result) {
						_content = _result.data.substring(0, _len.value / 2);
					}
				}
			}
		}
	}
	
	return _content;
}
/*-----------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------*/
