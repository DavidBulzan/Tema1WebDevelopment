// Navigation Toggle
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const hamburger = document.querySelector(".hamburger");

  navToggle?.addEventListener("click", () => {
    navMenu?.classList.toggle("active");
    navToggle.classList.toggle("active");
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!navToggle?.contains(e.target) && !navMenu?.contains(e.target)) {
      navMenu?.classList.remove("active");
      navToggle?.classList.remove("active");
    }
  });

  // Update copyright year
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear().toString();
  }

  // Contact Form Validation
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", handleSubmit);
  }
});

// Form Validation
function handleSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const formSuccess = document.getElementById("formSuccess");
  const formError = document.getElementById("formError");
  let isValid = true;

  // Reset previous error states
  formSuccess.style.display = "none";
  formError.style.display = "none";
  form.querySelectorAll(".form-group").forEach((group) => {
    group.classList.remove("error");
  });

  // Validate required fields
  const requiredFields = form.querySelectorAll("[required]");
  requiredFields.forEach((field) => {
    const group = field.closest(".form-group");
    const errorMessage = group.querySelector(".error-message");

    if (!field.value.trim()) {
      isValid = false;
      group.classList.add("error");
      errorMessage.textContent = "This field is required";
    } else if (field.type === "email" && !isValidEmail(field.value)) {
      isValid = false;
      group.classList.add("error");
      errorMessage.textContent = "Please enter a valid email address";
    }
  });

  if (isValid) {
    //log the form data
    const formData = new FormData(form);
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    // Simulate form submission
    setTimeout(() => {
      form.reset();
      formSuccess.style.display = "block";

      // Hide success message after 5 seconds
      setTimeout(() => {
        formSuccess.style.display = "none";
      }, 5000);
    }, 1000);
  } else {
    formError.style.display = "block";
  }
}

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
