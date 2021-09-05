// Khởi tạo biến toàn tục dựa (global)
var dsnv = new DanhSachNhanVien();
var validation = new Validation();

// Tạo function get element (getELE)
function getELE(id) {
    return document.getElementById(id);
}

// Lưu mảng NV về localStorage
function setLocalStorage() {
    localStorage.setItem("DSNV", JSON.stringify(dsnv.mangNV));

}

// Lấy data từ localStotage
function getLocalStorage() {
    if (localStorage.getItem("DSNV") != null) {
        dsnv.mangNV = JSON.parse(localStorage.getItem("DSNV"));
        hienThiTable(dsnv.mangNV);
    }
}
// Gọi phương thức localstotage
getLocalStorage();


// Hiển thị trên giao diện
function hienThiTable(mang) {
    var content = "";
    mang.map(function (item) {
        content += `<tr>
            <td>${item.taiKhoan}</td>
            <td>${item.hoTen}</td>
            <td>${item.email}</td>
            <td>${item.ngayLam}</td>
            <td>${item.chucVu}</td>
            <td>${item.tongLuong}</td>
            <td>${item.loaiNhanVien}</td>
            <td class= "tableDS">
                <button class= "btn btn-warning mr-1 mb-2" onclick= deleteStaff('${item.taiKhoan}')>Xóa</button>
                <button class= "btn btn-success mb-2" data-toggle="modal" data-target="#myModal" id= "viewTable" onclick= xemChiTiet('${item.taiKhoan}')>Xem</button>
            </td>
        </tr>`
    });
    document.getElementById('tableDanhSach').innerHTML = content;
}


// Tạo function thêm nhân nhiên dựa theo  lớp đối tượng nhân viên
function themNhanVien(isValidation) {
    getELE('tknv').disabled = false;
    var accountNV = getELE('tknv').value;
    var nameNV = getELE('name').value;
    var emailNV = getELE('email').value;
    var passNV = getELE('password').value;
    var dayNV = getELE('datepicker').value;
    var salaryNV = getELE('luongCB').value;
    var roleNV = getELE('chucvu').value;
    var hoursNV = getELE('gioLam').value;
    
    // Validation
    var isValidation = true;

    // Check tài khoản
    isValidation = validation.checkEmpty(accountNV,'tbTKNV','Tài khoản không được để trống')&& validation.checkID(accountNV,'tbTKNV','Tài khoản bị trùng', dsnv.mangNV );

    // Check name
    isValidation &= validation.checkEmpty(nameNV,'tbTen','Tên không được để trống')&& validation.checkName(nameNV,'tbTen','Tên phải là kí tự chữ')

    // Check email
    isValidation &= validation.checkEmpty(emailNV,'tbEmail','Email không được để trống')&& validation.checkEmail(emailNV,'tbEmail','Email chưa đúng định dạng')

    // Check pass
    isValidation &= validation.checkEmpty(passNV,'tbMatKhau','Mật khẩu không được để trống')&& validation.checkPass(passNV,'tbMatKhau','Mật khẩu ( 6-8 kí tự ) phải gồm số, chữ in hoa, kí tự đặc biệt')

    // Check date
    isValidation &= validation.checkEmpty(dayNV,'tbNgay','Ngày không được để trống')&& validation.checkDate(dayNV,'tbNgay','Ngày phải có định dạng mm/dd/yyyy')

    // Check Salary
    isValidation &= validation.checkEmpty(salaryNV,'tbLuongCB','Lương không được để trống')&& validation.checkLuong(salaryNV,'tbLuongCB','Nhập đúng định dạng số nguyên từ 1000000-20000000')

    // Check Role
    isValidation &= validation.checkRole('chucvu','tbChucVu','Chọn chức vụ')

    // Check timeWork
    isValidation &= validation.checkEmpty(hoursNV,'tbGiolam','Giờ làm không được để trống')&& validation.checkGioLam(hoursNV,'tbGiolam','Nhập đúng định dạng số nguyên từ 80-200')

    if(isValidation){
        // console.log(accountNV, nameNV, emailNV, passNV, dayNV, salaryNV, roleNV, hoursNV)
        // Khởi tạo biến nv theo lớp đối tượng nhân viên đã tạo
        var nv = new NhanVien(accountNV, nameNV, emailNV, passNV, dayNV, Number(salaryNV), roleNV, Number(hoursNV))
        
        // Phương thức xét nhân viên
        nv.xetNhanVien()
        nv.loaiNhanVien = nv.xetNhanVien()
        
        // Phương thức tổng lương theo từng cấp bậc
        nv.sumSalary()
        nv.tongLuong = nv.sumSalary()
        
        
        // Thêm nhân viên cho mảng nhân viên từ lớp đối tượng DanhSachSinhVien
        dsnv.themNhanVien(nv)
        // console.log(dsnv.mangNV)
        
        // Lưu xuống local stotage
        setLocalStorage();
        
        // Hiển thị table
        hienThiTable(dsnv.mangNV)

        // Thông báo thành công
        tbSuccess("Thêm thành công")
        Reset()
    }  
    

}

// Xóa nhân viên
function deleteStaff(ma) {
    dsnv.xoaSinhVien(ma)
    hienThiTable(dsnv.mangNV)
    setLocalStorage()
    
}

