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
    #The generated model checkpoints are by default in /checkpoint/run1. 
    # works best if you run with defaults from the same folder
    # If you want to load a model from that folder and generate text from it:
    sess = gpt2.start_tf_sess()
    gpt2.load_gpt2(sess)

    single_text = gpt2.generate(sess, return_as_list=True)[0]

    return single_text

        
