import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JefeSectorLoteComponent } from './jefe-sector-lote.component';

describe('JefeSectorLoteComponent', () => {
  let component: JefeSectorLoteComponent;
  let fixture: ComponentFixture<JefeSectorLoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JefeSectorLoteComponent]
    });
    fixture = TestBed.createComponent(JefeSectorLoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
