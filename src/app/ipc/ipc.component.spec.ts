import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IpcComponent } from './ipc.component';
import { IpcService } from './ipc.service';
import { Observable } from 'rxjs';
import { IPC } from './model/IPC';
import { asyncData } from './testing/async-observable-helpers';
import { RouterTestingModule } from '@angular/router/testing';


describe('IpcComponent', () => {
  let component: IpcComponent;
  let fixture: ComponentFixture<IpcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [IpcComponent],
      providers: [
        { provide: IpcService, useClass: TestIpcService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


export class TestIpcService extends IpcService {

  lastResult: Observable<any>;
  constructor() {
    super(null, null);
  }

  getHistoryIPC(): Observable<IPC[]> {

    return this.lastResult = asyncData(this.getMockData());

  }

  getMockData(): IPC[] {

    return [
      { Fecha: '2019-02-21T05:31:16.197-06:00', Precio: 32323, Porcentaje: 0, Volumen: 323 },
      { Fecha: '2019-06-21T05:31:16.197-05:00', Precio: 54222, Porcentaje: 2, Volumen: 434 }];

  }

}
