from django.shortcuts import render, redirect
from .models import Task, Date
from .forms import createNewTask
# Create your views here.
from datetime import date

def home(request):
    form = createNewTask()
    tasks = Task.objects.all()
    
    if(request.method == 'POST'):
        f_date = request.POST['f_date']
        dia = Date.objects.create(date=f_date)
        Task.objects.create(title=request.POST['title'], description=request.POST['description'], f_date=dia)
        print("y " + f_date)
        return redirect(home);
    
    return render(request, 'index.html', {
        'form': form,
        'tasks': tasks})