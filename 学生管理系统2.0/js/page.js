(function () {
    function TurnPage(options, warp) {
        this.pageBox = warp;
        //当前页码
        this.page = options.page || 1;
        //每页条数
        this.size = options.size || 10;
        //总页数
        this.allPage = options.allPage || (options.allSize ? Math.ceil(options.allSize / this.size) : 1);
        this.succsee = options.succsee || function(){};
    }

    TurnPage.prototype.init = function () {
        if (this.page > this.allPage) {
            alert('页码超出范围')
        } else {
            this.fillHTML();
            this.bindEvent();
        }
    }

    TurnPage.prototype.bindEvent = function () {
        var This = this;
        $('.my-page-next', this.pageBox).click(function () {
            This.page++;
            This.change();
        })
        $('.my-page-prev', this.pageBox).click(function () {
            This.page--;
            This.change();
        })
        $('.my-page-num', this.pageBox).click(function () {
            This.page = parseInt($(this).text())
            This.change();
        })
        $('#page-size-inp').change(function () {
            This.size = parseInt($(this).val());
            This.page = 1;
            This.change();
        })
    }

    TurnPage.prototype.change = function () {
        this.fillHTML();
        this.bindEvent();
        this.succsee();
    }

    TurnPage.prototype.fillHTML = function () {
        this.pageBox.empty();
        var myPageDiv = $('<div class="my-page"></div>');
        var pageSizeDiv = $('<div class="page-size"><label for="page-size-inp">每页条数：</label><input id="page-size-inp" type="number" min=1 max=1000 value=' + this.size + '></div>');
        var myTurnPage = $('<ul class="my-turn-page"></ul>');
        if (this.page > 1) {
            $('<li class="my-page-prev"><</li>').appendTo(myTurnPage);
        }
        this.page == 1 ? $('<li class="my-page-num optPage">1</li>').appendTo(myTurnPage) : $('<li class="my-page-num">1</li>').appendTo(myTurnPage);
        if (this.page - 3 > 1) {
            $('<span>...</span>').appendTo(myTurnPage);
        }
        for (var i = this.page - 2; i <= this.page + 2; i++) {
            if (i > 1 && i < this.allPage) {
                if (this.page == i) {
                    $('<li class="my-page-num optPage"></li>').text(i).appendTo(myTurnPage);
                } else {
                    $('<li class="my-page-num"></li>').text(i).appendTo(myTurnPage);
                }
            }
        }
        if (this.allPage - this.page - 2 > 1) {
            $('<span>...</span>').appendTo(myTurnPage);
        }
        this.allPage != 1 && (this.page == this.allPage ? $('<li class="my-page-num optPage"></li>').text(this.allPage).appendTo(myTurnPage) : $('<li class="my-page-num"></li>').text(this.allPage).appendTo(myTurnPage));
        if (this.page < this.allPage) {
            $('<li class="my-page-next">></li>').appendTo(myTurnPage);
        }

        myPageDiv.append(pageSizeDiv).append(myTurnPage).appendTo(this.pageBox);
    }

    $.fn.extend({
        page: function (options) {
            var obj = new TurnPage(options, $(this));
            obj.init();
        }
    })
})()

