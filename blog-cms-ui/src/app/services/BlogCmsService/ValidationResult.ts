import {ValidationFailure} from "./ValidationFailure";
import {Injectable} from "@angular/core";

export class ValidationResult {
  IsValid: Boolean;
  ValidationFailures: ValidationFailure[];
}
