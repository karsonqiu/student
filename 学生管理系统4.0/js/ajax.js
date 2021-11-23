function newAjax(method, url, obj, fn) {
    var newUrl = 'http://open.duyiedu.com' + url;
    var data = {
        appkey: 'q6869336_1590735460309',
    }
    for (var prop in obj) {
        data[prop] = obj[prop];
    }

    $.ajax({
        type: method,
        url: newUrl,
        dataType: 'json',
        data: data,
        success: function (result) {
            if (result.status == 'success') {
                result.data ? fn(result.data) : fn();
            } else {
                alert(result.msg);
            }
        }
    })
}