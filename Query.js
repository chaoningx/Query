/**
 * xiechaoning@gmail.com
 */
(function(window) {  
var Query = (function() {
	var Query = function(select) {
        return new Query.fn.init(select);
	};
    Query.fn = Query.prototype = {
        constructor: Query,
        init: function(select) {
            var ele = document.querySelectorAll(select);
            this.length = ele.length;
            return this.merge(this, ele);
        },
        merge: function(s, t) {
            var i = 0, tlen = t.length,
                slen = s.length;
            slen = !slen ? 0 : slen;
            for(i; i < tlen; i++) {
                s[slen + i] = t[i];
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
            var o = arg0[0];
            this[i] = o;
        }
    };
return Query;
})();
window.$ = window.Q = Query;
})(window);

