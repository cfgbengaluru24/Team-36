import face_recognition
import cv2
import os

def load_known_faces(images_folder_path):
    known_face_encodings = []
    known_face_names = []

    # Load each image from the folder and get its face encoding
    for filename in os.listdir(images_folder_path):
        image_path = os.path.join(images_folder_path, filename)
        image = face_recognition.load_image_file(image_path)
        face_encodings = face_recognition.face_encodings(image)
        
        # Check if at least one face is found in the image
        if face_encodings:
            known_face_encodings.append(face_encodings[0])
            known_face_names.append(filename)
    
    return known_face_encodings, known_face_names

def is_face_in_folder(known_face_encodings, known_face_names, unknown_image_path):
    # Load the unknown image and get its face encoding
    unknown_image = face_recognition.load_image_file(unknown_image_path)
    unknown_face_encodings = face_recognition.face_encodings(unknown_image)

    if not unknown_face_encodings:
        return False, None
    
    # Compare the unknown face encoding to the known face encodings
    for unknown_face_encoding in unknown_face_encodings:
        matches = face_recognition.compare_faces(known_face_encodings, unknown_face_encoding)
        
        # If there's a match, return the name of the matched image
        if True in matches:
            first_match_index = matches.index(True)
            return True, known_face_names[first_match_index]
    
    return False, None

def find_face(images_folder_path, unknown_image_path):
    known_face_encodings, known_face_names = load_known_faces(images_folder_path)
    
    is_present, matching_image_name = is_face_in_folder(known_face_encodings, known_face_names, unknown_image_path)
    
    if is_present:
        print(f"Face found in the folder! Matching image: {matching_image_name}")
        return True, matching_image_name
    else:
        print("Face not found in the folder.")
        return False, ""

# if __name__ == "__main__":
#     # Path to the folder containing images of known faces
#     images_folder_path = "E:/cfg/images"
#     # Path to the image to be compared
#     unknown_image_path = "D:/RAO/IoT/IOT project/photos/Elon Musk.jpg"
    
#     main(images_folder_path, unknown_image_path)
