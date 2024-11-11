from django import forms
# from .models import identify
# from django.contrib.auth.models import User

class UploadForm(forms.Form):
    # class Meta:
    #     model = identify
    #     fields = ['photos']
        # widgets = {
        #     'photos': forms.ImageField(attrs={'id': 'file-input'}),
        # }
    image = forms.ImageField()