// Xem chi tiết
function xemChiTiet(ma) {
    
    var viTri = dsnv.timViTri(ma)
    sv = dsnv.mangNV[viTri];
    getELE('tknv').disabled = true;
    getELE('tknv').value = sv.taiKhoan;
    getELE('name').value = sv.hoTen;
    getELE('email').value = sv.email;
    getELE('password').value = sv.matKhau;
    getELE('datepicker').value = sv.ngayLam;
    getELE('luongCB').value = sv.luongCB;
    getELE('chucvu').value = sv.chucVu;
    getELE('gioLam').value = sv.gioLam;
    // Tắt hiển thị thông báo
    getELE('btnThemNV').style.display = "none";
    // Tắt button thêm người dùng khi click xem đối tượng
    getELE('btnCapNhat').style.display = "inline-block";
    // Ẩn thông báo thành công
    getELE('tbSuccess').style.display = "none";
    // Tắt thông báo lỗi
    tatThongBao();
    
    
}
// Cập nhật nhân viên
function capNhatNhanVien(){
    var accountNV = getELE('tknv').value;
    var nameNV = getELE('name').value;
    var emailNV = getELE('email').value;
    var passNV = getELE('password').value;
    var dayNV = getELE('datepicker').value;
    var salaryNV = getELE('luongCB').value;
    var roleNV = getELE('chucvu').value;
    var hoursNV = getELE('gioLam').value;

    // Validation
    var isValidation = true;

    // Check name
    isValidation &= validation.checkEmpty(nameNV,'tbTen','Tên không được để trống')&& validation.checkName(nameNV,'tbTen','Tên phải là kí tự chữ')

    // Check email
    isValidation &= validation.checkEmpty(emailNV,'tbEmail','Email không được để trống')&& validation.checkEmail(emailNV,'tbEmail','Emailchưa đúng định dạng')

    // Check pass
    isValidation &= validation.checkEmpty(passNV,'tbMatKhau','Mật khẩu không được để trống')&& validation.checkPass(passNV,'tbMatKhau','Mật khẩu ( 6-8 kí tự ) phải gồm số, chữ in hoa, kí tự đặc biệt')

    // Check date
    isValidation &= validation.checkEmpty(dayNV,'tbNgay','Ngày không được để trống')&& validation.checkDate(dayNV,'tbNgay','Ngày phải có định dạng mm/dd/yyyy')

    // Check Salary
    isValidation &= validation.checkEmpty(salaryNV,'tbLuongCB','Lương không được để trống')&& validation.checkLuong(salaryNV,'tbLuongCB','Nhập đúng định dạng số từ 1000000-20000000')

    // Check Role
    isValidation &= validation.checkRole('chucvu','tbChucVu','Chọn chức vụ')

    // Check timeWork
    isValidation &= validation.checkEmpty(hoursNV,'tbGiolam','Giờ làm không được để trống')&& validation.checkGioLam(hoursNV,'tbGiolam','Nhập đúng định dạng số nguyên từ 80-200')

    
    if(isValidation){
        
        var nv = new NhanVien(accountNV, nameNV, emailNV, passNV, dayNV, Number(salaryNV), roleNV, Number(hoursNV))
        // Phương thức xét nhân viên
        nv.xetNhanVien()
        nv.loaiNhanVien = nv.xetNhanVien()
        
        // Phương thức tổng lương theo từng cấp bậc
        nv.sumSalary()
        nv.tongLuong = nv.sumSalary()
        
        dsnv.capNhatNhanVien(nv)
        hienThiTable(dsnv.mangNV)
        setLocalStorage()
        
        // Thông báo thành công
        tbSuccess("Cập nhật thành công")
                
    }


}

// Tìm nhân viên theo loại
function searchKindofNV() {
    var keyWord = getELE('searchName').value
    var mangLoc = dsnv.timKiem(keyWord)
    hienThiTable(mangLoc)
}
getELE('searchName').addEventListener('keyup', searchKindofNV)

// Reset table nhập
function Reset() {
    document.querySelector('.modal-body form').reset();
    // Hiển thị lại button thêm người dùng 
    getELE('btnThemNV').style.display = "inline-block"

    // Tắt hiện thị button cập nhật khi sử dụng tính năng thêm
    getELE('btnCapNhat').style.display = "none";

    getELE('tknv').disabled = false;
    // Tắt thông báo lỗi
    tatThongBao()
    
}

// Tắt hiển thị thông báo khi sai nhập liệu
function tatThongBao(){
    var spThongBao = document.querySelectorAll('.sp-thongbao') 
    spThongBao.forEach(function(item){
        item.style.display = "none"
        
    })
}

// Hiển thị cập nhật và thêm thành công( tạo một dòng thông báo thành công khi nhập đúng và cập nhật)
function tbSuccess(message){
    getELE('tbSuccess').innerHTML = message;
    getELE('tbSuccess').style.display = "inline-block";
}


// Tạo sự kiện click button cho function
// Thêm nhân viên
getELE('btnThemNV').onclick = themNhanVien
// Thêm function reset cho button thêm người dùng
getELE('btnThem').addEventListener('click', function(){
        Reset()
        // Ẩn thông báo success
        getELE('tbSuccess').style.display = "none";
})


// Cập nhật nhân viên
getELE('btnCapNhat').onclick = capNhatNhanVien;


