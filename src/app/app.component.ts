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
  
  messageInfo: MessageInfo = new MessageInfo();

  topics: Topic[];
  selectedTopic: Topic = new Topic(-1, "");

  captchaField: string;

  constructor(
    private dataService: DataService) {}

  //ngOnInit() {
  ngAfterViewInit() {
    this.loadTopics(); // загрузка тем сообщений
    console.log(this.messageInfo);

    this.context = (this.canvasEl.nativeElement as HTMLCanvasElement)
                                .getContext('2d');
    this.draw();
  }

  private draw() {
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
          //this.selectedTopic = this.topics[1];
        });
  }

  addMessage(/*name: string, email: string, phone: string, text: string*/) {
    console.log(this.messageInfo.Name);
    console.log(this.messageInfo.Email);
    console.log(this.messageInfo.Phone);
    console.log(this.messageInfo.Text);
    //TopicId
    console.log(this.messageInfo.TopicId);
    console.log(this.selectedTopic);
    this.dataService.addMessage(this.messageInfo)
        .subscribe( data => console.log(data));
  }

  onChangeTopic(topic) {
    console.log(topic);
    alert(topic);
  }
}
