function updateMajor() {
  const degree = document.getElementById('degree').value;
  const majorSelect = document.getElementById('major');
  const otherMajorDiv = document.getElementById('other-major');
  
  majorSelect.innerHTML = '<option value="" disabled selected>Select the major</option>';
  
  const majors = {
      'Bachelor of Technology': [
          'Computer Engineering',
          'Electrical Engineering',
          'Mechanical Engineering',
          'Civil Engineering',
          'Aerospace Engineering',
          'Robotics Engineering',
          'Other'
      ],
      'Bachelor of Business Administration': [
          'Finance',
          'Marketing',
          'Accounting',
          'International Business',
          'Supply Chain Management',
          'Human Resource Management',
          'Other'
      ],
      'Bachelor of Medicine': [
          'Medicine and Surgery',
          'Dentistry',
          'Pharmacy',
          'Nursing',
          'Physiotherapy',
          'Medical Laboratory Science',
          'Other'
      ],
      'Bachelor of Arts': [
          'English Literature',
          'History',
          'Philosophy',
          'Psychology',
          'Sociology',
          'Political Science',
          'Other'
      ]
  };

  if (majors[degree]) {
      majors[degree].forEach(major => {
          const option = document.createElement('option');
          option.value = major;
          option.textContent = major;
          majorSelect.appendChild(option);
      });
  }

  otherMajorDiv.style.display = 'none';
  document.getElementById('other-major-text').value = '';
}

document.addEventListener('DOMContentLoaded', function () {
  const major = document.getElementById('major');
  const othermajorDiv = document.getElementById('other-major');
  const otherMajorInput = document.getElementById('other-major-text');
  
  function toggleOthermajor() {
    if (major.value === 'Other') {
      othermajorDiv.style.display = 'block';
      otherMajorInput.required = true;
      updateProgress();
    } else {
      othermajorDiv.style.display = 'none';
      otherMajorInput.required = false;
      otherMajorInput.value = '';
    }
  }

  major.addEventListener('change', function() {
    toggleOthermajor();
    updateProgress();
  });

  otherMajorInput.addEventListener('input', function() {
    updateProgress();
  });

  function validateRegistrationNumber(reg) {
    const regPattern = /^[A-Z]{2}\d{9}$/;
    return regPattern.test(reg);
}

  function validateName(name) {
    const namePattern = /^[A-Za-z]+([\s'-]?[A-Za-z]+)*$/;
    return namePattern.test(name) && name.length <= 50;
  }
  
  function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email) && email.length <= 254;
  }
  
  function validatePhoneNumber(phoneNumber) {
    const phonePattern = /^(\+\d{1,3}[\s-]?)?\d{10}$/;
    return phonePattern.test(phoneNumber);
  }

  function validateDOB(dob) {
    let birthDate = new Date(dob);
    let today = new Date();
    const minAge = 4; 
    const maxAge = 100;
    
    let age = today.getFullYear() - birthDate.getFullYear();
    let monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age >= minAge && age <= maxAge;
  }

  function validatePlace(place) {
    const placePattern = /^[0-9]*[A-Za-z\s]+([A-Za-z0-9\s'-]*[A-Za-z])?$/;
    return placePattern.test(place) && place.length <= 50;
  }

  let uploadedImage = null;
  const imageInput = document.getElementById('image');
  
  imageInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    const maxSize = 5 * 1024 * 1024;
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const imageError = document.getElementById('imageError');

    if (file) {
      if (!allowedTypes.includes(file.type)) {
        imageError.textContent = 'Please upload an image file (jpeg, jpg, or png).';
        this.value = '';
        updateProgress()
        return false;
      } else {
        imageError.textContent = '';
      }

      if (file.size > maxSize) {
        imageError.textContent = 'Please upload an image file smaller than 5MB.';
        this.value = '';
        updateProgress()
        return false;
      } else {
        imageError.textContent = '';
      }

      const reader = new FileReader();
      reader.onload = function(event) {
        uploadedImage = event.target.result;
      };
      reader.readAsDataURL(file);
      updateProgress()
      return true;  
    }
  });

  const form = document.querySelector('form');

  function validateField(field) {
    const errorElement = document.getElementById(`${field.id}Error`);
    if (!errorElement) return true;

    switch(field.id) {
      case 'reg':
        if (!validateRegistrationNumber(field.value.trim())) {
          errorElement.textContent = 'Please enter a valid registration number. Example: GF202345678';
          return false
        } else {
          errorElement.textContent = '';
        }
        break;
      case 'name':
      case 'fName':
      case 'mName':
        if (!validateName(field.value.trim())) {
          errorElement.textContent = 'Please enter a valid name. Only 50 characters including letters, spaces, hyphens, and apostrophes are allowed.';
          return false
        } else {
          errorElement.textContent = '';
        }
        break;
      case 'phone':
      case 'fPhone':
      case 'mPhone':
        if (!validatePhoneNumber(field.value.trim())) {
          errorElement.textContent = 'Please enter a valid 10-digit phone number.';
          return false;
        } else {
          errorElement.textContent = '';
        }
        break;
      case 'email':
        if (!validateEmail(field.value.trim())) {
          errorElement.textContent = 'Please enter a valid email address.';
          return false;
        } else {
          errorElement.textContent = '';
        }
        break;
      case 'dob':
        if (!validateDOB(field.value.trim())) {
          errorElement.textContent = 'Please enter a valid date of birth. Age must be between 4 and 100 years old.';
          return false;
        } else {
          errorElement.textContent = '';
        }
        break;
      case 'state':
      case 'city':
        if (!validatePlace(field.value.trim())) {
          errorElement.textContent = 'Please enter a valid name. Only 50 characters are allowed.';
          return false;
        } else {
          errorElement.textContent = '';
        }
        break;
    }
    return true;
  }

  const inputs = document.querySelectorAll('input[required], select[required]');
  inputs.forEach(input => {
    input.addEventListener('input', function() {
      validateField(this);
      updateProgress();
    });
  });

  form.addEventListener('submit', function (event) {
    let isValid = true;

    inputs.forEach(input => {
      if (!validateField(input)) {
        isValid = false;
      }
    });
  
    if (isValid) {
      localStorage.clear();
      const formData = {
        'photo': uploadedImage,
        'regNum': document.getElementById('reg').value.trim(),
        'name': document.getElementById('name').value.trim(),
        'phoneNumber': document.getElementById('phone').value.trim(),
        'email': document.getElementById('email').value.trim(),
        'dob': document.getElementById('dob').value,
        'gender': form.querySelector('input[name="gender"]:checked').value,
        'state': document.getElementById('state').value.trim(),
        'city': document.getElementById('city').value.trim(),
        'degree': document.getElementById('degree').value,
        'major': major.value === 'Other' ? otherMajorInput.value.trim() : major.value,
        'fatherName': document.getElementById('fName').value.trim(),
        'fatherPhone': document.getElementById('fPhone').value.trim(),
        'motherName': document.getElementById('mName').value.trim(),
        'motherPhone': document.getElementById('mPhone').value.trim()
      };

      for (let[key, value] of Object.entries(formData)) {
        localStorage.setItem(key, value);
      }
    } else {
      event.preventDefault();
    }
  });
});
