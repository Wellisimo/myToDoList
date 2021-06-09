import { TypedUseSelectorHook, useSelector } from 'react-redux'
import type { RootState } from '../../Helpers/Types';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;