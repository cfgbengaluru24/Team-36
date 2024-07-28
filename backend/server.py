from flask import Flask, request, jsonify
import base64
import io
import os
import face_recognition
from PIL import Image
import numpy as np
from face_reg import find_face
# from speech2text import get_gemini_response
from flask_cors import CORS
from chatbot import chat  # Import CORS

app = Flask(__name__)

# Initialize CORS
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins, or specify origins as needed

@app.route('/compare', methods=['POST'])
def compare_with_folder():
    data = request.json
    if 'image' not in data:
        return jsonify({"error": "Image data is required"}), 400

    # Decode base64 image from the request
    image_base64 = data['image']
    image_data = base64.b64decode(image_base64)
    uploaded_image = Image.open(io.BytesIO(image_data))
    uploaded_image.save('./test_images/test.jpg')

    # Perform face recognition
    face_found = find_face('E:/cfg/cfg3/backend/images', './test_images/test.jpg')

    if face_found[0]:
        match_results = face_found[1][:-4]
        print(match_results)
        return jsonify({"message": "Comparison completed", "matches": match_results}), 200
    else:
        print("No match")
        return jsonify({"message": "No Comparison", "matches": None}), 400
    

if __name__ == '__main__':
    app.run(debug=True, port=5000)
