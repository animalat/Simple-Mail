from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def test_send_message(request):
    return HttpResponse('Hello from django mailing app!')