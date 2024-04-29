using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using numeroproceso.Models;
using Microsoft.AspNetCore.Cors;

namespace numeroproceso.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TablanumeroprocesoController : ControllerBase
    {
        //Declara un objecto dbcontext vamos a poder utilizar los metodos crud para nuestros modelos (Requerimiento)
        public readonly RequerimientoContext _dbcontext;
        //creo el constructo que recibe el contexto y asigno el valor _context a mi variable _dbcontext
        public TablanumeroprocesoController(RequerimientoContext _context)
        {
            _dbcontext = _context;
        }

        //METODO GET mostrar todos los datos de la tabla productos y categoria ya que estan relacionado atravez de llaves foraneas
        [HttpGet]
        [Route("Lista")]
        public IActionResult Lista()
        {
            //CREO UN OBJECTO DE liSTA<PRODUCTO> EL CUAL VA HACER UNA NUEVA LISTA DE PRODUCTOS
            List<Tablanumeroproceso> lista = new List<Tablanumeroproceso>();
            //CREO EL TRYCATCH PARA CAPTURAR ERRORES
            try
            {
                //llamo a mi lista y utilzo _dbContext_NombreModelo[Productos]
                lista = _dbcontext.Tablanumeroprocesos.ToList();
                //DEVUELVE LA LISTA//se crea un json que contiene un mensaje ok y la respuesta sera lista
                // return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", response = lista });
                return Ok(lista);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status200OK, new { mensaje = ex.Message, response = lista });
            }
        }


        // GET: api/Tablanumeroproceso/BuscarPorCodigoYFecha
        [HttpGet("BuscarPorCodigoYFecha")]
        public async Task<IActionResult> BuscarPorCodigoYFecha(string codigoHacienda, DateTime fecha)
        {
            try
            {
                var lista = await _dbcontext.Tablanumeroprocesos
                    .Where(tnp => tnp.CodigoHacienda == codigoHacienda && tnp.Fecha == fecha)
                    .ToListAsync();

                return Ok(lista);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = ex.Message });
            }
        }


        // DELETE: api/Tablanumeroproceso/EliminarPorParametros
        [HttpDelete("EliminarPorParametros")]
        public async Task<IActionResult> EliminarPorParametros(string hacienda, string empacador, DateTime fecha, string cuadrilla)
        {
            try
            {
                var filasAEliminar = await _dbcontext.Tablanumeroprocesos
                    .Where(tnp => tnp.CodigoHacienda == hacienda && tnp.CodigoEmpacador == empacador && tnp.Fecha == fecha && tnp.CodigoCuadrilla == cuadrilla)
                    .ToListAsync();

                if (filasAEliminar.Count == 0)
                {
                    return NotFound(); // No se encontraron filas para eliminar con los parámetros proporcionados
                }

                _dbcontext.Tablanumeroprocesos.RemoveRange(filasAEliminar);
                await _dbcontext.SaveChangesAsync();

                return Ok(new { mensaje = "Datos eliminados correctamente" }); // Éxito al eliminar las filas
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = ex.Message });
            }
        }



        [HttpDelete("EliminarPorHacienda")]
        public async Task<IActionResult> EliminarPorHacienda(int id)
        {
            try
            {
                var filasAEliminar = await _dbcontext.Tablanumeroprocesos
                    .Where(tnp => tnp.Id == id)
                    .ToListAsync();

                if (filasAEliminar.Count == 0)
                {
                    return NotFound(); // No se encontraron filas para eliminar con los parámetros proporcionados
                }

                _dbcontext.Tablanumeroprocesos.RemoveRange(filasAEliminar);
                await _dbcontext.SaveChangesAsync();

                return Ok(new { mensaje = "Datos eliminados correctamente" }); // Éxito al eliminar las filas
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = ex.Message });
            }
        }



        //METODOPOST GUARDAR en la tabla
        [HttpPost]
        [Route("Guardar")]
        public IActionResult Guardar([FromBody] Tablanumeroproceso objeto)
        {

            //Utilizo el capturador de errores tryCatch
            try
            {
                //agrego mi objeto a dbcontext. que es la tabla Tablanumeroproceso
                //utilizo el metodo agregar y agrega mi objeto
                //estoy agregando mi objeto dentro de modelo producto
                _dbcontext.Tablanumeroprocesos.Add(objeto);
                //hace un llamado a _dbcontext y utiliza el metodo guardar y guarda.
                _dbcontext.SaveChanges();
                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status200OK, new { mensaje = ex.Message });
            }
        }


        //Metodo Editar Tablanumeroproceso por id
        [HttpPut]
        [Route("Editar")]
        public IActionResult Editar([FromBody] Tablanumeroproceso objeto)
        {
            // Validamos que el objeto a editar corresponda a un registro existente en la base de datos
            Tablanumeroproceso Tablanumeroproceso = _dbcontext.Tablanumeroprocesos.Find(objeto.Id);
            if (Tablanumeroproceso == null)
            {
                return BadRequest("Tablanumeroproceso no encontrado");
            }

            try
            {
                // Actualizamos los campos con los valores proporcionados en el objeto
                Tablanumeroproceso.AplicativoId = objeto.AplicativoId ?? Tablanumeroproceso.AplicativoId;
                Tablanumeroproceso.Estacion = objeto.Estacion ?? Tablanumeroproceso.Estacion;
                Tablanumeroproceso.FechaActualizacion = objeto.FechaActualizacion ?? Tablanumeroproceso.FechaActualizacion;
                Tablanumeroproceso.FechaCreacion = objeto.FechaCreacion ?? Tablanumeroproceso.FechaCreacion;
                // Tablanumeroproceso.HoraCreacion = objeto.HoraCreacion ?? Tablanumeroproceso.HoraCreacion; // Descomenta esta línea si deseas manejar la hora de creación
                // Tablanumeroproceso.HoraActualizacion = objeto.HoraActualizacion ?? Tablanumeroproceso.HoraActualizacion; // Descomenta esta línea si deseas manejar la hora de actualización
                Tablanumeroproceso.MenuId = objeto.MenuId ?? Tablanumeroproceso.MenuId;
                Tablanumeroproceso.UsuarioCreacion = objeto.UsuarioCreacion ?? Tablanumeroproceso.UsuarioCreacion;
                Tablanumeroproceso.UsuarioActualizacion = objeto.UsuarioActualizacion ?? Tablanumeroproceso.UsuarioActualizacion;
                Tablanumeroproceso.CodigoHacienda = objeto.CodigoHacienda ?? Tablanumeroproceso.CodigoHacienda;
                Tablanumeroproceso.CodigoEmpacador = objeto.CodigoEmpacador ?? Tablanumeroproceso.CodigoEmpacador;
                Tablanumeroproceso.CodigoCuadrilla = objeto.CodigoCuadrilla ?? Tablanumeroproceso.CodigoCuadrilla;
                Tablanumeroproceso.Fecha = objeto.Fecha ?? Tablanumeroproceso.Fecha;
                Tablanumeroproceso.NumeroProceso = objeto.NumeroProceso ?? Tablanumeroproceso.NumeroProceso;
                Tablanumeroproceso.CierreTransaccional = objeto.CierreTransaccional ?? Tablanumeroproceso.CierreTransaccional;

                _dbcontext.Tablanumeroprocesos.Update(Tablanumeroproceso);
                _dbcontext.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, new { mensaje = "Registro actualizado correctamente" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = ex.Message });
            }
        }


    }
}
