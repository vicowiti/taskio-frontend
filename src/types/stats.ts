export interface StatsObject {
  stats: Stats;
  summary_tasks: Summarytask[];
}

interface Summarytask {
  id: number;
  title: string;
  description: string;
  status: string;
  deadline: string;
  assignee: null | number;
  created_by: number;
  created_at: string;
  updated_at: string;
  created_by_username: string;
}

interface Stats {
  total_tasks: number;
  todo_tasks: number;
  in_progress_tasks: number;
  done_tasks: number;
}
