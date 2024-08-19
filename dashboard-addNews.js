print = console.log;

document.addEventListener("DOMContentLoaded", function () {
  caption();
  nameContainer();
  transitionOnY();
  tags();
  latestTag();
  textColor();
  videoPreview();
  publishPost();
  scheduler();
  tabContent();
});

function caption() {
  const inputField = document.querySelector(".add-post-caption-counter input");
  const output = document.querySelector(
    ".add-post-caption-counter .input-counter"
  );
  const maxLength = inputField.maxLength;
  output.innerHTML = maxLength;

  inputField.oninput = () => {
    const remains = maxLength - inputField.value.length;
    output.innerHTML = remains;
  };
}

function nameContainer() {
  const nameDiv = document.querySelectorAll(".add-post-name-container");

  nameDiv.forEach((item) => {
    const arrow = item.querySelector("img");

    item.onclick = () => {
      arrow.classList.toggle("arrowRotate");
    };
  });
}

function transitionOnY() {
  var toggleButtons = document.querySelectorAll(".toggleButton");

  // Set initial collapsed state
  var contentSections = document.querySelectorAll(".animate-y-axis");
  contentSections.forEach(function (content) {
    content.style.height = "0px";
    content.style.overflow = "hidden"; // Ensure content is hidden initially
  });

  toggleButtons.forEach(function (button, index) {
    button.addEventListener("click", function () {
      var content = contentSections[index];
      var isExpanded = content.style.height && content.style.height !== "0px";

      if (isExpanded) {
        // Collapse the content
        content.style.height = content.scrollHeight + "px"; // Set to the current height for transition
        requestAnimationFrame(function () {
          content.style.transition = "height 0.3s ease";
          content.style.height = "0px";
        });
      } else {
        // Expand the content
        content.style.height = "0px"; // Set initial height for transition
        requestAnimationFrame(function () {
          content.style.transition = "height 0.3s ease";
          content.style.height = content.scrollHeight + "px";
        });
      }

      // Reset the transition after it ends
      content.addEventListener(
        "transitionend",
        function () {
          if (!isExpanded) {
            content.style.height = "auto";
          }
          content.style.transition = "none";
        },
        { once: true }
      );
    });
  });
}

function dragAndDropWithPreview() {
  const dropZone = document.getElementById("drop-zone");
  const fileInput = document.getElementById("file-input");
  const previewSection = document.querySelector(".thumb-preview");
  const captionSection = document.querySelector(".thumb-caption");
  const image = document.querySelector(".thumb-preview .preview-img img");
  const imageSize = document.getElementById("image-size");
  const imageRatio = document.getElementById("image-ratio");

  // Handle drag over event
  dropZone.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropZone.classList.add("dragging");
  });

  // Handle drag leave event
  dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("dragging");
  });

  // Handle file drop event
  dropZone.addEventListener("drop", (event) => {
    event.preventDefault();
    dropZone.classList.remove("dragging");
    const files = event.dataTransfer.files;
    handleFiles(files);
  });

  // Handle click event to trigger file input
  dropZone.addEventListener("click", () => {
    fileInput.click();
  });

  // Handle file input change event
  fileInput.addEventListener("change", () => {
    const files = fileInput.files;
    handleFiles(files);
  });

  // Handle files for preview and captions
  function handleFiles(files) {
    const file = files[0];
    if (file) {
      // Show the preview and caption sections
      previewSection.style.display = "block";
      captionSection.style.display = "block";

      const reader = new FileReader();
      reader.addEventListener("load", function (e) {
        image.src = e.target.result; // Set the image src to the file's data URL

        // Create an image object to get the dimensions
        const img = new Image();
        img.addEventListener("load", function () {
          const width = img.width;
          const height = img.height;
          imageSize.textContent = `${width}px x ${height}px`;
          imageRatio.textContent = (width / height).toFixed(2) + ":1";
        });
        img.src = e.target.result; // Load the image dimensions
      });
      reader.readAsDataURL(file); // Read the image file as a data URL
    } else {
      // Hide the preview and caption sections if no file is selected
      previewSection.style.display = "none";
      captionSection.style.display = "none";
    }
  }
}
dragAndDropWithPreview();

function tags() {
  const addTag = document.querySelector(".tags .added-tag");
  const input = document.querySelector(".input-tag input");

  input.oninput = function () {
    const currentValue = input.value;

    if (currentValue.includes(",")) {
      const values = currentValue.split(",");
      const typedValue = values[0].trim();

      if (typedValue) {
        const section = document.createElement("section");
        section.textContent = typedValue;
        addTag.appendChild(section);

        input.value = ""; // Clear the input field after adding the tag
      }
    }
  };

  input.addEventListener("keydown", function (event) {
    if (event.key === "Backspace" && input.value === "") {
      const lastSection = addTag.lastElementChild;
      if (lastSection) {
        input.value = lastSection.textContent; // Put the last tag back into the input
        addTag.removeChild(lastSection); // Remove the last tag from the display
      }
    }
  });
}

function latestTag() {
  const latestTags = document.querySelectorAll(
    ".latest-tag-list .latest-tags section"
  );

  latestTags.forEach(function (tag) {
    tag.onclick = function () {
      const addTag = document.querySelector(".tags .added-tag");
      const section = document.createElement("section");
      section.textContent = tag.textContent;
      addTag.appendChild(section);
    };
  });
}

