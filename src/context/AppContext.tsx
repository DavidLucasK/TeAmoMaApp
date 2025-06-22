import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Item {
  id: string;
  title: string;
  description: string;
  points: number;
  imageUrl: string;
}

interface AppContextProps {
  user: string | null;
  partnerId: string | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
  setPartnerId: React.Dispatch<React.SetStateAction<string | null>>;
  storeItems: Item[];
  setStoreItems: React.Dispatch<React.SetStateAction<Item[]>>;
  storeItemsFetched: boolean;
  setStoreItemsFetched: React.Dispatch<React.SetStateAction<boolean>>;
}

interface AppProviderProps {
  children: ReactNode;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [partnerId, setPartnerId] = useState<string | null>(null);
  const [storeItems, setStoreItems] = useState<Item[]>([]);
  const [storeItemsFetched, setStoreItemsFetched] = useState(false);

  const loadUserFromStorage = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem("userId");
      const storedpartnerId = await AsyncStorage.getItem("partnerId");

      if (storedUserId) setUser(storedUserId);
      if (storedpartnerId) setPartnerId(storedpartnerId);
    } catch (error) {
      console.error("Erro ao carregar o userId do AsyncStorage:", error);
    }
  };

  useEffect(() => {
    loadUserFromStorage();
  }, []);

  useEffect(() => {
    if (user !== null) {
      AsyncStorage.setItem("userId", user.toString()).catch((error) =>
        console.error("Erro ao salvar o userId no AsyncStorage:", error)
      );
    }
  }, [user]);

  useEffect(() => {
    if (partnerId !== null) {
      AsyncStorage.setItem("partnerId", partnerId.toString()).catch((error) =>
        console.error("Erro ao salvar o partnerId no AsyncStorage:", error)
      );
    }
  }, [partnerId]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        partnerId,
        setPartnerId,
        storeItems,
        setStoreItems,
        storeItemsFetched,
        setStoreItemsFetched,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
