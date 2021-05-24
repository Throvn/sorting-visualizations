const $sidebarBtn = document.getElementById("sidebar-control");
const $sidebarBtnCollapsed = document.getElementById(
  "sidebar-control-collapsed"
);
const $sidebar = document.getElementById("sidebar");
const $mainContent = document.getElementById("main");

$sidebarBtn.addEventListener("click", () => {
  $sidebar.style.display = "none";
  $mainContent.className = "col-12 h-100";
  $sidebarBtnCollapsed.style.display = "inline-block";
});

$sidebarBtnCollapsed.addEventListener("click", () => {
  $sidebar.style.display = "inline-block";
  $mainContent.className =
    "col-12 col-md-9 col-lg-10 offset-lg-2 offset-md-3 h-100";
  $sidebarBtnCollapsed.style.display = "none";
});
