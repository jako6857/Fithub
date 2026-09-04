import { createContext, useContext, useState, useCallback } from "react";

const NavOverlayContext = createContext(null);

export function NavOverlayProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <NavOverlayContext.Provider value={{ isOpen, open, close }}>
      {children}
    </NavOverlayContext.Provider>
  );
}

export function useNavOverlay() {
  const ctx = useContext(NavOverlayContext);
  if (!ctx) throw new Error("useNavOverlay must be used within NavOverlayProvider");
  return ctx;
}
