(function(window) {  
var Query = (function() {
	var htmlTag = /^(?:[^<]*(^<[\w\W]+>$)[^>]*$)/,
	Query = function(select) {
        return new Query.fn.init(select);
	};
    Query.fn = Query.prototype = {
        constructor: Query,
        init: function(select) {
        	if(Query.isFunction(select)) {
        		return this.ready(select);
        	}
			if (select.nodeType) {
				this[0] = select;
				this.length = 1;
				return this;
			}
			if(htmlTag.test(select)) {
				var temp = document.createElement('div');
				temp.innerHTML = select;
				var i = 0, nodes = temp.childNodes, len = nodes.length;
				for(i; i < len; i++) {
					this[i] = nodes[i];
				}
				this.length = len;
				return this;
			}
            try {
                var ele = document.querySelectorAll(select);
                this.length = ele.length;
            }catch(e) {
                ele = [];
            }
            return this.merge(this, ele);
        },
        each: function(callback) {
			var len = this.length, i = 0;
			if(len < 2) {
				callback(0, this[0]);
			}else {
				for(i; i < len; i++) {
					callback(i, this[i]);
				}
			}
		},
        merge: function(s, t) {
            var i = 0, tlen = t.length;
            for(i; i < tlen; i++) {
                s[i] = t[i];
            }
            return s;
        },
        length: 0,
        push: Array.prototype.push,
        sort: [].sort,
        splice : [].splice
    };
    Query.fn.init.prototype = Query.fn;
    Query.extend = Query.fn.extend = function() {
        var arg0 = arguments[0];
        for(var i in arg0) {
            var isExist = this[i];
            if(isExist) { continue; }
            var o = arg0[i];
            this[i] = o;
        }
    };
return Query;
})();

Query.fn.extend({
	ready: function(callback) {
		document.onreadystatechange = function() {
			if (document.readyState == 'complete') {
				document.onreadystatechange = null;
				callback();
			}
		};
	},
	onload: function(target, callback) {
		if(Query.isFunction(target)) {
			target = document;
		}
		target.onload = target.onreadystatechange = function() {
			if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
				callback && callback();
				target.onload = target.onreadystatechange = null;
			}
		};
	}
});

/**
 * dom部分
 */
Query.fn.extend({
	remove: function() {
		this.each(function(i, n){
			n.parentNode.removeChild(n);
		});
	},
	empty: function() {
		this.each(function(i, n) {
			var j = 0, list = n.childNodes, len = list.length;
			for(j; j < len; j++) {
				n.removeChild(list[j]);
			}
		});
	},
	attr: function() {
		var target = this[0];
		if(!target) { return this; }
		if(arguments.length < 2) {
			return target.getAttribute(arguments[0]);
		}else{
			target.setAttribute(arguments[0], arguments[1]);
		}
		return this;
	},
	html: function(str) {
		var target = this[0];
        if(!target) { return this; }
		if(!str) {
			return target.innerHTML;
		}else{
			target.innerHTML = str;
		}
		return this;
	},
	val: function(v) {
		var target = this[0];
        if(!target) { return this; }
		if(!v) {
			return target.value;
		}else{
			target.value = v;
		}
		return this;
	}
});

/**
 * css部分
 */
Query.fn.extend({
	addClass: function(className) {
        var names;
		this.each(function(i, n) {
			names = n.className;
			n.className = names == '' ? className : names + ' ' + className; 
		});
		return this;
	},
    removeClass: function(name) {
        var className, j, names = (name || '').split(' '), len = names.length;
        try{
	        this.each(function(i, n) {
	            if(n.nodeType === 1 && n.className) {
                    if(name) {
                        className = " " + n.className + " ";
                        for(j = 0; j < len; j++) {
                            className = className.replace(' ' + names[j] + ' ', ' ');
                        }
                        n.className = Query.trim(className);
                    }else {
                        n.className = '';
                    }
	            }
	        });
        }catch(e) {
            console.log(e);
        }finally{
            return this;
        }
    },
    replaceClass: function(orgin, target) {
        var reg = new RegExp(orgin);
        target = target ? target : '';
        this.each(function(i, n) {
            n.className = n.className.replace(reg, target);
        });
        return this;
    },
	css: function(kv) {
        var o;
		this.each(function(i, n) {
			for(o in kv) {
				try{
					n.style[o] = kv[o];
				}catch(e) {
					continue;
				}
			}
		});
		return this;
	}
});

var class2type = {
	    "[object Boolean]":"boolean",
	    "[object Number]":"number",
	    "[object String]":"string",
	    "[object Function]":"function",
	    "[object Array]":"array",
	    "[object Date]":"date",
	    "[object RegExp]":"regexp",
	    "[object Object]":"object"
	},
    toString = Object.prototype.toString;

Query.extend({
    parseJSON: function(str) {
	    return (new Function("return " + str))();
	},
    trim: function(str) {
	    return str == null ? '' : str.toString().replace(/^[\s\xA0]+/, '').replace(/[\s\xA0]+$/, '');
	},
    isFunction: function(fn) {
	    return Query.type(fn) === 'function';
	},
    type: function(obj) {
	    return obj == null ? String( obj ) : class2type[ toString.call(obj) ] || "object";
	},
    escapeHTML: function(str) {
	    var div = document.createElement('div'),
	            text = document.createTextNode(str);
	        div.appendChild(text);
	        return div.innerHTML;
	},
    merge: function(source, target) {
	    var len = arguments.length;
	    if(len < 1) { return; }
	    if(len < 2) { return arguments[0]; }
	    var r = {};
	    for(var i in source) {
	        r[i] = typeof target[i] == 'undefined' ? source[i] : target[i];
	    }
	    return r;
	},
	browser: function() {
		var b = {}, a = navigator.userAgent.toLowerCase();
		b.IE = /msie/.test(a);
		b.OPERA = /opera/.test(a);
		b.MOZ = /gecko/.test(a);
		b.IE6 = /msie 6/.test(a);
		b.IE7 = /msie 7/.test(a);
		b.IE8 = /msie 8/.test(a);
		b.SAFARI = /safari/.test(a);
		b.CHROME = /chrome/.test(a);
		b.IPHONE = /iphone os/.test(a);
		return b;
	}
});

/**
 *　ajax部分
 */
Query.extend({
	/**
	 * @param {Element} form 表单元素对象
	 * @param {Function} callback 回调函数
	 */
	form: function(form, callback) {
		var iframeName = 'iframe_' + new Date().getTime(),
			iframe = document.createElement('iframe');
		iframe.setAttribute('width', 0);
		iframe.setAttribute('height', 0);
		iframe.setAttribute('frameborder', 0);
		iframe.setAttribute('name', iframeName);
		form.setAttribute('target', iframeName);
		iframe.onload = function() {
			callback && callback(iframe);
		};
		document.body.appendChild(iframe);
		return form;
	},
	ajax: function(params) {
		params = Query.merge({
			url: '',
			data: '',
			type: 'GET', //GET, POST
			async: true,
			success: '',
			error: '',
			complete: '',
			beforeSend: false,
			dataType: 'json', // json html
			timeout: 10000,
			contentType: 'application/x-www-form-urlencoded',
			user: '',
			password: ''
		}, params);
		var readyState = '',
			timer = '',
			xhr = new XMLRequest();
		params.url = encodeURIComponent(params.url);
		xhr.setRequestHeader('User-Agent', 'XMLHTTP');
		xhr.open(params.type, params.url, params.async, params.user, params.password);
		xhr.onreadystatechange = function() {
			try{
				if(xhr.readyState == 4) {
					if(xhr.status == 200 || xhr.status == 0) {
						clearTimeout(timer);
						var data = xhr.responseText;
						if(params.dataType === 'json') {
							data = Query.parseJSON(data);
						}
						params.success && params.success(data);
					}
				};
			}catch(e) {
				params.error && params.error(e);
			}finally{
				params.complete && params.complete();
			}
		};
		params.beforeSend && params.beforeSend();
		if(type === 'GET') {
			xhr.send(null);
		}else {
			xhr.setRequestHeader('Content-type', params.contentType);
			xhr.send(Query.param(params.data));
		}
		timer = setTimeout(function(){
			xhr.abort();
		}, params.timeout);
	},
	post: function(url, data, callback, dataType) {
		Query.ajax({
			url: url,
			data: data,
			type: 'POST',
			dataType: !dataType ? 'json' : dataType,
			success: callback
		});
	},
	get: function(url, params, callback, dataType) {
		Query.ajax({
			url: url + '?' + Query.param(params),
			type: 'GET',
			dataType: !dataType ? 'json' : dataType,
			success: callback
		});
	},
	param: function(json) {
		var str = JSON.stringify(json);
		return encodeURIComponent(str.substring(2, str.length - 1).replace(/"/g, '').replace(/:/g, "=").replace(/,/g, "&"));
	},
	 /**
     * 异步加载脚本
     * @param pros {String||Object} 如果只有一个属性那么为src, 如果为多属性，请使用JSON格式 
     * @param callback {Function} 回调函数
     */
    getScript: function() {
	    var script = document.createElement('script'),
            pros = arguments[0],
            callback = arguments[1];
        script.onload = script.onreadystatechange = function() {
            if (!this.readyState || this.readyState === "loaded"
                    || this.readyState === "complete") {
                callback && callback();
                script.onload = script.onreadystatechange = null;
            }
        };
        if(Query.type(pros) === 'string') {
            script.src = pros;
        }else {
            for(var name in pros) {
                script.setAttribute(name, pros[name]);
            }
        }
        document.getElementsByTagName('head')[0].appendChild(script);
	}
});
	
window.$ = window.Q = Query;
})(window);

