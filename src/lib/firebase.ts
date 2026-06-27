import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { PersonalInfo, ExperienceItem, EducationItem, SkillItem, ProjectItem, AchievementItem } from '../types';

// Web Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgZYj5kEJqaR6qmkrykVoELIBDO3e3EWM",
  authDomain: "conductive-runner-74dh4.firebaseapp.com",
  projectId: "conductive-runner-74dh4",
  storageBucket: "conductive-runner-74dh4.firebasestorage.app",
  messagingSenderId: "219544439040",
  appId: "1:219544439040:web:9ac1db48774f1044340be5"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firestore with custom database ID
export const db = getFirestore(app, "ai-studio-a6022f70-1bcd-4c6a-b259-5ae1fd2977de");

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {}, // No Firebase Authentication active, using administrative UI lock
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export interface ResumeData {
  info: PersonalInfo;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillItem[];
  projects: ProjectItem[];
  achievements: AchievementItem[];
}

const RESUME_DOC_PATH = 'global_data';
const FULL_PATH = `resume/${RESUME_DOC_PATH}`;

// Fetch current resume data from Firestore
export async function getResumeData(): Promise<ResumeData | null> {
  try {
    const docRef = doc(db, 'resume', RESUME_DOC_PATH);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as ResumeData;
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, FULL_PATH);
  }
}

// Initialize Firestore database if it is empty
export async function initializeDatabaseIfEmpty(defaultData: ResumeData): Promise<void> {
  try {
    const docRef = doc(db, 'resume', RESUME_DOC_PATH);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      console.log('Initializing Firestore database with default resume template...');
      await setDoc(docRef, defaultData);
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, FULL_PATH);
  }
}

// Save resume data to Firestore
export async function saveResumeData(data: ResumeData): Promise<void> {
  try {
    const docRef = doc(db, 'resume', RESUME_DOC_PATH);
    await setDoc(docRef, data);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, FULL_PATH);
  }
}

// Subscribe to real-time resume data changes
export function subscribeToResumeData(onUpdate: (data: ResumeData) => void): () => void {
  const docRef = doc(db, 'resume', RESUME_DOC_PATH);
  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      onUpdate(docSnap.data() as ResumeData);
    }
  }, (error) => {
    handleFirestoreError(error, OperationType.GET, FULL_PATH);
  });
}
