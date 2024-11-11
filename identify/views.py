from django.shortcuts import render
# from .models import identify
from .forms import UploadForm
from .utils import process_image_and_generate_charts
from django.shortcuts import get_object_or_404, redirect

# Create your views here.

def identify(request):  
    # return render(request, 'identify.html')
    if request.method == 'POST' and request.FILES.get('image'):
        image_file = request.FILES['image']
        
        # Process the image and generate charts/graphs
        results = process_image_and_generate_charts(image_file)
        
        return render(request, 'after.html', results)
    
    # If GET request or no file uploaded
    return render(request, 'identify.html')

def upload(request):
    # if request.method == "POST":
    #     form = identifyForm(request.POST, request.FILES)
    #     if form.is_valid():
    #         identify = form.save(commit=False)
    #         identify.user = request.user
    #         identify.save()
    #         return redirect('listed')
    # else:
    #     form = identifyForm()

    if request.method == 'POST':
        form = UploadForm(request.POST, request.FILES)
        if form.is_valid():
            image_file = form.cleaned_data['image']
            results = process_image_and_generate_charts(image_file)
            return render(request, 'after.html', results)
    else:
        form = UploadForm()
    return render(request, 'upload.html', {'form': form})

    # if request.method == 'POST' and request.FILES.get('image'):
    #     image_file = request.FILES['image']
        
    #     # Process the image and generate charts/graphs
    #     results = process_image_and_generate_charts(image_file)
        
    #     return render(request, 'after.html', results)
    
    # # If GET request or no file uploaded
    # return render(request, 'identify.html')

def after(request):    
    return render(request, 'after.html', {'image': 2})


