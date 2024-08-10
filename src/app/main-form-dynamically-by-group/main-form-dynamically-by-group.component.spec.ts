import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainFormDynamicallyByGroupComponent } from './main-form-dynamically-by-group.component';

describe('MainFormDynamicallyByGroupComponent', () => {
  let component: MainFormDynamicallyByGroupComponent;
  let fixture: ComponentFixture<MainFormDynamicallyByGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainFormDynamicallyByGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainFormDynamicallyByGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
