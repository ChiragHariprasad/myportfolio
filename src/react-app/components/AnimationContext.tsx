import { createContext, useContext } from 'react';

export const AppAnimationContext = createContext(false);

export const useAppAnimation = (): boolean => useContext(AppAnimationContext);