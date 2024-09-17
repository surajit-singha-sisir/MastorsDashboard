print = console.log;
document.addEventListener("DOMContentLoaded", function () {
    userSorter();
    userAdd();
    passwordStrength();
    phoneNumber();
    profilePicture();
    userXHR();
    userSearch();
    exportToPDF();
});

function userSorter() {
    const table = document.querySelector(".users-table tbody");
    const headers = document.querySelectorAll(".user-role-order");

    // Function to sort the rows
    function sortTable(index, type, asc) {
        const rows = Array.from(table.querySelectorAll("tr"));
        rows.sort((rowA, rowB) => {
            const cellA = rowA.cells[index].innerText.trim();
            const cellB = rowB.cells[index].innerText.trim();

            if (type === "number") {
                return asc ? cellA - cellB : cellB - cellA;
            } else {
                return asc ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
            }
        });

        // Append sorted rows back to the table
        rows.forEach(row => table.appendChild(row));
    }

    // Function to toggle sorting direction and arrow display
    function toggleSort(header, index, type) {
        const arrows = header.querySelector(".users-ase-desc-sort").children;
        const isDesc = arrows[0].classList.contains("hide"); // Initially descending, first click should show descending arrow

        // Toggle arrows based on current state
        if (isDesc) {
            arrows[0].classList.remove("hide"); // Show ascending arrow (&#9650;)
            arrows[1].classList.add("hide"); // Hide descending arrow (&#9660;)
        } else {
            arrows[0].classList.add("hide"); // Hide ascending arrow (&#9650;)
            arrows[1].classList.remove("hide"); // Show descending arrow (&#9660;)
        }

        // Sort the table (desc if first click, then toggle asc/desc)
        sortTable(index, type, isDesc);
    }

    // Add click event listeners to headers
    headers.forEach((header, i) => {
        header.addEventListener("click", () => {
            const index = i + 3; // Column index (Role is 3, Total Posts is 4)
            const type = index === 3 ? "text" : "number"; // Sort as text for Role, number for Total Posts
            toggleSort(header, index, type);
        });
    });
}

function usersOpenModal() {
    const modalOverlay = document.getElementById('addUserModalOverlay');
    const modal = document.getElementById('add-user-modal');

    // Add 'active' class to display modal with transition
    modalOverlay.classList.add('active');
    modal.classList.add('active');
}

// Close modal function for add user modal
function usersCloseModal() {
    const modalOverlay = document.getElementById('addUserModalOverlay');
    const modal = document.getElementById('add-user-modal');

    // Remove 'active' class to hide modal with transition
    modalOverlay.classList.remove('active');
    modal.classList.remove('active');
}



// USER ADD
function userAdd() {
    function togglePassword() {
        const passwordInput = document.querySelector('input[type="password"]');
        const showIcon = document.querySelector('.user-input-label-data span img:first-child');
        const hideIcon = document.querySelector('.user-input-label-data span img:last-child');

        showIcon.addEventListener('click', function () {
            passwordInput.type = 'text'; // Show the password
            showIcon.classList.add('hide');
            hideIcon.classList.remove('hide');
        });
        hideIcon.addEventListener('click', function () {
            passwordInput.type = 'password'; // Hide the password
            showIcon.classList.remove('hide');
            hideIcon.classList.add('hide');
        });
    }
    togglePassword();
}

