import requests
import csv
from pymongo import MongoClient

# Function to read all rows from CSV
def read_all_rows(csv_filename):
    try:
        with open(csv_filename, mode='r', newline='') as file:
            reader = csv.DictReader(file)
            rows = list(reader)
            return rows if rows else None
    except FileNotFoundError:
        return None

# Function to generate a response using the provided prompt
def generate_response_llms(prompt):
    url = "https://chat-gpt26.p.rapidapi.com/"
    payload = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": prompt}]
    }
    headers = {
        "x-rapidapi-key": "",
        "x-rapidapi-host": "chat-gpt26.p.rapidapi.com",
        "Content-Type": "application/json"
    }
    response = requests.post(url, json=payload, headers=headers)
    if response.status_code == 200:
        data = response.json()
        if 'choices' in data and data['choices']:
            return data['choices'][0]['message']['content']
    return "I'm not sure"

# Function to connect to MongoDB
def connect_to_mongo(db_name, collection_name):
    client = MongoClient()
    db = client[db_name]
    collection = db[collection_name]
    return collection

# Function to fetch data from MongoDB
def fetch_data_from_mongo(collection, query={}, projection=None):
    data = list(collection.find(query, projection))
    return data

# Function to write data to CSV
def write_data_to_csv(data, csv_filename):
    if data:
        keys = set()
        for item in data:
            keys.update(item.keys())
        keys = list(keys)
        with open(csv_filename, mode='w', newline='') as file:
            writer = csv.DictWriter(file, fieldnames=keys)
            writer.writeheader()
            writer.writerows(data)
    else:
        print("No data found in the MongoDB collection.")

def chat():
    # Connect to existing database and collection
    db_name = "jpmc"
    collection_name = "test.patients"
    collection = connect_to_mongo(db_name, collection_name)

    # Fetch data from MongoDB
    data = fetch_data_from_mongo(collection)

    # Write data to CSV
    csv_filename = 'medical_data.csv'
    write_data_to_csv(data, csv_filename)

    # Read all rows from the CSV file
    all_rows = read_all_rows(csv_filename)
    if all_rows:
        aggregated_data = "Here is the medical data for all patients:\n"
        for row in all_rows:
            aggregated_data += str(row) + "\n"

        while True:
            question = input("Enter a question to ask about the medical data (or type 'exit' to finish): ")
            if question.lower() == 'exit':
                break
            prompt_scene_description = (
                "Imagine you are an AI medical assistant when I give you the following medical data. "
                "Provide detailed answers to the user's questions based on this data. "
                "Here is the data: " + aggregated_data + " "
                "Please answer to the point, and if you are not sure, just say 'I'm not sure'."
            )
            prompt_with_question = prompt_scene_description + " " + question
            response = generate_response_llms(prompt_with_question)
            print(f"Response: {response}")
    else:
        print("No data found in the CSV file.")

