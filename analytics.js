print = console.log;
window.addEventListener("load", function () {
  trafficSourcePie();
  openTab();
  trafficOverview();
  tooltipRights();
  saveNote();
  trafficDevicesTabs();
  trafficDevices();
  loadNote();
  trafficBrowserChart();
});

// TABS TRAFFIC TRACKER
function openTab() {
  const tabs = document.querySelectorAll(".vertical-tabs-container .tab");
  const contents = document.querySelectorAll(
    ".vertical-tabs-container .content"
  );
  let currentIndex = 0;

  function showContent(index) {
    const currentTab = tabs[currentIndex];
    const nextTab = tabs[index];
    const currentContent = contents[currentIndex];
    const nextContent = contents[index];

    if (index === currentIndex) return;

    if (index > currentIndex) {
      nextContent.style.left = "100%"; // Slide in from the right
    } else {
      nextContent.style.left = "-100%"; // Slide in from the left
    }

    // Add active class to next tab and content
    nextTab.classList.add("active");
    nextContent.classList.add("active");

    // Remove active class from current tab and content
    currentTab.classList.remove("active");
    setTimeout(() => {
      nextContent.style.left = "0";
      currentContent.style.left = index > currentIndex ? "-100%" : "100%"; // Slide out to left or right
      currentContent.classList.remove("active");
    }, 50); // Small delay to allow transition to happen

    currentIndex = index;
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => showContent(index));
  });

  // Initialize the first tab as active
  tabs[0].classList.add("active");
  contents[0].classList.add("active");
}

// TRAFFIC SOURCE CHART
function trafficSourcePie() {
  const ctx = document
    .getElementById("traffic-source-PieChart")
    .getContext("2d");
  const myPieChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "Traffic Source",
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false, // Hide the legend
        },
        tooltip: {
          enabled: true, // Hide the tooltips
        },
      },
    },
  });
}

// TRAFFIC OVERVIEW CHART
function trafficOverview() {
  const ctx = document
    .getElementById("traffic-tracker-PieChart")
    .getContext("2d");
  const myPieChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "Traffic Source",
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false, // Hide the legend
        },
        tooltip: {
          enabled: true, // Hide the tooltips
        },
      },
    },
  });
}

function tooltipRights() {
  const tooltips = document.querySelectorAll(".tooltip-Right");

  tooltips.forEach((tooltip) => {
    const tooltipText = tooltip.querySelector(".tooltiptext");

    let offsetX = 15; // X distance from the cursor
    let offsetY = 15; // Y distance from the cursor

    tooltip.addEventListener("mousemove", function (e) {
      // Show tooltip and position it
      tooltip.classList.add("active");

      // Get cursor position relative to the tooltip container
      const rect = tooltip.getBoundingClientRect();
      const cursorX = e.clientX - rect.left;
      const cursorY = e.clientY - rect.top;

      // Set tooltip position with offsets
      tooltipText.style.left = `${cursorX + offsetX}px`;
      tooltipText.style.top = `${cursorY + offsetY}px`;

      // Adjust tooltip position if it goes out of viewport
      adjustTooltipPosition(tooltipText);
    });

    tooltip.addEventListener("mouseleave", function () {
      // Hide tooltip when mouse leaves
      tooltip.classList.remove("active");
    });

    // Adjust tooltip position if it goes out of viewport
    function adjustTooltipPosition(tooltipText) {
      const tooltipRect = tooltipText.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Check if tooltip is out of bounds and adjust
      if (tooltipRect.right > viewportWidth) {
        tooltipText.style.left = `${viewportWidth - tooltipRect.width - 10}px`;
      }
      if (tooltipRect.bottom > viewportHeight) {
        tooltipText.style.top = `${viewportHeight - tooltipRect.height - 10}px`;
      }
    }

    window.addEventListener("resize", () => {
      // Adjust tooltip position on window resize
      if (tooltip.classList.contains("active")) {
        adjustTooltipPosition(tooltipText);
      }
    });
  });
}

function saveNote() {
  // Function to save the note to localStorage

  const noteInput = document.getElementById("noteInput");
  function saveNoteLocal() {
    const noteText = noteInput.value;
    localStorage.setItem("savedNote", noteText); // Save note to localStorage
    console.log("Note saved:", noteText); // Debugging output
  }

  // Function to load the note from localStorage
  function loadNote() {
    const savedNote = localStorage.getItem("savedNote");
    if (savedNote) {
      document.getElementById("noteInput").value = savedNote;
    }
  }
  loadNote();
  noteInput.addEventListener("input", saveNoteLocal); // Save note on input change

  // Toggle textarea expansion
  const toggleButton = document.getElementById("inputNoteSaverToggle");
  if (toggleButton) {
    toggleButton.addEventListener("click", function () {
      const textarea = document.getElementById("noteInput");
      const image = document.getElementById("inputNoteSaverToggle");

      if (textarea.classList.contains("expanded")) {
        textarea.classList.remove("expanded");
        image.src = "icons/analytics/minimize-plus.svg";
      } else {
        textarea.classList.add("expanded");
        image.src = "icons/analytics/minimize-minus.svg";
      }
    });
  }
}

// TRAFFIC DEVICE TABS
function trafficDevicesTabs() {
  const tabs = document.querySelectorAll(".horizontal-tabs-container .hr-tab");
  const contents = document.querySelectorAll(
    ".horizontal-tabs-container .hr-content"
  );
  print(contents);

  // Function to deactivate all tabs and contents
  function deactivateAll() {
    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });
    contents.forEach((content) => {
      content.classList.remove("active");
    });
  }

  // Function to activate a specific tab and content
  function activateTab(index) {
    tabs[index].classList.add("active");
    contents[index].classList.add("active");
  }

  // Initial activation of the first tab
  deactivateAll();
  activateTab(0);

  // Event listener for tabs
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", function () {
      deactivateAll();
      activateTab(index);
    });
  });
}

// TRAFFIC OVERVIEW CHART
function trafficDevices() {
  var ctx = document.getElementById("traffic-tracker-device").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Windows", "Android", "iPhone", "Mac", "Others"],
      datasets: [
        {
          label: "Users",
          data: [12, 19, 3, 5, 2],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        x: {
          ticks: {
            callback: function (value) {
              return this.getLabelForValue(value).split(" ");
            },
          },
        },
        y: {
          beginAtZero: true,
        },
      },

      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: true,
        },
      },
    },
  });
}

// TRAFFIC BROWSER CHART
function trafficBrowserChart() {
  const ctx = document.getElementById("traffic-browser-chart").getContext("2d");

  const chartData = {
    labels: [
      "Google Chrome",
      "Mozilla Firefox",
      "Microsoft Edge",
      "Opera Browser",
      "UC Browser",
      "Apple Safari",
      "Other Browser",
    ],
    datasets: [
      {
        label: "Browser Usage",
        data: [
          Math.floor(Math.random() * 100), // Random value for Google Chrome
          Math.floor(Math.random() * 100), // Random value for Mozilla Firefox
          Math.floor(Math.random() * 100), // Random value for Microsoft Edge
          Math.floor(Math.random() * 100), // Random value for Opera Browser
          Math.floor(Math.random() * 100), // Random value for UC Browser
          Math.floor(Math.random() * 100), // Random value for Apple Safari
          Math.floor(Math.random() * 100), // Random value for Other Browser
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(201, 203, 207, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const trafficBrowserChart = new Chart(ctx, {
    type: "bar",
    data: chartData,
    options: {
      indexAxis: "y",
      scales: {
        x: {
          beginAtZero: true,
        },
      },
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: true,
        },
      },
    },
  });
}