function textColor() {
  const textColorList = document.querySelectorAll("li.text-color-list");
  const chevrons = document.querySelectorAll(".cursor-hover .zipped");
  const body = document.body;
  chevrons.forEach(function (chevron, i) {
    textColorList[i].classList.add("hide");

    chevron.onclick = function () {
      textColorList[i].classList.toggle("hide");
    };
  });

  const textBgClass = document.querySelector(".text-bg-class");
  const textFgClass = document.querySelector(".text-fg-class");
}

function videoPreview() {
  document.getElementsByName("op").forEach(function (radio) {
    radio.addEventListener("change", function () {
      const fieldset = document.getElementById("showOnVideoClick");
      if (document.getElementById("op-3").checked) {
        fieldset.classList.add("show");
      } else {
        fieldset.classList.remove("show");
      }
    });
  });

  const link = document.getElementById("videoLinkInput");
  const preview = document.getElementById("videoPreview");

  function updateVideoLink() {
    const videoLink = link.value.trim();

    if (videoLink) {
      preview.src = videoLink;
    } else {
      preview.src = "";
    }

    const drive = "view?usp=drive_link";
    const drivePreview = "preview";
    const dropbox = "dl=0";
    const dropboxPreview = "raw=1";

    if (videoLink.includes(drive)) {
      const updatedLink = videoLink.replace(drive, drivePreview);
      preview.src = updatedLink;
    }

    if (videoLink.includes(dropbox)) {
      const updatedLink = videoLink.replace(dropbox, dropboxPreview);
      preview.src = updatedLink;
    }

    function youtube() {
      const regex = /([a-zA-Z0-9_-]+)\?si=|\?v=([A-Za-z0-9_-]{1,})/;
      const match = videoLink.match(regex);

      if (match) {
        const result = match[1] || match[2];
        print(result);
        preview.src = `https://www.youtube.com/embed/${result}?referer=MastorsDeshboard`;
      } else {
        print("Not found");
      }
    }
    youtube();

    function facebook() {
      const result = videoLink;
      print(result);
      preview.src = `https://www.facebook.com/plugins/video.php?href=${result}`;
    }
    facebook();
  }
  // UPDATE INPUT ON LIVE
  link.oninput = () => {
    updateVideoLink();
  };
}

function publishPost() {
  const toggleButton = document.getElementById("toggleButton");
  const statusText = document.getElementById("submit-add-post-form");
  statusText.value = "Draft Post !";
  toggleButton.addEventListener("change", function () {
    if (toggleButton.checked) {
      statusText.value = "Publish Now !";
    } else {
      statusText.value = "Draft Post !";
    }
  });
}

function scheduler() {
  const date = document.querySelector('.custom-date-input input[type="date"]');

  function validateDateTime() {
    const selectedDate = new Date(date.value);
    const today = new Date();

    // Create a date string in the format 'YYYY-MM-DD'
    const todayString = today.toISOString().split("T")[0];

    // Reset time portion of today to midnight for comparison
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      alert("Selected date cannot be in the past");
      // Set the date input to today's date
      date.value = todayString;
    }
  }

  date.addEventListener("change", validateDateTime);
}

function videoPreview() {
  document.getElementsByName("op").forEach(function (radio) {
    radio.addEventListener("change", function () {
      const fieldset = document.getElementById("showOnVideoClick");
      if (document.getElementById("op-3").checked) {
        fieldset.classList.add("show");
      } else {
        fieldset.classList.remove("show");
      }
    });
  });

  const link = document.getElementById("videoLinkInput");
  const preview = document.getElementById("videoPreview");

  function updateVideoLink() {
    const videoLink = link.value.trim();

    if (videoLink) {
      preview.src = videoLink;
    } else {
      preview.src = "";
    }

    const drive = "view?usp=drive_link";
    const drivePreview = "preview";
    const dropbox = "dl=0";
    const dropboxPreview = "raw=1";

    if (videoLink.includes(drive)) {
      const updatedLink = videoLink.replace(drive, drivePreview);
      preview.src = updatedLink;
    }

    if (videoLink.includes(dropbox)) {
      const updatedLink = videoLink.replace(dropbox, dropboxPreview);
      preview.src = updatedLink;
    }

    function youtube() {
      const regex = /([a-zA-Z0-9_-]+)\?si=|\?v=([A-Za-z0-9_-]{1,})/;
      const match = videoLink.match(regex);

      if (match) {
        const result = match[1] || match[2];
        print(result);
        preview.src = `https://www.youtube.com/embed/${result}?referer=MastorsDeshboard`;
      } else {
        print("Not found");
      }
    }
    youtube();

    function facebook() {
      const result = videoLink;
      print(result);
      preview.src = `https://www.facebook.com/plugins/video.php?href=${result}`;
    }
    facebook();
  }
  // UPDATE INPUT ON LIVE
  link.oninput = () => {
    updateVideoLink();
  };
}

function publishPost() {
  const toggleButton = document.getElementById("toggleButton");
  const statusText = document.getElementById("submit-add-post-form");
  statusText.value = "Draft Post !";
  toggleButton.addEventListener("change", function () {
    if (toggleButton.checked) {
      statusText.value = "Publish Now !";
    } else {
      statusText.value = "Draft Post !";
    }
  });
}

function scheduler() {
  const date = document.querySelector('.custom-date-input input[type="date"]');

  function validateDateTime() {
    const selectedDate = new Date(date.value);
    const today = new Date();

    // Create a date string in the format 'YYYY-MM-DD'
    const todayString = today.toISOString().split("T")[0];

    // Reset time portion of today to midnight for comparison
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      alert("Selected date cannot be in the past");
      // Set the date input to today's date
      date.value = todayString;
    }
  }

  date.addEventListener("change", validateDateTime);
}
