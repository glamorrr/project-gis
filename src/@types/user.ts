export type UserState = {
  isLoading: boolean;
  isLoadingDetail: boolean;
  isLoadingActivation: boolean;
  isLoadingCreateEdit: boolean;
  isOpenModal: boolean;
  error: string | null;
  users: UserTable;
  userAutoComplete: { label: string; id: number }[];
  user: User;
  status: string;
};

export type User = {
  id: string;
  name: string;
  role: number;
  email: string;
  phone: string;
  category?: number;
  title?: number;
  password?: string;
  is_active?: boolean;
};

export type UserEditType = {
  id: string;
  title: number;
  name: string;
  phone: string;
  password?: string;
  category?: number;
};

export type UserCreateType = {
  role: number;
  title: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  category?: number;
};

export type UserTable = {
  meta: {
    count: number;
    limit: number;
    page: number;
    total_pages: number;
  };
  result: User[];
  message: string;
};
