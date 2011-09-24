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

test('脚本加载测试', function() {
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

test('$.param()', function() {
	equal($.param({a:1,b:1,c:1,d:1}), 'a=1&b=1&c=1&d=1', '转换成功');
});



























