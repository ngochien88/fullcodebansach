

var kh = [
    {
        username: 'tiennd',
        hoten: 'Nguyễn Đình Tiến',
        email: 'tien@gmail.com',
        password: '*&.982j(^'
    },
    {
        username: 'thangtl',
        hoten: 'Trần Lê Thăng',
        email: 'thang@gmail.com',
        password: '!&#%2rkaf$%'
    },
    {
        username: 'angl',
        hoten: 'Hoàng Lê An',
        email: 'an@gmail.com',
        password: '&*@Hfaln.1a'
    }
];

/*tạo biến lưu Storege giống cookie */
var temp;
var khHeader = [];
if (!sessionStorage.temp)
    sessionStorage.temp = JSON.stringify(khHeader);
khHeader = JSON.parse(sessionStorage.temp);

var check;
var Status = [];
if (!sessionStorage.check)
    sessionStorage.check = JSON.stringify(Status);
Status = JSON.parse(sessionStorage.check);
/*end tạo biến lưu Storege giống cookie */


for (i = 0; i < kh.length; i++) {
    var idtr = `tr${kh[i].username}`;
    var idDel = `delete${kh[i].username}`;
    var idEdit = `edit${kh[i].username}`;
    $('#kh').append(`
        <tr id="${idtr}">   
        <td>${i + 1}</td>
        <td>${kh[i].username}</td>
        <td>${kh[i].hoten}</td>
        <td>${kh[i].email}</td>
        <td>${kh[i].password}</td>
        <td>
            <div class="hidden-sm hidden-xs btn-group">
                <a id="${idEdit}" href="./detail-khachhang.html" class="btn btn-xs btn-info">
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
/*nút xóa trong khách hàng */
for (var j = 0; j < kh.length; j++) {
    var jq = `#delete${kh[j].username}`;
    $(jq).on('click', function () {
        var id = $(this).attr('id');
        for (var k = 0; k < kh.length; k++) {
            var idBtnDel = `delete${kh[k].username}`;
            if (idBtnDel === id) {
                var idtr = `#tr${kh[k].username}`;
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
/* end nút xóa trong loại sách */

for (var j = 0; j < kh.length; j++) {
    var jq = `#edit${kh[j].username}`;
    $(jq).on('click', function () {
        khHeader = [];
        var id = $(this).attr('id');
        for (var k = 0; k < kh.length; k++) {
            var idEdit = `edit${kh[k].username}`;
            if (idEdit === id) {
                var str = 'Chỉnh sửa thông tin khách hàng';
                khHeader.push(str);
                break;
            }
        }
        sessionStorage.temp = JSON.stringify(khHeader);
        khHeader = JSON.parse(sessionStorage.temp);
    });
}
$('#kh-Header').append(`
        <h4 class="panel-title" style="padding-top: 12px;">${khHeader[0]}</h4>
    `);
/*end push vào trong Storage */

/*end set lại cho input bên thêm mới kh */

$('#save-them-kh').click(function () {
    Status = [];
    Status.push('save-kh-success');
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
$('#save-kh-success').fadeIn('slow');
setTimeout(() => {
    $('#save-kh-success').fadeOut(2500);
    setTimeout(() => {
        $('#save-kh-success').remove();
    }, 1500);
}, 1000);
Status = [];
sessionStorage.check = JSON.stringify(Status);
Status = JSON.parse(sessionStorage.check);