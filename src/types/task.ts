export enum Status {
    NEW, IN_PROGRESS, OVERDUE, COMPLETED
}

export interface Task {
    title: string;
    description: string;
    timestamp: Date;
    status: Status;
}