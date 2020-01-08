
$(document).ready(function () {
    var books = [
        {
            maSach: 'kt5',
            url: 'kt5.jpg',
            tenSach: 'Những bài học đầu tư từ Warren Buffett',
            tacgia: 'Warren Buffett',
            gianhap: 70000,
            giaban: 120000,
            star: 4,
            status: '',
            sale: 30,
            nxb: 'NXB Trẻ',
            theloai: 'Kinh Tế',
            view: 0,
            soluong: 90,
            stock: 5,
            origin: 'Mỹ',
            description: 'Lorem Ipsum',
            html: 'kt5.html',
        },
        {
            maSach: 'vh20',
            url: 'vh20.jpg',
            tenSach: 'Truyện Kiều',
            tacgia: 'Nguyễn Du',
            gianhap: 65000,
            giaban: 92000,
            star: 4,
            status: '',
            sale: 30,
            nxb: 'Nhã Nam',
            theloai: 'Văn Học',
            view: 0,
            soluong: 100,
            stock: 5,
            origin: 'Việt Nam',
            description: 'Lorem Ipsum',
            html: 'vh20.html',
        },
        {
            maSach: 'bv7',
            url: 'bv7.jpg',
            tenSach: 'Sát nhân mạng',
            tacgia: 'Jeffery',
            gianhap: 50000,
            giaban: 86000,
            star: 4,
            status: '',
            sale: 30,
            nxb: 'Bách Việt',
            theloai: 'Khác',
            view: 0,
            soluong: 60,
            stock: 5,
            origin: 'Đức',
            description: 'Lorem Ipsum',
            html: 'bv7.html',
        }
    ];

    var temp;
    var bookTitle = [];
    if (!sessionStorage.temp)
        sessionStorage.temp = JSON.stringify(bookTitle);
    bookTitle = JSON.parse(sessionStorage.temp);

    var check;
    var Status = [];
    if (!sessionStorage.check)
        sessionStorage.check = JSON.stringify(Status);
    Status = JSON.parse(sessionStorage.check);

    for (var i = 0; i < books.length; i++) {
        var idtr = `tr${books[i].maSach}`;
        var idDel = `delete${books[i].maSach}`;
        var idEdit = `edit${books[i].maSach}`;
        $('#ds-sach').append(`
        <tr id="${idtr}">
            <td>${i + 1}</td>
            <td>${books[i].maSach}</td>
            <td>${books[i].tenSach}</td>
            <td>${books[i].tacgia}</td>
            <td>${books[i].nxb}</td>
            <td>${books[i].theloai}</td>
            <td>${books[i].gianhap}</td>
            <td>${books[i].giaban}</td>
            <td>${books[i].soluong}</td>
            <th>${books[i].description}</th>
            <td>
                <div class="hidden-sm hidden-xs btn-group">
                    <a id="${idEdit}" href="./them-sach-moi.html" class="btn btn-xs btn-info">
                        <i class="ace-icon fa fa-pencil bigger-120"></i>
                    </a>
                </div>
            </td>
            <td>
                <div class="hidden-sm hidden-xs btn-group">
                    <a id="${idDel}" class="btn btn-xs btn-danger">
                        <i class="ace-icon fa fa-trash bigger-120"></i>
                    </a>
                </div>
            </td>
        </tr>
        `)
    }

    for (var j = 0; j < books.length; j++) {
        var jq = `#delete${books[j].maSach}`;
        $(jq).on('click', function () {
            var id = $(this).attr('id');
            for (var k = 0; k < books.length; k++) {
                var idBtnDel = `delete${books[k].maSach}`;
                if (idBtnDel === id) {
                    var idtr = `#tr${books[k].maSach}`;
                    $(idtr).remove();
                    $('body').append(`
                    <div class="alert alert-success" id="delete" 
                    style="
                             position: fixed;
                            top: 20px;
                            right: 20px;
                            z-index: 99999;
                            display: none;
                            ">
                            <i class="fa fa-check">
                            </i> Delete Successfully </div>`);
                    $('#delete').fadeIn('slow');
                    setTimeout(() => {
                        $('#delete').fadeOut(2500);
                        setTimeout(() => {
                            $('#delete').remove();
                        }, 1500);
                    }, 1000);
                }
            }
        });

    }

    $('#add-new-book').click(function () {
        bookTitle = [];
        var str = 'Bạn đang thêm một sách mới';
        bookTitle.push(str);
        sessionStorage.temp = JSON.stringify(bookTitle);
        bookTitle = JSON.parse(sessionStorage.temp);

        Status = [];
        sessionStorage.check = JSON.stringify(Status);
        Status = JSON.parse(sessionStorage.check);
    });


    for (var j = 0; j < books.length; j++) {
        var jq = `#edit${books[j].maSach}`;
        $(jq).on('click', function () {
            bookTitle = [];
            var id = $(this).attr('id');
            for (var k = 0; k < books.length; k++) {
                var idEdit = `edit${books[k].maSach}`;
                if (idEdit === id) {
                    var str = 'Bạn đang chỉnh sửa một sách';
                    bookTitle.push(str);

                    Status = [];
                    sessionStorage.check = JSON.stringify(Status);
                    Status = JSON.parse(sessionStorage.check);
                    break;
                }
            }
            sessionStorage.temp = JSON.stringify(bookTitle);
            bookTitle = JSON.parse(sessionStorage.temp);
        });
    }
    $('#book-title').append(`
        <h4 class="panel-title" style="padding-top: 12px;">${bookTitle[0]}</h4>
    `);
    $('#save-new-book').click(function () {
        Status = [];
        Status.push('save-book-success');
        sessionStorage.check = JSON.stringify(Status);
        Status = JSON.parse(sessionStorage.check);
    });
    $('body').append(`
        <div class="alert alert-success" id="${Status[0]}" 
        style="
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 99999;
                display: none;
                ">
                <i class="fa fa-check">
                </i> Save Successfully </div>
        `);
    $('#save-book-success').fadeIn('slow');
    setTimeout(() => {
        $('#save-book-success').fadeOut(2500);
        setTimeout(() => {
            $('#save-book-success').remove();
        }, 1500);
    }, 1000);

    Status = [];
    sessionStorage.check = JSON.stringify(Status);
    Status = JSON.parse(sessionStorage.check);
})


