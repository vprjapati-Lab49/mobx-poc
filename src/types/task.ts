export enum Status {
  NEW, IN_PROGRESS, OVERDUE, COMPLETED
}

export interface Task {
  id: number;
  title: string;
  description: string;
  timestamp: Date;
  status: Status;
}