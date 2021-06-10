export type ItemObject = {
  value: string;
  done: boolean;
}

export type Items = ItemObject[];

export type HistoryItems = Items[];

export type RootState = Partial<{
  items: Items;
  error: string;
  login: boolean;
  history: Items[];
  isLightThemeEnabled: boolean;
}>

export enum Actions {
  AddItem = 'ADD_ITEM',
  UpdateItem = 'UPDATE_ITEM',
  MarkItem = 'MARK_ITEM',
  DeleteItem = 'DELETE_ITEM',
  AddUserActionHistory = 'ADD_HISTORY',
  UndoUserAction = 'UNDO_ITEMS',
  LoadItems = 'LOAD_ITEMS',
  DownloadItems = 'DOWNLOAD_ITEMS',
  ClearItems = 'CLEAR_ITEMS',
  ShowError = 'SHOW_ERROR',
  LoginCheck = 'LOGIN_CHECK',
  StyleChange = 'STYLE_CHANGE',
  StyleGet = 'STYLE_GET',
}