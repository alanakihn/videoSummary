from django.shortcuts import render

def home(request):
    context = {'welcome_message': 'Video Summary Home'}
    return render(request, 'summaryApp/home.html', context)
