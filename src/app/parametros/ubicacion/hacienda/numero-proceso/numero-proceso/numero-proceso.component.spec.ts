import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumeroProcesoComponent } from './numero-proceso.component';

describe('NumeroProcesoComponent', () => {
  let component: NumeroProcesoComponent;
  let fixture: ComponentFixture<NumeroProcesoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NumeroProcesoComponent]
    });
    fixture = TestBed.createComponent(NumeroProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
