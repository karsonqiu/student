var page = 1;
var size = 10;
var allSize;
var tableData = [];
var state = true;

var addForm = $('#add-student-form');
var tBody = $('#information');
var redactForm = $('#redact-form');
var checkButtom = $('.check-button');
var checkFrom = $('.screenbox');
var checkReset = $('.check-reset');

//判断是否登录
function loginSuccess() {
    var username = getCookie('username')
    if (username) {
        $('.name').text(username);
    } else {
        // location.href = './login.html';
    }
}
// loginSuccess();

//重置条件
function init() {
    location.hash = 'student-list';
}
init();

//事件
function events() {
    //退出登录
    $('._exit').click(function () {
        location.href = './login.html';
    })
    //打开关闭新增学生
    $('.addstudent').click(function () {
        $('.addcontent').fadeIn(200)
    })
    $('.shutdowm').click(function () {
        $('.addcontent').fadeOut(200)
    })
    //新增学生功能
    $('#addsubmit').click(function (e) {
        var event = e || window.event;
        event.preventDefault();
        var data = getFormDate(addForm);
        if (data.status == 'success') {
            newAjax('GET', '/api/student/addStudent', data.data, function () {
                alert('添加成功');
                $('.addcontent').fadeOut(200)
                getTableDate();
            })
        } else {
            alert(data.msg);
        }
    })
    //编辑删除学生功能
    $('.redact-shutdowm').click(function () {
        $('.redact').fadeOut(200);
    })
    tBody.on('click', 'span', function () {
        if (this.classList.contains('edit')) {
            var index = this.dataset.index;
            $('.redact').fadeIn(200);
            renderEditForm(tableData[index]);
        } else if (this.classList.contains('remove')) {
            var index = this.dataset.index;
            var isDel = confirm('确定删除学号为' + tableData[index].sNo + '的学员吗？')
            if (isDel) {
                newAjax('GET', '/api/student/delBySno', { sNo: tableData[index].sNo }, function () {
                    alert('删除成功');
                    page = 1;
                    rightPage.style.color = '#C0C8D5';
                    rightPage.onclick = null;
                    getTableDate();
                })
            }
        }
    })
    //确认修改功能
    $('#redact-submit').click(function (e) {
        var event = e || window.event;
        event.preventDefault();
        var data = getFormDate(redactForm);
        if (data.status == 'success') {
            newAjax('GET', '/api/student/updateStudent', data.data, function () {
                alert('修改成功');
                $('.redact').fadeOut();
                getTableDate();
            })
        } else {
            alert(data.msg);
        }
    })

    //条件查询
    checkButtom.click(function (e) {
        state = false;
        page = 1;
        var event = e || window.event;
        event.preventDefault();
        getTableCheck()
    })
    //重置条件
    checkReset.click(function (e) {
        var checkEmpty = document.getElementById('check-reset');
        state = true;
        var event = e || window.event;
        event.preventDefault();
        getTableDate();
        checkEmpty.click();
    })

    //菜单按钮
    $('.nav-button').click(function () {
        $('.toolbar-nav').slideToggle();
    })
    $(window).resize(function () {
        if (window.innerWidth >= 768) {
            $('.toolbar-nav').css({
                display: 'none'
            });
        }
    })

    //锚点事件
    $(window).on('hashchange', function () {
        var hash = location.hash;
        $('.show-list').removeClass('show-list');
        $(hash).addClass('show-list');
    })

    //菜单按钮事件
    $('.list-item').click(function () {
        $('.toolbar-nav').slideUp();
        var data = $(this).data('id');
        $('.pitch').removeClass('pitch');
        $('.' + data).addClass('pitch');
        location.hash = data;
    })
}
events();



