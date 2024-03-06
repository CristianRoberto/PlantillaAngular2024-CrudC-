using System;
using System.Collections.Generic;

namespace numeroproceso.Models
{
    public partial class Requerimiento
    {
        public int Id { get; set; }
        public int? CantidadBultos { get; set; }
        public int? CantidadContenedoresUnidades { get; set; }
        public string? TipoCarga { get; set; }
        public string? TipoContenedor { get; set; }
        public string? DepositoDevolucionRegistroVacio { get; set; }
        public string? Dimensiones { get; set; }
        public string? DireccionBodega { get; set; }
    }
}
