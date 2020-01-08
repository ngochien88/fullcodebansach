

var dh = [
    {
        madh: '0x01',
        sanpham: 'Mật mã phái đẹp',
        dongia: '52500',
        soluong: '1',
        tongthu: '52500',
        nguoidat: 'Nguyễn Đình Tiến',
        email: 'tien1@gmail.com',
        sdt: '0988111222',
        nguoinhan: 'Nguyễn Đình Tiến',
        diachi: '181 Tân Phước, phường 11, quận 10, TP.HCM',
        sdtn: '0988111222',
        status: 'Delivered'
    },
    {
        madh: '0x02',
        sanpham: 'Để con được ốm',
        dongia: '56000',
        soluong: '1',
        tongthu: '56000',
        nguoidat: 'Lê Thăng',
        email: 'thang@gmail.com',
        sdt: '0122311411',
        nguoinhan: 'Lê Thăng',
        diachi: '42/1 Ung Văn Khiêm, phường 21, quận Tân Bình, TP.HCM',
        sdtn: '0122311411',
        status: 'Delivered'
    },
    {
        madh: '0x03',
        sanpham: 'Thiên văn bất tận',
        dongia: '42000',
        soluong: '1',
        tongthu: '56000',
        nguoidat: 'Lê An',
        email: 'An@gmail.com',
        sdt: '01255234156',
        nguoinhan: 'Lê An',
        diachi: '227 Nguyễn Văn Cừ, phường 7, quận 5, TP.HCM',
        sdtn: '01255234156',
        status: 'Waiting'
    }
];

/*tạo biến lưu Storege giống cookie */
var temp;
var dhHeader = [];
if (!sessionStorage.temp)
    sessionStorage.temp = JSON.stringify(dhHeader);
dhHeader = JSON.parse(sessionStorage.temp);

var check;
var Status = [];
if (!sessionStorage.check)
    sessionStorage.check = JSON.stringify(Status);
Status = JSON.parse(sessionStorage.check);
/*end tạo biến lưu Storege giống cookie */


for (i = 0; i < dh.length; i++) {
    var idtr = `tr${dh[i].madh}`;
    var idDel = `delete${dh[i].madh}`;
    var idEdit = `edit${dh[i].madh}`;
    var idStatus = `status${dh[i].madh}`;
    var btnClass;
    if (dh[i].status === 'Delivered') {
        btnClass = 'btn-success';
    }
    else {
        btnClass = 'btn-danger';
    }
    $('#dh').append(`
        <tr id="${idtr}">   
        <td>${i + 1}</td>
        <td>${dh[i].madh}</td>
        <td>${dh[i].sanpham}</td>
        <td>${dh[i].dongia}</td>
        <td>${dh[i].soluong}</td>
        <td>${dh[i].tongthu}</td>
        <td>${dh[i].nguoidat}</td>
        <td>${dh[i].email}</td>
        <td>${dh[i].sdt}</td>
        <td>${dh[i].nguoinhan}</td>
        <td>${dh[i].diachi}</td>
        <td>${dh[i].sdtn}</td>

        <td>
            <div class="btn-group text-right">
            <button id="${idStatus}" class="btn btn-xs ${btnClass} br2 btn-xs fs12 dropdown-toggle" data-toggle="dropdown" aria-expanded="false"> ${dh[i].status}
                <span class="caret ml5"></span>
            </button>
            <ul class="dropdown-menu" role="menu">   
                <li>
                <a href="#">Delivered</a>
                    
                </li>
                <li>
                <a href="#">Waiting</a>
               
                </li>
            </ul>
            </td>
        </div>
        </tr>
        `);
}
