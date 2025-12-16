import { TaskType } from './TaskType';

export class ProcurementTaskType implements TaskType {
  type = 'procurement';

  getFinalStatus(): number {
    return 3;
  }

  isValidStatus(status: number): boolean {
    return status >= 1 && status <= 3;
  }

  getRequiredFieldsForStatus(status: number): string[] {
    switch (status) {
      case 2:
        return ['priceQuotes']; // array of strings
      case 3:
        return ['receipt'];
      default:
        return [];
    }
  }
}
