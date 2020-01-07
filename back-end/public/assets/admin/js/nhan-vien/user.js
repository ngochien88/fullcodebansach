
var users = [
    {
        username: 'nnlinh97',
        password: '1512288',
        fullname: 'Nguyễn Ngọc Linh',
        vaitro: 'Admin',
        sex: 'nam',
        namsinh: '14/071997',
        status: 'actived'
    },
    {
        username: 'huantd',
        password: '1512189',
        fullname: 'Trần Đình Huân',
        vaitro: 'Seller',
        sex: 'nữ',
        namsinh: '14/071997',
        status: 'blocked'
    },
    {
        username: 'huycao',
        password: '1512192',
        fullname: 'Cao Gia Huy',
        vaitro: 'Secretary',
        sex: 'nam',
        namsinh: '14/071997',
        status: 'actived'
    }
];
var temp;
var userDetailTitle = [];
if (!sessionStorage.temp)
    sessionStorage.temp = JSON.stringify(userDetailTitle);
userDetailTitle = JSON.parse(sessionStorage.temp);

var check;
var Status = [];
if (!sessionStorage.check)
    sessionStorage.check = JSON.stringify(Status);
Status = JSON.parse(sessionStorage.check);
for (var i = 0; i < users.length; i++) {
    var idStatus = `status${users[i].username}`;
    var idEdit = `edit${users[i].username}`;
    var btnClass;
    if (users[i].status === 'actived') {
        btnClass = 'btn-success';
    }
    else {
        btnClass = 'btn-danger';
    }
    $('#ds-user').append(`
                                            <tr id="">
                                                <td>${i + 1}</td>
                                                <td>${users[i].username}</td>
                                                <td>${users[i].fullname}</td>
                                                <td>${users[i].vaitro}</td>
                                                <td>${users[i].sex}</td>
                                                <td>${users[i].namsinh}</td>
                                                <td>
                                                    <div class="hidden-sm hidden-xs btn-group">
                                                        <button id="${idStatus}" class="btn btn-xs ${btnClass}" disabled>
                                                            ${users[i].status}
                                                        </button>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="hidden-sm hidden-xs btn-group">
                                                        <a href="./user-detail.html" id="${idEdit}" class="btn btn-xs btn-info">
                                                            <i class="ace-icon fa fa-pencil bigger-120"></i>
                                                        </a>
                                                    </div>
                                                </td>
                                            </tr>
    `);
}

$('#add-new-user').click(function () {
    userDetailTitle = [];
    var str = 'Bạn đang thêm mới một Nhân Viên';
    userDetailTitle.push(str);
    sessionStorage.temp = JSON.stringify(userDetailTitle);
    userDetailTitle = JSON.parse(sessionStorage.temp);

    Status = [];
    sessionStorage.check = JSON.stringify(Status);
    Status = JSON.parse(sessionStorage.check);
});

for (var j = 0; j < users.length; j++) {
    var jq = `#edit${users[j].username}`;
    $(jq).on('click', function () {
        userDetailTitle = [];
        var id = $(this).attr('id');
        for (var k = 0; k < users.length; k++) {
            var idEdit = `edit${users[k].username}`;
            if (idEdit === id) {
                var str = 'Bạn đang chỉnh sửa một Nhân Viên';
                userDetailTitle.push(str);
                break;
            }
        }
        sessionStorage.temp = JSON.stringify(userDetailTitle);
        userDetailTitle = JSON.parse(sessionStorage.temp);
    });
}

$('#user-detail-title').append(`
        <h4 class="panel-title" style="padding-top: 12px;">${userDetailTitle[0]}</h4>
    `);

$('#save-add-user').click(function () {
    Status = [];
    Status.push('save-user');
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
$('#save-user').fadeIn('slow');
setTimeout(() => {
    $('#save-user').fadeOut(2500);
    setTimeout(() => {
        $('#save-user').remove();
    }, 1500);
}, 1000);

Status = [];
sessionStorage.check = JSON.stringify(Status);
Status = JSON.parse(sessionStorage.check);



