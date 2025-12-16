import { TaskType } from './TaskType';

export class DevelopmentTaskType implements TaskType {
  type = 'development';

  getFinalStatus(): number {
    return 4;
  }

  isValidStatus(status: number): boolean {
    return status >= 1 && status <= 4;
  }

  getRequiredFieldsForStatus(status: number): string[] {
    switch (status) {
      case 2:
        return ['specification'];
      case 3:
        return ['branchName'];
      case 4:
        return ['version'];
      default:
        return [];
    }
  }
}
