print = console.log;
window.onload = function () {
  popupForIcon();
  navMenu();
  negPosRating();
  autoCounter();
  dotContext();
  // chart();
  loadXMLDoc();
  screenshot();
};
function popupForIcon() {
  // HELP ICON
  const helpIcon = document.getElementById("help-icon");
  // PLUS ICON
  const plusIcon = document.getElementById("plus-icon");
  // USER ICON
  const userIcon = document.getElementById("user-icon");
  // POPUP
  const popup = document.getElementById("popup");

  const popupSections = document.querySelectorAll(
    ".deshboard-right-icons > section"
  );
  const deshboardRightIcons = document.querySelectorAll(
    ".deshboard-right-icons > div"
  );

  for (let i = 0; i < deshboardRightIcons.length; i++) {
    const currentIndex = deshboardRightIcons[i];

    helpIcon.onclick = (e) => {
      e.stopPropagation();
      popupSections[0].classList.remove("hide");
      popupSections[0].classList.add("show");
    };
    plusIcon.onclick = (e) => {
      e.stopPropagation();
      popupSections[1].classList.remove("hide");
      popupSections[1].classList.add("show");
    };
    userIcon.onclick = (e) => {
      e.stopPropagation();
      popupSections[2].classList.remove("hide");
      popupSections[2].classList.add("show");
    };

    document.onclick = (e) => {
      popupSections.forEach((x) => {
        x.classList.remove("show");
        x.classList.add("hide");
      });
    };
  }
}

// NAV MENU
function navMenu() {
  const navItemTexts = document.querySelectorAll(
    ".dashboard-navItems .flexNav p"
  );

  const hamburger = document.querySelector(".hamburger");
  const navbar = document.querySelector(".dashboard-body .dashboard-grid");
  const iconicDeshboard = document.querySelector(".iconic-dashboard-grid");
  const logoH1 = document.querySelector(".your-dashboard-logo h1");
  const icons = document.querySelectorAll(".flexNav .setNavIcon");

  hamburger.onclick = () => {
    navItemTexts.forEach((p) => {
      p.classList.contains("right-shift")
        ? p.classList.remove("right-shift") &
          p.classList.toggle("left-shift") &
          navbar.classList.remove("dashboard-grid") &
          navbar.classList.add("iconic-dashboard-grid") &
          logoH1.classList.add("hide") &
          icons.forEach((icon) => {
            icon.style.transform = "scale(1.5)  translateX(80%)";
          })
        : p.classList.add("right-shift") &
          p.classList.remove("left-shift") &
          navbar.classList.add("dashboard-grid") &
          navbar.classList.remove("iconic-dashboard-grid") &
          logoH1.classList.remove("hide") &
          icons.forEach((icon) => {
            icon.style.transform = "scale(1)";
          });
    });
  };
}

// OVERVIEW RATING COLOR ADDING
function negPosRating() {
  const negPosContents = document.querySelectorAll(".negative-positive-rating");

  negPosContents.forEach((negPosContent) => {
    const getData = parseInt(negPosContent.getAttribute("data-target"));
    if (getData > 100) {
      negPosContent.style.color = "#6dff48";
    } else {
      negPosContent.style.color = "red";
    }
    negPosContent.innerHTML = getData + "%";
  });
}

// AUTO COUNTING ANIMATION
function autoCounter() {
  const counters = document.querySelectorAll(".autoCounter");
  const duration = 8000;

  counters.forEach((counter) => {
    const targetNumber = parseInt(counter.getAttribute("data-target"), 10);
    const stepTime = Math.floor(duration / targetNumber);
    let currentNumber = 0;

    function updateCounter() {
      currentNumber += 30;
      counter.textContent = currentNumber;

      if (currentNumber < targetNumber) {
        setTimeout(updateCounter, stepTime);
      } else {
        counter.textContent = targetNumber;
      }
    }

    updateCounter();
  });
}

// 3 DOT BUTTON ON CLICK
function dotContext() {
  const dotsButton = document.querySelector(".dot-button");
  const dotMenu = document.querySelector(".dot-button .dots-context-menu");
  dotsButton.onclick = () => {
    dotMenu.classList.toggle("show");
  };
}

