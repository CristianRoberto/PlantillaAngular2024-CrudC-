export const calendarData: ICalendarData = {
  diasDeLaSemana: [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ],
  meses: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
};

export interface ICalendarData {
  diasDeLaSemana: string[];
  meses: string[];
}

export interface ColorInfo {
  codigoColor: string;
  esColorClaro: boolean;
}

export interface ISemana {
  numeroSemana: number;
  colorInfo: ColorInfo;
}

const colores: ColorInfo[] = [
  { codigoColor: "#FF0000", esColorClaro: false }, // Rojo
  { codigoColor: "#00FF00", esColorClaro: true }, // Verde
  { codigoColor: "#0000FF", esColorClaro: true }, // Azul
  { codigoColor: "#FFA500", esColorClaro: true }, // Naranja
  { codigoColor: "#800080", esColorClaro: false }, // Púrpura
  { codigoColor: "#FFFF00", esColorClaro: true }, // Amarillo
  { codigoColor: "#00FFFF", esColorClaro: true }, // Cyan
  { codigoColor: "#FF4500", esColorClaro: false }, // Naranja rojizo
  { codigoColor: "#8A2BE2", esColorClaro: true }, // Azul violeta
  { codigoColor: "#32CD32", esColorClaro: true }, // Verde lima
  { codigoColor: "#1E90FF", esColorClaro: true }, // Azul acero
  { codigoColor: "#FF69B4", esColorClaro: true }, // Rosa intenso
  { codigoColor: "#4B0082", esColorClaro: false }, // Índigo
  { codigoColor: "#8B0000", esColorClaro: false }, // Rojo oscuro
  { codigoColor: "#006400", esColorClaro: true }, // Verde oscuro
  { codigoColor: "#483D8B", esColorClaro: false }, // Azul oscuro
  { codigoColor: "#FFD700", esColorClaro: true }, // Oro
  { codigoColor: "#2F4F4F", esColorClaro: false }, // Gris pizarra oscuro
  { codigoColor: "#8B4513", esColorClaro: false }, // Marrón
  { codigoColor: "#006400", esColorClaro: true }, // Verde oscuro
  { codigoColor: "#8A2BE2", esColorClaro: true }, // Azul violeta
  { codigoColor: "#9932CC", esColorClaro: true }, // Púrpura oscuro
  { codigoColor: "#FF6347", esColorClaro: false }, // Tomate
  { codigoColor: "#228B22", esColorClaro: true }, // Verde bosque
  { codigoColor: "#8B0000", esColorClaro: false }, // Rojo oscuro
];

export const semanasColor: ISemana[] = [];

for (let i = 1; i <= 26; i++) {
  semanasColor.push({ numeroSemana: i, colorInfo: colores[i - 1] });
}
