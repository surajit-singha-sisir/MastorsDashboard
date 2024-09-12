print = console.log;
window.addEventListener("load", function () {
  trafficSourcePie();
  openTab();
  trafficOverview();
  tooltipRights();
  saveNote();
  trafficDevicesTabs();
  trafficDevices();
  trafficBrowserChart();
  locationTrackerTab();
  socialMediaShare();
  locationTrackerMap();
  commentAnalysisChart();
  // periodicAnalysisTop();
  // periodicAnalysislast();
  periodicAnalysis();
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
function socialMediaShare() {
  var ctx = document.getElementById("traffic-browser-chart").getContext("2d");
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
          display: true,
        },
        tooltip: {
          enabled: true,
        },
      },
    },
  });
}

function locationTrackerTab() {
  const tabLinks = document.querySelectorAll(".tablinks");
  const tabContents = document.querySelectorAll(".location-tabcontent");

  tabLinks.forEach((tab, index) => {
    tab.addEventListener("click", function () {
      tabContents.forEach((content) => (content.style.display = "none"));
      tabLinks.forEach((link) => link.classList.remove("active"));
      tabContents[index].style.display = "block";
      tab.classList.add("active");
    });
  });

  tabContents[0].style.display = "block";
  tabLinks[0].classList.add("active");
}

function locationTrackerMap() {
  function todayMap() {
    // World map js

    // Initialize the map
    var map = L.map("map-today").setView([20, 0], 2); // Centered globally with a zoom level of 2

    // Add a tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "",
    }).addTo(map);

    // Country visitor data
    var visitorData = [
      { country: "Bangladesh", count: 110 },
      { country: "India", count: 510 },
      { country: "USA", count: 2123 },
      { country: "Russia", count: 5514 },
      { country: "Bhutan", count: 210 },
      // Add more data as needed
    ];

    // Function to get approximate coordinates for countries
    function getCountryCoordinates(country) {
      const coordinates = {
        Bangladesh: [23.685, 90.3563],
        India: [20.5937, 78.9629],
        USA: [37.0902, -95.7129],
        Russia: [61.524, 105.3188],
        Bhutan: [27.5142, 90.4336],
        // Add coordinates for more countries as needed
      };
      return coordinates[country] || [0, 0]; // Default to [0, 0] if country not found
    }

    // Add markers to the map with popups
    visitorData.forEach(function (visitor) {
      const coords = getCountryCoordinates(visitor.country);
      L.marker(coords)
        .bindPopup(
          "<b>Country:</b> " +
          visitor.country +
          "<br><b>Visitor Count:</b> " +
          visitor.count
        )
        .addTo(map);
    });
  }
  todayMap();
  function weekMap() {
    // World map js

    // Initialize the map
    var map = L.map("map-week").setView([20, 0], 2); // Centered globally with a zoom level of 2

    // Add a tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "",
    }).addTo(map);

    // Country visitor data
    var visitorData = [
      { country: "Bangladesh", count: 110 },
      { country: "India", count: 510 },
      { country: "USA", count: 2123 },
      { country: "Russia", count: 5514 },
      { country: "Bhutan", count: 210 },
      // Add more data as needed
    ];

    // Function to get approximate coordinates for countries
    function getCountryCoordinates(country) {
      const coordinates = {
        Bangladesh: [23.685, 90.3563],
        India: [20.5937, 78.9629],
        USA: [37.0902, -95.7129],
        Russia: [61.524, 105.3188],
        Bhutan: [27.5142, 90.4336],
        // Add coordinates for more countries as needed
      };
      return coordinates[country] || [0, 0]; // Default to [0, 0] if country not found
    }

    // Add markers to the map with popups
    visitorData.forEach(function (visitor) {
      const coords = getCountryCoordinates(visitor.country);
      L.marker(coords)
        .bindPopup(
          "<b>Country:</b> " +
          visitor.country +
          "<br><b>Visitor Count:</b> " +
          visitor.count
        )
        .addTo(map);
    });
  }
  weekMap();
  function monthMap() {
    // World map js

    // Initialize the map
    var map = L.map("map-month").setView([20, 0], 2); // Centered globally with a zoom level of 2

    // Add a tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "",
    }).addTo(map);

    // Country visitor data
    var visitorData = [
      { country: "Bangladesh", count: 110 },
      { country: "India", count: 510 },
      { country: "USA", count: 2123 },
      { country: "Russia", count: 5514 },
      { country: "Bhutan", count: 210 },
      // Add more data as needed
    ];

    // Function to get approximate coordinates for countries
    function getCountryCoordinates(country) {
      const coordinates = {
        Bangladesh: [23.685, 90.3563],
        India: [20.5937, 78.9629],
        USA: [37.0902, -95.7129],
        Russia: [61.524, 105.3188],
        Bhutan: [27.5142, 90.4336],
        // Add coordinates for more countries as needed
      };
      return coordinates[country] || [0, 0]; // Default to [0, 0] if country not found
    }

    // Add markers to the map with popups
    visitorData.forEach(function (visitor) {
      const coords = getCountryCoordinates(visitor.country);
      L.marker(coords)
        .bindPopup(
          "<b>Country:</b> " +
          visitor.country +
          "<br><b>Visitor Count:</b> " +
          visitor.count
        )
        .addTo(map);
    });
  }
  monthMap();
  function yearMap() {
    // World map js

    // Initialize the map
    var map = L.map("map-year").setView([20, 0], 2); // Centered globally with a zoom level of 2

    // Add a tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "",
    }).addTo(map);

    // Country visitor data
    var visitorData = [
      { country: "Bangladesh", count: 110 },
      { country: "India", count: 510 },
      { country: "USA", count: 2123 },
      { country: "Russia", count: 5514 },
      { country: "Bhutan", count: 210 },
      // Add more data as needed
    ];

    // Function to get approximate coordinates for countries
    function getCountryCoordinates(country) {
      const coordinates = {
        Bangladesh: [23.685, 90.3563],
        India: [20.5937, 78.9629],
        USA: [37.0902, -95.7129],
        Russia: [61.524, 105.3188],
        Bhutan: [27.5142, 90.4336],
        // Add coordinates for more countries as needed
      };
      return coordinates[country] || [0, 0]; // Default to [0, 0] if country not found
    }

    // Add markers to the map with popups
    visitorData.forEach(function (visitor) {
      const coords = getCountryCoordinates(visitor.country);
      L.marker(coords)
        .bindPopup(
          "<b>Country:</b> " +
          visitor.country +
          "<br><b>Visitor Count:</b> " +
          visitor.count
        )
        .addTo(map);
    });
  }
  yearMap();
}
function topCountryBar() {
  const country1 = document.getElementById("percentage-bar-1");
  const country2 = document.getElementById("percentage-bar-2");
  const country3 = document.getElementById("percentage-bar-3");
  const country4 = document.getElementById("percentage-bar-4");
  const country5 = document.getElementById("percentage-bar-5");
}

