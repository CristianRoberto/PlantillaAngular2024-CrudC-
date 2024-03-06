using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using numeroproceso.Models;
using Microsoft.AspNetCore.Cors;

namespace backEnd.Controllers
{
    [EnableCors("ReglasCors")]
    [Route("api/[controller]")]
    [ApiController]
    public class RequerimientoController : ControllerBase
    {
        //Declara un objecto dbcontext vamos a poder utilizar los metodos crud para nuestros modelos (Requerimiento)
        public readonly RequerimientoContext _dbcontext;
        //creo el constructo que recibe el contexto y asigno el valor _context a mi variable _dbcontext
        public RequerimientoController(RequerimientoContext _context)
        {
            _dbcontext = _context;
        }

        //METODO GET mostrar todos los datos de la tabla productos y categoria ya que estan relacionado atravez de llaves foraneas
        [HttpGet]
        [Route("Lista")]
        public IActionResult Lista()
        {
            //CREO UN OBJECTO DE liSTA<PRODUCTO> EL CUAL VA HACER UNA NUEVA LISTA DE PRODUCTOS
            List<Requerimiento> lista = new List<Requerimiento>();
            //CREO EL TRYCATCH PARA CAPTURAR ERRORES
            try
            {
                //llamo a mi lista y utilzo _dbContext_NombreModelo[Productos]
                lista = _dbcontext.Requerimientos.ToList();
                //DEVUELVE LA LISTA//se crea un json que contiene un mensaje ok y la respuesta sera lista
                // return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", response = lista });
                return Ok(lista);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status200OK, new { mensaje = ex.Message, response = lista });
            }
        }


        //METODOPOST GUARDAR requerimiento en la tabla
        [HttpPost]
        [Route("Guardar")]
        public IActionResult Guardar([FromBody] Requerimiento objeto)
        {

            //Utilizo el capturador de errores tryCatch
            try
            {
                //agrego mi objeto a dbcontext.requerimiento que es la tabla requerimiento
                //utilizo el metodo agregar y agrega mi objeto
                //estoy agregando mi objeto dentro de modelo producto
                _dbcontext.Requerimientos.Add(objeto);
                //hace un llamado a _dbcontext y utiliza el metodo guardar y guarda.
                _dbcontext.SaveChanges();
                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status200OK, new { mensaje = ex.Message });
            }
        }



        ////Metodo Editar requerimiento por id
        //[HttpPut]
        //[Route("Editar")]
        //public IActionResult Editar([FromBody] Requerimiento objeto)
        //{

        //    //validamos que el producto queremos editar corresponde a un producto existente en la base de datos
        //    Requerimiento requerimiento = _dbcontext.Requerimientos.Find(objeto.Id);
        //    if (requerimiento == null)
        //    {
        //        return BadRequest("Requerimiento no encontrado");
        //    }
        //    try
        //    {

        //        requerimiento.cantidad_bultos = objeto.cantidad_bultos is null ? requerimiento.cantidad_bultos : objeto.cantidad_bultos;
        //        requerimiento.cantidad_contenedores_unidades = objeto.cantidad_contenedores_unidades is null ? requerimiento.cantidad_contenedores_unidades : objeto.cantidad_contenedores_unidades;
        //        requerimiento.tipo_carga = objeto.tipo_carga is null ? requerimiento.tipo_carga : objeto.tipo_carga;
        //        requerimiento.tipo_contenedor = objeto.tipo_contenedor is null ? requerimiento.tipo_contenedor : objeto.tipo_contenedor;
        //        requerimiento.deposito_devolucion_registro_vacio = objeto.deposito_devolucion_registro_vacio is null ? requerimiento.deposito_devolucion_registro_vacio : objeto.deposito_devolucion_registro_vacio;
        //        requerimiento.dimensiones = objeto.dimensiones is null ? requerimiento.dimensiones : objeto.dimensiones;
        //        requerimiento.direccion_bodega = objeto.direccion_bodega is null ? requerimiento.direccion_bodega : objeto.direccion_bodega;




        //        _dbcontext.Requerimientos.Update(requerimiento);
        //        _dbcontext.SaveChanges();
        //        return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok Actualizado " });
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(StatusCodes.Status200OK, new { mensaje = ex.Message });
        //    }
        //}



        //metodo para eliminar requerimiento por id
        [HttpDelete]
        [Route("Eliminar/{Id:int}")]
        public IActionResult Eliminar(int Id)
        {

            Requerimiento requerimiento = _dbcontext.Requerimientos.Find(Id);

            if (requerimiento == null)
            {
                return BadRequest("Producto no encontrado");

            }

            try
            {

                _dbcontext.Requerimientos.Remove(requerimiento);
                _dbcontext.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok Eliminado" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status200OK, new { mensaje = ex.Message });
            }


        }

    }
}
