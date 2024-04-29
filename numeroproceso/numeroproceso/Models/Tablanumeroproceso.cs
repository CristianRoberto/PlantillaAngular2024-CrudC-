using System;
using System.Collections.Generic;

namespace numeroproceso.Models
{
    public partial class Tablanumeroproceso
    {
        public int Id { get; set; }
        public string? AplicativoId { get; set; }
        public string? Estacion { get; set; }
        public DateTime? FechaActualizacion { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public string? MenuId { get; set; }
        public string? UsuarioCreacion { get; set; }
        public string? UsuarioActualizacion { get; set; }
        public string? NombreHacienda { get; set; }
        public string? CodigoHacienda { get; set; }
        public string? NombreEmpacador { get; set; }
        public string? CodigoEmpacador { get; set; }
        public string? NombreCuadrilla { get; set; }
        public string? CodigoCuadrilla { get; set; }
        public DateTime? Fecha { get; set; }
        public int? NumeroProceso { get; set; }
        public string? CierreTransaccional { get; set; }
    }
}
