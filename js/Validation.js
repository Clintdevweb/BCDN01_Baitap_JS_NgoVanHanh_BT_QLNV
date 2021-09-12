// Kiểm tra dữ liệu

function Validation(){
    
    // Kiểm tra rỗng
    this.checkEmpty = function(inputValue, spanID, message){
        if(inputValue.trim() == ""){
            document.getElementById(spanID).style.display = "inline-block"
            document.getElementById(spanID).innerHTML = message
            return false;
        }
        else{
            document.getElementById(spanID).style.display = "none"
            return true;
        }
    }

    // Kiểm tra tài khoản
    this.checkID = function(inputValue, spanID, message, mang) {
        var isExist = false
        isExist = mang.some(function(item){
            return (item.taiKhoan == inputValue.trim())
        })
        if(isExist){
            document.getElementById(spanID).style.display = "inline-block"
            document.getElementById(spanID).innerHTML = message;
            return false;
        }else{
            document.getElementById(spanID).style.display = "none"
            return true;
        }
    }

    // Kiểm tra name 
    this.checkName = function(inputValue, spanID, message){
        var pattern = new RegExp("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$");

        if(pattern.test(inputValue)){
            document.getElementById(spanID).style.display = "none"
            return true;
        }else{
            document.getElementById(spanID).style.display = "inline-block"
            document.getElementById(spanID).innerHTML = message;
            return false;
        }
    }

    // Kiểm tra email
    this.checkEmail = function(inputValue, spanID, message){
        var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if(inputValue.match(pattern)){
            document.getElementById(spanID).style.display = "none"
            return true;
        }else{
            document.getElementById(spanID).style.display = "inline-block"
            document.getElementById(spanID).innerHTML = message;
            return false;
        }
    }

    // Kiểm tra mật khẩu
    this.checkPass = function(inputValue, spanID, message) {
        var pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,8}$/;

        if(inputValue.match(pattern)){
            document.getElementById(spanID).style.display = "none"
            return true;
        }else{
            document.getElementById(spanID).style.display = "inline-block"
            document.getElementById(spanID).innerHTML = message;
            return false;
        }
    }

    // Kiểm tra ngày
    this.checkDate = function(inputValue, spanID, message){
        var pattern = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;

        if(inputValue.match(pattern)){
            document.getElementById(spanID).style.display = "none"
            return true;
        }else{
            document.getElementById(spanID).style.display = "inline-block"
            document.getElementById(spanID).innerHTML = message;
            return false;
        }
    
    }

    // Kiểm tra lương
    this.checkLuong = function(inputValue, spanID, message) {
        var pattern = /^[0-9]+$/;
        if(Number(inputValue) <= 20e6 && Number(inputValue) >= 1e6 && inputValue.match(pattern)) {
            document.getElementById(spanID).style.display = "none"
            return true;
        }else{
            document.getElementById(spanID).style.display = "inline-block"
            document.getElementById(spanID).innerHTML = message;
            return false;
        }
    }

    // Kiểm tra chức vụ
    this.checkRole = function(selID, spanID, message) {
        var optIndex = getELE(selID).selectedIndex;
        if(optIndex != 0) {
            document.getElementById(spanID).style.display = "none"
            return true;
        }else{
            document.getElementById(spanID).style.display = "inline-block"
            document.getElementById(spanID).innerHTML = message;
            return false;
        }
    }

    // Kiểm tra giờ làm
    this.checkGioLam = function(inputValue, spanID, message) {
        var pattern = /^[0-9]+$/;
        if(Number(inputValue) <= 200 && Number(inputValue) >= 80 && inputValue.match(pattern)) {
            document.getElementById(spanID).style.display = "none"
            return true;
        }else{
            document.getElementById(spanID).style.display = "inline-block"
            document.getElementById(spanID).innerHTML = message;
            return false;
        }
    }

    
}


