import { User } from './user';

export type OrderState = {
  isLoading: boolean;
  isLoadingDetail: boolean;
  isLoadingDelete: boolean;
  isLoadingFinishCancel: boolean;
  isLoadingCreate: boolean;
  isLoadingEdit: boolean;
  isLoadingCount: boolean;
  isOpenModal: boolean;
  error: string | null;
  orders: OrderTable;
  order: Order | null;
};

export type Order = {
  id: string;
  start_date: string;
  name: string;
  type: number;
  phone: string;
  client: User;
  due_date: string;
  team: string;
  cancelled_at: string | null;
  done_at: string | null;
  status: number;
};

export type OrderCreate = {
  start_date: string;
  due_date: string;
  name: string;
  type: number;
  phone: string;
  client: number;
  team: number;
};

export type OrderEdit = {
  id: string;
  start_date: string;
  due_date: string;
  name: string;
  type: number;
  phone: string;
};

export type OrderTable = {
  meta: {
    count: number;
    limit: number;
    page: number;
    total_pages: number;
  };
  result: Order[];
  message: string;
};
