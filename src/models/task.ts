export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  createdAt: number;
  deadline: number;
  responsible: string;
}

export interface CreateTaskModalData {
  title: string;
  description: string;
  priority: string;
  deadline: number;
  responsible: string;
  createdAt: number;
  status: string;
}
