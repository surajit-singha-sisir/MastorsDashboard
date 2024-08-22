print = console.log;
window.addEventListener('load', function () {
    trafficSourcePie();
    openTab();
    trafficOverview();
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
