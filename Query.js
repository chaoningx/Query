(function(window) {  
var Query = (function() {
	var Query = function(select) {
        return new Query.fn.init(select);
	};
    Query.fn = Query.prototype = {
        constructor: Query,
        init: function(select) {
            if(Query.isFunction(select)) {
                return 
            }
            try {
                var ele = document.querySelectorAll(select);
                this.length = ele.length;
            }catch(e) {
                ele = [];
            }
            return this.merge(this, ele);
        },
        ready: function() {
            
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

