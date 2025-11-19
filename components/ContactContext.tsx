"use client";

import React, { createContext, useContext, useState } from "react";

type ContactContextType = {
  openContact: (subject?: string) => void;
  closeContact: () => void;
  openChat: () => void;
  closeChat: () => void;
  isContactOpen: boolean;
  isChatOpen: boolean;
  subject?: string;
};

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export const ContactProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isContactOpen, setContactOpen] = useState(false);
  const [isChatOpen, setChatOpen] = useState(false);
  const [subject, setSubject] = useState<string | undefined>(undefined);

  const openContact = (s?: string) => {
    setSubject(s);
    setContactOpen(true);
  };
  const closeContact = () => setContactOpen(false);
  const openChat = () => setChatOpen(true);
  const closeChat = () => setChatOpen(false);

  return (
    <ContactContext.Provider value={{ openContact, closeContact, openChat, closeChat, isContactOpen, isChatOpen, subject }}>
      {children}
    </ContactContext.Provider>
  );
};

export function useContact() {
  const ctx = useContext(ContactContext);
  if (!ctx) throw new Error("useContact must be used within ContactProvider");
  return ctx;
}

export default ContactContext;
