import json
import requests
import time

from dotenv import load_dotenv
load_dotenv()  # Load all the environment variables

import os
import google.generativeai as genai

API_TOKEN = os.getenv("API_TOKEN")
headers = {"Authorization": f"Bearer {API_TOKEN}"}
API_URL = "https://api-inference.huggingface.co/models/openai/whisper-large-v3"

def query(filename):
    with open(filename, "rb") as f:
        data = f.read()
    response = requests.request("POST", API_URL, headers=headers, data=data)
    print(response)
    return json.loads(response.content.decode("utf-8"))

start_time = time.time() 
data = query("Recording (6).mp3")
end_time = time.time()  # Record the end time
execution_time = end_time - start_time  # Calculate the elapsed time
print(f"Execution time: {execution_time:.4f} seconds")
print(data)




# Configure Genai Key
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Function to load Google Gemini Model and provide queries as response
def get_gemini_response(input_text, prompt):
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content([prompt[0], input_text])
    return response.text

# Define Your Prompt
prompt = [
    """
    You are an expert in converting English language text to JSON format output!
    The JSON output has the following keys - known allergies, medications taking, past treatments, plaque index, gingival index, caries, missing teeth, gum condition, RBC count, haemoglobin level, iron level, diagnosis, treatment plan, additional notes.
    """
]

# Define your input text
# input_text = """
#     John Doe is a 45-year-old male with a history of seasonal allergies. He is currently taking antihistamines. Past treatments include a root canal procedure in 2015. His plaque index is moderate, and his gingival index is slightly elevated. He has one caries and three missing teeth. The gum condition shows mild gingivitis. His RBC count is within normal range, haemoglobin level is 13.5 g/dL, and iron level is 80 mcg/dL. The diagnosis is mild gingivitis and the treatment plan includes scaling and root planing. Additional notes mention that the patient should follow up in three months.
# """
input_text=data['text']

# Get the response
response = get_gemini_response(input_text, prompt)

# Print the response
print(response)