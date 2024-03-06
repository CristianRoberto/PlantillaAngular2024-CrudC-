import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomologacionHaciendaFormComponent } from './homologacion-hacienda-form.component';

describe('HomologacionHaciendaFormComponent', () => {
  let component: HomologacionHaciendaFormComponent;
  let fixture: ComponentFixture<HomologacionHaciendaFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomologacionHaciendaFormComponent]
    });
    fixture = TestBed.createComponent(HomologacionHaciendaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
