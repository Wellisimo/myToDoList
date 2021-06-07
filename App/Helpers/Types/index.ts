export type ItemObject = {
  value: string;
  done: boolean;
}

export type Items = ItemObject[];

export type RootState = Partial<{
  items: Items;
  error: string;
  login: boolean;
  history: Items[];
  isLightThemeEnabled: boolean;
}>