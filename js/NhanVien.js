// Tạo lớp đối tượng nhan viên(Object constructor)

function NhanVien(accountNV, nameNV, emailNV, passNV, dayNV, salaryNV, roleNV, hoursNV) {
    // Thuộc tính nhân viên
    this.taiKhoan = accountNV;
    this.hoTen = nameNV;
    this.email = emailNV;
    this.matKhau = passNV;
    this.ngayLam = dayNV;
    this.luongCB = salaryNV;
    this.chucVu = roleNV;
    this.gioLam = hoursNV;
    this.loaiNhanVien = "";
    this.tongLuong = 0;

    // Phương thức xét loại nhân viên
    this.xetNhanVien = function () {
        if (this.gioLam >= 192) {
            return "Xuất sắc"
        } else if (this.gioLam < 192 && this.gioLam >= 176) {
            return "Giỏi"
        } else if (this.gioLam < 176 && this.gioLam >= 160) {
            return "Khá"
        } else {
            return "Trung bình"
        }

    };

    //Phương thức tính  tổng lương
    this.sumSalary = function () {
        if (this.chucVu == "Sếp") {
            return this.luongCB * 3
        } else if (this.chucVu == "Trưởng phòng") {
            return this.luongCB * 2
        } else if (this.chucVu == "Nhân viên") {
            return this.luongCB
        }
    }


}