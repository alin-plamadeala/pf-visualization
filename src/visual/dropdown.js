/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */

$(".dropbtn").click(function () {
  $(".dropdown-content").removeClass("show");

  $(this).siblings().toggleClass("show");
});

window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    document.getElementsByClassName("dropbtn")[0].blur();
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};
