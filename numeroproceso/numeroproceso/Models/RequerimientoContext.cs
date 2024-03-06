using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using numeroproceso.Models;

namespace numeroproceso.Models
{
    public partial class RequerimientoContext : DbContext
    {
        public RequerimientoContext()
        {
        }

        public RequerimientoContext(DbContextOptions<RequerimientoContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Requerimiento> Requerimientos { get; set; } = null!;
        public virtual DbSet<Tablanumeroproceso> Tablanumeroprocesos { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Requerimiento>(entity =>
            {
                entity.ToTable("Requerimiento");

                entity.Property(e => e.CantidadBultos).HasColumnName("cantidad_bultos");

                entity.Property(e => e.CantidadContenedoresUnidades).HasColumnName("cantidad_contenedores_unidades");

                entity.Property(e => e.DepositoDevolucionRegistroVacio).HasColumnName("deposito_devolucion_registro_vacio");

                entity.Property(e => e.Dimensiones).HasColumnName("dimensiones");

                entity.Property(e => e.DireccionBodega).HasColumnName("direccion_bodega");

                entity.Property(e => e.TipoCarga).HasColumnName("tipo_carga");

                entity.Property(e => e.TipoContenedor).HasColumnName("tipo_contenedor");
            });

            modelBuilder.Entity<Tablanumeroproceso>(entity =>
            {
                entity.ToTable("tablanumeroproceso");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.AplicativoId)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("aplicativoId");

                entity.Property(e => e.CierreTransaccional)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("cierreTransaccional");

                entity.Property(e => e.CodigoCuadrilla)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("codigoCuadrilla");

                entity.Property(e => e.CodigoEmpacador)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("codigoEmpacador");

                entity.Property(e => e.CodigoHacienda)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("codigoHacienda");

                entity.Property(e => e.Estacion)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("estacion");

                entity.Property(e => e.Fecha)
                    .HasColumnType("date")
                    .HasColumnName("fecha");

                entity.Property(e => e.FechaActualizacion)
                    .HasColumnType("date")
                    .HasColumnName("fechaActualizacion");

                entity.Property(e => e.FechaCreacion)
                    .HasColumnType("date")
                    .HasColumnName("fechaCreacion");

                //entity.Property(e => e.HoraActualizacion).HasColumnName("horaActualizacion");

                //entity.Property(e => e.HoraCreacion).HasColumnName("horaCreacion");

                entity.Property(e => e.MenuId)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("menuId");

                entity.Property(e => e.NumeroProceso).HasColumnName("numeroProceso");

                entity.Property(e => e.UsuarioActualizacion)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("usuarioActualizacion");

                entity.Property(e => e.UsuarioCreacion)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("usuarioCreacion");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}







//using System;
//using System.Collections.Generic;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.EntityFrameworkCore.Metadata;

//namespace backEnd.Models
//{
//    public partial class RequerimientoContext : DbContext
//    {
//        public RequerimientoContext()
//        {
//        }

//        public RequerimientoContext(DbContextOptions<RequerimientoContext> options)
//            : base(options)
//        {
//        }

//        public virtual DbSet<Requerimiento> Requerimientos { get; set; } = null!;

//        optionsBuilder protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//        {

//        }

//        protected override void OnModelCreating(ModelBuilder modelBuilder)
//        {
//            modelBuilder.Entity<Requerimiento>(entity =>
//            {
//                entity.ToTable("Requerimiento");

//                entity.Property(e => e.Id).HasColumnName("id");

//                entity.Property(e => e.cantidad_bultos).HasColumnName("cantidad_bultos");

//                entity.Property(e => e.cantidad_contenedores_unidades).HasColumnName("cantidad_contenedores_unidades");

//                entity.Property(e => e.deposito_devolucion_registro_vacio)
//                    .HasMaxLength(100)
//                    .IsUnicode(false)
//                    .HasColumnName("deposito_devolucion_registro_vacio");

//                entity.Property(e => e.dimensiones)
//                    .HasMaxLength(30)
//                    .IsUnicode(false)
//                    .HasColumnName("dimensiones");

//                entity.Property(e => e.direccion_bodega)
//                    .HasMaxLength(255)
//                    .IsUnicode(false)
//                    .HasColumnName("direccion_bodega");

//                entity.Property(e => e.tipo_carga)
//                    .HasMaxLength(30)
//                    .IsUnicode(false)
//                    .HasColumnName("tipo_carga");

//                entity.Property(e => e.tipo_contenedor)
//                    .HasMaxLength(30)
//                    .IsUnicode(false)
//                    .HasColumnName("tipo_contenedor");
//            });

//            OnModelCreatingPartial(modelBuilder);
//        }

//        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
//    }
//}
