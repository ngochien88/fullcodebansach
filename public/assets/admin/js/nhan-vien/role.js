
/*list role */
var roles = [
    {
        maRole: 'ad',
        tenRole: 'Admin',
        mota: 'quản lý nhân viên bán sách'
    },
    {
        maRole: 'sl',
        tenRole: 'Seller',
        mota: 'nhân viên bán sách'
    },
    {
        maRole: 'se',
        tenRole: 'Secretary',
        mota: 'nhân viên kế toán'
    }
];
/*end list role */

/*tạo Storage lưu title bên role-detail */
var temp;
var roleTitle = [];
if (!sessionStorage.temp)
    sessionStorage.temp = JSON.stringify(roleTitle);
roleTitle = JSON.parse(sessionStorage.temp);
/*end tạo Storage lưu title bên role-detail */

/*tạo Storage lưu trạng thái của nút SAVE bên role-detail*/
var check;
var Status = [];
if (!sessionStorage.check)
    sessionStorage.check = JSON.stringify(Status);
Status = JSON.parse(sessionStorage.check);
/*end tạo Storage lưu trạng thái của nút SAVE bên role-detail*/

/*push list role vào table ở bảng roles */
for (var i = 0; i < roles.length; i++) {
    var idDel = `delete${roles[i].maRole}`;
    var idEdit = `edit${roles[i].maRole}`;
    var idtr = `tr${roles[i].maRole}`;
    $('#ds-role').append(`
                                            <tr id="${idtr}">
                                                <td>${i + 1}</td>
                                                <td>${roles[i].maRole}</td>
                                                <td>${roles[i].tenRole}</td>
                                                <td>${roles[i].mota}</td>
                                                <td>
                                                    <div class="hidden-sm hidden-xs btn-group">
                                                        <a id="${idEdit}" href="./role-detail.html" class="btn btn-xs btn-info">
                                                            <i class="ace-icon fa fa-pencil bigger-120"></i>
                                                        </a>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="hidden-sm hidden-xs btn-group">
                                                        <button id="${idDel}" class="btn btn-xs btn-danger">
                                                            <i class="ace-icon fa fa-trash bigger-120"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
    `);
}
/*end push list role vào table ở bảng roles */

/*sự kiện nút xóa trong bảng role */
for (var j = 0; j < roles.length; j++) {
    var jq = `#delete${roles[j].maRole}`;
    $(jq).on('click', function () {
        var id = $(this).attr('id');
        for (var k = 0; k < roles.length; k++) {
            var idBtnDel = `delete${roles[k].maRole}`;
            if (idBtnDel === id) {
                var idtr = `#tr${roles[k].maRole}`;
                $(idtr).remove();

                /*thông báo delete successfully */
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
                /*end thông báo delete successfully */

            }
        }
    });

}
/*end sự kiện nút xóa trong bảng role */

/*nút Thêm+ */
$('#add-new-role').click(function () {

    /*lưu title bên role-detail vào Storage */
    roleTitle = [];
    var str = 'Bạn đang thêm mới một Role';
    roleTitle.push(str);
    sessionStorage.temp = JSON.stringify(roleTitle);
    roleTitle = JSON.parse(sessionStorage.temp);
    /* end lưu title bên role-detail vào Storage */

    /*set lại trạng thái của nút SAVE bên role-detail */
    Status = [];
    sessionStorage.check = JSON.stringify(Status);
    Status = JSON.parse(sessionStorage.check);
    /*end set lại trạng thái của nút SAVE bên role-detail */
});
/*end nút Thêm+ */

/*nút EDIT bên table roles */
for (var j = 0; j < roles.length; j++) {
    var jq = `#edit${roles[j].maRole}`;
    $(jq).on('click', function () {
        roleTitle = [];
        var id = $(this).attr('id');
        for (var k = 0; k < roles.length; k++) {
            var idEdit = `edit${roles[k].maRole}`;
            if (idEdit === id) {
                var str = 'Bạn đang chỉnh sửa một Role';

                /*lưu title vào Storage */
                roleTitle.push(str);
                break;
            }
        }
        sessionStorage.temp = JSON.stringify(roleTitle);
        roleTitle = JSON.parse(sessionStorage.temp);
        /*end lưu title vào Storage */
    });
}
/*end nút EDIT bên table roles */

/*add title bên role-detail */
$('#role-title').append(`
        <h4 class="panel-title" style="padding-top: 12px;">${roleTitle[0]}</h4>
    `);
/*end add title bên role-detail */

/*sự kiện nút SAVE bên role-detail */
$('#save-role').click(function () {
    Status = [];
    Status.push('save-role-user');
    sessionStorage.check = JSON.stringify(Status);
    Status = JSON.parse(sessionStorage.check);
});
/*end sự kiện nút SAVE bên role-detail */

/*Xuất notification khi nhấn nút SAVE bên role-detail */
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
$('#save-role-user').fadeIn('slow');
setTimeout(() => {
    $('#save-role-user').fadeOut(2500);
    setTimeout(() => {
        $('#save-role-user').remove();
    }, 1500);
}, 1000);
/*end Xuất notification khi nhấn nút SAVE bên role-detail */


/*set lại trạng thái cho nút SAVE bên role-detail */
Status = [];
sessionStorage.check = JSON.stringify(Status);
Status = JSON.parse(sessionStorage.check);
/*set lại trạng thái cho nút SAVE bên role-detail */