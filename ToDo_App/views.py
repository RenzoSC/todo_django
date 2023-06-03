from django.shortcuts import render, redirect
from django.http import JsonResponse
from .models import Task
from .forms import createNewTask
# Create your views here.


def home(request):
    form = createNewTask()
    
    if(request.method == 'POST' and 'f_date' in request.POST and not 'read_task' in request.POST):
        f_date = request.POST['f_date']
        Task.objects.create(title=request.POST['title'], description=request.POST['description'], f_date=f_date)
        
        return redirect(home);
    if request.method == 'POST' and 'f_date' in request.POST and 'read_task' in request.POST:
        f_date = request.POST['f_date']
        
        filtered_tasks = list(Task.objects.filter(f_date=f_date))
        serialized_tasks = [{'title': task.title, 'description': task.description} for task in filtered_tasks]
        
        return JsonResponse({'filtered_tasks': serialized_tasks})

    return render(request, 'index.html', {
        'form': form,
        })