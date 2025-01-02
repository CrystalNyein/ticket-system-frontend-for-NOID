export type TEvent = {
  id: string;
  name: string;
  description: string | null;
  start_date: string;
  end_date: string;
  created_at?: Date;
  updated_at?: Date;
};
export type TEventCreateUpdateParams = Omit<TEvent, 'id' | 'created_at'>;
export type TEventTableHeader = {
  id: keyof TEventCreateUpdateParams;
  label: string;
};
export type TableHeader<T> = {
  id: keyof T;
  label: string;
};