function passwordStrength() {
    function checkPasswordStrength() {
        const passwordInput = document.querySelector('input[name="Password"]');
        const strengthBar = document.querySelector('.passwordStrength-active');
        const strengthLabel = document.querySelector('.user-input-label-data p:first-child');

        // Password strength variables
        const password = passwordInput.value;
        let strength = 0;

        // Criteria for password strength
        if (password.length >= 8) strength += 25; // Minimum length of 8
        if (/[A-Z]/.test(password)) strength += 25; // Contains uppercase letter
        if (/[0-9]/.test(password)) strength += 25; // Contains number
        if (/[!@#$%^&*]/.test(password)) strength += 25; // Contains special character

        // Update the strength bar width based on calculated strength
        strengthBar.style.width = strength + '%';

        // Update strength label and color
        if (strength === 100) {
            strengthLabel.textContent = 'Strong';
            strengthLabel.style.color = 'lightblue';
        } else if (strength >= 50) {
            strengthLabel.textContent = 'Medium';
            strengthLabel.style.color = 'yellow';
        } else {
            strengthLabel.textContent = 'Weak';
            strengthLabel.style.color = 'red'; // Light red for weak strength
        }
    }

    // Add event listener for password input
    document.querySelector('input[name="Password"]').addEventListener('input', checkPasswordStrength);

    // Form submission prevention if password is too short
    document.querySelector('form').addEventListener('submit', function (event) {
        const passwordInput = document.querySelector('input[name="Password"]');
        const password = passwordInput.value;

        // Check if password is less than 6 characters
        if (password.length < 6) {
            event.preventDefault();
            passwordInput.focus();
        }
    });

}
// PHONE NUMBER

function phoneNumber() {
    const countryCode = "+880 "; // Bangladesh country code with a space for formatting

    document.getElementById("phoneNumber").addEventListener("focus", function (e) {
        // Ensure the phone number always starts with +880 when focused
        if (!e.target.value.startsWith(countryCode)) {
            e.target.value = countryCode;
        }
    });

    document.getElementById("phoneNumber").addEventListener("input", function (e) {
        // Remove all non-numeric characters except the plus (+) sign
        let cleaned = e.target.value.replace(/[^\d+]/g, '');

        // Keep the country code +880 intact
        if (!cleaned.startsWith("+880")) {
            cleaned = "+880";
        }

        // Ensure the input length does not exceed 14 characters (including +880)
        if (cleaned.length > 14) {
            cleaned = cleaned.slice(0, 14);
        }

        // Extract the rest of the phone number
        let match = cleaned.match(/^(\+880)?(\d{0,3})(\d{0,7})$/);

        if (match) {
            e.target.value = match[1] + (match[2] ? ' ' + match[2] : '') + (match[3] ? '-' + match[3] : '');
        }
    });

    // Ensure only numbers or plus sign can be entered
    document.getElementById("phoneNumber").addEventListener("keypress", function (e) {
        if (!/\d/.test(e.key) && e.key !== '+') {
            e.preventDefault();
        }
    });
}

function profilePicture() {

    const fileInput = document.getElementById('profilePictureNumber');
    const dropZone = document.createElement('div');
    dropZone.classList.add('profile-picture-drop-zone');
    dropZone.innerHTML = 'Drop Picture Here or Click';
    dropZone.style.fontSize = '14px';
    dropZone.style.color = 'gray';

    fileInput.parentNode.insertBefore(dropZone, fileInput.nextSibling);

    // Handle drag and drop events
    dropZone.addEventListener('dragover', function (e) {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', function () {
        dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', function (e) {
        e.preventDefault();
        dropZone.classList.remove('dragover');

        const file = e.dataTransfer.files[0];
        if (file) {
            previewProfilePicture(file);
            fileInput.files = e.dataTransfer.files; // Assign the file to the input
        }
    });

    // Handle click event to trigger file input
    dropZone.addEventListener('click', function () {
        fileInput.click();
    });

    // Listen to file input change
    fileInput.addEventListener('change', function () {
        const file = fileInput.files[0];
        if (file) {
            previewProfilePicture(file);
        }
    });

    function previewProfilePicture(file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const preview = document.getElementById('profilePicturePreview');
            preview.src = e.target.result;
            const previewDiv = document.querySelector('.profile-picture-preview');
            previewDiv.classList.remove('hide');
        };
        reader.readAsDataURL(file);
    }
}


function userXHR() {

    // Get the elements
    const submitButton = document.getElementById('add-user-submit');
    const loadingIcon = document.querySelector('.user-loading-3');
    submitButton.addEventListener('click', function (event) {
        // Show loading icon
        loadingIcon.classList.remove('hide');

        // Disable submit button to prevent multiple submissions
        // submitButton.disabled = true;
        submitButton.value = 'Submitting';
    });

    const form = document.getElementById('addUserForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get input values
        const fname = document.querySelector('input[name="fname"]').value;
        const lname = document.querySelector('input[name="lname"]').value;
        const email = document.querySelector('input[name="email"]').value;
        const password = document.querySelector('input[name="Password"]').value;
        let phone = document.querySelector('input[name="phone"]').value;
        const userRole = document.querySelector('select[name="userRole"]').value;
        const profilePictureInput = document.getElementById('profilePictureNumber');

        // Remove spaces and dashes from phone number
        phone = phone.replace(/\s|-/g, "");

        // Convert profile picture to base64
        let profilePictureBase64 = "";
        const file = profilePictureInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = function () {
                profilePictureBase64 = reader.result; // Get base64 string

                // After image is converted, send the form data
                sendData({
                    fname,
                    lname,
                    email,
                    password,
                    phone,
                    userRole,
                    profilePicture: profilePictureBase64 // Send base64 string for profile picture
                });
            };
            reader.readAsDataURL(file); // Read file as base64 string
        } else {
            // If no file is uploaded, send the rest of the form data
            sendData({
                fname,
                lname,
                email,
                password,
                phone,
                userRole,
                profilePicture: profilePictureBase64 // Empty if no file
            });
        }
    });

    // Function to send the data via XHR
    function sendData(formData) {
        const modal = document.getElementById('addUserModalOverlay');
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://kehem.com//news/MD_user_add', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader("X-CSRFToken", getCSRFToken());

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {

                    const data = JSON.parse(xhr.responseText);


                    if (data.message === "success") {
                        loadingIcon.classList.add('hide');
                        submitButton.value = 'Submit';
                        function usersCloseModal() {
                            const modalOverlay = document.getElementById('addUserModalOverlay');
                            const modal = document.getElementById('add-user-modal');

                            // Remove 'active' class to hide modal with transition
                            modalOverlay.classList.remove('active');
                            modal.classList.remove('active');
                        }
                        usersCloseModal();

                        function clearInputs() {
                            const inputs = modal.querySelectorAll('input');

                            inputs.forEach((input) => {
                                if (input.type !== 'submit') {
                                    input.value = "";
                                }
                            });
                            const profilePicture = modal.querySelector('.profile-picture-preview');
                            profilePicture.querySelector('#profilePicturePreview').src = "";
                            profilePicture.classList.add('hide');
                        }
                        clearInputs();
                        toastNotficationUser();
                    }
                } else {
                    console.log('Error submitting form:', xhr.status);
                }
            }
        };

        // Send the form data as JSON
        xhr.send(JSON.stringify(formData));
    }

    // Function to get CSRF token from cookies
    function getCSRFToken() {
        const csrfToken = document.cookie
            .split(";")
            .find((cookie) => cookie.trim().startsWith("csrftoken="));
        return csrfToken ? csrfToken.split("=")[1] : null;
    }

    function toastNotficationUser() {
        let toastTimeout;
        let progressInterval;
        const firstName = document.querySelector('input[name="fname"]');
        const toastMessage = document.querySelector('.usermenutoast span');
        firstName.addEventListener('input', function () {
            toastMessage.textContent = firstName.value + ' ' + 'Added successfully';
        });
        print(firstName)

        function showToast() {
            const toast = document.getElementById('usermenutoast');
            const progress = document.getElementById('progress');

            // Reset progress bar width
            progress.style.width = '0%';

            toast.classList.add('show');

            let width = 0;
            progressInterval = setInterval(() => {
                if (width < 100) {
                    width += 1; // Increase width by 1% per interval
                    progress.style.width = width + '%';
                } else {
                    clearInterval(progressInterval);
                }
            }, 50); // Update progress every 50ms (5 seconds in total)

            // Hide the toast after 5 seconds
            toastTimeout = setTimeout(() => {
                hideToast();
            }, 5000);
        }
        showToast();

        function hideToast() {
            const toast = document.getElementById('usermenutoast');
            toast.classList.remove('show');

            // Clear the timeout and interval when the toast is closed
            clearTimeout(toastTimeout);
            clearInterval(progressInterval);
        }
    }
}


