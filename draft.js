print = console.log;
// window.addEventListener('load', function() {
//     sort()
// })
// document.addEventListener("DOMContentLoaded", () => {
//   sort();
// });

function sort() {
  const table = document.getElementById("sorted-table");
  const headers = table.querySelectorAll("th");

  // TH CLICK
  headers.forEach((header) => {
    header.addEventListener("click", () => {
      const index = Array.prototype.indexOf.call(headers, header);
      const rows = Array.from(table.querySelectorAll("tbody tr"));
      const currentSort = header.dataset.sort;
      const newSort = currentSort === "asc" ? "desc" : "asc";
      header.dataset.sort = newSort;

      rows.sort((rowA, rowB) => {
        const cellA = rowA.cells[index].innerText;
        const cellB = rowB.cells[index].innerText;

        if (cellA < cellB) {
          return newSort === "asc" ? -1 : 1;
        } else if (cellA > cellB) {
          return newSort === "asc" ? 1 : -1;
        } else {
          return 0;
        }
      });

      rows.forEach((row) => table.querySelector("tbody").appendChild(row));

      function rotateImage() {
        const icons = header.querySelectorAll(".ace-dec-order span img");
        const activeIcon = document.getElementById("sort-active-icon");
        const sortHideIcon = document.getElementById("sort-hide-icon");

        if (icons[0].src === sortHideIcon.src) {
          icons[0].src = activeIcon.src;
          icons[0].classList.add("rotate-icon-180");

          icons[1].src = activeIcon.src;
          icons[1].classList.add("rotate-icon-0");
        } else {
          icons[0].classList.remove("rotate-icon-180");
          icons[0].src = sortHideIcon.src;

          icons[1].classList.remove("rotate-icon-0");
          icons[1].src = sortHideIcon.src;
        }
      }

      rotateImage();
    });
  });

  print = console.log;

function filter() {
  const filterButton = document.getElementById('filter-button');
  const searchButton = document.getElementById('search-button');
  const searchInput = document.getElementById('search-input');

  filterButton.addEventListener('click', function () {
    const filterDateInput = document.getElementById('filter-date').value;
    const filterWriter = document.getElementById('writer-filter').value;
    const filterCategory = document.getElementById('category-filter').value;

    const table = document.getElementById('sorted-table').querySelector('tbody');
    const rows = table.getElementsByTagName('tr');

    // Convert and format the filter date if provided
    const formattedFilterDate = filterDateInput ? formatDate(new Date(filterDateInput)) : null;

    for (let i = 0; i < rows.length; i++) {
      const dateCell = rows[i].getElementsByTagName('td')[6]; // The date is in the 7th cell (index 6)
      const writerCell = rows[i].getElementsByTagName('td')[5]; // The writer is in the 6th cell (index 5)
      const categoryCell = rows[i].getElementsByTagName('td')[4]; // The category is in the 5th cell (index 4)

      if (dateCell && writerCell && categoryCell) {
        const rowDateText = dateCell.textContent.trim();
        const rowWriterText = writerCell.textContent.trim();
        const rowCategoryText = categoryCell.textContent.trim();

        // Check if the row matches all the filters
        const isDateMatch = !formattedFilterDate || rowDateText === formattedFilterDate;
        const isWriterMatch = !filterWriter || rowWriterText === filterWriter;
        const isCategoryMatch = !filterCategory || rowCategoryText === filterCategory;

        // Show row if all filters match; otherwise, hide it
        if (isDateMatch && isWriterMatch && isCategoryMatch) {
          rows[i].style.display = ""; // Show row
          rows[i].classList.add('highlight'); // Add highlight class
        } else {
          rows[i].style.display = "none"; // Hide row
          rows[i].classList.remove('highlight'); // Remove highlight class
        }
      }
    }
  });

  function searchTable() {
    const searchQuery = searchInput.value.trim().toLowerCase();
    const table = document.getElementById('sorted-table').querySelector('tbody');
    const rows = table.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
      const cells = rows[i].getElementsByTagName('td');
      let rowContainsSearchQuery = false;

      for (let j = 0; j < cells.length; j++) {
        const cellText = cells[j].textContent.trim().toLowerCase();

        // Check if the cell contains the search query
        if (cellText.includes(searchQuery)) {
          rowContainsSearchQuery = true;
        }
      }

      // Show row if a match is found in any cell; otherwise, hide it
      if (rowContainsSearchQuery) {
        rows[i].style.display = ""; // Show row
      } else {
        rows[i].style.display = "none"; // Hide row
      }
    }
  }

  // Trigger search on clicking the search button
  searchButton.addEventListener('click', searchTable);

  // Trigger search when the user presses "Enter" in the search box
  searchInput.addEventListener('keypress', function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission or other default actions
      searchTable(); // Call the search function
    }
  });
}

// Function to format date to match table format
function formatDate(date) {
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
}

filter();




}
