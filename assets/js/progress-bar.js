function updateProgress() {
    const form = document.querySelector('form');
    const inputs = form.querySelectorAll('input[required], select[required]');
    const totalFields = inputs.length;
    let filledFields = 0;
    
    inputs.forEach(input => {
        const errorId = `${input.id}Error`;
        const errorElement = document.getElementById(errorId);
        if (errorElement && errorElement.textContent) {
            return; // Skipping the fields with errors
        }

        if (input.type === 'radio') {
            const radioGroup = form.querySelector(`input[name="${input.name}"]:checked`);
            if (radioGroup) filledFields++;
        } else if (input.type === 'file') {
            const imageError = document.getElementById('imageError');
            if (input.files.length > 0 && (!imageError || !imageError.textContent)) {
                filledFields++;
            }
        } else if (input.value.trim() !== '') {
            filledFields++;
        }
    });

    const progress = Math.round((filledFields / totalFields) * 100);
    const progressBar = document.querySelector('.progress-bar');
    const progressText = document.querySelector('.progress-text');
    
    if (progressBar && progressText) {
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${progress}% Complete`;
    }

    if (progress < 33) {
        progressBar.style.backgroundColor = '#ff6b6b';
        progressText.style.color = '#ff6b6b';
    } else if (progress < 66) {
        progressBar.style.backgroundColor = '#ffd93d';
        progressText.style.color = '#ffd93d';
    } else {
        progressBar.style.backgroundColor = '#008080';
        progressText.style.color = '#008080';
    }

}

function resetProgress() {
    const progressBar = document.querySelector('.progress-bar');
    const progressText = document.querySelector('.progress-text');
    if (progressBar && progressText) {
        progressBar.style.width = '0%';
        progressText.textContent = '0% Complete';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    
    const progressHTML = `
        <div class="progress-container">
            <div class="progress-bar">
                <span class="progress-text">0% Complete</span>
            </div>
        </div>
    `;
    form.insertAdjacentHTML('afterbegin', progressHTML);
    
    form.addEventListener('input', updateProgress);
    form.addEventListener('change', updateProgress);

    const resetButton = form.querySelector('button[type="reset"]');
    resetButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm('Are you sure you want to reset the form? All data will be lost.')) {
            form.reset();
            resetProgress();
            sessionStorage.clear();
        }
    });
    
    updateProgress();
});