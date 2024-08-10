import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainFormDynamicallyComponent } from './main-form-dynamically.component';

describe('MainFormDynamicallyComponent', () => {
  let component: MainFormDynamicallyComponent;
  let fixture: ComponentFixture<MainFormDynamicallyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainFormDynamicallyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainFormDynamicallyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
