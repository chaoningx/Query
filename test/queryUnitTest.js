$(function() {
//定义测试模块
module( "Query" );
//定义一个简单的函数，判断参数是不是数字
//开始单元测试
test('$.trim()', function() {
    equal($.trim(' 123123'), '123123', '移除字符第一个空格');
    equal($.trim('123123 '), '123123', '移除字符最后一个空格');
    equal($.trim(' 123123 '), '123123', '移除字符首尾空格');
});

test('$.parseJSON()', function() {
    deepEqual($.parseJSON('{ a: 1 }'), { a: 1 }, '两对像相等');
    notDeepEqual($.parseJSON('{ a: 2 }'), { a: 1 }, '两对像不相等');
});

test('$.isFunction()', function() {
    ok($.isFunction(function() {}), '是函数');
    ok(!$.isFunction('12'), '不是函数');
});

test('$.type()', function() {
    equal($.type(function(){}), 'function', '是函数');
    equal($.type(true), 'boolean', '是boolean类型');
    equal($.type('aa'), 'string', '是string类型');
    equal($.type(12), 'number', '是number类型');
    equal($.type([]), 'array', '是array类型');
    equal($.type(new Date()), 'date', '是date类型');
    equal($.type(/12/), 'regexp', '是regExp类型');
    equal($.type({}), 'object', '是object类型');
});

test('$.escapeHTML()', function() {
    equal($.escapeHTML('<script>alert("12");</script>'), "&lt;script&gt;alert(\"12\");&lt;/script&gt;", 'ok');
});

test('$.merge()', function() {
    deepEqual($.merge(), undefined, '没有参数直接返回');
    deepEqual($.merge({ a: 1 }), { a: 1 }, '只有一个参数，则返回此参数值');
    deepEqual($.merge({}, { a: 1 }), {}, '空与B并为空');
    deepEqual($.merge({ a: 1 }, {}), { a: 1 }, 'A与空合并为A');
    deepEqual($.merge({ a: 1 }, { b: 1 }), { a: 1 }, 'A与B无交集合并后为A');
    deepEqual($.merge({ c: 2, a: 1 }, { b: 1, a: 2 }), { c: 2, a: 2 }, 'A与B有交集合并后为A所有值保存，更新与B有交集的值。');
});

test('$.getScript()', function() {
    stop();
    $.getScript('source/loadTest.js', function() {
         $.getScript({
            id: 'xiecn',
            src: 'source/loadTest.js'
         }, function() {
             start();       
        });      
    });
});

document.body.appendChild($('<div id="dom-test" style="display:none;"><span id="text-test">seasontop</span><input type="text" value="seasontop" id="input-test"/></div>')[0]);

test('$.param()', function() {
    equal($.param({a:1,b:1,c:1,d:1}), 'a%3D1%26b%3D1%26c%3D1%26d%3D1', '转换成功');
});

test('attr()', function() {
    var dom = $('#dom-test');
    equal(dom.attr('id'), 'dom-test', 'id属性相等');
    dom.attr('data-name', 'xie');
    equal(dom.attr('data-name'), 'xie', 'data-name属性相等');
});

test('removeAttrs()', function() {
    var dom = $('#dom-test');
    dom.removeAttrs('data-name');
    equal(dom.attr('data-name'), null, '移除属性成功');
});

test('removeAttrs()', function() {
    var dom = $('#dom-test');
    dom.attr('data-t', 'xiecn');
    dom.removeAttrs('data-name', 'data-t');
    equal(dom.attr('data-name'), null, '移除属性data-name成功');
    equal(dom.attr('data-t'), null, '移除属性data-t成功');
});

test('html()', function() {
    var dom = $('#text-test');
    equal(dom.html(), 'seasontop', 'html内容相等');
    dom.html('xiechaoning');
    equal(dom.html(), 'xiechaoning', 'html变更后内容相等');
});
    
test('val()', function() {
    var dom = $('#input-test');
    equal(dom.val(), 'seasontop', 'val值相等');
    dom.val('xiechaoning');
    equal(dom.val(), 'xiechaoning', 'val变更后值相等');
});

test('remove()', function() {
    var dom = $('#input-test');
    dom.remove();
    equal($('#input-test').length, '0', '已经移除');
});

test('empty()', function() {
    var dom = $('#dom-test');
    dom.empty();
    equal($('#dom-test')[0].childNodes.length, '0', '已清空！');
});

test('addClass()', function() {
    var dom = $('#dom-test');
    dom.addClass('addClass').addClass('addClass_2');
    equal(dom.attr('class'), 'addClass addClass_2', 'class添加成功。');
});

test('removeClass()', function() {
    var dom = $('#dom-test');
    dom.removeClass('addClass');
    equal(dom.attr('class'), 'addClass_2', 'class删除成功。');
});

test('replaceClass()', function() {
    var dom = $('#dom-test');
    dom.replaceClass('addClass_2', 'addClass_3');
    equal(dom.attr('class'), 'addClass_3', 'class删除成功。');
});

test('css()', function() {
    var dom = $('#dom-test');
    dom.css({ width: '100px', height: '20px', display: 'block' });
    equal(dom.attr('style'), 'display: block; width: 100px; height: 20px; ', '添加属性成功。')
});

document.body.appendChild($('<div id="dom-test-2" style="position: absolute; top: 100px;left: 200px;"><div id="dom-test-2-1"></div></div>')[0]);
test('offset()', function() {
    var dom = $('#dom-test-2'), innerDom = $('#dom-test-2-1');
    deepEqual(dom.offset(), { left: 200, top: 100 }, 'position: aboslute父级元素的位置正确');
    deepEqual(innerDom.offset(), { left: 200, top: 100 }, 'position: aboslute子级元素的位置正确');
});

test('position()', function() {
    var dom = $('#dom-test-2'), innerDom = $('#dom-test-2-1');
    deepEqual(innerDom.position(), { left: 0, top: 0 }, '子级元素的位置正确');
});

});






















