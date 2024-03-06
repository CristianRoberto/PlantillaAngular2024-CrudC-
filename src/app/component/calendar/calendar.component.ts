import { Component, OnInit } from "@angular/core";
import { calendarData, semanasColor } from "./calendar.data";

import { getISOWeek, subWeeks, addWeeks } from "date-fns";

@Component({
  selector: "calendar-component",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"],
})
export class CalendarComponent implements OnInit {
  public comboMeses: string[] = calendarData.meses;
  public mesSelected: number = 0;
  public yearSelected: number = 0;
  public weekSelected: number = 0;
  public diasDeLaSemana: string[] = calendarData.diasDeLaSemana;
  public diasDelMes: number[][] = [];
  public semanasDelMes: number[] = [];

  public ngOnInit(): void {
    this.goToCurrentMonth();
    this.generateCalendar();
  }
  public goToCurrentMonth() {
    const actualDate = new Date();
    this.mesSelected = actualDate.getMonth();
    this.yearSelected = actualDate.getFullYear();
    this.generateCalendar();
  }
  private generateCalendar() {
    const firstDayOfMonth = new Date(this.yearSelected, this.mesSelected, 1);
    const lastDayOfMonth = new Date(this.yearSelected, this.mesSelected + 1, 0);
    const numDaysInMonth = lastDayOfMonth.getDate();
    let startingDayOfWeek = firstDayOfMonth.getDay();

    startingDayOfWeek = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;

    let currentDay = 1;
    for (let row = 0; row < 6; row++) {
      this.diasDelMes[row] = [];
      for (let col = 0; col < 7; col++) {
        if (row === 0 && col < startingDayOfWeek) {
          this.diasDelMes[row][col] = null;
        } else if (currentDay > numDaysInMonth) {
          break;
        } else {
          this.diasDelMes[row][col] = currentDay;
          currentDay++;
        }
      }
    }
  }

  public goToNextMonth(): void {
    this.mesSelected = (this.mesSelected + 1) % 12;
    this.yearSelected =
      this.mesSelected === 0 ? this.yearSelected + 1 : this.yearSelected;
    this.generateCalendar();
  }

  public goToPreviousMonth(): void {
    this.mesSelected = (this.mesSelected - 1 + 12) % 12;
    this.yearSelected =
      this.mesSelected === 11 ? this.yearSelected - 1 : this.yearSelected;
    this.generateCalendar();
  }
  public onClickDay(dia: number): void {
    const fechaSeleccionada = new Date(
      this.yearSelected,
      this.mesSelected,
      dia
    );
    console.log("Fecha seleccionada:", fechaSeleccionada.toLocaleDateString());
  }

  public isPA(day: number, month: number, year: number): boolean {
    const date = new Date(year, month, day);
    return date.getDay() === 1;
  }

  public isFU(day: number, month: number, year: number): boolean {
    const date = new Date(year, month, day);
    return date.getDay() === 0;
  }
  public validateFUPA(
    day: number,
    month: number,
    year: number,
    row: number
  ): string {
    const date = new Date(year, month, day);
    if (row === 3) {
      if (date.getDay() === 0) {
        return "FU";
      } else if (date.getDay()) {
        return "PA";
      } else {
        return "";
      }
    } else {
      return "";
    }
  }

  public isWeekLabel(day: number, month: number, year: number): boolean {
    const date = new Date(year, month, day);

    if (day == null) {
      return false;
    }

    return date.getDay() === 3;
  }

  public isPeriodo(day: number, month: number, year: number): boolean {
    return this.isFU(day, month, year);
  }

  public getWeekOfYear(day: number, month: number, year: number): number {
    const date = new Date(year, month, day);
    return getISOWeek(date);
  }

  public getWeekColor(day: number, month: number, year: number): string {
    if (day == null) {
      return "";
    }

    const date = new Date(year, month, day);
    const weekNumber = getISOWeek(date);
    const week = semanasColor.find((s) => s.numeroSemana == weekNumber);
    return week.colorInfo.codigoColor;
  }

  public getPrevWeekColor(day: number, month: number, year: number): string {
    if (day == null) {
      return "";
    }
    const prevWeek = subWeeks(new Date(year, month, day), 1);
    const prevWeekNumber = getISOWeek(prevWeek);
    const preWeek = semanasColor.find((s) => s.numeroSemana == prevWeekNumber);
    return preWeek.colorInfo.codigoColor;
  }

  public getNextWeekColor(day: number, month: number, year: number): string {
    if (day == null) {
      return "";
    }
    const nextWeek = addWeeks(new Date(year, month, day), 1);
    const nextWeekNumber = getISOWeek(nextWeek);
    const nexWeek = semanasColor.find((s) => s.numeroSemana == nextWeekNumber);
    return nexWeek.colorInfo.codigoColor;
  }

  isBackgroundLight(day: number, month: number, year: number): boolean {
    const date = new Date(year, month, day);
    const weekNumber = getISOWeek(date);
    const week = semanasColor.find((s) => s.numeroSemana == weekNumber);

    return week.colorInfo.esColorClaro;
  }
}
