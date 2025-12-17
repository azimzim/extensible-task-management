export interface Task {
  id: number;
  type: string;
  status: number;
  assignedUserId: number;
  isClosed: boolean;
  customData: Record<string, any>;
  createdAt: string;
}