import {
  AfterViewInit,
  Component,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { IDropdownOptions } from "src/app/component/dropdown/dropdown.interface";
import {
  IFormItems,
  ISearchButtonForm,
} from "src/app/component/form/form.interface";
import { IInputsComponent } from "src/app/component/input/input.interface";
import { TableComponentData } from "src/app/component/table/table.data";
import {
  IColumnsTable,
  IRowTableAttributes,
  idActionType,
  sortColOrderType,
} from "src/app/component/table/table.interface";
import { TableService } from "src/app/component/table/table.service";
import { UtilService } from "src/app/services/util/util.service";
import { PlantillaAData } from "./plantillaA.data";
import { FormService } from "src/app/component/form/form.service";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
import { FormatoUtilReporte } from "src/app/services/util/util.interface";
import { Router } from "@angular/router";

@Component({
  selector: "plantilla-a-component",
  templateUrl: "./plantillaA.component.html",
})
export class PlantillaAComponent implements AfterViewInit, OnInit, OnChanges {
  @Input({ required: false }) public colIdToDisable: string = "";
  @Input({ required: false }) public keyNameTable: string = "";
  @Input({ required: true }) public columnsTable: IColumnsTable = [];
  @Input({ required: true }) public originalDataTable: any[] = [];
  @Input() public placeholderHeaderInputText: string = "";
  @Input({ required: true }) public contexto: any;
  @Input() public onSaveRowData: string = "validateToSave";
  @Input() public tableWidth: string = "100%";
  @Input() public tableInputsEditRow: IInputsComponent;
  @Input({ required: false }) public defaultEmptyRowTable: any;
  @Input() public filterFormInputs: IFormItems = [];
  @Input() public filterFormSearchButtonProps: ISearchButtonForm = null;
  @Input() public onChangeHeaderFilterForm: string;
  @Input() public colsToFilterByText: string[] = [];
  @Input() public onActionTableFunction: string = "clickOnActionTable";
  @Input() public onDeleteFunction: string = "onDelete";
  @Input({ required: false }) public IdRowToClone: string = null;
  @Input({ required: false }) public onCreateFunction: string = null;
  @Input({ required: false }) public showCreateButton: boolean = true;
  @Input({ required: false }) public allowCloneButtonOnTable: boolean = true;
  @Input() public titleReport: string = "";

  public dropdownButtonClasses: string[] = ["btn-outline-info"];
  public filterFormContainsSearchButton: boolean = false;
  public textButtonDropdowm: string = "Exportar";
  public mainTableName: string = "mainTable";
  public pageNumberTable: number = 1;
  public rowsPerPageTable: number = TableComponentData.defaultRowPerPage;
  public dataToTable: any[] = [];
  public totalRowsInTable: number = 0;
  public dropdownOptionsExport: IDropdownOptions =
    PlantillaAData.dropdownOptionsExport;

  private textToFilter: string = "";
  private colIndexSorted: number;

  constructor(
    private tableService: TableService,
    private utilService: UtilService,
    private formService: FormService,

    private router: Router


  ) {}

  public ngAfterViewInit(): void {
    this.utilService.focusOnHtmlElement("searchInputFilter");
  }
  public ngOnInit(): void {
    this.setInitialColToTable();
    this.tableService.initializeAll();
    this.validatefilterFormContainsSearchButton();
  }
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes["originalDataTable"]) {
      this.originalDataTable = this.formatDataWithKeyNameTable(
        changes["originalDataTable"].currentValue
      );
    }
    if (typeof changes["IdRowToClone"]?.currentValue === "string") {
      this.cloneOnTable(this.IdRowToClone);
    }
    this.filterSortFormatAndPaginateData();
  }
  
  /**
   * Función para añadir la columna de checkbox
   */
  private setInitialColToTable() {
    const tableCleaned = this.columnsTable.filter(
      (row) => row.type !== "checkbox"
    );
    this.columnsTable = tableCleaned;
    this.columnsTable.unshift(PlantillaAData.initialColumns);
  }
  /**
   * Función para validar si mi formulario mostrara el boton de buscar o no
   */
  private validatefilterFormContainsSearchButton() {
    this.filterFormContainsSearchButton =
      this.filterFormSearchButtonProps !== null &&
      this.filterFormSearchButtonProps !== undefined;
  }
  /**
   * Función para escuchar cada que presiono una tecla
   *
   * @param event
   */
  @HostListener("document:keydown", ["$event"])
  public handleKeyboardEvent(event: KeyboardEvent) {
    /* Nuevo */
    if (
      event.key.toString().toLowerCase() === "n" &&
      event.altKey &&
      !this.tableService.isAnyEditRowActive
    ) {
      this.onCreateRow();
    } /* Guardo el registro */ else if (
      event.key.toString().toLowerCase() === "a" &&
      event.altKey &&
      this.tableService.isAnyEditRowActive
    ) {
      this.tableService.changeStateIsAnyEditRowActive(false);
      document.getElementById("iconSaveEditRowTable").click();
    }
  }
  /**
   * Función para cuando se da click en una opción
   *
   * @param id
   */
  private isAnyRowCheckedInTable(formato: FormatoUtilReporte) {
    const rowsCheckedInTable: [] =
      this.tableService.rowsCheckedByTable[this.mainTableName];
    if (rowsCheckedInTable.length > 0) {
      const { headerTitles, dataIndexTitles } = this.columnsTable.reduce(
        (acc, col) => {
          if (col.title && col.title !== "Acciones") {
            acc.headerTitles.push(col.title);
            acc.dataIndexTitles.push(col.dataIndex);
          }
          return acc;
        },
        { headerTitles: [], dataIndexTitles: [] }
      );
      const bodyReport = this.originalDataTable
        .filter((row) =>
          rowsCheckedInTable.some((keyCheked) => keyCheked === row.key)
        )
        .map((row) =>
          dataIndexTitles.map(
            (colDataIndex) => row[colDataIndex]?.toString() ?? ""
          )
        );
      this.utilService.generateReport(
        formato,
        this.titleReport,
        headerTitles,
        bodyReport
      );
    } else {
      this.utilService.modalResponse(
        "Debe seleccionar mínimo un registro",
        "warning"
      );
    }
  }
  private filterStringInTable(textToFilter: string) {
    this.filterSortFormatAndPaginateData(textToFilter);
  }
  /**
   * Función para Filtrar Ordenar Formatear y paginar la data de la tabla
   *
   * @param textToFilter texto a filtrar
   */
  private filterSortFormatAndPaginateData(
    textToFilter: string = this.textToFilter,
    clickOnSort: boolean = false
  ) {
    this.tableService.changeStateIsAnyEditRowActive(false);
    this.textToFilter = textToFilter;
    let data = [...this.originalDataTable].map((x: IRowTableAttributes) => {
      delete x.isEditingRow;
      return x;
    });
    /* Filtro */
    if (textToFilter.length > 0) {
      data = this.tableService.filterDataByProps(
        data,
        this.colsToFilterByText,
        textToFilter
      );
    }
    /* Ordeno */
    const rowIndexToSort = this.colIndexSorted;
    if (rowIndexToSort !== undefined) {
      const colProps = this.columnsTable[rowIndexToSort];
      const sortTypeOrder = colProps.sortTypeOrder;
      const sortColType = colProps.colType ?? "string";
      let sortTypeChanged: sortColOrderType;
      switch (sortTypeOrder) {
        case "asc":
          sortTypeChanged = clickOnSort ? "desc" : sortTypeOrder;
          break;
        case "desc":
          sortTypeChanged = clickOnSort ? undefined : sortTypeOrder;
          break;
        case undefined:
          sortTypeChanged = clickOnSort ? "asc" : sortTypeOrder;
          break;

        default:
          break;
      }
      this.columnsTable[rowIndexToSort].sortTypeOrder = sortTypeChanged;
      if (sortTypeChanged !== undefined) {
        data = this.tableService.filterBySortColType(
          data,
          colProps.dataIndex,
          sortTypeChanged,
          sortColType
        );
      }
    }
    /* Formateo */
    const dataFormatted = this.formatDataWithKeyNameTable(data);
    /* Pagino */
    const dataPaginated = this.tableService.paginateDataToTable(
      dataFormatted,
      this.pageNumberTable,
      this.rowsPerPageTable
    );
    this.totalRowsInTable = data.length;
    this.dataToTable = dataPaginated;
  }
  /**
   * Función para dar formato de tabla a los registro para su manipulación
   *
   * @param data registros a darle formato
   * @returns
   */
  private formatDataWithKeyNameTable(data: any[]): any[] {
    return this.tableService.formatDataToTable(data, this.keyNameTable);
  }
  /**
   * Función para actualizar los valores de la paginacion y actualizar la tabla
   *
   * @param page numero de página
   * @param perPage registros por página
   */
  private onChangePaginationTable(page: number, perPage: number) {
    this.pageNumberTable = page;
    this.rowsPerPageTable = perPage;
    this.filterSortFormatAndPaginateData();
    this.tableService.changeStateIsAnyEditRowActive(false);
  }
  public onCreateRow() {
    if (this.onCreateFunction === null) {
      if (!this.tableService.isAnyEditRowActive) {
        this.tableService.changeStateIsAnyEditRowActive(true);
        const tempDataTable = [...this.dataToTable];
        tempDataTable.unshift(this.defaultEmptyRowTable);
        if (tempDataTable.length > this.rowsPerPageTable) {
          tempDataTable.pop();
        }
        this.dataToTable = tempDataTable;
        this.utilService.focusOnHtmlElement(this.columnsTable[1].dataIndex);
        this.disableIdCol(false);
  
        // Redirigir a la nueva ruta
        this.router.navigate(['/parametros/ubicacion/hacienda/numero_procesos/crear-numero_procesos']);
      }
    } else {
      this.contexto[this.onCreateFunction]();
    }
  }
  
  private disableIdCol(state: boolean) {
    this.tableInputsEditRow = this.formService.changeValuePropFormById(
      this.colIdToDisable,
      this.tableInputsEditRow,
      "disabled",
      state
    );
  }
  private onSaveRowTable(rowData: any, finishedClonningRow: boolean) {
    this.IdRowToClone = null;
    this.contexto[this.onSaveRowData](rowData, finishedClonningRow);
  }
  private onCancelEditRowTable() {
    this.filterSortFormatAndPaginateData();
  }
  
  private async clickOnActionTable(
    idAction: idActionType,
    key: string,
    tooltip: string
  ): Promise<void> {
    switch (idAction) {
      case "editOnTable":
        if (!this.tableService.isAnyEditRowActive) {
          this.tableService.changeStateIsAnyEditRowActive(true);
          const rowToEdit: IRowTableAttributes = this.originalDataTable.find(
            (x: IRowTableAttributes) => x.key === key
          );
          rowToEdit.isEditingRow = true;
          const newDataWithOutRowToEdit = this.dataToTable.filter(
            (x: IRowTableAttributes) => x.key !== key
          );
          newDataWithOutRowToEdit.unshift(rowToEdit);
          this.dataToTable = newDataWithOutRowToEdit;
          this.utilService.focusOnHtmlElement(this.columnsTable[2].dataIndex);
          this.disableIdCol(true);
        }
        break;
      case "cloneOnTable":
        this.cloneOnTable(key);
        break;
      case "delete":
        if (
          !environment.modalConfirmation ||
          (await Swal.fire(PlantillaAData.swalDeleteOptions)).isConfirmed
        ) {
          this.contexto[this.onDeleteFunction](key);
        }
        break;

      default:
        this.contexto[this.onActionTableFunction](key, idAction, tooltip);
        break;
    }
  }


  // private async clickOnActionTable(
  //   idAction: idActionType,
  //   key: string,
  //   tooltip: string
  // ) {
  //   switch (idAction) {
  //     case "editOnTable":
  //       // Tu código existente para editar la fila
  //       break;
  //     case "cloneOnTable":
  //       // Tu código existente para clonar la fila
  //       break;
  //     case "delete":
  //       if (
  //         !environment.modalConfirmation ||
  //         (await Swal.fire(PlantillaAData.swalDeleteOptions)).isConfirmed
  //       ) {
  //         const rowToDelete = this.originalDataTable.find((row) => row.key === key);
  //         if (rowToDelete) {
  //           this.onDelete(
  //             rowToDelete.codigoHacienda,
  //             rowToDelete.codigoEmpacador,
  //             rowToDelete.fecha,
  //             rowToDelete.codigoCuadrilla
  //           );
  //         }
  //       }
  //       break;
  //         default:
  //             this.contexto[this.onActionTableFunction](key, idAction, tooltip);
  //         break;
  //   }
  // }

  
  // En tu componente PlantillaAComponent
