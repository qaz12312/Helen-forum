
// 下拉選單，toggle切換
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// 關閉下拉選單
window.onclick = function(e) {
  if (!e.target.matches('.dropbtn')) {
  var myDropdown = document.getElementById("myDropdown");
    if (myDropdown.classList.contains('show')) {
      myDropdown.classList.remove('show');
    }
  }
}

function cross(x) {
  x.classList.toggle("change");
}

// 關閉叉叉，但是目前有問題

window.onclick = function(e) {
  if (!e.target.matches('.dropbtn')) {
  var cross = document.getElementById("cross");
    if (cross.classList.contains('change')) {
      cross.classList.remove('change');
    }
  }
}


