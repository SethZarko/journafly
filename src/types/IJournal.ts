import type { IInspiration } from './IInspiration'

export interface IJournal {
  id: string;
  title: string;
  entry: string;
  date: string | Date;
  createdAt: string;
  inspiration?: IInspiration 
}