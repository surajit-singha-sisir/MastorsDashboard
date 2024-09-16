document.addEventListener("DOMContentLoaded", function () {
    userSorter();
    userAdd();
    passwordStrength();
    phoneNumber();
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
            event.preventDefault(); // Prevent form submission
            alert("Password must be at least 6 characters long.");
            passwordInput.focus(); // Set focus on the password input field
        }
    });

}
// PHONE NUMBER

function phoneNumber() {
    const countryCode = "+880 "; // Bangladesh country code with a space for formatting

    document.getElementById("phoneNumber").addEventListener("focus", function(e) {
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
