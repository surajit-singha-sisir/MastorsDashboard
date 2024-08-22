print = console.log;
window.addEventListener('load', function () {
    trafficSourcePie();
    openTab();
    trafficOverview();
    tooltipRights();
    saveNote();
})


// TABS TRAFFIC TRACKER
function openTab() {
    const tabs = document.querySelectorAll('.tabs .tab');
    const contents = document.querySelectorAll('.contents .content');
    let currentIndex = 0;

    function showContent(index) {
        const currentTab = tabs[currentIndex];
        const nextTab = tabs[index];
        const currentContent = contents[currentIndex];
        const nextContent = contents[index];

        if (index === currentIndex) return;

        if (index > currentIndex) {
            nextContent.style.left = '100%';  // Slide in from the right
        } else {
            nextContent.style.left = '-100%'; // Slide in from the left
        }

        // Add active class to next tab and content
        nextTab.classList.add('active');
        nextContent.classList.add('active');

        // Remove active class from current tab and content
        currentTab.classList.remove('active');
        setTimeout(() => {
            nextContent.style.left = '0';
            currentContent.style.left = (index > currentIndex) ? '-100%' : '100%'; // Slide out to left or right
            currentContent.classList.remove('active');
        }, 50);  // Small delay to allow transition to happen

        currentIndex = index;
    }

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => showContent(index));
    });

    // Initialize the first tab as active
    tabs[0].classList.add('active');
    contents[0].classList.add('active');
}

// TRAFFIC SOURCE CHART
function trafficSourcePie() {

    const ctx = document.getElementById('traffic-source-PieChart').getContext('2d');
    const myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: 'Traffic Source',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false // Hide the legend
                },
                tooltip: {
                    enabled: true // Hide the tooltips
                }
            }
        }
    });
}



// TRAFFIC OVERVIEW CHART
function trafficOverview() {
    const ctx = document.getElementById('traffic-tracker-PieChart').getContext('2d');
    const myPieChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: 'Traffic Source',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false // Hide the legend
                },
                tooltip: {
                    enabled: true // Hide the tooltips
                }
            }
        }
    });

}



function tooltipRights() {
    const tooltips = document.querySelectorAll('.tooltip-Right');

    tooltips.forEach(tooltip => {
        const tooltipText = tooltip.querySelector('.tooltiptext');

        let offsetX = 15; // X distance from the cursor
        let offsetY = 15; // Y distance from the cursor

        tooltip.addEventListener('mousemove', function (e) {
            // Show tooltip and position it
            tooltip.classList.add('active');

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

        tooltip.addEventListener('mouseleave', function () {
            // Hide tooltip when mouse leaves
            tooltip.classList.remove('active');
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

        window.addEventListener('resize', () => {
            // Adjust tooltip position on window resize
            if (tooltip.classList.contains('active')) {
                adjustTooltipPosition(tooltipText);
            }
        });
    });
}

function saveNote() {
    // Function to set a cookie
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    // Function to get a cookie by name
    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Function to save the note automatically
    function autoSaveNote() {
        const noteInput = document.getElementById("noteInput");
        setCookie("userNote", noteInput.value, 7); // Save for 7 days
    }

    // Function to load the note from the cookie
    function loadNote() {
        const noteInput = document.getElementById("noteInput");
        const savedNote = getCookie("userNote");
        if (savedNote) {
            noteInput.value = savedNote;
        }
    }

    // Load the note when the page loads
    window.onload = function () {
        
    };

    // Add event listener to auto-save note as user types
    document.getElementById("noteInput").addEventListener("input", autoSaveNote);
}