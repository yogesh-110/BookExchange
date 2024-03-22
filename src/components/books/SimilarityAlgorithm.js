import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import BookCard from '../cards/BookCard';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore

function SimilarityAlgorithm(props) {
  const [books, setBooks] = useState([]);
  

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'books'), snapshot => {
      const fetchedBooks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBooks(fetchedBooks);
    });

    return () => unsubscribe();
  }, [db]);

  function termFrequency(text) {
    const words = text.split(" ");
    const wordCount = {};
    const totalWords = words.length;
    words.forEach(word => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });
    const tf = {};
    Object.keys(wordCount).forEach(word => {
      tf[word] = wordCount[word] / totalWords;
    });
    return tf;
  }
  
  function inverseDocumentFrequency(documents) {
    const idf = {};
    const totalDocuments = documents.length;
    const wordDocumentCount = {};
  
    documents.forEach(document => {
      const words = new Set(document.split(" "));
      words.forEach(word => {
        wordDocumentCount[word] = (wordDocumentCount[word] || 0) + 1;
      });
    });
  
    Object.keys(wordDocumentCount).forEach(word => {
      idf[word] = Math.log(totalDocuments / (wordDocumentCount[word] + 1));
    });
  
    return idf;
  }
  
  function tfidf(text, documents) {
    const tf = termFrequency(text);
    const idf = inverseDocumentFrequency(documents);
    const tfidfVector = {};
    Object.keys(tf).forEach(word => {
      tfidfVector[word] = tf[word] * idf[word];
    });
    return tfidfVector;
  }
  
  function cosineSimilarity(vectorA, vectorB) {
    const terms = new Set([...Object.keys(vectorA), ...Object.keys(vectorB)]);
    
    let dotProduct = 0;
    let magnitudeA = 0;
    let magnitudeB = 0;
    
    for (const term of terms) {
      dotProduct += (vectorA[term] || 0) * (vectorB[term] || 0);
      magnitudeA += Math.pow(vectorA[term] || 0, 2);
      magnitudeB += Math.pow(vectorB[term] || 0, 2);
    }
    
    magnitudeA = Math.sqrt(magnitudeA);
    magnitudeB = Math.sqrt(magnitudeB);
    
    return dotProduct / (magnitudeA * magnitudeB);
  }
  
  function calculateSimilarity(singleData, data) {
    const singleVector = tfidf(singleData.author + " " + singleData.category, data.map(entry => entry.author + " " + entry.category));
    const similarities = data.map(entry => ({
        id: entry.id,
        similarity: cosineSimilarity(singleVector, tfidf(entry.author + " " + entry.category, data.map(entry => entry.author + " " + entry.category)))
    }));
    return similarities;
  }
  
  function getSimilarData(singleData, data, threshold) {
    const similarities = calculateSimilarity(singleData, data);
    const similarData = similarities.filter(sim => sim.similarity >= threshold);
    const result = []
    similarData.forEach((el, index)=> {
      let y = data.find((j)=> el.id === j.id);
      result.push(y)
    } )

    return result.filter((el)=> el.id !== singleData.id);
  }
  
  const threshold = 0.15; 
  const similarData = getSimilarData(props.singleData, books, threshold);
  

  return (
    <div>
      <h2>Book Recommendations</h2>
      {similarData.length > 0 ? (
        similarData.map((recommendation, index) => (
          <>
            <BookCard key={index} book={recommendation} />
          </>
        ))
      ) : (
        <>
        similar book is not available
        </>
      )}
      
    </div>
  );
}

export default SimilarityAlgorithm;
