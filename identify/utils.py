from PIL import Image
import matplotlib.pyplot as plt
import numpy as np
import io
import base64

def process_image_and_generate_charts(image_file):
    # Load image
    img = Image.open(image_file)
    processed_img = img.convert("L")  # Example processing (grayscale)
    
    # Convert processed image to base64 for easy embedding in HTML
    img_io = io.BytesIO()
    processed_img.save(img_io, format='PNG')
    img_base64 = base64.b64encode(img_io.getvalue()).decode()

    # Example analysis: Generate histogram of pixel intensity
    img_array = np.array(processed_img)
    plt.figure(figsize=(6, 4))
    plt.hist(img_array.ravel(), bins=256, color='black', alpha=0.7)
    plt.title('Pixel Intensity Distribution')
    plt.xlabel('Intensity')
    plt.ylabel('Frequency')
    hist_io = io.BytesIO()
    plt.savefig(hist_io, format='PNG')
    hist_base64 = base64.b64encode(hist_io.getvalue()).decode()
    plt.close()

    # Example graph: Display intensity profile along the center row
    plt.figure(figsize=(6, 4))
    plt.plot(img_array[img_array.shape[0] // 2], color='blue')
    plt.title('Center Row Intensity Profile')
    plt.xlabel('Pixel')
    plt.ylabel('Intensity')
    profile_io = io.BytesIO()
    plt.savefig(profile_io, format='PNG')
    profile_base64 = base64.b64encode(profile_io.getvalue()).decode()
    plt.close()

    return {
        'processed_image': img_base64,
        'histogram': hist_base64,
        'profile_chart': profile_base64,
    }