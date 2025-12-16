export interface TaskType {
  type: string;

  getFinalStatus(): number;

  getRequiredFieldsForStatus(status: number): string[];

  isValidStatus(status: number): boolean;
}
