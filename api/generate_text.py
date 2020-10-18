import hug
import tensorflow
import os
import gpt_2_simple as gpt2
from datetime import datetime

@hug.get('/unversioned')
def hello():
    return 'Hello world!'

@hug.get('/generate-text')
def generate_text():
    text = "text"
    print(text)
    print(os.getcwd())
    # os.chdir(os.path.join(os.getcwd(), 'models'))
   
    #The generated model checkpoints are by default in /checkpoint/run1. 
    # If you want to load a model from that folder and generate text from it:
    sess = gpt2.start_tf_sess()
    gpt2.load_gpt2(sess)

    # single_text = gpt2.generate(sess, return_as_list=True)[0]
    gpt2.generate(sess)

    # return single_text

    
