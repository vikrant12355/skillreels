import { db } from '../config/firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';

const TASKS_COLLECTION = 'tasks';

/**
 * Add a new task to Firestore
 * @param {Object} taskData { title, description, status, userId }
 */
export const addTask = async (taskData) => {
  try {
    const docRef = await addDoc(collection(db, TASKS_COLLECTION), {
      ...taskData,
      createdAt: serverTimestamp(),
    });
    return { id: docRef.id, error: null };
  } catch (error) {
    console.error("Error adding task:", error);
    return { id: null, error: error.message };
  }
};

/**
 * Get all tasks for a specific user
 * @param {string} userId 
 */
export const getTasks = async (userId) => {
  try {
    const q = query(
      collection(db, TASKS_COLLECTION), 
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    const tasks = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return { tasks, error: null };
  } catch (error) {
    console.error("Error getting tasks:", error);
    return { tasks: [], error: error.message };
  }
};

/**
 * Update an existing task
 * @param {string} taskId 
 * @param {Object} data { title, description, status }
 */
export const updateTask = async (taskId, data) => {
  try {
    const taskRef = doc(db, TASKS_COLLECTION, taskId);
    await updateDoc(taskRef, data);
    return { success: true, error: null };
  } catch (error) {
    console.error("Error updating task:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Delete a task
 * @param {string} taskId 
 */
export const deleteTask = async (taskId) => {
  try {
    const taskRef = doc(db, TASKS_COLLECTION, taskId);
    await deleteDoc(taskRef);
    return { success: true, error: null };
  } catch (error) {
    console.error("Error deleting task:", error);
    return { success: false, error: error.message };
  }
};