function loadXMLDoc() {
  // HIDE TOGGLE FOR EACH CHART CLICK
  // Get all chart buttons and canvases
  const chartButtons = document.querySelectorAll(".chart-swap-button button");
  const chartCanvases = document.querySelectorAll(".chartJS-canvases canvas");

  // Add 'chart-hover-active' to the first button
  chartButtons[0].classList.add("chart-hover-active");

  // Remove 'hide' from the first canvas
  chartCanvases[0].classList.remove("hide");

  // Add 'showDefault' to the first canvas
  chartCanvases[0].classList.add("showDefault");

  // Add click event listener to each chart button
  chartButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      // Remove 'chart-hover-active' from all buttons
      chartButtons.forEach((btn) => btn.classList.remove("chart-hover-active"));
      // Remove 'showDefault' from all canvases
      chartCanvases.forEach((canvas) => canvas.classList.remove("showDefault"));
      // Add 'hide' to all canvases
      chartCanvases.forEach((canvas) => canvas.classList.add("hide"));

      // Add 'chart-hover-active' to the clicked button
      button.classList.add("chart-hover-active");
      // Remove 'hide' from the corresponding canvas
      chartCanvases[index].classList.remove("hide");
      // Add 'showDefault' to the corresponding canvas
      chartCanvases[index].classList.add("showDefault");
    });
  });

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function (p) {
    if (this.readyState == 4 && this.status == 200) {
      function chart(x) {
        const data = JSON.parse(x);
        const xValues = data.x;
        const yValues = data.y;
        const barColors = [
          "red",
          "blue",
          "green",
          "yellow",
          "orange",
          "purple",
          "pink",
          "brown",
          "black",
          "white",
          "gray",
          "cyan",
          "magenta",
          "maroon",
          "navy",
          "olive",
          "teal",
          "lime",
          "indigo",
          "violet",
          "gold",
          "silver",
          "beige",
          "turquoise",
          "lavender",
        ];

        // TODAY CHAR
        new Chart("todayChart", {
          type: "line",
          data: {
            labels: xValues,
            borderColor: "#ffffff",
            datasets: [
              {
                backgroundColor: "#4493f8",
                borderColor: barColors,
                data: yValues,
                fill: true,
              },
            ],
          },
          options: {
            legend: { display: false },
            title: {
              display: true,
            },
          },
        });

        // WEEK CHAR
        new Chart("weekChart", {
          type: "line",
          data: {
            labels: xValues,
            borderColor: "#ffffff",
            datasets: [
              {
                backgroundColor: "#4493f8",
                borderColor: barColors,
                data: yValues,
                fill: true,
              },
            ],
          },
          options: {
            legend: { display: false },
            title: {
              display: true,
            },
          },
        });

        // MONTH CHAR
        new Chart("monthChart", {
          type: "line",
          data: {
            labels: xValues,
            borderColor: "#ffffff",
            datasets: [
              {
                backgroundColor: "#4493f8",
                borderColor: barColors,
                data: yValues,
                fill: true,
              },
            ],
          },
          options: {
            legend: { display: false },
            title: {
              display: true,
            },
          },
        });

        // YEAR CHAR
        new Chart("yearChart", {
          type: "line",
          data: {
            labels: xValues,
            borderColor: "#ffffff",
            datasets: [
              {
                backgroundColor: "#4493f8",
                borderColor: barColors,
                data: yValues,
                fill: true,
              },
            ],
          },
          options: {
            legend: { display: false },
            title: {
              display: true,
            },
          },
        });
      }

      chart(p.target.responseText);
    }
  };
  xhttp.open("GET", "https://surmakontho.com/news/graphdata", true);
  xhttp.send();
}

// CHART JS

function screenshot() {
  document.getElementById("capture").addEventListener("click", function () {
    const targetElement = document.querySelector(".dashboard-analytics");
    const elementsToHide = document.querySelectorAll(".dot-button");
    elementsToHide.forEach((el) => el.classList.add("hide"));

    html2canvas(targetElement)
      .then((canvas) => {
        const context = canvas.getContext("2d");
        const watermarkText = "KEHEM.COM";
        context.font = "20px Arial";
        context.fillStyle = "rgba(255, 255, 255, 0.3)";
        context.textAlign = "center";

        const xPosition = canvas.width;
        print(xPosition);
        const yPosition = canvas.height - 20;
        context.fillText(watermarkText, xPosition, yPosition);

        const screenshotImage = canvas.toDataURL();
        const newTab = window.open();
        const body = newTab.document.body;
        body.style =
          "background-color: #000005; width: 100vw; height:100vh; display:flex; justify-content:center; align-items:center; flex-direction: column; font-weight:600; font-size:2rem; color: white;";

        body.innerHTML = `"THIS IMAGE IS GENERATE BY MASTOR'S DASHBOARD"<br><br><br><br><img src="${screenshotImage}" style="width: 80%; "/>`;

        elementsToHide.forEach((el) => el.classList.remove("hide"));
      })
      .catch((error) => {
        console.error("Error capturing screenshot:", error);
        elementsToHide.forEach((el) => el.classList.remove("hide"));
      });
  });
}
