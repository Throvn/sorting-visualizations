const $sidebarBtn = document.getElementById("sidebar-control");
const $sidebarBtnCollapsed = document.getElementById(
  "sidebar-control-collapsed"
);
const $sidebar = document.getElementById("sidebar");
const $mainContent = document.getElementById("main");

$sidebarBtn.addEventListener("click", () => {
  $sidebar.style.display = "none";
  $mainContent.classList.replace("col-9", "col-12");
  $mainContent.classList.remove("offset-3");
  $sidebarBtnCollapsed.style.display = "inline-block";
});

$sidebarBtnCollapsed.addEventListener("click", () => {
  $mainContent.classList.replace("col-12", "col-9");
  $mainContent.classList.add("offset-3");
  $sidebar.style.display = "inline-block";
  $sidebarBtnCollapsed.style.display = "none";
});
