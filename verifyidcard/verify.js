const scriptURL = "https://script.google.com/macros/s/AKfycbz9Bi75G8VSPn0MQUzo4DgC-73kU-fhRycjjdZKumGQ9qwDk5dSIyOl9xOGLIk9r0EJwg/exec";

async function verify() {
  const id = document.getElementById('empId').value.trim();
  if (!id) return;

  togglePageLock(true); // show overlay + disable inputs

  try {
    const response = await fetch(`${scriptURL}?id=${id}`);
    const data = await response.json();

    togglePageLock(false); // hide overlay + enable inputs

    if (data.verified) {
      document.getElementById('photo').src = data.image;
      document.getElementById('name').innerText = data.name;
      document.getElementById('designation').innerText = data.designation;
      document.getElementById('empID').innerText = `#${data.id}`;
      showModal('successModal');
    } else {
      showModal('errorModal');
    }
  } catch (error) {
    togglePageLock(false); // hide overlay even if error
    showModal('errorModal');
  }
}
  

function togglePageLock(lock) {
  const overlay = document.getElementById("pageOverlay");
  if (lock) {
    overlay.style.display = "flex"; // show
    document.querySelectorAll("input, button").forEach(el => el.disabled = true);
  } else {
    overlay.style.display = "none"; // hide
    document.querySelectorAll("input, button").forEach(el => el.disabled = false);
  }
}

  function startScan() {
  const reader = document.getElementById('reader');
  reader.style.display = 'block';

  const qrScanner = new Html5Qrcode("reader");

  // Start scanning
  qrScanner.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 250 },
    qrCodeMessage => {
      document.getElementById("empId").value = qrCodeMessage;
      qrScanner.stop();
      reader.style.display = "none";
      verify(); // auto-verify after scan
    },
    errorMessage => {
      console.warn("QR Scan error:", errorMessage);
    }
  ).catch(err => {
    console.error("Failed to start scanner:", err);
  });

  // Auto-hide after 15 seconds if no scan
  setTimeout(() => {
    if (reader.style.display === 'block') {
      qrScanner.stop().then(() => {
        reader.style.display = 'none';
        console.log("QR scanner closed automatically after 10 seconds.");
      }).catch(err => console.error("Error stopping scanner:", err));
    }
  }, 15000); // 15 seconds
}


  function toggleLoader(show) {
    document.getElementById("loader").style.display = show ? "block" : "none";
  }

  function showModal(id) {
    document.getElementById(id).style.display = "flex";
  }

  function closeModalOnOutsideClick(event, modalId) {
    const modalContent = document.querySelector(`#${modalId} .modal-content`);
    if (!modalContent.contains(event.target)) {
      document.getElementById(modalId).style.display = "none";
      document.getElementById('empId').value = '';
    }
  }

// Allow pressing ENTER in the Employee ID field
document.getElementById("empId").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();       // Prevent page reload
    verify();                     // Call your verify() function directly
  }
});


// Run on page load
window.onload = function () {
  // Get query params from URL
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (id) {
    document.getElementById("empId").value = id; // fill field
    verify(); // auto-start verification
  }
};
