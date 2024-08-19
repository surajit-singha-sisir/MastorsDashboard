window.onload = function () {
  liveTabContent();
  iframe();
  tabElementCollupse();
};

function liveTabContent() {
  const tabs = document.querySelectorAll(".tab-item");
  const contents = document.querySelectorAll(".tab-content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((item) => item.classList.remove("active"));
      contents.forEach((content) => content.classList.remove("active"));

      tab.classList.add("active");
      document
        .getElementById(tab.getAttribute("data-tab"))
        .classList.add("active");
    });
  });
}

function iframe() {
  const iframe = document.getElementById("website-iframe");
  const websiteName = document.getElementById("website-name");
  const selects = document.querySelectorAll(".add-post-categories");

  selects.forEach((select) => {
    select.addEventListener("change", function () {
      const selectedOption = this.options[this.selectedIndex];
      iframe.src = selectedOption.value;
      websiteName.textContent = selectedOption.textContent;
    });
  });
}

function tabElementCollupse() {
  const tabButtons = document.querySelectorAll(".live-post-tabs");
  const iframe = document.querySelector(".iframe-container");

  tabButtons.forEach((tab) => {
    tab.addEventListener("click", () => {
      const contents = document.querySelectorAll(".tab-content");
      contents.forEach((e) => {
        e.classList.toggle("hide");
      });

      if (iframe) {
        iframe.classList.toggle("iframe-height-2");
      }
    });
  });
}
