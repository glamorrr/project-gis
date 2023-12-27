export type TeamState = {
  isLoading: boolean;
  isLoadingDetail: boolean;
  isLoadingDelete: boolean;
  isLoadingCancel: boolean;
  isLoadingCreateEdit: boolean;
  isLoadingCount: boolean;
  error: string | null;
  teamAutoComplete: { id: number; label: string }[];
  teams: TeamTable;
  team: Team | null;
};

export type Team = {
  id: string;
  name: string;
  description: string;
  color_code: string;
};

export type TeamCreateType = {
  name: string;
  description: string;
  color_code: string;
};

export type TeamEditType = Team;

export type TeamTable = {
  meta: {
    count: number;
    limit: number;
    page: number;
    total_pages: number;
  };
  result: Team[];
  message: string;
};
