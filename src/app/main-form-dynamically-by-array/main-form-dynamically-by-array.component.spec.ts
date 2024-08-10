import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainFormDynamicallyByArrayComponent } from './main-form-dynamically-by-array.component';

describe('MainFormDynamicallyByArrayComponent', () => {
  let component: MainFormDynamicallyByArrayComponent;
  let fixture: ComponentFixture<MainFormDynamicallyByArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainFormDynamicallyByArrayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainFormDynamicallyByArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
