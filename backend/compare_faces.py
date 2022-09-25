import face_recognition


def compare_faces(image_1, image_2):
    im_1 = face_recognition.load_image_file(image_1)
    im_1_encoding = face_recognition.face_encodings(im_1)[0]

    im_2 = face_recognition.load_image_file(image_2)
    im_2_encoding = face_recognition.face_encodings(im_2)[0]

    results = face_recognition.compare_faces([im_1_encoding], im_2_encoding)

    return results[0]
