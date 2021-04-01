export class ApiResponse<T> {
  ValidationResult: any;
  Exception: any
  Information: string[];
  Payload: T;
}
