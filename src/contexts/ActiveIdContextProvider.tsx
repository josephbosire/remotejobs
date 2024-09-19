import { createContext, useContext } from "react";
import { useActiveId } from "../lib/hooks";
type ActiveIdContextProviderProps = {
  children: React.ReactNode;
};

type ActiveIdContext = {
  activeId: number | null;
};

export const ActiveIdContext = createContext<ActiveIdContext | null>(null);
const ActiveIdContextProvider = ({
  children,
}: ActiveIdContextProviderProps) => {
  const [activeId] = useActiveId();
  return (
    <ActiveIdContext.Provider
      value={{
        activeId,
      }}
    >
      {children}
    </ActiveIdContext.Provider>
  );
};

export default ActiveIdContextProvider;

export const useActiveIdContext = () => {
  const context = useContext(ActiveIdContext);
  if (!context) {
    throw new Error(
      "useContext(ActiveIdContext) must be within a ActiveIdContextProvider",
    );
  }
  return context;
};
