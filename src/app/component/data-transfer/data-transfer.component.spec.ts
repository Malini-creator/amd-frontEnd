import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataTranferComponent } from './data-transfer.component';


describe('DataTranferComponent', () => {
  let component: DataTranferComponent;
  let fixture: ComponentFixture<DataTranferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataTranferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTranferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
