import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import {
  auth,
  googleProvider,
  db,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  collection,
  getDocs,
  onSnapshot,
  handleFirestoreError,
  OperationType,
  testConnection,
  isUserAdmin
} from '../firebase';
import { 
  Profile, 
  Project, 
  Skill, 
  Service, 
  Message, 
  ProjectRequest, 
  SocialLink, 
  ContentItem 
} from '../types';
import {
  initialProfile,
  initialProjects,
  initialSkills,
  initialServices,
  initialSocialLinks,
  initialContentItems
} from '../initialData';

interface PortfolioContextType {
  currentUser: User | null;
  isAdmin: boolean;
  isAuthLoading: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  
  profile: Profile;
  projects: Project[];
  skills: Skill[];
  services: Service[];
  socialLinks: SocialLink[];
  contentItems: ContentItem[];
  messages: Message[];
  projectRequests: ProjectRequest[];
  
  isLoading: boolean;
  error: string | null;
  
  // Public submissions
  submitContactMessage: (msg: Omit<Message, 'id' | 'createdAt' | 'status'>) => Promise<boolean>;
  submitProjectRequest: (req: Omit<ProjectRequest, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => Promise<{ success: boolean; id?: string }>;
  
  // Admin actions
  updateProfile: (data: Partial<Profile>) => Promise<boolean>;
  saveProject: (project: Project) => Promise<boolean>;
  deleteProject: (id: string) => Promise<boolean>;
  saveSkill: (skill: Skill) => Promise<boolean>;
  deleteSkill: (id: string) => Promise<boolean>;
  saveService: (service: Service) => Promise<boolean>;
  deleteService: (id: string) => Promise<boolean>;
  saveSocialLink: (link: SocialLink) => Promise<boolean>;
  deleteSocialLink: (id: string) => Promise<boolean>;
  saveContentItem: (item: ContentItem) => Promise<boolean>;
  deleteContentItem: (id: string) => Promise<boolean>;
  updateMessageStatus: (id: string, status: Message['status']) => Promise<boolean>;
  deleteMessage: (id: string) => Promise<boolean>;
  updateProjectRequestStatus: (id: string, status: ProjectRequest['status']) => Promise<boolean>;
  deleteProjectRequest: (id: string) => Promise<boolean>;
  
  // One-click seeding
  seedAllData: () => Promise<boolean>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);

  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [services, setServices] = useState<Service[]>(initialServices);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(initialSocialLinks);
  const [contentItems, setContentItems] = useState<ContentItem[]>(initialContentItems);
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [projectRequests, setProjectRequests] = useState<ProjectRequest[]>([]);
  
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 1. Initialize and test connection
  useEffect(() => {
    testConnection();
  }, []);

  // 2. Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setIsAuthLoading(false);

      if (user) {
        const adminStatus = isUserAdmin(user.email);
        setIsAdmin(adminStatus);
      } else {
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // 3. Load Public Data from Firestore (Profile, Projects, Skills, Services, Social, Content)
  useEffect(() => {
    let unsubProfile: (() => void) | undefined;
    let unsubProjects: (() => void) | undefined;
    let unsubSkills: (() => void) | undefined;
    let unsubServices: (() => void) | undefined;
    let unsubSocial: (() => void) | undefined;
    let unsubContent: (() => void) | undefined;

    try {
      // Profile listener
      const profileRef = doc(db, 'profile', 'main');
      unsubProfile = onSnapshot(profileRef, (snapshot) => {
        if (snapshot.exists()) {
          setProfile({ id: snapshot.id, ...snapshot.data() } as Profile);
        }
      }, (err) => {
        console.warn('Profile read warning (using default profile):', err);
      });

      // Projects listener
      const projectsRef = collection(db, 'projects');
      unsubProjects = onSnapshot(projectsRef, (snapshot) => {
        if (!snapshot.empty) {
          const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
          list.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
          setProjects(list);
        }
      }, (err) => {
        console.warn('Projects read warning (using default projects):', err);
      });

      // Skills listener
      const skillsRef = collection(db, 'skills');
      unsubSkills = onSnapshot(skillsRef, (snapshot) => {
        if (!snapshot.empty) {
          const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Skill));
          list.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
          setSkills(list);
        }
      }, (err) => {
        console.warn('Skills read warning (using default skills):', err);
      });

      // Services listener
      const servicesRef = collection(db, 'services');
      unsubServices = onSnapshot(servicesRef, (snapshot) => {
        if (!snapshot.empty) {
          const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service));
          list.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
          setServices(list);
        }
      }, (err) => {
        console.warn('Services read warning (using default services):', err);
      });

