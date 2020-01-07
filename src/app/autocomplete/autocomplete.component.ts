import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from 'src/Models/Domain/Post';
import { finalize, debounceTime } from 'rxjs/operators';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements AfterViewInit {

  api = 'http://localhost:3000/posts?title_like=';

  keyword = '';
  activeIndex: number = null;   // 紀錄上下鍵動作移動編號
  suggestList: Post[] = [];   // 儲存接收到 get 的物件資料

  @ViewChild('tKeyword', { static: false }) tKeyword: NgModel

  /**
   * 建構子
   * @param {HttpClient} http 建構子 DI 注入 HttpClient 物件
   * @memberof AutocompleteComponent
   */
  constructor(private http: HttpClient) { }

  /**
   * 使用者輸入事件
   *
   * @param: {KeyboardEvent} event
   */
  // getSuggestList(event: KeyboardEvent) {
  //   const target = event.target as HTMLInputElement;
  //   this.http.get(this.api + target.value).pipe(
  //     finalize(() => {
  //       // 每一個 request 收到成功 response 隨即結束
  //       console.log('complete');
  //     })
  //   ).subscribe((value: Post[]) => {
  //     this.suggestList = value;
  //   });
  // }

  /**
   * 使用者按向下鍵事件處理
   */
  decreaseActiveIdx() {
    if (this.activeIndex === null) {
      this.activeIndex = 0;
    } else {
      this.activeIndex += 1;
    }

    if (this.activeIndex === (this.suggestList.length)) {
      this.activeIndex = 0;
    }
  }

  /**
   * 使用者按向上鍵事件處理
   */
  increaseActiveIdx() {
    if (this.activeIndex === null) {
      this.activeIndex = 0;
    } else {
      this.activeIndex -= 1;
    }
  }

  /**
   * 使用者按 Enter 事件處理
   */
  updateInput() {
    if (this.activeIndex !== null) {
      this.keyword = this.suggestList[this.activeIndex].title;
    }
  }

  ngAfterViewInit(): void {
    this.tKeyword.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(intputValue => {
      this.http.get(this.api + intputValue).pipe(
        finalize(() => {
          // 每一個 request 收到成功 response 隨即結束
          console.log('complete');
        })
      ).subscribe((value: Post[]) => {
        this.suggestList = value;
      });
    });
  }

}
