function updateMajor() {
    var degree = document.getElementById('degree').value;
    var majorSelect = document.getElementById('major');
  
    majorSelect.innerHTML = '<option value="" disabled selected>Select an option</option>';
    
    var majors = [];
    
    if (degree === 'Bachelor of Technology') {
      majors = [
        'Computer Engineering',
        'Electrical Engineering',
        'Mechanical Engineering',
        'Civil Engineering',
        'Aerospace Engineering',
        'Robotics Engineering',
        'Other'
      ];
    } else if (degree === 'Bachelor of Business Administration') {
      majors = [
        'Finance',
        'Marketing',
        'Accounting',
        'International Business',
        'Supply Chain Management',
        'Human Resource Management',
        'Other'
      ];
    } else if (degree === 'Bachelor of Medicine') {
      majors = [
        'Medicine and Surgery',
        'Dentistry',
        'Pharmacy',
        'Nursing',
        'Physiotherapy',
        'Medical Laboratory Science',
        'Other'
      ];
    } else if (degree === 'Bachelor of Arts') {
      majors = [
        'English Literature',
        'History',
        'Philosophy',
        'Psychology',
        'Sociology',
        'Political Science',
        'Other'
      ];
    }
  
    majors.forEach(function(major) {
      var option = document.createElement('option');
      option.value = major;
      option.textContent = major;
      majorSelect.appendChild(option);
    });
  }
  
  