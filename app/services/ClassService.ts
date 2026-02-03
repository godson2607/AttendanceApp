import { collection, addDoc, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export type ClassData = {
    id?: string;
    name: string;
    schedule: string;
    teacherId: string;
    createdAt: Timestamp;
};

export const ClassService = {
    // Add a new class
    addClass: async (name: string, schedule: string, teacherId: string) => {
        try {
            const docRef = await addDoc(collection(db, 'classes'), {
                name,
                schedule,
                teacherId,
                createdAt: Timestamp.now(),
            });
            return docRef.id;
        } catch (error) {
            console.error('Error adding class: ', error);
            throw error;
        }
    },

    // Get classes for a specific teacher
    getClasses: async (teacherId: string) => {
        try {
            const q = query(collection(db, 'classes'), where('teacherId', '==', teacherId));
            const querySnapshot = await getDocs(q);
            const classes: ClassData[] = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data() as Omit<ClassData, 'id'>;
                classes.push({ id: doc.id, ...data });
            });
            return classes;
        } catch (error) {
            console.error('Error getting classes: ', error);
            throw error;
        }
    }
};
