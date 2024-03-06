import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ValidationsService {
  public isNotEmptyStringVariable(variable: string): boolean {
    return (
      variable !== null && variable !== undefined && variable.trim() !== ""
    );
  }
}
