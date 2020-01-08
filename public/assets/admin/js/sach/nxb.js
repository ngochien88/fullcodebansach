
$(document).ready(function () {
    var nxb = [
        {
            maNXB: 'kimdong',
            tenNXB: 'Kim Đồng',
            website: 'nxbkimdong.com',
            mota: 'Nhà xuất bản Kim Đồng'
        },
        {
            maNXB: 'nhanam',
            tenNXB: 'Nhã Nam',
            website: 'nxbknhanam.com',
            mota: 'Nhà xuất bản Nhã Nam'
        },
        {
            maNXB: 'backviet',
            tenNXB: 'Bách Việt',
            website: 'nxbkbachviet.com',
            mota: 'Nhà xuất bản Bách Việt'
        }
    ];

    /*tạo biến lưu Storege giống cookie */
    var temp;
    var titleHeader = [];
    if (!sessionStorage.temp)
        sessionStorage.temp = JSON.stringify(titleHeader);
    titleHeader = JSON.parse(sessionStorage.temp);

    var check;
    var Status = [];
    if (!sessionStorage.check)
        sessionStorage.check = JSON.stringify(Status);
    Status = JSON.parse(sessionStorage.check);
    /*end tạo biến lưu Storege giống cookie */


    for (i = 0; i < nxb.length; i++) {
        var idtr = `tr${nxb[i].maNXB}`;
        var idBtnDel = `delete${nxb[i].maNXB}`;
        var idBtnEdit = `edit${nxb[i].maNXB}`;
        $('#nxb').append(`
        <tr id="${idtr}">
        <td>${i + 1}</td>
        <td>${nxb[i].maNXB}</td>
        <td>${nxb[i].tenNXB}</td>
        <td>${nxb[i].website}</td>
        <td>${nxb[i].mota}</td>
        <td>
            <div class="hidden-sm hidden-xs btn-group">
                <a id="${idBtnEdit}" href="./them-moi-nxb.html" class="btn btn-xs btn-info">
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
    /*nút xóa trong loại sách */
    for (var j = 0; j < nxb.length; j++) {
        var jq = `#delete${nxb[j].maNXB}`;
        $(jq).on('click', function () {
            var id = $(this).attr('id');
            for (var k = 0; k < nxb.length; k++) {
                var idBtnDel = `delete${nxb[k].maNXB}`;
                if (idBtnDel === id) {
                    var idtr = `#tr${nxb[k].maNXB}`;
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
    /* end nút xóa trong loại sách */

    $('#btnadd').click(function () {
        titleHeader = [];
        var str = 'Bạn đang thêm mới một Nhà Xuất Bản';
        titleHeader.push(str);
        sessionStorage.temp = JSON.stringify(titleHeader);
        titleHeader = JSON.parse(sessionStorage.temp);

        Status = [];
        sessionStorage.check = JSON.stringify(Status);
        Status = JSON.parse(sessionStorage.check);
    });


    /*push vào trong Storage */
    for (var j = 0; j < nxb.length; j++) {
        var jq = `#edit${nxb[j].maNXB}`;
        $(jq).on('click', function () {
            titleHeader = [];
            var id = $(this).attr('id');
            for (var k = 0; k < nxb.length; k++) {
                var idEdit = `edit${nxb[k].maNXB}`;
                if (idEdit === id) {
                    var str = 'Bạn đang chỉnh sửa một Nhà Xuất Bản';
                    titleHeader.push(str);
                    break;
                }
            }
            sessionStorage.temp = JSON.stringify(titleHeader);
            titleHeader = JSON.parse(sessionStorage.temp);
        });
    }
    $('#titleHeader').append(`
        <h4 class="panel-title" style="padding-top: 12px;">${titleHeader[0]}</h4>
    `);
    /*end push vào trong Storage */

    /*end set lại cho input bên thêm mới nxb */

    $('#save-them-nxb').click(function () {
        Status = [];
        Status.push('save-nxb-success');
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
    $('#save-nxb-success').fadeIn('slow');
    setTimeout(() => {
        $('#save-nxb-success').fadeOut(2500);
        setTimeout(() => {
            $('#save-nxb-success').remove();
        }, 1500);
    }, 1000);
    Status = [];
    sessionStorage.check = JSON.stringify(Status);
    Status = JSON.parse(sessionStorage.check);
});