function userSearch() {



    document.querySelector('.searchBar input').addEventListener('input', function (e) {
        const searchText = e.target.value.toLowerCase();
        const tableRows = document.querySelectorAll('.users-table tbody tr');

        tableRows.forEach(function (row) {
            let rowContainsMatch = false;

            // Loop through each cell (td) in the row
            Array.from(row.cells).forEach(function (cell) {
                const cellText = cell.textContent.toLowerCase();

                // Check if the cell contains the search text
                if (searchText && cellText.includes(searchText)) {
                    rowContainsMatch = true; // Mark that the row should be shown

                    // Highlight the matching part
                    const regex = new RegExp(`(${searchText})`, 'gi');
                    cell.innerHTML = cell.textContent.replace(regex, '<span class="highlight">$1</span>');
                } else {
                    // Reset the cell content if it doesn't match
                    cell.innerHTML = cell.textContent;
                }
            });

            // Show the row if input is empty or if there's a match
            row.style.display = searchText === '' || rowContainsMatch ? '' : 'none';
        });
    });



}

function exportToPDF() {
    document.getElementById('export-pdf').addEventListener('click', function () {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        const table = document.querySelector('.users-table');

        let tableRows = [];
        let tableHeadings = [];

        // Get table headings
        const headings = table.querySelectorAll('thead th');
        headings.forEach(function (heading) {
            tableHeadings.push(heading.textContent);
        });

        // Get table rows
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(function (row) {
            let rowData = [];
            const cells = row.querySelectorAll('td');
            cells.forEach(function (cell) {
                rowData.push(cell.textContent);
            });
            tableRows.push(rowData);
        });

        // Add the headings and rows to the PDF
        doc.autoTable({
            head: [tableHeadings],
            body: tableRows,
        });

        // Save the PDF
        doc.save('users-table.pdf');
    });

}