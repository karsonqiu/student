var page = 1;
var size = 10;
var allPage;
var tableData = []; 
var state = true;

var addForm = document.getElementById('add-student-form');
var tBody = document.getElementById('information');
var redactForm = document.getElementById('redact-form');
var rightPage = document.getElementsByClassName('rightPage')[0];
var LeftPage = document.getElementsByClassName('LeftPage')[0];
var numPageUl = document.getElementsByClassName('numPage')[0];
var empty = document.getElementsByClassName('empty')[0];
var pageNumBox = document.getElementsByClassName('pageNum')[0];
var contentDom = document.getElementsByClassName('content')[0];
var navDom = document.getElementsByClassName('nav')[0];
var shrink = document.getElementsByClassName('shrink')[0];
var memu = document.getElementsByClassName('memu')[0];
var checkButtom = document.getElementsByClassName('check-button')[0];
var checkFrom = document.getElementsByClassName('screenbox')[0];
var checkReset = document.getElementsByClassName('check-reset')[0];
//判断是否登录
function loginSuccess() {
    var user = document.getElementsByClassName('name')[0];
    var username = getCookie('username')
    if (username) {
        user.innerText = username;
    } else {
        //location.href = './login.html';
    }
}
loginSuccess();

//事件
function events() {
    //退出登录
    var exit = document.getElementsByClassName('_exit')[0];
    exit.onclick = function () {
        location.href = './login.html';
    }
    //打开关闭新增学生
    var addButton = document.getElementsByClassName('addstudent')[0];
    var addStudent = document.getElementsByClassName('addcontent')[0];
    var shutDowm = document.getElementsByClassName('shutdowm')[0];
    addButton.onclick = function () {
        addStudent.style.display = 'block';
    }
    shutDowm.onclick = function () {
        addStudent.style.display = 'none';
    }
    //新增学生功能
    var addSubmit = document.getElementById('addsubmit');
    addSubmit.onclick = function (e) {
        var event = e || window.event;
        event.preventDefault();
        var data = getFormDate(addForm);
        if (data) {
            newAjax('GET', '/api/student/addStudent', data, function () {
                alert('添加成功');
                addStudent.style.display = 'none';
                getTableDate();
            })
        }
    }
    //编辑删除学生功能
    var redact = document.getElementsByClassName('redact')[0];
    var redactShutdowm = document.getElementsByClassName('redact-shutdowm')[0];
    redactShutdowm.onclick = function(){
        redact.style.display = 'none';
    }
    tBody.onclick = function(e){
        var event = e || window.event;
        var target = event.target;
        if(target.classList.contains('edit')){
            var index = target.dataset.index;
            redact.style.display = 'block';
            renderEditForm(tableData[index]);
        }else if(target.classList.contains('remove')){
            var index = target.dataset.index;
            var isDel = confirm('确定删除学号为' + tableData[index].sNo + '的学员吗？')
            if(isDel){
                newAjax('GET','/api/student/delBySno',{sNo:tableData[index].sNo},function(){
                    alert('删除成功');
                    page = 1;
                    rightPage.style.color = '#C0C8D5';
                    rightPage.onclick = null;
                    getTableDate();
                })
            }
        }
    }
    var redactSubmit = document.getElementById('redact-submit');
    redactSubmit.onclick = function(e){
        var event = e || window.event;
        event.preventDefault();
        var data = getFormDate(redactForm);
        if(data){
            newAjax('GET','/api/student/updateStudent',data,function(){
                alert('修改成功');
                redact.style.display = 'none';
                getTableDate();
            })
        }
    }

    //条件查询
    checkButtom.onclick = function(e){
        state = false;
        page = 1;
        var event = e || window.event;
        event.preventDefault();
        getTableCheck()
    }
    //重置条件
    checkReset.onclick = function(e){
        var checkEmpty = document.getElementById('check-reset');
        state = true;
        var event = e || window.event;
        event.preventDefault();
        getTableDate();
        checkEmpty.click();
    }
}
events();


//获取表单数据
function getFormDate(form) {
    var name = form.name.value;
    var sex = form.sex.value;
    var email = form.email.value;
    var sNo = form.sNo.value;
    var birth = form.birth.value;
    var phone = form.phone.value;
    var address = form.address.value;
    if (!name || !sex || !email || !sNo || !birth || !phone || !address) {
        alert('信息填写不完全，请校验之后提交');
        return false;
    } else {
        return {
            name: name,
            sex: sex,
            email: email,
            sNo: sNo,
            birth: birth,
            phone: phone,
            address: address,
        }
    }
}

//获取表格数据
function getTableDate() {
    newAjax('GET', '/api/student/findByPage', { page: page, size: size }, function (data) {
        allSize = Math.ceil(data.cont / size);
        tableData = data.findByPage;
        renderPage(allPage);
        renderTable(tableData);
    })
}
getTableDate();

