export interface ICalendarData {
  key: string;
  color: string;
  mensaje: string;
  fecha?: Date | Date[];
  evento: ICalendarData[];
}
