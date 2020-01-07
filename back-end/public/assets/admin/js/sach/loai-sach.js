$(document).ready(function () {

    /* danh sách set cứng*/
    var loaiSach = [
        {
            maso: 'thieunhi',
            ten: 'Thiếu Nhi',
            diachi: '227 Nguyễn Văn Cừ, Q5 TP HCM',
            dienthoai: '0978289014',
            mota: 'Sách thiếu nhi'
        },
        {
            maso: 'vanhoc',
            ten: 'Văn Học',
            diachi: '181/3 Tân Phước, P6 Quận 10',
            dienthoai: '0978252146',
            mota: 'Sách văn học'
        },
        {
            maso: 'kinhte',
            ten: 'Kinh Tế',
            diachi: '81/3 Phước Hòa, P7 Quận 10',
            dienthoai: '0978236546',
            mota: 'Sách kinh tế'
        },
    ];
    /* end danh sách set cứng*/


    /*tạo biến lưu Storege giống cookie */
    var temp;
    var editTitle = [];
    if (!sessionStorage.temp)
        sessionStorage.temp = JSON.stringify(editTitle);
    editTitle = JSON.parse(sessionStorage.temp);

    var check;
    var Status = [];
    if (!sessionStorage.check)
        sessionStorage.check = JSON.stringify(Status);
    Status = JSON.parse(sessionStorage.check);
    /*end tạo biến lưu Storege giống cookie */

    /*append ds vào trong loại sách */
    for (var i = 0; i < loaiSach.length; i++) {
        var idtr = `tr${loaiSach[i].maso}`;
        var idBtnEdit = `edit${loaiSach[i].maso}`;
        var idBtnDel = `delete${loaiSach[i].maso}`;
        $('#loai-sach').append(`
                                                <tr id="${idtr}">
                                                    <td>${i + 1}</td>
                                                    <td>${loaiSach[i].maso}</td>
                                                    <td>${loaiSach[i].ten}</td>
                                                    <td>${loaiSach[i].diachi}</td>
                                                    <td>${loaiSach[i].dienthoai}</td>
                                                    <td>${loaiSach[i].mota}</td>
                                                    <td>
                                                        <div class="hidden-sm hidden-xs btn-group">
                                                            <a href="./them-loai-sach.html" id="${idBtnEdit}" class="btn btn-xs btn-info">
                                                                <i class="ace-icon fa fa-pencil bigger-120"></i>
                                                            </a>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="hidden-sm hidden-xs btn-group">
                                                            <button id="${idBtnDel}" class="btn btn-xs btn-danger">
                                                                <i class="ace-icon fa fa-trash bigger-120"></i>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
    
        `);


    }
    /*end append ds vào trong loại sách */

    /*nút xóa trong loại sách */
    for (var j = 0; j < loaiSach.length; j++) {
        var jq = `#delete${loaiSach[j].maso}`;
        $(jq).on('click', function () {
            var id = $(this).attr('id');
            for (var k = 0; k < loaiSach.length; k++) {
                var idBtnDel1 = `delete${loaiSach[k].maso}`;
                if (idBtnDel1 === id) {
                    var idtr1 = `#tr${loaiSach[k].maso}`;
                    $(idtr1).remove();
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
                        $('#delete').fadeOut(3500);
                        setTimeout(() => {
                            $('#delete').remove();
                        }, 1500);
                    }, 500);
                }
            }
        });

    }
    /* end nút xóa trong loại sách */

    for (var j = 0; j < loaiSach.length; j++) {
        var jq = `#edit${loaiSach[j].maso}`;
        $(jq).on('click', function () {
            editTitle = [];
            var id = $(this).attr('id');
            for (var k = 0; k < loaiSach.length; k++) {
                var idEdit = `edit${loaiSach[k].maso}`;
                if (idEdit === id) {
                    var str = 'Bạn đang chỉnh sửa một loại sách';
                    editTitle.push(str);
                }
            }
            sessionStorage.temp = JSON.stringify(editTitle);
            editTitle = JSON.parse(sessionStorage.temp);
        });
    }
    $('#add').click(function () {
        editTitle = [];
        var str = 'Bạn đang thêm mới một loại sách';
        editTitle.push(str);
        sessionStorage.temp = JSON.stringify(editTitle);
        editTitle = JSON.parse(sessionStorage.temp);

        Status = [];
        sessionStorage.check = JSON.stringify(Status);
        Status = JSON.parse(sessionStorage.check);
    });

    $('#loai-sach-title').append(`
        <h4 class="panel-title" style="padding-top: 12px;">${editTitle[0]}</h4>
    `);

    $('#save-them-loai-sach').click(function () {
        Status = [];
        Status.push('save-loai-sach');
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
    $('#save-loai-sach').fadeIn('slow');
    setTimeout(() => {
        $('#save-loai-sach').fadeOut(2500);
        setTimeout(() => {
            $('#save-loai-sach').remove();
        }, 1500);
    }, 1000);
    Status = [];
    sessionStorage.check = JSON.stringify(Status);
    Status = JSON.parse(sessionStorage.check);
})
