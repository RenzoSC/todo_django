from django.shortcuts import render, redirect
from django.http import JsonResponse
from .models import Task
from .forms import createNewTask
# Create your views here.


def home(request):
    form = createNewTask()
    
    if request.method =='POST' and 'checked' in request.POST and 'task_id' in request.POST:
        task_id = request.POST.get('task_id')
        task = Task.objects.get(id=task_id)
        task.done = not task.done # Cambiar el estado de la tarea según sea necesario
        task.save()
        return JsonResponse({'success': True, 'task_id': task_id, 'done': task.done})
    elif request.method == 'POST' and 'delete' in request.POST and 'task_id' in request.POST:
        task_id = request.POST.get('task_id')
        task = Task.objects.get(id=task_id)
        task.delete()
        return JsonResponse({'success':True, 'task_id': task_id})
    elif(request.method == 'POST' and 'f_date' in request.POST and not 'read_task' in request.POST):
        f_date = request.POST['f_date']
        Task.objects.create(title=request.POST['title'], description=request.POST['description'], f_date=f_date)
        
        return redirect(home);

    elif request.method == 'POST' and 'f_date' in request.POST and 'read_task' in request.POST:
        f_date = request.POST['f_date']
        
        filtered_tasks = list(Task.objects.filter(f_date=f_date))
        serialized_tasks = [{'title': task.title, 'description': task.description,'done':task.done, 'id':task.id} for task in filtered_tasks]
        
        return JsonResponse({'filtered_tasks': serialized_tasks})

    return render(request, 'index.html', {
        'form': form,
        })