      // Social Links listener
      const socialRef = collection(db, 'socialLinks');
      unsubSocial = onSnapshot(socialRef, (snapshot) => {
        if (!snapshot.empty) {
          const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as SocialLink));
          list.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
          setSocialLinks(list);
        }
      }, (err) => {
        console.warn('Social links read warning (using default social links):', err);
      });

      // Content Items listener
      const contentRef = collection(db, 'contentItems');
      unsubContent = onSnapshot(contentRef, (snapshot) => {
        if (!snapshot.empty) {
          const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ContentItem));
          list.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
          setContentItems(list);
        }
      }, (err) => {
        console.warn('Content items read warning (using default content items):', err);
      });

      setIsLoading(false);
    } catch (e) {
      console.error('Error attaching listeners:', e);
      setIsLoading(false);
    }

    return () => {
      if (unsubProfile) unsubProfile();
      if (unsubProjects) unsubProjects();
      if (unsubSkills) unsubSkills();
      if (unsubServices) unsubServices();
      if (unsubSocial) unsubSocial();
      if (unsubContent) unsubContent();
    };
  }, []);

  // 4. Admin-Only Listeners: Messages & Project Requests
  useEffect(() => {
    if (!isAdmin || !currentUser) {
      setMessages([]);
      setProjectRequests([]);
      return;
    }

    let unsubMessages: (() => void) | undefined;
    let unsubRequests: (() => void) | undefined;

    try {
      const messagesRef = collection(db, 'messages');
      unsubMessages = onSnapshot(messagesRef, (snapshot) => {
        const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message));
        list.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
        setMessages(list);
      }, (err) => {
        handleFirestoreError(err, OperationType.LIST, 'messages');
      });

      const requestsRef = collection(db, 'projectRequests');
      unsubRequests = onSnapshot(requestsRef, (snapshot) => {
        const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ProjectRequest));
        list.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
        setProjectRequests(list);
      }, (err) => {
        handleFirestoreError(err, OperationType.LIST, 'projectRequests');
      });
    } catch (err) {
      console.error('Admin listener error:', err);
    }

    return () => {
      if (unsubMessages) unsubMessages();
      if (unsubRequests) unsubRequests();
    };
  }, [isAdmin, currentUser]);

  // Auth Handlers
  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error('Sign-in failed:', err);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Sign-out failed:', err);
    }
  };

  // Public Submission Handlers
  const submitContactMessage = async (msg: Omit<Message, 'id' | 'createdAt' | 'status'>): Promise<boolean> => {
    const id = `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const fullMessage: Message = {
      ...msg,
      id,
      status: 'unread',
      createdAt: new Date().toISOString()
    };

    try {
      await setDoc(doc(db, 'messages', id), fullMessage);
      return true;
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `messages/${id}`);
      return false;
    }
  };

  const submitProjectRequest = async (
    req: Omit<ProjectRequest, 'id' | 'createdAt' | 'updatedAt' | 'status'>
  ): Promise<{ success: boolean; id?: string }> => {
    const id = `req-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const fullRequest: ProjectRequest = {
      ...req,
      id,
      status: 'new',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    try {
      await setDoc(doc(db, 'projectRequests', id), fullRequest);
      return { success: true, id };
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `projectRequests/${id}`);
      return { success: false };
    }
  };

  // Admin mutation methods
  const updateProfile = async (data: Partial<Profile>): Promise<boolean> => {
    const updated = { ...profile, ...data };
    try {
      await setDoc(doc(db, 'profile', 'main'), updated);
      setProfile(updated);
      return true;
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, 'profile/main');
      return false;
    }
  };

  const saveProject = async (project: Project): Promise<boolean> => {
    const id = project.id || `proj-${Date.now()}`;
    const payload = {
      ...project,
      id,
      updatedAt: new Date().toISOString(),
      createdAt: project.createdAt || new Date().toISOString()
    };
    try {
      await setDoc(doc(db, 'projects', id), payload);
      return true;
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `projects/${id}`);
      return false;
    }
  };

  const deleteProject = async (id: string): Promise<boolean> => {
    try {
      await deleteDoc(doc(db, 'projects', id));
      setProjects(prev => prev.filter(p => p.id !== id));
      return true;
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `projects/${id}`);
      return false;
    }
  };

  const saveSkill = async (skill: Skill): Promise<boolean> => {
    const id = skill.id || `skill-${Date.now()}`;
    const payload = { ...skill, id };
    try {
      await setDoc(doc(db, 'skills', id), payload);
      return true;
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `skills/${id}`);
      return false;
    }
  };

  const deleteSkill = async (id: string): Promise<boolean> => {
    try {
      await deleteDoc(doc(db, 'skills', id));
      setSkills(prev => prev.filter(s => s.id !== id));
      return true;
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `skills/${id}`);
      return false;
    }
  };

  const saveService = async (service: Service): Promise<boolean> => {
    const id = service.id || `service-${Date.now()}`;
    const payload = { ...service, id };
    try {
      await setDoc(doc(db, 'services', id), payload);
      return true;
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `services/${id}`);
      return false;
    }
  };

  const deleteService = async (id: string): Promise<boolean> => {
    try {
      await deleteDoc(doc(db, 'services', id));
      setServices(prev => prev.filter(s => s.id !== id));
      return true;
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `services/${id}`);
      return false;
    }
  };

  const saveSocialLink = async (link: SocialLink): Promise<boolean> => {
    const id = link.id || `social-${Date.now()}`;
    const payload = { ...link, id };
    try {
      await setDoc(doc(db, 'socialLinks', id), payload);
      return true;
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `socialLinks/${id}`);
      return false;
    }
  };

  const deleteSocialLink = async (id: string): Promise<boolean> => {
    try {
      await deleteDoc(doc(db, 'socialLinks', id));
      setSocialLinks(prev => prev.filter(s => s.id !== id));
      return true;
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `socialLinks/${id}`);
      return false;
    }
  };

  const saveContentItem = async (item: ContentItem): Promise<boolean> => {
    const id = item.id || `content-${Date.now()}`;
    const payload = { ...item, id };
    try {
      await setDoc(doc(db, 'contentItems', id), payload);
      return true;
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `contentItems/${id}`);
      return false;
    }
  };

  const deleteContentItem = async (id: string): Promise<boolean> => {
    try {
      await deleteDoc(doc(db, 'contentItems', id));
      setContentItems(prev => prev.filter(c => c.id !== id));
      return true;
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `contentItems/${id}`);
      return false;
    }
  };

  const updateMessageStatus = async (id: string, status: Message['status']): Promise<boolean> => {
    try {
      const msg = messages.find(m => m.id === id);
      if (!msg) return false;
      const updated = { ...msg, status };
      await setDoc(doc(db, 'messages', id), updated);
      return true;
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `messages/${id}`);
      return false;
    }
  };

  const deleteMessage = async (id: string): Promise<boolean> => {
    try {
      await deleteDoc(doc(db, 'messages', id));
      return true;
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `messages/${id}`);
      return false;
    }
  };

  const updateProjectRequestStatus = async (id: string, status: ProjectRequest['status']): Promise<boolean> => {
    try {
      const req = projectRequests.find(r => r.id === id);
      if (!req) return false;
      const updated = { ...req, status, updatedAt: new Date().toISOString() };
      await setDoc(doc(db, 'projectRequests', id), updated);
      return true;
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `projectRequests/${id}`);
      return false;
    }
  };

  const deleteProjectRequest = async (id: string): Promise<boolean> => {
    try {
      await deleteDoc(doc(db, 'projectRequests', id));
      return true;
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `projectRequests/${id}`);
      return false;
    }
  };

  // Seed initial data into Firestore
  const seedAllData = async (): Promise<boolean> => {
    if (!isAdmin) {
      alert('Only the authorized administrator can seed data.');
      return false;
    }

    try {
      // 1. Profile
      await setDoc(doc(db, 'profile', 'main'), initialProfile);

      // 2. Projects
      for (const p of initialProjects) {
        await setDoc(doc(db, 'projects', p.id), p);
      }

      // 3. Skills
      for (const s of initialSkills) {
        await setDoc(doc(db, 'skills', s.id), s);
      }

      // 4. Services
      for (const s of initialServices) {
        await setDoc(doc(db, 'services', s.id), s);
      }

      // 5. Social Links
      for (const sl of initialSocialLinks) {
        await setDoc(doc(db, 'socialLinks', sl.id), sl);
      }

      // 6. Content Items
      for (const c of initialContentItems) {
        await setDoc(doc(db, 'contentItems', c.id), c);
      }

      return true;
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'seed_data');
      return false;
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        currentUser,
        isAdmin,
        isAuthLoading,
        loginWithGoogle,
        logout,
        profile,
        projects,
        skills,
        services,
        socialLinks,
        contentItems,
        messages,
        projectRequests,
        isLoading,
        error,
        submitContactMessage,
        submitProjectRequest,
        updateProfile,
        saveProject,
        deleteProject,
        saveSkill,
        deleteSkill,
        saveService,
        deleteService,
        saveSocialLink,
        deleteSocialLink,
        saveContentItem,
        deleteContentItem,
        updateMessageStatus,
        deleteMessage,
        updateProjectRequestStatus,
        deleteProjectRequest,
        seedAllData
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