//获取查询数据
function getTableCheck() {
    newAjax('GET','/api/student/searchStudent',{sex:checkFrom.sex.value,search:checkFrom.search.value,page:page,size:size},function(data){
        allPage = Math.ceil(data.cont / size);
        tableData = data.searchList;
        console.log(tableData);
        renderPage(allPage);
        renderTable(tableData);
    })
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
    if(str == ''){
        empty.style.display = 'block';
        pageNumBox.style.display = 'none';
    }else{
        empty.style.display = 'none';
        pageNumBox.style.display = 'block';
    }
    tBody.innerHTML = str; 
}

//渲染页码
function renderPage(pageNum){
    var str = '';
    for (var i = 0; i < pageNum; i++) {
        if(i == 0){
            str += `<li class="optPage">${i + 1}</li>`;
        }else{
            str += `<li>${i + 1}</li>`;
        }  
    }
    numPageUl.innerHTML = str;
}

//翻页功能
function pageEvent(){
    //翻页按钮功能
    rightPage.onclick = onRight;
    LeftPage.onclick = onLeft;
    function onRight(){
        page--;
        if(page == 1){
            rightPage.style.color = '#C0C8D5';
            LeftPage.style.color = '#303133';
            rightPage.onclick = null;
            LeftPage.onclick = onLeft;
        }
        if(page > 1){
            rightPage.style.color = '#303133';
            LeftPage.style.color = '#303133';
            LeftPage.onclick = onLeft;
        }
        if(state){
            getTableDate();
        }else{
            getTableCheck();
        }
        pageColor(page);
    }
    function onLeft(){
        page++;
        if(page == allPage){
            LeftPage.style.color = '#C0C8D5';
            rightPage.style.color = '#303133';
            LeftPage.onclick = null;
            rightPage.onclick = onRight;
        }
        if(page < allPage){
            LeftPage.style.color = '#303133';
            rightPage.style.color = '#303133';
            rightPage.onclick = onRight;
        }
        if(state){
            getTableDate();
        }else{
            getTableCheck();
        }
        pageColor(page);
    }
    //页码功能
    numPageUl.onclick = function(e){
        var event = e || window.event;
        var target =  event.target;
        var pageLi = target.innerText;
        if(!(page == pageLi)){
            page = pageLi;
            if(state){
                getTableDate();
            }else{
                getTableCheck();
            }
            pageColor(page)
        }
        if(page == 1){
            rightPage.style.color = '#C0C8D5';
            LeftPage.style.color = '#303133';
            rightPage.onclick = null;
            LeftPage.onclick = onLeft;
        }
        if(page == allPage){
            LeftPage.style.color = '#C0C8D5';
            rightPage.style.color = '#303133';
            LeftPage.onclick = null;
            rightPage.onclick = onRight;
        }
        if(page < allPage && page > 1){
            LeftPage.style.color = '#303133';
            rightPage.style.color = '#303133';
            rightPage.onclick = onRight;
            LeftPage.onclick = onLeft;
        }
    }
}
pageEvent();

//改变页码颜色
function pageColor(page){
    var numPageLi = numPageUl.children;
    for(var i = 0 ; i < numPageLi.length ; i++){
        if(numPageLi[i].innerText == page){
            numPageLi[i].className = 'optPage';
        }else{
            numPageLi[i].className = '';
        }
    }
}

//数据回填
function renderEditForm(data){
    for(var prop in data){
        if(redactForm[prop]){
            redactForm[prop].value = data[prop];
        }
    }
}

//缓冲运动
function getStyle(elem,prop){
    if(window.getComputedStyle){
        return window.getComputedStyle(elem,null)[prop];
    }else{
        return elem.currentStyle[prop];
    }
}
function startMove(dom,packet,callBack){
    clearInterval(dom.timer);
    var entity = null,
        iSpeed = null;
    dom.timer = setInterval(function(){
        var key = true;
        for(var sty in packet){
            var target = packet[sty];
            if(sty == 'opacity'){
                entity = parseFloat(getStyle(dom,sty)) * 100;
            }else{
                entity = parseInt(getStyle(dom,sty))
            }
            iSpeed = (target - entity) / 7;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            if(sty == 'opacity'){
                dom.style[sty] = (entity + iSpeed) / 100;
                console.log(entity)
            }else{
                dom.style[sty] = entity + iSpeed + 'px';
            }
            if(entity != target){
                key = false;
            }
        }
        if(key){
            clearInterval(dom.timer);
            typeof(callBack) == 'function' && callBack();
        }
    },30)
}

//收缩展开方法
function shrinkEvent(){
    shrink.onclick = function(){
        shrink.style.display = 'none';
        startMove(navDom,{height:60},function(){
            memu.style.display = 'block';
            contentDom.style.width = 'calc(100% - 28px)';
            contentDom.style.left = '14px';
        })
    }
    memu.onclick = function(){
        memu.style.display = 'none';
        contentDom.style.width = 'calc(86% - 28px)';
        contentDom.style.left = 'calc(14% + 14px)';
        startMove(navDom,{height:window.innerHeight},function(){
            shrink.style.display = 'block';
        })
    }
}
shrinkEvent()

