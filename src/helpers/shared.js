// get user from userId

import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

export const getUser = async (userId) => {
  const q = query(collection(db, 'users'), where('uid', '==', userId));
  try {
    const querySnapshot = await getDocs(q);
    let user;
    querySnapshot.forEach((doc) => {
      user = doc.data();
    });
    return user;
  } catch (error) {
    return null;
  }
};
