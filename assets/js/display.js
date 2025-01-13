function newForm() {
  sessionStorage.clear();
  localStorage.clear();
  window.location.href = "index.html";
}

function printPage() {
    window.print();
}

function downloadPDF() {
    const doc = new jspdf.jsPDF();
    doc.rect(10, 10, 190, 277);

    doc.setFontSize(20);
    doc.text('Student Information', 105, 20, { align: 'center' });
    
    const photo = localStorage.getItem("photo");
    if (photo) {
        try {
          doc.addImage(photo, 75, 30, 60, 60);
        } catch (e) {
            console.error('Error adding photo to PDF:', e);
        }
    }
    
    doc.setFontSize(12);
    let yPos = photo ? 100 : 40;
    
    const fields = [
        ['Registration Number', localStorage.getItem("regNum")],
        ['Name', localStorage.getItem("name")],
        ['Phone Number', localStorage.getItem("phoneNumber")],
        ['Email', localStorage.getItem("email")],
        ['Date of Birth', localStorage.getItem("dob")],
        ['Gender', localStorage.getItem("gender")],
        ['State', localStorage.getItem("state")],
        ['City', localStorage.getItem("city")],
        ['Degree', localStorage.getItem("degree")],
        ['Major', localStorage.getItem("major")],
        ['Father\'s Name', localStorage.getItem("fatherName")],
        ['Father\'s Phone', localStorage.getItem("fatherPhone")],
        ['Mother\'s Name', localStorage.getItem("motherName")],
        ['Mother\'s Phone', localStorage.getItem("motherPhone")]
    ];

    const addField = (label, value) => {
      doc.text(`${label}: ${value || 'N/A'}`, 20, yPos);
      yPos += 10;
    
      if (yPos > 280) {
          doc.addPage();
          yPos = 20;
      }
  };
    
    fields.forEach(([label, value]) => addField(label, value));
    
    const date = new Date().toLocaleDateString();
    doc.setFontSize(10);
    doc.text(`Generated on: ${date}`, 20, 292);
    
    doc.save('student_information.pdf');
    alert('PDF creation successful!');
}

document.addEventListener("DOMContentLoaded", function () {
  function displayData() {
    const fields = [
      { id: "regDisplay", key: "regNum" },
      { id: "nameDisplay", key: "name" },
      { id: "phoneDisplay", key: "phoneNumber" },
      { id: "emailDisplay", key: "email" },
      { id: "dobDisplay", key: "dob" },
      { id: "genderDisplay", key: "gender" },
      { id: "stateDisplay", key: "state" },
      { id: "cityDisplay", key: "city" },
      { id: "degreeDisplay", key: "degree" },
      { id: "majorDisplay", key: "major" },
      { id: "fnameDisplay", key: "fatherName" },
      { id: "fnumberDisplay", key: "fatherPhone" },
      { id: "mnameDisplay", key: "motherName" },
      { id: "mnumberDisplay", key: "motherPhone" }
    ];

    const photoDisplay = document.getElementById('displayImage');
    const photoValue = localStorage.getItem('photo');
    if (photoValue) {
        photoDisplay.src = photoValue;
    } else {
          photoDisplay.alt = "No photo available";
    }

    fields.forEach((field) => {
      const element = document.getElementById(field.id);
      const value = localStorage.getItem(field.key);
      element.textContent = value || "N/A";
    });
  }

  displayData();
});