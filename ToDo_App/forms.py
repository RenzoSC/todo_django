from django import forms
from .models import Task

class createNewTask(forms.Form):
    title = forms.CharField(label='Titulo de tarea', max_length=200, widget=forms.TextInput(attrs={'class': 'my-custom-class'}))
    description = forms.CharField(label="Descripcion de la tarea", widget=forms.Textarea(attrs={'class': 'my-custom-class'}))
    f_date = forms.DateField(widget=forms.DateInput(attrs={'class': 'datepicker'}), label="Fecha")