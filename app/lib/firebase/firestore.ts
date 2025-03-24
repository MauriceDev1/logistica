import {
    collection,
    addDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where,
    orderBy,
    limit,
    serverTimestamp,
    // Firestore,
    // CollectionReference,
    // DocumentReference,
    // DocumentSnapshot,
    DocumentData,
    // QuerySnapshot,
    // QueryDocumentSnapshot,
    WhereFilterOp,
    OrderByDirection,
    Query,
    QueryConstraint,
    // FieldValue
  } from "firebase/firestore";
  import { db } from "./config";

  interface AddDocumentResponse {
    id: string | null;
    error: Error | string | null;
  }

  interface GetDocumentResponse<T = DocumentData> {
    data: (T & { id: string }) | null;
    error: Error | string | null;
  }

  interface GetCollectionResponse<T = DocumentData> {
    data: (T & { id: string })[] | null;
    error: Error | string | null;
  }

  interface UpdateDeleteResponse {
    success: boolean;
    error: Error | string | null;
  }

  // Add a document
  export const addDocument = async <T extends DocumentData>(
    collectionName: string,
    data: T
  ): Promise<AddDocumentResponse> => {
    try {
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return { id: docRef.id, error: null };
    } catch (error) {
      return { id: null, error: error as Error };
    }
  };

  // Get a document by ID
  export const getDocument = async <T extends DocumentData>(
    collectionName: string,
    documentId: string
  ): Promise<GetDocumentResponse<T>> => {
    try {
      const docRef = doc(db, collectionName, documentId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { data: { id: docSnap.id, ...docSnap.data() as T }, error: null };
      } else {
        return { data: null, error: "Document does not exist" };
      }
    } catch (error) {
      return { data: null, error: error as Error };
    }
  };

  // Get all documents in a collection
  export const getCollection = async <T extends DocumentData>(
    collectionName: string,
    queries: QueryConstraint[] = []
  ): Promise<GetCollectionResponse<T>> => {
    try {
      const collectionRef = collection(db, collectionName);

      let queryRef: Query<DocumentData> = collectionRef;
      if (queries.length > 0) {
        queryRef = query(collectionRef, ...queries);
      }

      const snapshot = await getDocs(queryRef);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data() as T
      }));

      return { data, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  };

  // Update a document
  export const updateDocument = async <T extends DocumentData>(
    collectionName: string,
    documentId: string,
    data: Partial<T>
  ): Promise<UpdateDeleteResponse> => {
    try {
      const docRef = doc(db, collectionName, documentId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp()
      });
      return { success: true, error: null };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  };

  // Delete a document
  export const deleteDocument = async (
    collectionName: string,
    documentId: string
  ): Promise<UpdateDeleteResponse> => {
    try {
      const docRef = doc(db, collectionName, documentId);
      await deleteDoc(docRef);
      return { success: true, error: null };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  };

  // Helper function to create common queries
  export const createQuery = {
    where: <T>(field: string, operator: WhereFilterOp, value: T): QueryConstraint =>
      where(field, operator, value),
    orderBy: (field: string, direction: OrderByDirection = 'asc'): QueryConstraint =>
      orderBy(field, direction),
    limit: (limitCount: number): QueryConstraint =>
      limit(limitCount)
  };
