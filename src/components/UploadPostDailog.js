import React, { useContext, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { FaCameraRetro } from 'react-icons/fa';
// import BookCategoryList from './BookCategoryList';
import { db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { AuthContext } from '../contexts/AuthContext';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';

function UploadPostDialog({ isOpen, onClose }) {
  const { currentUser } = useContext(AuthContext);
  const [bookName, setBookName] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const book_name = event.target[0].value;
    const book_author = event.target[1].value;
    const book_category = event.target[2].value;
    const book_publication = event.target[3].value;
    const book_image = event.target[4].files[0];
    const book_price = event.target[5].value;
    const book_description = event.target[6].value;
    

    try {
      if (book_image === undefined) {
        return console.log('cover is undefined');
      }
      const storageRef = ref(storage, `books/${book_image.name}`);
      uploadBytes(storageRef, book_image)
        .then((snapshot) => {
          getDownloadURL(storageRef).then((url) => {
            const imgUrl = url;

            const dataObject = {
              bookName: book_name,
              category: book_category,
              author: book_author,
              publication: book_publication,
              description: book_description,
              price:book_price,
              postedUserId: currentUser.uid,
              postedUser: currentUser.displayName,
              postUrl: imgUrl,
              postedDate: serverTimestamp(),
            };

            const docRef = collection(db, 'books');
            addDoc(docRef, dataObject)
              .then((userRef) => {
                toast.success('Product Uploaded Successfully');
                // navigate('/profile');
              })
              .catch((error) => {
                toast.error('Error adding document: ', error);
                // setIsLoading(false);
              });
          });
        })
        .catch((error) => {
          toast.error('Error uploading image: ', error);
        });
    } catch (error) {
      console.error('Error:', error);
    }

    onClose();
  };

  const handleFileChange = (event) => {
    const fileName = event.target.files[0]?.name;
    setBookName(fileName);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="dialogContainer">
      <div className="dialogWrapper">
        <Dialog.Panel className="dialog-panel">
          <Dialog.Title as="h3" className="title">
            Upload Post
          </Dialog.Title>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="bookName"
              name="bookName"
              // onChange={(e) => setPostTitle(e.target.value)}
              placeholder="Enter Book Name"
              required
            />
            <input
              type="text"
              id="bookAuthor"
              name="bookAuthor"
              // onChange={(e) => setPostTitle(e.target.value)}
              placeholder="Author's Name"
              required
            />
            {/* <BookCategoryList /> */}
            <select
              required
              id="select-category"
              // onChange={(e) => setSelectValue(e.target.value)}
            >
              <option value="none" selected disabled hidden>
                Category
              </option>
              <option>Novel</option>
              <option>Manga</option>
              <option>Thriller</option>
              <option>Educational</option>
              <option>Bussiness</option>
              <option>History</option>
              <option>Biography</option>
              <option>Mystery</option>
              <option>Fiction</option>
              <option>Motivation</option>
              <option>Fantasy</option>
              <option>Philosophy</option>
              <option>Others</option>
            </select>
            <input
              type="text"
              id="bookPublication"
              name="bookPublication"
              // onChange={(e) => setPostTitle(e.target.value)}
              placeholder="Publication"
              required
            />
            <input
              style={{ display: 'none' }}
              type="file"
              id="bookUpload"
              accept=".jpg, .jpeg, .png, .gif"
              onChange={handleFileChange}
            />
            <label htmlFor="bookUpload">
              <FaCameraRetro size={24} />
              <span>
                {bookName ? `Book: ${bookName}` : 'Upload Book Image'}
              </span>
            </label>
            <input
              type="number"
              id="bookPrice"
              name="price"
              // onChange={(e) => setPostTitle(e.target.value)}
              placeholder="Offered Price"
              required
            />
            <textarea
              id="postDescription"
              name="postDescription"
              placeholder="Short Description"
              required
            />

            <div className="btn-collection">
              <button type="button" className="cancel" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="confirm">
                Upload
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default UploadPostDialog;