// TRAFFIC BROWSER CHART
function trafficBrowserChart() {
  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Configure it: GET-request for the URL /news/analytics
  xhr.open("GET", "https://kehem.com/news/analytics", true);

  // Send the request over the network
  xhr.send();

  // This will be called after the response is received
  xhr.onload = function () {
    if (xhr.status != 200) {
      // analyze HTTP response status
      console.error(`Error ${xhr.status}: ${xhr.statusText}`); // e.g., 404: Not Found
    } else {
      // show the result
      // Assuming the response is JSON
      var response = JSON.parse(xhr.responseText);

      // Map the response data to labels and data arrays
      var labels = Object.keys(response); // e.g., ["onedayago_logs", "twodayago_logs"]
      var data = Object.values(response); // e.g., [74, 71]

      // Now set up your chart
      var ctx = document.getElementById("social-share-chart").getContext("2d");
      var myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels, // Use the keys from the response as labels
          datasets: [
            {
              label: "Social Media Share", // You can change this label as needed
              data: data, // Use the values from the response as data
              fill: true, // Enables the fill under the line
              backgroundColor: "rgba(75, 192, 192, 0.2)", // Single fill color for the area under the line
              borderColor: "rgba(75, 192, 192, 1)", // Line color
              borderWidth: 1,
              pointBackgroundColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
              ],
              pointBorderColor: "#fff", // Color of the border of points
              pointBorderWidth: 2, // Width of the border of points
            },
          ],
        },
      });
    }
  };

  // If request fails
  xhr.onerror = function () {
    console.error("Request failed");
  };
}

// TRAFFIC BROWSER CHART
function commentAnalysisChart() {
  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Configure it: GET-request for the URL /news/analytics
  xhr.open("GET", "https://kehem.com/news/analytics", true);

  // Send the request over the network
  xhr.send();

  // This will be called after the response is received
  xhr.onload = function () {
    if (xhr.status != 200) {
      // analyze HTTP response status
      console.error(`Error ${xhr.status}: ${xhr.statusText}`); // e.g., 404: Not Found
    } else {
      // show the result
      // Assuming the response is JSON
      var response = JSON.parse(xhr.responseText);

      // Map the response data to labels and data arrays
      var labels = Object.keys(response); // e.g., ["onedayago_logs", "twodayago_logs"]
      var data = Object.values(response); // e.g., [74, 71]

      // Now set up your chart
      var ctx = document
        .getElementById("comment-analysis-chart")
        .getContext("2d");
      var myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels, // Use the keys from the response as labels
          datasets: [
            {
              label: "Social Media Share", // You can change this label as needed
              data: data, // Use the values from the response as data
              fill: true, // Enables the fill under the line
              backgroundColor: "rgba(75, 192, 192, 0.2)", // Single fill color for the area under the line
              borderColor: "rgba(75, 192, 192, 1)", // Line color
              borderWidth: 1,
              pointBackgroundColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
              ],
              pointBorderColor: "#fff", // Color of the border of points
              pointBorderWidth: 2, // Width of the border of points
            },
          ],
        },
      });
    }
  };

  // If request fails
  xhr.onerror = function () {
    console.error("Request failed");
  };
}

