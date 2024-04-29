export type TContact = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  photo: string;
  isFavorite?: boolean;
};

export type TContactPayload = {
  firstName: string;
  lastName: string;
  age: number;
  photo: string;
};

export type TFavorite = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  photo: string;
  isFavorite: boolean;
};

export type TContactSectionData = {
  letter: string;
  items: TContact[];
};