onDelete(
  hacienda: any,
  empacador: any,
  fecha: any,
  cuadrilla: any
): void {
  // Implementa tu lógica para eliminar aquí
  console.log(`Eliminar fila con los siguientes datos:
    Hacienda: ${hacienda},
    Empacador: ${empacador},
    Fecha: ${fecha},
    Cuadrilla: ${cuadrilla}`);
}








  private cloneOnTable(key: string) {
    if (!this.tableService.isAnyEditRowActive) {
      this.tableService.changeStateIsAnyEditRowActive(true);
      const rowToEdit: IRowTableAttributes = this.originalDataTable.find(
        (x: IRowTableAttributes) => x.key === key
      );
      const tempDataTable = [...this.dataToTable];
      tempDataTable.unshift({
        ...rowToEdit,
        key: undefined,
        isEditingRow: true,
      });
      if (tempDataTable.length > this.rowsPerPageTable) {
        tempDataTable.pop();
      }
      this.dataToTable = tempDataTable;
      this.utilService.focusOnHtmlElement(this.columnsTable[1].dataIndex);
      this.disableIdCol(false);
    }
  }
  private onSortColTable(i: number) {
    this.colIndexSorted = i;
    this.filterSortFormatAndPaginateData(this.textToFilter, true);
  }
}
