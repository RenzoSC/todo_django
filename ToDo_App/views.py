from django.shortcuts import render, redirect
from .models import Task, Date
from .forms import createNewTask
# Create your views here.
from datetime import date

def home(request):
    if request.method == 'GET':
        form = createNewTask()
        return render(request, 'index.html', {
        'form': createNewTask(),})
    elif(request.method == 'POST'):
        
        f_date = request.POST['f_date']
        dia = Date.objects.create(date=f_date)
        Task.objects.create(title=request.POST['title'], description=request.POST['description'], f_date=dia)
        return redirect(home);