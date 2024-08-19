print = console.log;

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
        const cellA = rowA.cells[index].innerText.trim();
        const cellB = rowB.cells[index].innerText.trim();

        // Check if the values are numbers or not
        const numA = parseFloat(cellA);
        const numB = parseFloat(cellB);

        if (!isNaN(numA) && !isNaN(numB)) {
          // If both values are numbers, compare them numerically
          return newSort === "asc" ? numA - numB : numB - numA;
        } else {
          // If either value is not a number, compare them as strings
          if (cellA < cellB) {
            return newSort === "asc" ? -1 : 1;
          } else if (cellA > cellB) {
            return newSort === "asc" ? 1 : -1;
          } else {
            return 0;
          }
        }
      });

      rows.forEach((row) => table.querySelector("tbody").appendChild(row));

      function rotateImage() {
        const [icon1, icon2] = header.querySelectorAll(
          ".ace-dec-order span img"
        );
        const activeIconSrc = document.getElementById("sort-active-icon").src;
        const sortHideIconSrc = document.getElementById("sort-hide-icon").src;

        const isIcon1Hidden = icon1.src === sortHideIconSrc;

        icon1.src = isIcon1Hidden ? activeIconSrc : sortHideIconSrc;
        icon1.classList.toggle("rotate-icon-180", isIcon1Hidden);

        icon2.src = isIcon1Hidden ? sortHideIconSrc : activeIconSrc;
        icon2.classList.toggle("rotate-icon-180", isIcon1Hidden);
        icon2.classList.toggle("rotate-icon-0", !isIcon1Hidden);
      }

      rotateImage();
    });
  });
}

function filterMastors() {
  function filter() {
    const filterButton = document.getElementById("filter-button");
    const searchButton = document.getElementById("search-button");
    const searchInput = document.getElementById("search-input");

    filterButton.addEventListener("click", function () {
      const filterDateInput = document.getElementById("filter-date").value;
      const filterWriter = document.getElementById("writer-filter").value;
      const filterCategory = document.getElementById("category-filter").value;

      const table = document
        .getElementById("sorted-table")
        .querySelector("tbody");
      const rows = table.getElementsByTagName("tr");

      // Convert and format the filter date if provided
      const formattedFilterDate = filterDateInput
        ? formatDate(new Date(filterDateInput))
        : null;

      for (let i = 0; i < rows.length; i++) {
        const dateCell = rows[i].getElementsByTagName("td")[6]; // The date is in the 7th cell (index 6)
        const writerCell = rows[i].getElementsByTagName("td")[5]; // The writer is in the 6th cell (index 5)
        const categoryCell = rows[i].getElementsByTagName("td")[4]; // The category is in the 5th cell (index 4)

        if (dateCell && writerCell && categoryCell) {
          const rowDateText = dateCell.textContent.trim();
          const rowWriterText = writerCell.textContent.trim();
          const rowCategoryText = categoryCell.textContent.trim();

          // Check if the row matches all the filters
          const isDateMatch =
            !formattedFilterDate || rowDateText === formattedFilterDate;
          const isWriterMatch = !filterWriter || rowWriterText === filterWriter;
          const isCategoryMatch =
            !filterCategory || rowCategoryText === filterCategory;

          // Show row if all filters match; otherwise, hide it
          if (isDateMatch && isWriterMatch && isCategoryMatch) {
            rows[i].style.display = ""; // Show row
            rows[i].classList.add("highlight"); // Add highlight class
          } else {
            rows[i].style.display = "none"; // Hide row
            rows[i].classList.remove("highlight"); // Remove highlight class
          }
        }
      }
    });

    function searchTable() {
      const searchQuery = searchInput.value.trim().toLowerCase();
      const table = document
        .getElementById("sorted-table")
        .querySelector("tbody");
      const rows = table.getElementsByTagName("tr");

      for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName("td");
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
    searchButton.addEventListener("click", searchTable);

    // Trigger search when the user presses "Enter" in the search box
    searchInput.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault(); // Prevent form submission or other default actions
        searchTable(); // Call the search function
      }
    });
  }

  // Function to format date to match table format
  function formatDate(date) {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  }

  filter();
}

// news _key = 'pmM4G0V'

