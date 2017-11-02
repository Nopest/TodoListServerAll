import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TodoListWithItems,ListID, ItemJSON, TodoListService} from "../todo-list.service";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent implements OnInit, OnChanges {
  @Input() item: ItemJSON;
  @Input() listId: ListID;
  @Input() clock: number;
  @Input() lists: TodoListWithItems[];
  private editingLabel = false;
  private editingDate = false;
  private showingDetails = false;


  constructor(private todoListService: TodoListService) { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
  }

  setLabel(label: string) {
    if (label === "") {
      this.delete();
    } else {
      this.todoListService.SERVER_UPDATE_ITEM_LABEL(this.listId, this.item.id, label);
    }
    this.editLabel(false);
  }

  isEditingLabel(): boolean {
    return this.editingLabel;
  }

  isShowingDetails(): boolean {
    return this.showingDetails;
  }

  isEditingDate(): boolean {
    return this.editingDate;
  }

  editLabel(edit: boolean) {
    this.editingLabel = edit;
  }

  editDate(edit: boolean) {
    this.editingDate = edit;
  }

  setDate(dateD: number, dateF: number) {
    this.todoListService.SERVER_UPDATE_ITEM_DATA(this.listId, this.item.id, {categories: this.item.data.categories, dateD: dateD, dateF: dateF});
    this.editDate(false);
  }

  getTheDateD() {

    let d = new Date(this.item.data.dateD);
    let day=d.getDate();
    let minutes=d.getMinutes();
    let str="";
    str = d.getFullYear()+"-"+(d.getMonth()+1)+"-"
    if(day<10)
    {
     str = str +"0"+day+"T"+d.getHours()+":";
    }else
    {
      str = str + day+"T"+d.getHours()+":";
    }

    if(minutes<10)
    {
      str=str+"0"+minutes;
    }else
    {
      str=str+minutes;
    }
    return str;
  }
  getTheDateF() {
    let d = new Date(this.item.data.dateF);
    let day=d.getDate();
    let minutes=d.getMinutes();
    let str="";
    str = d.getFullYear()+"-"+(d.getMonth()+1)+"-"
    if(day<10)
    {
      str = str +"0"+day+"T"+d.getHours()+":";
    }else
    {
      str = str + day+"T"+d.getHours()+":";
    }

    if(minutes<10)
    {
      str=str+"0"+minutes;
    }else
    {
      str=str+minutes;
    }
    return str;
  }

  check(checked: boolean) {
    this.todoListService.SERVER_UPDATE_ITEM_CHECK(this.listId, this.item.id, checked);
  }

  delete() {
    this.todoListService.SERVER_DELETE_ITEM(this.listId, this.item.id);
  }

  showDetails() {
    this.showingDetails = ! this.showingDetails;
    console.log("details" + this.showingDetails);
  }

  changeList(listDest:ListID)
  {
    this.todoListService.SERVER_CHANGE_ITEMLIST(this.listId,this.item.id,listDest);
    this.todoListService.SERVER_DELETE_ITEM(this.listId, this.item.id);
  }
}
