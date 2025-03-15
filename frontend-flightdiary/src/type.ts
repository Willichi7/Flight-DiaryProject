export interface Dairy {
  id: number;
  date: string;
  visibility: string;
  weather: string
  comment: string
}

export type NewDairy = Omit< Dairy, 'id'>
