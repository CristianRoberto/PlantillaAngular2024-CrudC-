import { Injectable } from "@angular/core";
import { IInputComponent } from "../input/input.interface";
import { IFormItems } from "./form.interface";

@Injectable({
  providedIn: "root",
})
export class FormService {
  public formValue: any = {};

  /**
   * Función para guardar los valores de los formularios activos de manera global
   *
   * @param formName nombre del formulario
   * @param formUpdated valor del formulario actualizado
   */
  public onChangeForm(formName: string, formUpdated: any) {
    this.formValue = {
      ...this.formValue,
      [formName]: formUpdated,
    };
  }
  /**
   * Cambia el valor de una propiedad específica de un elemento en un formulario.
   *
   * @param {string} id - Identificador único del elemento en el formulario.
   * @param {IFormItems} form - Arreglo de elementos del formulario (tipo IFormItems).
   * @param {keyof IInputComponent} propName - Nombre de la propiedad a cambiar en el elemento.
   * @param {any} value - Nuevo valor que se asignará a la propiedad especificada.
   * @returns {IFormItems} - Formulario actualizado después de realizar el cambio.
   */
  public changeValuePropFormById<T>(
    id: keyof T,
    form: IFormItems,
    propName: keyof IInputComponent,
    value: any
  ): IFormItems {
    const propIndex = form.findIndex((x) => x.id === id);
    form[propIndex] = { ...form[propIndex], [propName]: value };
    return form;
  }
  /**
   * Cambia el valor de una o varias propiedades específicas de un elemento en un formulario.
   *
   * @param {string} id - Identificador único del elemento en el formulario.
   * @param {IFormItems} form - Arreglo de elementos del formulario (tipo IFormItems).
   * @param {Partial<IInputComponent>} newProps - Objeto que contiene las nuevas propiedades y valores a asignar al elemento.
   * @returns {IFormItems} - Formulario actualizado después de realizar el cambio.
   */
  public changeValuePropsFormById(
    id: string,
    form: IFormItems,
    newProps: Partial<IInputComponent>
  ): IFormItems {
    const propIndex = form.findIndex((x) => x.id === id);
    form[propIndex] = { ...form[propIndex], ...newProps };
    return form;
  }
}
