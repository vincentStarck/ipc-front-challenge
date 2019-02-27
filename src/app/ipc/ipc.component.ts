import { Component, OnInit } from '@angular/core';
import { IpcService } from './ipc.service';
import { IPC } from './model/IPC';
import * as CanvasJS from '../../assets/canvasjs.min';
import * as moment from 'moment-timezone';


@Component({
  selector: 'app-ipc',
  templateUrl: './ipc.component.html',
  styleUrls: ['./ipc.component.css']
})
export class IpcComponent implements OnInit {
  ipcList: IPC[];

  /**
   * Items to show on chart
   */
  itemsToShow = 20;

  constructor(public ipcService: IpcService) { }

  ngOnInit() {
    // recovery all the items to backend
    this.ipcService.getHistoryIPC().subscribe(
      data => {
        this.ipcList = data;
        if (!this.ipcList) {
          console.error('No data from service');
          return;
        }
        // load data 
        this.loadData();
      }
    );

  }

  /**
   * find the lower price  in the array
   * @param arrary
   * @returns  the minor price
   */
  arrayMin(arr) {
    return arr.reduce(function (p, v) {
      return (p < v.Precio ? p : v.Precio);
    });
  }

  /**
   * find the higest price in the array
   * @param arrary
   * @returns  the mayor price
   */
  arrayMax(arr) {
    return arr.reduce(function (p, v) {
      return (p > v.Precio ? p : v.Precio);
    });
  }

  /**
   * Loads data to the chart
   */
  loadData() {

    let min = this.arrayMin(this.ipcList);
    min = min - 10;
    const max = this.arrayMax(this.ipcList);
    const chart = new CanvasJS.Chart('chartContainer', {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: 'Índice de Precios y Cotizaciones'
      },
      axisY: {
        prefix: '$',
        minimum: min,
        maximum: max
      },
      data: [{
        type: 'column',
        dataPoints: this.getPoints()
      }]
    });

    chart.render();
  }


  /**
   * Gets points to show in the chart
   * @returns  
   */
  getPoints() {


    // We show only the items especified in the itemsToShow var
    const aux = this.ipcList.slice(0, this.itemsToShow);
    const dataPoints = aux.map(function (x) {
      //   return { y: x.Precio, label: dateFormat(x.Fecha) };

      const dateFormat = moment(x.Fecha);
      return { y: x.Precio, label: dateFormat.format('MMMM Do YYYY, h:mm:ss a') };


    });
    return dataPoints;

  }

  /**
   * Selects changed
   * @param event 
   */
  selectChanged(event: any) {
    const selectItemsToShow = event.srcElement.value;
    // update the nombers of items to show
    this.itemsToShow = (selectItemsToShow === 'todos') ? (this.ipcList.length - 1) : parseInt(selectItemsToShow);
    // reaload the chart
    this.loadData();

  }



}
