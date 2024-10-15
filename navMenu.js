
document.addEventListener("DOMContentLoaded", function() {
  navMenu();

  function loading() {
    const loading = document.getElementById('dom-content-loader');
    loading.classList.add('hide');
  }
  loading()
})
function navMenu() {
  const navItemTexts = document.querySelectorAll(
    ".dashboard-navItems .flexNav p"
  );

  // HIDE ALL
  navItemTexts.forEach(function (item) {
    item.classList.add("hide");

    const logo = document.querySelector(".your-dashboard-logo h1");
    logo.classList.add("hide");
  });

  // INCREASE ICON SIZE
  const icons = document.querySelectorAll(".flexNav .setNavIcon");
  icons.forEach(function (icon) {
    icon.classList.add("setNavIcon-Zipped");
  });

  // ZIPPED NAVBAR
  const grid = document.querySelector(".dashboard-grid");
  grid.classList.add("dashboard-grid-zipped");

  // SET HOVER
  function setHover() {
    const navItems = document.querySelectorAll(".dashboard-navItems .flexNav");

    navItems.forEach(function (item) {
      item.classList.remove("flexNavHover");
      item.classList.add("flexNavZippedHover");
    });
  }
  setHover();

  function expandNavs() {
    const navItem = document.querySelector(".main-navbar");

    // MOUSE ON
    navItem.addEventListener("mouseover", function () {
      // UNZIPPED NAVBAR
      const grid = document.querySelector(".dashboard-grid");
      grid.classList.remove("dashboard-grid-zipped");
      grid.classList.add("right-slider-1");

      // RESET ICON SIZE
      const icons = document.querySelectorAll(".flexNav .setNavIcon");
      icons.forEach(function (icon) {
        icon.classList.remove("setNavIcon-Zipped");
        icon.classList.add("right-slider-1");
      });

      // SET HOVER
      function setHover() {
        const navItems = document.querySelectorAll(
          ".dashboard-navItems .flexNav"
        );

        navItems.forEach(function (item) {
          item.classList.add("flexNavHover");
          item.classList.remove("flexNavZippedHover");
        });
      }
      setHover();

      // UNHIDE ALL
      navItemTexts.forEach(function (item) {
        item.classList.remove("hide");
        item.classList.add("right-slider-2");
        const logo = document.querySelector(".your-dashboard-logo h1");
        logo.classList.remove("hide");

        logo.classList.add("right-slider-2");
        item.style.opacity = 1;
        logo.style.opacity = 1;
      });

      // LEFT BG POSITION UPDATE
      const navbar = document.querySelector(".dashboard-sticky-navbar");
      navbar.classList.add("dashboard-sticky-navbar-unzipped");
    });

    // MOUSE OUT
    navItem.addEventListener("mouseout", function () {
      // ZIP NAVBAR BACK
      const grid = document.querySelector(".dashboard-grid");
      grid.classList.add("dashboard-grid-zipped");

      // RESET ICON SIZE
      const icons = document.querySelectorAll(".flexNav .setNavIcon");
      icons.forEach(function (icon) {
        icon.classList.add("setNavIcon-Zipped");
      });
      // RESET HOVER
      function setHover() {
        const navItems = document.querySelectorAll(
          ".dashboard-navItems .flexNav"
        );

        navItems.forEach(function (item) {
          item.classList.remove("flexNavHover");
          item.classList.add("flexNavZippedHover");
        });
      }
      setHover();

      // HIDE ALL
      navItemTexts.forEach(function (item) {
        item.style.opacity = 0;
        const logo = document.querySelector(".your-dashboard-logo h1");
        logo.style.opacity = 0;
        item.classList.add("hide");
        logo.classList.add("hide");
      });

      // LEFT BG POSITION UPDATE
      const navbar = document.querySelector(".dashboard-sticky-navbar");
      navbar.classList.remove("dashboard-sticky-navbar-unzipped");
    });
  }

  expandNavs();
}

