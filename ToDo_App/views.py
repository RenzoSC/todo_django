from django.shortcuts import render, redirect
from .models import Task, Date
from .forms import createNewTask
# Create your views here.
from datetime import date

def home(request):
    form = createNewTask()
    tasks = None
    if request.method == 'GET' and 'f_date' in request.GET:
        f_date = request.GET['f_date']
        tasks = Task.objects.filter(f_date=f_date)
    elif(request.method == 'POST'):
        f_date = request.POST['f_date']
        dia = Date.objects.create(date=f_date)
        Task.objects.create(title=request.POST['title'], description=request.POST['description'], f_date=dia)
        return redirect(home);
    print(tasks)
    return render(request, 'index.html', {
        'form': form,
        'tasks': tasks})