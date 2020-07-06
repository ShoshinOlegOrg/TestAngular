import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Topic } from './Topic';
import { MessageInfo } from './MessageInfo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService]
})
export class AppComponent implements AfterViewInit/*OnInit*/ {
  title = 'Обратная связь';

  /** Template reference to the canvas element */
  @ViewChild('canvasEl', {static: false}) canvasEl: ElementRef;
  /** Canvas 2d context */
  private context: CanvasRenderingContext2D;
  captchaField: string;
  
  topics: Topic[];
  messageInfo: MessageInfo = new MessageInfo();
  isSended: boolean = false;
  receivedData: any;

  constructor(
    private dataService: DataService) {}

  //ngOnInit() {
  ngAfterViewInit() {
    this.loadTopics(); // загрузка тем сообщений
    this.context = (this.canvasEl.nativeElement as HTMLCanvasElement)
                                .getContext('2d');
    this.drawHeader();
  }

  private drawHeader() {
    var canvas =  this.canvasEl.nativeElement as  HTMLCanvasElement;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    var width = canvas.width - 20;
    var height = 50;

    this.context.fillStyle = "#BF3030";
    this.context.fillRect(0, 0, width , height);

    this.context.moveTo(width, height);
    this.context.lineTo(width + 15, 0);
    this.context.lineTo(width, 0);
    this.context.fill();

    this.context.beginPath();
    this.context.moveTo(0, height);
    this.context.lineTo(20, height + 20);
    this.context.lineTo(20, height);
    this.context.lineTo(0, height);
    this.context.fillStyle = "#A60000";
    this.context.fill();

    this.context.fillStyle = "white";
    this.context.font = "bold 24px sans-serif";
    this.context.fillText("Напишите нам", 10, 30);
  }

  loadTopics() {
    this.dataService.getTopics()
        .subscribe((data: Topic[]) => {
          this.topics = data;
        });
  }

  addMessage() {
    this.dataService.addMessage(this.messageInfo)
        .subscribe( data => { 
          this.receivedData = data;
          this.isSended = true;
        });
  }
}