// PERIODIC ANALYSIS TOP TABS
function periodicAnalysisTop() {
  const tabLinks = document.querySelectorAll(".periodic-top-tab .tablinks");
  const tabContents = document.querySelectorAll(".periodic-top-tabcontent");

  tabLinks.forEach((tab, index) => {
    tab.addEventListener("click", function () {
      tabContents.forEach((content) => (content.style.display = "none"));
      tabLinks.forEach((link) => link.classList.remove("active"));
      tabContents[index].style.display = "block";
      tab.classList.add("active");
    });
  });

  tabContents[1].style.display = "block";
  tabLinks[0].classList.add("active");
}

function periodicAnalysis() {
  function periodicAnalysisTop() {
    const tabLinks = document.querySelectorAll(".periodic-top-tab .tablinks");
    const tabContents = document.querySelectorAll(".periodic-top-tabcontent");

    function activateTab(index) {
      tabLinks.forEach((link) => link.classList.remove("active"));
      tabContents.forEach((content) => {
        content.classList.remove("active");
        content.classList.add("hide");
      });

      tabLinks[index].classList.add("active");
      tabContents[index].classList.add("active");
      tabContents[index].classList.remove("hide");
    }

    activateTab(0);

    tabLinks.forEach((link, index) => {
      link.addEventListener("click", () => {
        activateTab(index);
      });
    });
  }

  // Function to handle the periodic last tabs
  function periodicAnalysislast() {
    const tabLinks = document.querySelectorAll(".periodic-last-tab .tablinks");
    const tabContents = document.querySelectorAll(".periodic-last-tabcontent");
    function activateTab(index) {
      tabLinks.forEach((link) => link.classList.remove("active"));
      tabContents.forEach((content) => {
        content.classList.remove("active");
        content.classList.add("hide");
      });

      tabLinks[index].classList.add("active");
      tabContents[index].classList.add("active");
      tabContents[index].classList.remove("hide");
    }

    activateTab(0);

    tabLinks.forEach((link, index) => {
      link.addEventListener("click", () => {
        activateTab(index);
      });
    });
  }

  periodicAnalysisTop();
  periodicAnalysislast();

  // TRAFFIC BROWSER CHART
  function periodiVisitorLastDay() {
    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Configure it: GET-request for the URL /news/analytics
    xhr.open("GET", "https://kehem.com/news/analytics", true);

    // Send the request over the network
    xhr.send();

    // This will be called after the response is received
    xhr.onload = function () {
      if (xhr.status != 200) {
        // analyze HTTP response status
        console.error(`Error ${xhr.status}: ${xhr.statusText}`); // e.g., 404: Not Found
      } else {
        // show the result
        // Assuming the response is JSON
        var response = JSON.parse(xhr.responseText);

        // Map the response data to labels and data arrays
        var labels = Object.keys(response); // e.g., ["onedayago_logs", "twodayago_logs"]
        var data = Object.values(response); // e.g., [74, 71]

        // Now set up your chart
        var ctx = document
          .getElementById("periodic-visitor-last-day-chart")
          .getContext("2d");
        var myChart = new Chart(ctx, {
          type: "line",
          data: {
            labels: labels, // Use the keys from the response as labels
            datasets: [
              {
                label: "Social Media Share", // You can change this label as needed
                data: data, // Use the values from the response as data
                fill: true, // Enables the fill under the line
                backgroundColor: "rgba(75, 192, 192, 0.2)", // Single fill color for the area under the line
                borderColor: "rgba(75, 192, 192, 1)", // Line color
                borderWidth: 1,
                pointBackgroundColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                ],
                pointBorderColor: "#fff", // Color of the border of points
                pointBorderWidth: 2, // Width of the border of points
              },
            ],
          },
        });
      }
    };

    // If request fails
    xhr.onerror = function () {
      console.error("Request failed");
    };
  }
  periodiVisitorLastDay();
}

function overviewToday() {


  var xml = new XMLHttpRequest();
  xml.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const data = this.responseText;
      console.log(data);
      console.log('asfasf');
    };
  };

  xml.open('GET', 'serverdata.txt', true);
  xml.send();

}
overviewToday();