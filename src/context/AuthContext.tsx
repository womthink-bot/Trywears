import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface B2BMember {
  id?: string;
  name: string;
  phone: string;
  email: string;
  interests: string[];
  company?: string;
  orderVolume?: string;
  joinedAt: string;
}

export interface AuthContextType {
  user: B2BMember | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  signUp: (memberData: Omit<B2BMember, "joinedAt">) => void;
  signIn: (emailOrPhone: string) => boolean;
  logout: () => void;
  // Hidden Admin Portal
  isAdminModalOpen: boolean;
  openAdminModal: () => void;
  closeAdminModal: () => void;
}

const STORAGE_KEY = "trywears_b2b_member";
const ALL_LEADS_STORAGE_KEY = "trywears_b2b_all_leads";
const POPUP_SEEN_SESSION_KEY = "trywears_auth_popup_shown";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<B2BMember | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn("Could not load stored user:", e);
    }
    return null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);

  const isAuthenticated = Boolean(user);

  // Auto show popup modal on initial visit if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      const hasShownThisSession = sessionStorage.getItem(POPUP_SEEN_SESSION_KEY);
      if (!hasShownThisSession) {
        const timer = setTimeout(() => {
          setIsAuthModalOpen(true);
          sessionStorage.setItem(POPUP_SEEN_SESSION_KEY, "true");
        }, 1200);
        return () => clearTimeout(timer);
      }
    }
  }, [isAuthenticated]);

  // Secret admin shortcut listener (Ctrl+Shift+A or Cmd+Shift+A or #admin in URL)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "A" || e.key === "a")) {
        e.preventDefault();
        setIsAdminModalOpen(true);
      }
    };

    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === "#admin" || hash === "#leads" || hash === "#admin-portal") {
        setIsAdminModalOpen(true);
      }
    };

    // Check initial hash
    handleHashChange();

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const openAuthModal = useCallback(() => {
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  const openAdminModal = useCallback(() => {
    setIsAdminModalOpen(true);
  }, []);

  const closeAdminModal = useCallback(() => {
    setIsAdminModalOpen(false);
    // Remove #admin from URL without page jump if present
    if (window.location.hash === "#admin" || window.location.hash === "#leads") {
      history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  const signUp = useCallback((memberData: Omit<B2BMember, "joinedAt">) => {
    const newMember: B2BMember = {
      ...memberData,
      id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      joinedAt: new Date().toISOString()
    };

    // 1. Save user session locally
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newMember));
      
      // 2. Also append to client backup of all leads
      const existingLeads = JSON.parse(localStorage.getItem(ALL_LEADS_STORAGE_KEY) || "[]");
      existingLeads.unshift(newMember);
      localStorage.setItem(ALL_LEADS_STORAGE_KEY, JSON.stringify(existingLeads));
    } catch (e) {
      console.warn("Could not save member to localStorage:", e);
    }

    // 3. Persist to server backend storage (/api/leads)
    try {
      fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMember)
      }).catch((err) => {
        console.warn("Server lead recording fallback to localStorage:", err);
      });
    } catch (err) {
      console.warn("Failed to dispatch lead to /api/leads:", err);
    }

    setUser(newMember);
    setIsAuthModalOpen(false);
  }, []);

  const signIn = useCallback((emailOrPhone: string): boolean => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (
          parsed.email?.toLowerCase() === emailOrPhone.trim().toLowerCase() ||
          parsed.phone?.includes(emailOrPhone.trim())
        ) {
          setUser(parsed);
          setIsAuthModalOpen(false);
          return true;
        }
      }
    } catch (e) {
      console.warn("Could not read stored user:", e);
    }

    // Quick instant fallback sign in for returning buyer
    const quickUser: B2BMember = {
      name: emailOrPhone.split("@")[0] || "B2B Member",
      email: emailOrPhone.includes("@") ? emailOrPhone : `${emailOrPhone}@buyer.com`,
      phone: emailOrPhone.includes("@") ? "+1 (555) 019-2831" : emailOrPhone,
      interests: ["Sports Wears & Uniforms", "Streetwear & Hoodies", "Custom OEM Manufacturing"],
      joinedAt: new Date().toISOString()
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(quickUser));
    } catch (e) {
      console.warn("Could not save member to localStorage:", e);
    }
    setUser(quickUser);
    setIsAuthModalOpen(false);
    return true;
  }, []);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn("Could not remove user:", e);
    }
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        signUp,
        signIn,
        logout,
        isAdminModalOpen,
        openAdminModal,
        closeAdminModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
