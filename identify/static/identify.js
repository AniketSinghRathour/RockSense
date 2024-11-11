document.addEventListener('DOMContentLoaded', () => {
    const uploadBox = document.getElementById('upload-box');
    const fileInput = document.getElementById('file-input');
    const previewBox = document.getElementById('preview-box');
    const previewImage = document.getElementById('preview-image');
    const removeBtn = document.getElementById('remove-btn');
    const identifyBtn = document.getElementById('identify-btn');
    const analysisContainer = document.getElementById('analysis-container');

    // let charts = {
    //     composition: null,
    //     grainSize: null,
    //     spatial: null
    // };

    // Handle drag and drop
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadBox.addEventListener(eventName, preventDefaults);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        uploadBox.addEventListener(eventName, () => {
            uploadBox.classList.add('highlight');
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        uploadBox.addEventListener(eventName, () => {
            uploadBox.classList.remove('highlight');
        });
    });

    // Handle file upload
    uploadBox.addEventListener('drop', handleDrop);
    uploadBox.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFiles);
    removeBtn.addEventListener('click', removeImage);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles({ target: { files } });
    }

    function handleFiles(e) {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImage.src = e.target.result;
                uploadBox.style.display = 'none';
                previewBox.style.display = 'block';
                identifyBtn.disabled = false;
            }
            reader.readAsDataURL(file);
        }
    }

    function removeImage() {
        previewBox.style.display = 'none';
        uploadBox.style.display = 'block';
        fileInput.value = '';
        identifyBtn.disabled = true;
        analysisContainer.style.display = 'none';
    }

    // Rock analysis and visualization
    // identifyBtn.addEventListener('click', async () => {
    //     identifyBtn.disabled = true;
    //     identifyBtn.textContent = 'Analyzing...';

    //     //for sending image to python
    //     const imageFile = document.getElementById('file-input').files[0];
        
    //     if (imageFile) {
    //         const formData = new FormData();
    //         formData.append('image', imageFile);

    //         fetch('/upload/', {
    //             method: 'POST',
    //             body: formData,
    //             headers: {
    //                 'X-CSRFToken': getCSRFToken() // Function to get CSRF token
    //             }
    //         })
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log("Response from Django:", data);
    //             // Handle the response as needed (e.g., display a message)
    //         })
    //         .catch(error => {
    //             console.error("Error:", error);
    //         });
    //     } else {
    //         alert("Please select an image before uploading.");
    //     }
    

    // // Function to get CSRF token
    // function getCSRFToken() {
    //     const csrfToken = document.cookie
    //         .split('; ')
    //         .find(row => row.startsWith('csrftoken='))
    //         ?.split('=')[1];
    //     return csrfToken;
    // }
    //     // function uploadImage() {
    //     //     const form = document.getElementById('uploadForm');
    //     //     const formData = new FormData(form);

    //     //     // fetch('/after/', {  // Ensure this URL matches your Django route
    //     //     //     method: 'POST',
    //     //     //     body: formData,
    //     //     //     headers: {
    //     //     //         'X-CSRFToken': '{{ csrf_token }}'
    //     //     //     }
    //     //     // })
    //     //     // .then(response => {
    //     //     //     if (response.ok) {
    //     //     //         alert("Image uploaded successfully!");
    //     //     //     } else {
    //     //     //         alert("Image upload failed.");
    //     //     //     }
    //     //     // })
    //     //     // .catch(error => console.error("Error:", error));
    //     // }

    //     // Simulate API call delay
    //     await new Promise(resolve => setTimeout(resolve, 2000));

    //     // Update rock information
    //     document.getElementById('rock-type').textContent = 'Granite';
    //     document.getElementById('classification').textContent = 'Igneous Rock';
    //     document.getElementById('formula').textContent = 'SiO₂ + Al₂O₃ + K₂O + Na₂O + CaO';
    //     document.getElementById('description').textContent = 
    //         'Granite is a coarse-grained intrusive igneous rock composed mainly of quartz, alkali feldspar, and plagioclase. It forms from the slow crystallization of magma below Earth\'s surface.';

    //     // Initialize charts
    //     initializeCharts();

    //     // Load 3D model
    //     document.getElementById('rock-model').src = 
    //         'https://sketchfab.com/models/8e1c4c4814724147b41e7d3bd833b3cd/embed';

    //     // Update locations
    //     updateLocations([
    //         'Yosemite National Park, USA',
    //         'Scottish Highlands, UK',
    //         'Black Forest, Germany',
    //         'Mount Rushmore, USA'
    //     ]);

    //     // Show analysis container
    //     analysisContainer.style.display = 'block';
    //     setTimeout(() => {
    //         analysisContainer.classList.add('visible');
    //     }, 100);

    //     identifyBtn.textContent = 'Analyze Rock';
    //     identifyBtn.disabled = false;
    // });

    // function initializeCharts() {
    //     // Destroy existing charts
    //     Object.values(charts).forEach(chart => {
    //         if (chart) chart.destroy();
    //     });

    //     // Composition Pie Chart
    //     charts.composition = new Chart(document.getElementById('compositionChart'), {
    //         type: 'pie',
    //         data: {
    //             labels: ['Quartz', 'Feldspar', 'Biotite', 'Other Minerals'],
    //             datasets: [{
    //                 data: [40, 35, 15, 10],
    //                 backgroundColor: [
    //                     'rgba(255, 99, 132, 0.8)',
    //                     'rgba(54, 162, 235, 0.8)',
    //                     'rgba(255, 206, 86, 0.8)',
    //                     'rgba(75, 192, 192, 0.8)'
    //                 ]
    //             }]
    //         },
    //         options: {
    //             plugins: {
    //                 legend: {
    //                     position: 'bottom',
    //                     labels: { color: 'white' }
    //                 }
    //             }
    //         }
    //     });

    //     // Grain Size Distribution
    //     charts.grainSize = new Chart(document.getElementById('grainSizeChart'), {
    //         type: 'bar',
    //         data: {
    //             labels: ['0-1mm', '1-2mm', '2-3mm', '3-4mm', '4-5mm'],
    //             datasets: [{
    //                 label: 'Distribution',
    //                 data: [15, 30, 25, 20, 10],
    //                 backgroundColor: 'rgba(139, 92, 246, 0.8)'
    //             }]
    //         },
    //         options: {
    //             scales: {
    //                 y: {
    //                     beginAtZero: true,
    //                     grid: { color: 'rgba(255, 255, 255, 0.1)' },
    //                     ticks: { color: 'white' }
    //                 },
    //                 x: {
    //                     grid: { color: 'rgba(255, 255, 255, 0.1)' },
    //                     ticks: { color: 'white' }
    //                 }
    //             },
    //             plugins: {
    //                 legend: {
    //                     labels: { color: 'white' }
    //                 }
    //             }
    //         }
    //     });

    //     // Spatial Distribution
    //     charts.spatial = new Chart(document.getElementById('spatialChart'), {
    //         type: 'scatter',
    //         data: {
    //             datasets: [{
    //                 label: 'Mineral Distribution',
    //                 data: Array.from({ length: 50 }, () => ({
    //                     x: Math.random() * 100,
    //                     y: Math.random() * 100
    //                 })),
    //                 backgroundColor: 'rgba(139, 92, 246, 0.6)'
    //             }]
    //         },
    //         options: {
    //             scales: {
    //                 y: {
    //                     beginAtZero: true,
    //                     grid: { color: 'rgba(255, 255, 255, 0.1)' },
    //                     ticks: { color: 'white' }
    //                 },
    //                 x: {
    //                     grid: { color: 'rgba(255, 255, 255, 0.1)' },
    //                     ticks: { color: 'white' }
    //                 }
    //             },
    //             plugins: {
    //                 legend: {
    //                     labels: { color: 'white' }
    //                 }
    //             }
    //         }
    //     });
    // }

    // function updateLocations(locations) {
    //     const locationList = document.getElementById('location-list');
    //     locationList.innerHTML = locations.map(location => `
    //         <div class="location-item">
    //             <img src="https://api.iconify.design/lucide:map-pin.svg" 
    //                  alt="Location" 
    //                  style="width: 20px; height: 20px; filter: invert(1);">
    //             <span>${location}</span>
    //         </div>
    //     `).join('');
    // }

    // Handle download and share buttons
    // document.getElementById('download-btn').addEventListener('click', () => {
    //     // Implement PDF generation and download
    //    window.print() ;
    // });

    // document.getElementById('share-btn').addEventListener('click', () => {
    //     // Implement sharing functionality
    //     alert('Sharing analysis...');
    // });

});