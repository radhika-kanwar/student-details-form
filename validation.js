document.addEventListener('DOMContentLoaded', function () {
    const specialization = document.getElementById('specialization');
    const otherSpecialization = document.getElementById('other-specialization');
  
    function toggleOtherSpecialization() {
      if (specialization.value === 'Other') {
        otherSpecialization.style.display = 'block';
      } else {
        otherSpecialization.style.display = 'none';
      }
    }
  
    // Initialize the toggle for "Other" specialization on page load
    toggleOtherSpecialization();
  
    // Add event listener for specialization changes
    specialization.addEventListener('change', toggleOtherSpecialization);
  
    const form = document.querySelector('form');
  
    // Validate Email
    function validateEmail(email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    }
  
    // Validate Phone Number (10 digits)
    function validatePhoneNumber(phoneNumber) {
      const phonePattern = /^\d{10}$/;
      return phonePattern.test(phoneNumber);
    }
  
    form.addEventListener('submit', function (event) {
      let valid = true;
  
      const email = form.querySelector('input[name="email"]').value;
      const phoneNumber = form.querySelector('input[name="number"]').value;
      const phoneNumberF = form.querySelector('input[name="f-number"]').value;
      const phoneNumberM = form.querySelector('input[name="m-number"]').value;
  
      const emailError = form.querySelector('#emailError');
      const phoneError = form.querySelector('#phoneError');
      const fPhoneError = form.querySelector('#f-phoneError');
      const mPhoneError = form.querySelector('#m-phoneError');
  
      // Email validation
      if (!validateEmail(email)) {
        emailError.textContent = 'Please enter a valid email address.';
        valid = false;
      } else {
        emailError.textContent = '';
      }
  
      // Phone number validation
      if (!validatePhoneNumber(phoneNumber)) {
        phoneError.textContent = 'Please enter a valid 10-digit phone number.';
        valid = false;
      } else {
        phoneError.textContent = '';
      }
  
      if (!validatePhoneNumber(phoneNumberF)) {
        fPhoneError.textContent = 'Please enter a valid 10-digit phone number.';
        valid = false;
      } else {
        fPhoneError.textContent = '';
      }
  
      if (!validatePhoneNumber(phoneNumberM)) {
        mPhoneError.textContent = 'Please enter a valid 10-digit phone number.';
        valid = false;
      } else {
        mPhoneError.textContent = '';
      }
  
      if (valid) {
        // Storing form data in localStorage
        localStorage.setItem('regNum', form.querySelector('input[name="reg"]').value);
        localStorage.setItem('name', form.querySelector('input[name="name"]').value);
        localStorage.setItem('phoneNumber', phoneNumber);
        localStorage.setItem('email', email);
        localStorage.setItem('dob', form.querySelector('input[name="dob"]').value);
        localStorage.setItem('gender', form.querySelector('input[name="gender"]:checked').value);
        localStorage.setItem('state', form.querySelector('input[name="state"]').value);
        localStorage.setItem('city', form.querySelector('input[name="city"]').value);
        localStorage.setItem('specialization', specialization.value);
        if (specialization.value === 'Other') {
          localStorage.setItem('specialization', form.querySelector('#other-specialization-text').value);
        }
        localStorage.setItem('fatherName', form.querySelector('input[name="father"]').value);
        localStorage.setItem('fatherPhone', phoneNumberF);
        localStorage.setItem('motherName', form.querySelector('input[name="mother"]').value);
        localStorage.setItem('motherPhone', phoneNumberM);
      } else {
        event.preventDefault();
      }
    });
  });
  