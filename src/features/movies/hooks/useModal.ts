import { useState, useCallback } from 'react';

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [posterUrl, setPosterUrl] = useState('');
  const [title, setTitle] = useState('');

  const openModal = useCallback((posterUrl: string, title: string) => {
    setPosterUrl(posterUrl);
    setTitle(title);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { isOpen, posterUrl, title, openModal, closeModal };
};
