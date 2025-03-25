import { useState, useCallback } from 'react';
import { firestoreFunctions } from '@/app/lib/firebase';
import { QueryConstraint, where } from 'firebase/firestore';

// Utility type to create a more specific document type
type DocumentData = Record<string, unknown>;

// Query type definition to match QueryConstraint
type FirestoreQuery = {
  field: string;
  operator: '<' | '<=' | '==' | '>=' | '>' | 'array-contains' | 'array-contains-any' | 'in' | 'not-in';
  value: unknown;
};

// Convert FirestoreQuery to QueryConstraint
const convertToQueryConstraint = (query: FirestoreQuery): QueryConstraint => {
  return where(query.field, query.operator, query.value);
};

export const useFirestore = <T extends DocumentData & { id?: string }>(collectionName: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Add a document with generic type
  const addDocument = useCallback(
    async (data: Omit<T, 'id'>): Promise<string | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await firestoreFunctions.addDocument(collectionName, data);
        setIsLoading(false);

        if (result.error) {
          setError(result.error instanceof Error ? result.error.message : result.error || '');
          return null;
        }

        return result.id ?? null;
      } catch (err) {
        setIsLoading(false);
        setError(err instanceof Error ? err.message : String(err));
        return null;
      }
    },
    [collectionName]
  );

  // Get all documents with type-safe queries
  const getDocuments = useCallback(
    async (queries: FirestoreQuery[] = []): Promise<T[] | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const queryConstraints = queries.map(convertToQueryConstraint);
        const result = await firestoreFunctions.getCollection(collectionName, queryConstraints);
        setIsLoading(false);

        if (result.error) {
          setError(result.error instanceof Error ? result.error.message : result.error || '');
          return null;
        }

        return result.data as T[] ?? null;
      } catch (err) {
        setIsLoading(false);
        setError(err instanceof Error ? err.message : String(err));
        return null;
      }
    },
    [collectionName]
  );

  // Get a document by ID with generic return type
  const getDocument = useCallback(
    async (documentId: string): Promise<T | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await firestoreFunctions.getDocument(collectionName, documentId);
        setIsLoading(false);

        if (result.error) {
          setError(result.error instanceof Error ? result.error.message : result.error || '');
          return null;
        }

        return result.data as T ?? null;
      } catch (err) {
        setIsLoading(false);
        setError(err instanceof Error ? err.message : String(err));
        return null;
      }
    },
    [collectionName]
  );

  // Update a document with generic type
  const updateDocument = useCallback(
    async (documentId: string, data: Partial<T>): Promise<boolean> => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await firestoreFunctions.updateDocument(collectionName, documentId, data);
        setIsLoading(false);

        if (result.error) {
          setError(result.error instanceof Error ? result.error.message : result.error || '');
          return false;
        }

        return true;
      } catch (err) {
        setIsLoading(false);
        setError(err instanceof Error ? err.message : String(err));
        return false;
      }
    },
    [collectionName]
  );

  // Delete a document
  const deleteDocument = useCallback(
    async (documentId: string): Promise<boolean> => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await firestoreFunctions.deleteDocument(collectionName, documentId);
        setIsLoading(false);

        if (result.error) {
          setError(result.error instanceof Error ? result.error.message : result.error || '');
          return false;
        }

        return true;
      } catch (err) {
        setIsLoading(false);
        setError(err instanceof Error ? err.message : String(err));
        return false;
      }
    },
    [collectionName]
  );

  return {
    addDocument,
    getDocuments,
    getDocument,
    updateDocument,
    deleteDocument,
    isLoading,
    error,
  };
};
