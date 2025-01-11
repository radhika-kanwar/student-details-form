function updateMajor() {
  const degree = document.getElementById('degree').value.trim();
  const majorSelect = document.getElementById('major');
  const otherMajorDiv = document.getElementById('other-major');
  
  majorSelect.innerHTML = '<option value="" disabled selected>Select an option</option>';
  
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
    } else {
      othermajorDiv.style.display = 'none';
      otherMajorInput.required = false;
      otherMajorInput.value = '';
    }
  }

  major.addEventListener('change', toggleOthermajor);

  function validateName(name) {
    const namePattern = /^[A-Za-z]+([\s'-]?[A-Za-z]+)*$/;
    return namePattern.test(name);
  }
  
  function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
  
  function validatePhoneNumber(phoneNumber) {
    const phonePattern = /^\d{10}$/;
    return phonePattern.test(phoneNumber);
  }

  let uploadedImage = null;
  const imageInput = document.getElementById('image');
  imageInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        uploadedImage = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  const form = document.querySelector('form');
  
  form.addEventListener('submit', function (event) {
    let valid = true;

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phoneNumber = document.getElementById('number').value.trim();
    const nameF = document.getElementById('father').value.trim();
    const nameM = document.getElementById('mother').value.trim();
    const phoneNumberF = document.getElementById('f-number').value.trim();
    const phoneNumberM = document.getElementById('m-number').value.trim();
  
    if (!validateName(name)) {
      nameError.textContent = 'Please enter a valid name. Only letters, spaces, hyphens, and apostrophes are allowed.';
      valid = false;
    } else {
      nameError.textContent = '';
    }

    if (!validateEmail(email)) {
      emailError.textContent = 'Please enter a valid email address.';
      valid = false;
    } else {
      emailError.textContent = '';
    }
  
    if (!validatePhoneNumber(phoneNumber)) {
      phoneError.textContent = 'Please enter a valid 10-digit phone number.';
      valid = false;
    } else {
      phoneError.textContent = '';
    }

    if (!validateName(nameF)) {
      fNameError.textContent = 'Please enter a valid name. Only letters, spaces, hyphens, and apostrophes are allowed.';
      valid = false;
    } else {
      fNameError.textContent = '';
    }
  
    if (!validatePhoneNumber(phoneNumberF)) {
      fPhoneError.textContent = 'Please enter a valid 10-digit phone number.';
      valid = false;
    } else {
      fPhoneError.textContent = '';
    }

    if (!validateName(nameM)) {
      mNameError.textContent = 'Please enter a valid name. Only letters, spaces, hyphens, and apostrophes are allowed.';
      valid = false;
    } else {
      mNameError.textContent = '';
    }
  
    if (!validatePhoneNumber(phoneNumberM)) {
      mPhoneError.textContent = 'Please enter a valid 10-digit phone number.';
      valid = false;
    } else {
      mPhoneError.textContent = '';
    }
  
    if (valid) {
      const formData = {
        'photo': uploadedImage,
        'regNum': document.getElementById('reg').value.trim(),
        'name': name,
        'phoneNumber': phoneNumber,
        'email': email,
        'dob': document.getElementById('dob').value,
        'gender': form.querySelector('input[name="gender"]:checked').value,
        'state': document.getElementById('state').value.trim(),
        'city': document.getElementById('city').value.trim(),
        'degree': document.getElementById('degree').value,
        'major': major.value === 'Other' ? otherMajorInput.value.trim() : major.value,
        'fatherName': nameF,
        'fatherPhone': phoneNumberF,
        'motherName': nameM,
        'motherPhone': phoneNumberM
      };

      for (let[key, value] of Object.entries(formData)) {
        localStorage.setItem(key, value);
      }

    } else {
      event.preventDefault();
    }
  });
});
