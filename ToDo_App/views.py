from django.shortcuts import render, redirect
from .models import Task
from .forms import createNewTask
# Create your views here.


def home(request):
    form = createNewTask()
    tasks = Task.objects.all()
    
    if(request.method == 'POST' and 'f_date' in request.POST and not 'read_task' in request.POST):
        f_date = request.POST['f_date']
        Task.objects.create(title=request.POST['title'], description=request.POST['description'], f_date=f_date)
        print("y " + f_date)
        return redirect(home);
    if request.method == 'POST' and 'f_date' in request.POST and 'read_task' in request.POST:
        f_date = request.POST['f_date']
        print("z" + f_date)
        filtered_tasks = Task.objects.filter(f_date=f_date)
        for task_ in filtered_tasks:
            print(task_.title)
        return render(request, 'index.html', {
            'form':form,
            'tasks': tasks,
            'filtered_tasks':filtered_tasks})

    return render(request, 'index.html', {
        'form': form,
        })