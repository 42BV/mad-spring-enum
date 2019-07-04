import React, { createContext, useContext, useState } from 'react';
import { Enums } from './models';

interface Props {
  enums: Enums;
}
export const EnumsContext = createContext<Enums>({});

export function useEnums(): Enums {
  return useContext(EnumsContext);
}

export const EnumsProvider: React.FC<Props> = ({ enums, children }) => {
  const [state] = useState(enums);
  return <EnumsContext.Provider value={{ ...state }}>{children}</EnumsContext.Provider>;
};
