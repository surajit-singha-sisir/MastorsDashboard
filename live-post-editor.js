window.onload = function () {
  liveTabContent();
  iframe();
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
    document.querySelectorAll('#add-post-category').forEach(select => {
        select.addEventListener('change', function() {
            const selectedOption = this.options[this.selectedIndex];
            const iframe = document.getElementById('website-iframe');
            const websiteName = document.getElementById('website-name');
            
            iframe.src = selectedOption.value;
            websiteName.innerHTML = selectedOption.textContent;
        });
    });
  }
  