//校验获取表单数据
function getFormDate(form) {
    var formData = form.serializeArray();
    var result = {
        status: 'success',
        data: {},
        msg: '校验成功',
    }

    for (var i = 0; i < formData.length; i++) {
        if (!formData[i].value) {
            result.status = 'fail';
            result.data = {};
            result.mas = formData[i].name + '不存在'
            break;
        }
        if (formData[i].name === 'sNo' && !(/^\d{4,16}$/.test(formData[i].value))) {
            result.status = 'fail';
            result.data = {};
            result.msg = '学号格式为4到16位数字';
            break;
        }
        // 校验出生年份  应该为4位数字   1920 - 2020
        else if (formData[i].name === 'birth' && !(formData[i].value > 1920 && formData[i].value <= 2020)) {
            result.status = 'fail';
            result.data = {};
            result.msg = '出生年份格式不正确或年龄过大不接受该学员';
            break;
        }
        // 手机号校验  1开头11为有效数字
        else if (formData[i].name === 'phone' && !(/^1\d{10}$/.test(formData[i].value))) {
            result.status = 'fail';
            result.data = {};
            result.msg = '手机号不正确';
            break;
        }
        result.data[formData[i].name] = formData[i].value;
    }
    return result
}

// // 获取表格数据
// function getTableDate() {
//     newAjax('GET', '/api/student/findByPage', { page: page, size: size }, function (data) {
//         allSize = parseInt(data.cont);
//         tableData = data.findByPage;
//         renderTable(tableData);
//     })
// }
// getTableDate();

//获取查询数据
function getTableCheck() {
    var formArr = checkFrom.serializeArray();
    newAjax('GET', '/api/student/searchStudent', { sex: formArr[1].value, search: formArr[0].value, page: page, size: size }, function (data) {
        allSize = parseInt(data.cont);
        tableData = data.searchList;
        renderTable(tableData);
    })
}

//数据回填
function renderEditForm(data) {
    var from = redactForm[0]
    for (var prop in data) {
        if (from[prop]) {
            from[prop].value = data[prop];
        }
    }
}

//渲染表格
function renderTable(data) {
    var str = '';
    for (var i = 0; i < data.length; i++) {
        str += ` <tr>
            <td>${i + 1}</td>
            <td>${data[i].sNo}</td>
            <td>${data[i].name}</td>
            <td>${data[i].sex == 1 ? '女' : '男'}</td>
            <td>${data[i].email}</td>
            <td>${new Date().getFullYear() - data[i].birth}</td>
            <td>${data[i].phone}</td>
            <td>${data[i].address}</td>
            <td>
                <span class="edit" data-index="${i}">编辑</span>
                <span class="remove" data-index="${i}">删除</span>
            </td>
        </tr>`
    }

    if (str == '') {
        $('.empty').css({
            display: 'block'
        })
        $('.pageNum').css({
            display: 'none'
        })
    } else {
        $('.empty').css({
            display: 'none'
        })
        $('.pageNum').css({
            display: 'block'
        })
    }

    tBody.html(str);

    //生成页码
    $('.pageNum').page({
        page: page,
        size: size,
        allSize: allSize,
        succsee: function () {
            page = this.page;
            size = this.size;
            state ? getTableDate() : getTableCheck();
        }
    })
}

//收缩展开方法
function shrinkEvent() {
    var shrink = $('.shrink');
    var navDom = $('.Nav');
    var memu = $('.memu');
    shrink.click(function () {
        shrink.css({
            display: 'none'
        })
        navDom.animate({ height: '60px' }, 500, function () {
            memu.css({
                display: 'block'
            });
            $('.content').css({
                width: 'calc(100% - 28px)',
                left: '14px'
            })
        })
    })
    memu.click(function () {
        memu.css({
            display: 'none'
        });
        $('.content').css({
            width: 'calc(86% - 28px)',
            left: 'calc(14% + 14px)'
        })
        navDom.animate({ height: window.innerHeight }, 500, function () {
            shrink.css({
                display: 'block'
            });
        })
    })
}
shrinkEvent()

