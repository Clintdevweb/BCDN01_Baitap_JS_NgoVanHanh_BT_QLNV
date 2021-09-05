
function DanhSachNhanVien() {

    this.mangNV = []
    this.themNhanVien = function(nv){
        this.mangNV.push(nv);
    }

    // Phương thức tìm vị trí trong mảng
    this.timViTri = function(ma) {
        var viTri = -1;
        this.mangNV.map(function(item, index){
            if(item.taiKhoan == ma){
                viTri = index
            }
        })
        return viTri;
    }

    // Phương thức xóa sinh viên
    this.xoaSinhVien = function(ma){
        var viTri = this.timViTri(ma)
        if(viTri >= 0){
            this.mangNV.splice(viTri, 1);
        }   
    }

    this.capNhatNhanVien = function(nv) {
        var viTri = this.timViTri(nv.taiKhoan)
        if(viTri >= 0){
            this.mangNV[viTri] = nv
        }
    }

    DanhSachNhanVien.prototype.timKiem =function(keyWord) {
        var mangLoc = [];
        keyWordThuong = keyWord.trim().toLowerCase();
        this.mangNV.map(function(item){
            var tuLoc = item.loaiNhanVien.trim().toLowerCase();
            if(tuLoc.indexOf(keyWordThuong) != -1){
                mangLoc.push(item)
            }
        })
        return mangLoc
    }

}