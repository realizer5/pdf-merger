const fileInput = document.getElementById('formFile');
const inputContainer = document.getElementById('inputContainer');
const cancelBtn = document.getElementById('cancelBtn');
const dragArea = document.getElementById('dragArea');
const dataTransfer = new DataTransfer();

fileInput.addEventListener('change', () => {
    const files = fileInput.files;
    if (files.length > 0) {
        dropArea.querySelector('p').textContent = `${files.length} file(s) selected`;
        inputContainer.innerHTML = "";
        for (const file in files) {
            if (files.hasOwnProperty(file)) {
                const fileName = files[file].name;
                inputContainer.innerHTML += `<div class="mb-3"><label for="" class="form-label">${fileName}</label><input type="text" class="form-control" name="pages" placeholder="e.g., 1,3,4 or 4-10"></div>`;
            }
        }
    }
});

cancelBtn.addEventListener('click', () => {
    inputContainer.innerHTML = "";
    dropArea.querySelector('p').textContent = 'Drag and drop your PDF files here, or click to select files.';

})

dropArea.addEventListener('drop', (event) => {
    event.preventDefault();
    dropArea.querySelector('p').textContent = 'Files uploaded successfully';

    const files = event.dataTransfer.files;
    if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            dataTransfer.items.add(files[i]);
        }
        fileInput.files = dataTransfer.files;
    }
    for (const file in files) {
        if (files.hasOwnProperty(file)) {
            const fileName = files[file].name;
            inputContainer.innerHTML += `<div class="mb-3"><label for="" class="form-label">${fileName}</label><input type="text" class="form-control" placeholder="e.g., 1,3,4 or 4-10"></div>`;
        }
    }
});

dropArea.addEventListener('click', () => {
    fileInput.click();
});

dropArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropArea.classList.add('drag-over');
    dropArea.querySelector('p').textContent = 'Release to upload files';
});

dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('drag-over');
    dropArea.querySelector('p').textContent = 'Drag and drop your PDF files here, or click to select files.';
});

