/**
 * Custom JavaScript for Portfolio Website
 * Author: Buse Kurt
 */

// Validation state tracker
let validationState = {
    name: false,
    surname: false,
    email: false,
    phone: false,
    address: false,
    rating1: true,
    rating2: true,
    rating3: true
  };
  
  document.addEventListener('DOMContentLoaded', function() {
    initializeContactForm();
  });
  
  
  function initializeContactForm() {
    const contactForm = document.querySelector('.php-email-form');
    
    if (!contactForm) {
      console.log('Contact form not found on this page');
      return;
    }
  
  
    contactForm.addEventListener('submit', handleFormSubmit);
    
  
    initializeRealtimeValidation();
    
    
    initializePhoneMasking();
    
    updateSubmitButtonState();
  }
  
  
  function initializeRealtimeValidation() {
    const nameInput = document.querySelector('[name="name"]');
    const surnameInput = document.querySelector('[name="surname"]');
    const emailInput = document.querySelector('[name="email"]');
    const phoneInput = document.querySelector('[name="phone"]');
    const addressInput = document.querySelector('[name="address"]');
    
    if (!nameInput || !surnameInput || !emailInput || !phoneInput || !addressInput) {
      console.error('Some form fields not found');
      return;
    }
    
  
    nameInput.addEventListener('input', () => validateName(nameInput));
    nameInput.addEventListener('blur', () => validateName(nameInput));
    
    surnameInput.addEventListener('input', () => validateSurname(surnameInput));
    surnameInput.addEventListener('blur', () => validateSurname(surnameInput));
    
    emailInput.addEventListener('input', () => validateEmail(emailInput));
    emailInput.addEventListener('blur', () => validateEmail(emailInput));
    
    addressInput.addEventListener('input', () => validateAddress(addressInput));
    addressInput.addEventListener('blur', () => validateAddress(addressInput));
    
    
  }
  
  function validateName(input) {
    const value = input.value.trim();
    const errorElement = document.getElementById('name-error');
    
    // Check if empty
    if (value === '') {
      showError(input, errorElement, 'Name is required');
      validationState.name = false;
      updateSubmitButtonState();
      return false;
    }
    
    const letterPattern = /^[a-zA-ZÀ-ÿ\s'-]+$/;
    if (!letterPattern.test(value)) {
      showError(input, errorElement, 'Name must contain only letters');
      validationState.name = false;
      updateSubmitButtonState();
      return false;
    }
    
    if (value.length < 2) {
      showError(input, errorElement, 'Name must be at least 2 characters');
      validationState.name = false;
      updateSubmitButtonState();
      return false;
    }
    
    hideError(input, errorElement);
    validationState.name = true;
    updateSubmitButtonState();
    return true;
  }
  
  function validateSurname(input) {
    const value = input.value.trim();
    const errorElement = document.getElementById('surname-error');
    
    if (value === '') {
      showError(input, errorElement, 'Surname is required');
      validationState.surname = false;
      updateSubmitButtonState();
      return false;
    }
    
    const letterPattern = /^[a-zA-ZÀ-ÿ\s'-]+$/;
    if (!letterPattern.test(value)) {
      showError(input, errorElement, 'Surname must contain only letters');
      validationState.surname = false;
      updateSubmitButtonState();
      return false;
    }
    
    if (value.length < 2) {
      showError(input, errorElement, 'Surname must be at least 2 characters');
      validationState.surname = false;
      updateSubmitButtonState();
      return false;
    }
    
    hideError(input, errorElement);
    validationState.surname = true;
    updateSubmitButtonState();
    return true;
  }
  
  function validateEmail(input) {
    const value = input.value.trim();
    const errorElement = document.getElementById('email-error');
    
    if (value === '') {
      showError(input, errorElement, 'Email is required');
      validationState.email = false;
      updateSubmitButtonState();
      return false;
    }
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      showError(input, errorElement, 'Please enter a valid email address');
      validationState.email = false;
      updateSubmitButtonState();
      return false;
    }
    
    hideError(input, errorElement);
    validationState.email = true;
    updateSubmitButtonState();
    return true;
  }
  
  function validateAddress(input) {
    const value = input.value.trim();
    const errorElement = document.getElementById('address-error');
    
    if (value === '') {
      showError(input, errorElement, 'Address is required');
      validationState.address = false;
      updateSubmitButtonState();
      return false;
    }
    
    if (value.length < 5) {
      showError(input, errorElement, 'Address must be at least 5 characters');
      validationState.address = false;
      updateSubmitButtonState();
      return false;
    }
    
    const hasLetter = /[a-zA-Z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    
    if (!hasLetter) {
      showError(input, errorElement, 'Address must contain letters');
      validationState.address = false;
      updateSubmitButtonState();
      return false;
    }
    
    if (!hasNumber) {
      showError(input, errorElement, 'Address should contain a number');
      validationState.address = false;
      updateSubmitButtonState();
      return false;
    }
    
    hideError(input, errorElement);
    validationState.address = true;
    updateSubmitButtonState();
    return true;
  }
  
  function initializePhoneMasking() {
    const phoneInput = document.querySelector('[name="phone"]');
    const errorElement = document.getElementById('phone-error');
    
    if (!phoneInput) {
      return;
    }
    
    phoneInput.addEventListener('input', function(e) {
      let value = e.target.value;
      
      let digitsOnly = value.replace(/\D/g, '');
      
      if (digitsOnly.length === 0) {
        e.target.value = '';
        validationState.phone = false;
        updateSubmitButtonState();
        return;
      }
      
      if (!digitsOnly.startsWith('370')) {
        if (digitsOnly.startsWith('370')) {
        } else if (digitsOnly.startsWith('70')) {
          digitsOnly = '3' + digitsOnly;
        } else if (digitsOnly.startsWith('0')) {
          digitsOnly = '37' + digitsOnly;
        } else if (digitsOnly.length > 0) {
          digitsOnly = '370' + digitsOnly;
        }
      }
      
      digitsOnly = digitsOnly.substring(0, 11);
      
      let formatted = '';
      if (digitsOnly.length > 0) {
        formatted = '+' + digitsOnly.substring(0, 3);
        if (digitsOnly.length > 3) {
          formatted += ' ' + digitsOnly.substring(3, 6);
        }
        if (digitsOnly.length > 6) {
          formatted += ' ' + digitsOnly.substring(6, 11);
        }
      }
      
      e.target.value = formatted;
      
      if (digitsOnly.length < 11) {
        showError(phoneInput, errorElement, 'Phone number must be 11 digits (+370 XXX XXXXX)');
        validationState.phone = false;
      } else if (digitsOnly.length === 11 && digitsOnly.startsWith('370')) {
        hideError(phoneInput, errorElement);
        validationState.phone = true;
      } else {
        showError(phoneInput, errorElement, 'Invalid Lithuanian phone number format');
        validationState.phone = false;
      }
      
      updateSubmitButtonState();
    });
    
    phoneInput.addEventListener('blur', function() {
      const value = phoneInput.value;
      const digitsOnly = value.replace(/\D/g, '');
      
      if (digitsOnly.length === 0) {
        showError(phoneInput, errorElement, 'Phone number is required');
        validationState.phone = false;
        updateSubmitButtonState();
      }
    });
  }
  
  function showError(input, errorElement, message) {
    if (!errorElement) return;
    
    input.classList.add('input-error');
    input.classList.remove('input-valid');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  }
  
  function hideError(input, errorElement) {
    if (!errorElement) return;
    
    input.classList.remove('input-error');
    input.classList.add('input-valid');
    errorElement.textContent = '';
    errorElement.style.display = 'none';
  }
  
  function updateSubmitButtonState() {
    const submitButton = document.querySelector('.php-email-form button[type="submit"]');
    
    if (!submitButton) return;
    
    const allValid = Object.values(validationState).every(state => state === true);
    
    if (allValid) {
      submitButton.disabled = false;
      submitButton.classList.remove('btn-disabled');
      submitButton.classList.add('btn-enabled');
    } else {
      submitButton.disabled = true;
      submitButton.classList.add('btn-disabled');
      submitButton.classList.remove('btn-enabled');
    }
  }
  
  function handleFormSubmit(event) {
   
    event.preventDefault();
    
    const formData = collectFormData(event.target);
    
    if (!validateFormData(formData)) {
      showErrorMessage('Please fill in all required fields correctly.');
      return;
    }
    
    console.log('Form Data:', formData);
    
    const averageRating = calculateAverageRating(formData);
    
    displayFormResults(formData, averageRating);
    
    showSuccessPopup();
    
    // event.target.reset();
  }
  
  function collectFormData(form) {
    return {
      name: form.querySelector('[name="name"]').value.trim(),
      surname: form.querySelector('[name="surname"]').value.trim(),
      email: form.querySelector('[name="email"]').value.trim(),
      phone: form.querySelector('[name="phone"]').value.trim(),
      address: form.querySelector('[name="address"]').value.trim(),
      rating1: parseInt(form.querySelector('[name="rating1"]').value) || 0,
      rating2: parseInt(form.querySelector('[name="rating2"]').value) || 0,
      rating3: parseInt(form.querySelector('[name="rating3"]').value) || 0
    };
  }
  
  function validateFormData(data) {
    if (!data.name || !data.surname || !data.email || !data.phone || !data.address) {
      return false;
    }
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(data.email)) {
      return false;
    }
    
    if (data.rating1 < 1 || data.rating1 > 10 ||
        data.rating2 < 1 || data.rating2 > 10 ||
        data.rating3 < 1 || data.rating3 > 10) {
      return false;
    }
    
    return true;
  }
  
  function calculateAverageRating(data) {
    const sum = data.rating1 + data.rating2 + data.rating3;
    const average = sum / 3;
    return Math.round(average * 10) / 10;
  }

  function updateAveragePreview() {
    const rating1Input = document.querySelector('[name="rating1"]');
    const rating2Input = document.querySelector('[name="rating2"]');
    const rating3Input = document.querySelector('[name="rating3"]');
    const previewSpan = document.getElementById('average-preview-value');

    if (!rating1Input || !rating2Input || !rating3Input || !previewSpan) {
      return;
    }

    const data = {
      rating1: parseInt(rating1Input.value) || 0,
      rating2: parseInt(rating2Input.value) || 0,
      rating3: parseInt(rating3Input.value) || 0
    };

    const average = calculateAverageRating(data);
    const color = getRatingColor(average);

    previewSpan.textContent = average;
    previewSpan.style.color = color;
  }
  
  function getRatingColor(rating) {
    if (rating >= 0 && rating < 4) {
      return '#e74c3c';
    } else if (rating >= 4 && rating < 7) {
      return '#f39c12';
    } else if (rating >= 7 && rating <= 10) {
      return '#27ae60';
    }
    return '#333';
  }
  
  function displayFormResults(data, average) {
    let resultsContainer = document.getElementById('form-results');
    
    if (!resultsContainer) {
      resultsContainer = document.createElement('div');
      resultsContainer.id = 'form-results';
      resultsContainer.className = 'form-results';
      
      const form = document.querySelector('.php-email-form');
      form.parentNode.insertBefore(resultsContainer, form.nextSibling);
    }
    
    const ratingColor = getRatingColor(average);
    
    const resultsHTML = `
      <div class="results-content">
        <h4>Form Submission Results</h4>
        <div class="results-data">
          <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
          <p><strong>Surname:</strong> ${escapeHtml(data.surname)}</p>
          <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
          <p><strong>Phone number:</strong> ${escapeHtml(data.phone)}</p>
          <p><strong>Address:</strong> ${escapeHtml(data.address)}</p>
          <p><strong>Rating 1 (Quality of Service):</strong> ${data.rating1}/10</p>
          <p><strong>Rating 2 (User Experience):</strong> ${data.rating2}/10</p>
          <p><strong>Rating 3 (Overall Satisfaction):</strong> ${data.rating3}/10</p>
        </div>
        <div class="average-rating">
          <p><strong>${escapeHtml(data.name)} ${escapeHtml(data.surname)}:</strong> 
            <span class="rating-value" style="color: ${ratingColor}; font-weight: bold; font-size: 1.2em;">
              ${average}
            </span>
          </p>
        </div>
      </div>
    `;
    
    resultsContainer.innerHTML = resultsHTML;
    
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
  
  function showSuccessPopup() {
    const popup = document.createElement('div');
    popup.className = 'success-popup';
    popup.innerHTML = `
      <div class="popup-content">
        <div class="popup-icon">
          <i class="bi bi-check-circle-fill"></i>
        </div>
        <h3>Success!</h3>
        <p>Form submitted successfully!</p>
      </div>
    `;
    
    document.body.appendChild(popup);
    
    setTimeout(() => {
      popup.classList.add('show');
    }, 10);
    
    setTimeout(() => {
      popup.classList.remove('show');
      setTimeout(() => {
        popup.remove();
      }, 300);
    }, 3000);
  }
  
  function showErrorMessage(message) {
    const errorDiv = document.querySelector('.php-email-form .error-message');
    if (errorDiv) {
      errorDiv.textContent = message;
      errorDiv.style.display = 'block';
      
      setTimeout(() => {
        errorDiv.style.display = 'none';
      }, 5000);
    } else {
      alert(message);
    }
  }
  
  function escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
  }
  
  
  function updateRatingDisplay() {
    const ratingInputs = document.querySelectorAll('input[type="range"][name^="rating"]');
    
    ratingInputs.forEach(input => {
      const display = document.getElementById(input.name + '-value');
      if (display) {
        input.addEventListener('input', function() {
          display.textContent = this.value;
          display.style.color = getRatingColor(parseInt(this.value) || 0);
          updateAveragePreview();
        });

        // Set initial display values on load
        display.textContent = input.value;
        display.style.color = getRatingColor(parseInt(input.value) || 0);
      }
    });

    // Initialize average preview on load
    updateAveragePreview();
  }
      
  document.addEventListener('DOMContentLoaded', updateRatingDisplay);
  