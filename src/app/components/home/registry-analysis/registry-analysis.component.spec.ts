import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistryAnalysisComponent } from './registry-analysis.component';

describe('RegistryAnalysisComponent', () => {
  let component: RegistryAnalysisComponent;
  let fixture: ComponentFixture<RegistryAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistryAnalysisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistryAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
