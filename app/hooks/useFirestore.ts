'use client';

import { useState, useCallback } from 'react';
import { firestoreFunctions } from '@/app/lib/firebase';

interface FirestoreResult<T> {
  error?: string;
  data?: T;
  id?: string;
}

export const useFirestore = (collectionName: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Add a document
  const addDocument = useCallback(
    async (data: Record<string, any>): Promise<string | null> => {
      setIsLoading(true);
      setError(null);
      const result: FirestoreResult<null> = await firestoreFunctions.addDocument(collectionName, data);
      setIsLoading(false);

      if (result.error) {
        setError(result.error);
        return null;
      }

      return result.id ?? null;
    },
    [collectionName]
  );

  // Get all documents
  const getDocuments = useCallback(
    async (queries: Array<any> = []): Promise<any[] | null> => {
      setIsLoading(true);
      setError(null);
      const result: FirestoreResult<any[]> = await firestoreFunctions.getCollection(collectionName, queries);
      setIsLoading(false);

      if (result.error) {
        setError(result.error);
        return null;
      }

      return result.data ?? null;
    },
    [collectionName]
  );

  // Get a document by ID
  const getDocument = useCallback(
    async (documentId: string): Promise<any | null> => {
      setIsLoading(true);
      setError(null);
      const result: FirestoreResult<any> = await firestoreFunctions.getDocument(collectionName, documentId);
      setIsLoading(false);

      if (result.error) {
        setError(result.error);
        return null;
      }

      return result.data ?? null;
    },
    [collectionName]
  );

  // Update a document
  const updateDocument = useCallback(
    async (documentId: string, data: Record<string, any>): Promise<boolean> => {
      setIsLoading(true);
      setError(null);
      const result: FirestoreResult<null> = await firestoreFunctions.updateDocument(collectionName, documentId, data);
      setIsLoading(false);

      if (result.error) {
        setError(result.error);
        return false;
      }

      return true;
    },
    [collectionName]
  );

  // Delete a document
  const deleteDocument = useCallback(
    async (documentId: string): Promise<boolean> => {
      setIsLoading(true);
      setError(null);
      const result: FirestoreResult<null> = await firestoreFunctions.deleteDocument(collectionName, documentId);
      setIsLoading(false);

      if (result.error) {
        setError(result.error);
        return false;
      }

      return true;
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
