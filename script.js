/*function toggleMenuBar() {
    document.body.classList.toggle('menu-on');
}*/
function add_select(arr, ID){
    var x = document.getElementById(ID);
    arr.forEach(function(a){
        var op = document.createElement("option");
        op.value = a;
        op.text = a;
        x.add(op);
    });
}
$(document).ready(function(){
    var submenu = $(".nav>ul");
    $(".nav>a").mouseenter(function(){
        submenu.slideDown("250");
    });
    $(".nav>a").click(function(){
        submenu.slideToggle("250");
    });
    $(".nav").mouseleave(function(){
        submenu.slideUp("250");
    });
    var parents_city = ["전체","서울특별시","경기도","인천광역시","전라북도","전라남도","대전광역시","강원도","충청북도","충청남도","광주광역시","전라북도","전라남도","부산광역시","대구광역시","울산광역시","제주특별자치도","세종특별자치시"];
    add_select(parents_city, 'regionMenu');
    var kindOfschool = ["전체","일반고","특목고","특성화고","자사고","자공고"];
    add_select(kindOfschool, 'schoolMenu');
});

function finderPopup() {
     window.open("highschoolSearch.html", "a", "width=850, height=1200, left=500, top=50");
}

function search() {
	//var searchValue = $('#inputArea').val();
	//alert("<?echo naverNewsResult(\""+searchValue+"\", 'date', 10);?>");
}
