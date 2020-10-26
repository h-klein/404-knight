# 404-knight
**Set up virtual environment**

`python3.7 -m venv new_env`

`source new_env/activate`

`pip install -r requirements.txt`


**add model to api folder**
Make sure the folder is called "checkpoint" and your model is the default "run1" (first folder in checkpoint). 

**start up API**
`hug -f generate_text.py`

**paste into browser**
http://localhost:8000/generate-text