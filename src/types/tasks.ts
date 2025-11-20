export interface CreateTaskPayload {
  title: string;
  description: string;
  status: string;
  deadline: string;
  assignee?: number;
}

export interface GetTasksResponse {
  count: number | null;
  next: null | number;
  previous: null | number;
  results: ResultTask[];
}

export interface ResultTask {
  id: number;
  title: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  deadline: string;
  assignee: number;
  created_by: number;
  created_at: string;
  updated_at: string;
  created_by_username: string;
}
