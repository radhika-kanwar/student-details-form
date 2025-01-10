function updateProgress() {
    const form = document.querySelector('form');
    const inputs = form.querySelectorAll('input[required], select[required]');
    const totalFields = inputs.length;
    let filledFields = 0;
  
    inputs.forEach(input => {
        if (input.type === 'radio') {
            const radioGroup = form.querySelector(`input[name="${input.name}"]:checked`);
            if (radioGroup) filledFields++;
        } else if (input.value.trim() !== '') {
            filledFields++;
        }
    });
  
    const progress = (filledFields / totalFields) * 100;
    const progressBar = document.querySelector('.progress-bar');
    const progressText = document.querySelector('.progress-text');
    
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${Math.round(progress)}% Complete`;
}
  
function autoSaveForm() {
    const form = document.querySelector('form');
    const formData = new FormData(form);
    
    for (let [key, value] of formData.entries()) {
        sessionStorage.setItem(key, value);
    }
}

function loadAutoSavedData() {
    const form = document.querySelector('form');
    const inputs = form.querySelectorAll('input, select');
    
    inputs.forEach(input => {
        const savedValue = sessionStorage.getItem(input.name);
        if (savedValue) {
            if (input.type === 'radio') {
                if (input.value === savedValue) {
                    input.checked = true;
                }
            } else {
                input.value = savedValue;
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const progressHTML = `
        <div class="progress-container">
            <div class="progress-bar">
                <span class="progress-text">0% Complete</span>
            </div>
        </div>
    `;
    document.querySelector('form').insertAdjacentHTML('afterbegin', progressHTML);
  
    const form = document.querySelector('form');
    form.addEventListener('input', updateProgress);
    form.addEventListener('input', autoSaveForm);
  
    loadAutoSavedData();
    updateProgress();
});