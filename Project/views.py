from django.shortcuts import render


# Create your views here.

def home(request):
    context ={
        'projects': [
            {
                'id':1,
                'title': 'Portfolio Website ',
                'description': 'A personal portfolio website to showcase my projects and skills.',
                'image':'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600',
                'technologies' :['HTML', 'CSS', 'JavaScript', 'Django'],
                
            }
        ],
        'education': [
            {
                'institution': 'Kavikulguru Institute of Technology and Science,Ramtek',
                'degree': 'Bachelor of Technology',
                'year': '2020-2024',
                'logo' : '1.png'
            },
            {
                'institution': 'yadavrao Dhote Junior College, Rajura',
                'stream': 'Science',
                'year': '2019-2020',
                'logo' : 'yd.jpg'
            },
            {
                'institution': 'Java By Kiran,Pune',
                'stream': 'Python Full Stack',
                'year': '2025',
                'logo' : 'jbk.png'
            }
        ],
        'internships': [
            {
                'company': 'Coder Fuel Infotech Pvt Ltd',
                'role': 'Android Development Trainee Intern',
                'year': '2024'
            },
           
        ]
    }
    return render(request, 'index.html', context)

def resume(request):
    return render(request, 'resume.html')