function initializeModals() {
  // Show modal when a button with data-modal attribute is clicked
  document.querySelectorAll("[data-modal]").forEach((button) => {
    button.addEventListener("click", function () {
      const modalId = this.getAttribute("data-modal");
      document.getElementById(modalId).classList.add("show");
    });
  });

  // Hide modal when a button with class "closeBtn" is clicked
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("closeBtn")) {
      event.target.closest(".modal-full-screen").classList.remove("show");
    } else if (event.target.closest(".modal-confirmation")) {
      // Hide modal2 if it's inside a confirmation modal
      const modal2 = document.querySelector(".modalUnique");
      if (modal2) {
        modal2.classList.remove("show");
        modal2.style = '';
      }
    }
  });
}


function edit_data(key) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("demo").innerHTML = this.responseText;
    }
  };
  xhttp.open(
    "GET",
    "https://kehem.com/news/edit_html/${encodeURIComponent(key)}",
    true
  );
  xhttp.send();
}

// function action() {
//   document.querySelectorAll('.modal-confirm').forEach(confirmButton => {
//     confirmButton.addEventListener("click", function (event) {
//       // Log the clicked element
//       console.log('Clicked:', this);

//       // Find the closest <tr> ancestor of the clicked button
//       const parentRow = this.closest('tr');
//       console.log('Parent Row:', parentRow);

//       if (parentRow) {
//         // Find the corresponding modal within the same row
//         const modal2 = parentRow.querySelector('.modal-full-screen[data-modal="modal2"]');
//         if (modal2) {
//           parentRow.classList.add("hide");
//           modal2.style.display = "none";
//         }
//       }
//     });
//   });

//   document.querySelectorAll('.modal-deny').forEach(denyButton => {
//     denyButton.addEventListener("click", function (event) {
//       // Log the clicked element
//       console.log('Clicked:', this);

//       // Find the closest <tr> ancestor of the clicked button
//       const parentRow = this.closest('tr');
//       console.log('Parent Row:', parentRow);

//       if (parentRow) {
//         // Find the corresponding modal within the same row
//         const modal2 = parentRow.querySelector('.modal-full-screen[data-modal="modal2"]');
//         if (modal2) {
//           modal2.style.display = "none";
//         }
//       }
//     });
//   });
// }

// action();

// Function to open a modal and set its content
function openModal(modalId, content, rowId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "block";

    // Store the rowId for later use
    modal.setAttribute("data-row", rowId);
  } else {
    console.error(`Modal with ID ${modalId} not found.`);
  }
}

// Function to close a modal
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    // console.log(modal);
    modal.style.display = "none";
    console.log("modal close");
  } else {
    console.error(`Modal with ID ${modalId} not found.`);
  }
}

// Add event listeners to open modals
document.querySelectorAll(".open-modal").forEach((button) => {
  button.addEventListener("click", function () {
    const modalId = this.getAttribute("data-modal");
    const content = this.getAttribute("data-content");
    const rowId = this.closest("tr").rowIndex; // Use the rowIndex to get the current row number
    openModal(modalId, content, rowId);
  });
});

// Add event listeners to close modals
document.querySelectorAll(".closeBtn").forEach((button) => {
  button.addEventListener("click", function () {
    const modalId = this.getAttribute("data-modal");
    closeModal(modalId);
  });
});

// Close modals when clicking outside of the modal content
window.addEventListener("click", function (event) {
  if (event.target.classList.contains("modal")) {
    closeModal(event.target.id);
  }
});

// Add event listeners to submit buttons in modals
document.querySelectorAll(".submit-btn").forEach((button) => {
  button.addEventListener("click", function () {
    const modal = this.closest(".modal");
    if (modal) {
      const rowId = modal.getAttribute("data-row");
      if (rowId) {
        const row = document.querySelector(
          `.draft-table tbody tr:nth-child(${rowId})`
        );
        if (row) {
          row.remove();
          updateRowIdentifiers();
        } else {
          console.error(`Row ${rowId} not found.`);
        }
      } else {
        console.error(`No data-row attribute found on the modal.`);
      }
      console.log(modal.id);
      closeModal(modal.id);
    } else {
      console.error(`Modal not found.`);
    }

    // const modal2 = document.querySelector(".modalUnique");
    // print(modal2)
    // modal2.classList.contains("hide")
    //   ? modal2.classList.add("hide")
    //   : modal2.classList.remove("hide");
  });
});

// Function to update row identifiers after deletion
function updateRowIdentifiers() {
  document.querySelectorAll(".draft-table tbody tr").forEach((row, index) => {
    const rowId = index + 1; // Row IDs should be 1-based
    row.querySelectorAll(".open-modal").forEach((button) => {
      button.setAttribute("data-row", rowId);
    });
  });
}
