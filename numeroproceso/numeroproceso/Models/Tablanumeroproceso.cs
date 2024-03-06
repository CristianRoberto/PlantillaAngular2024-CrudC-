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

        //public TimeSpan? HoraCreacion { get; set; }
        //public TimeSpan? HoraActualizacion { get; set; }
        
        public string? MenuId { get; set; }
        public string? UsuarioCreacion { get; set; }
        public string? UsuarioActualizacion { get; set; }
        public string? CodigoHacienda { get; set; }
        public string? CodigoEmpacador { get; set; }
        public string? CodigoCuadrilla { get; set; }
        public DateTime? Fecha { get; set; } // Cambiado a DateTime
        public int? NumeroProceso { get; set; }
        public string? CierreTransaccional { get; set; }
    }
}
