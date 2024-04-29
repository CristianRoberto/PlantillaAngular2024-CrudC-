using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

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
                    .HasMaxLength(4)
                    .IsUnicode(false)
                    .HasColumnName("codigoCuadrilla");

                entity.Property(e => e.CodigoEmpacador)
                    .HasMaxLength(4)
                    .IsUnicode(false)
                    .HasColumnName("codigoEmpacador");

                entity.Property(e => e.CodigoHacienda)
                    .HasMaxLength(4)
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
                    .HasColumnType("datetime")
                    .HasColumnName("fechaActualizacion");

                entity.Property(e => e.FechaCreacion)
                    .HasColumnType("datetime")
                    .HasColumnName("fechaCreacion");

                entity.Property(e => e.MenuId)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("menuId");

                entity.Property(e => e.NombreCuadrilla)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("nombreCuadrilla");

                entity.Property(e => e.NombreEmpacador)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("nombreEmpacador");

                entity.Property(e => e.NombreHacienda)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("nombreHacienda");

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
