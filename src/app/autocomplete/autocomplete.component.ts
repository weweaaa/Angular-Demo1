import { Component, ViewChild, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from 'src/Models/Domain/Post';
import { finalize, debounceTime, switchMap } from 'rxjs/operators';
import { NgModel } from '@angular/forms';
import { fromEvent, iif, of } from 'rxjs';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {

  api = 'http://localhost:3000/posts?title_like=';

  keyword = '';
  activeIndex: number = null;   // 紀錄上下鍵動作移動編號
  suggestList: Post[] = [];   // 儲存接收到 get 的物件資料

  @ViewChild('tKeyword', { static: true }) tKeyword: NgModel

  ngOnInit(): void {
    this.tKeyword.valueChanges.pipe(
      debounceTime(500),
      switchMap(_ => this.getData(this.keyword))
    ).subscribe((value: Post[]) => {
      this.suggestList = value;
    });
  }

  /**
   * 透過 API Get 取得資料集合
   *
   * @private
   * @param {string} url：要帶在 api 後面的查詢條件
   * @returns 回傳訪問 API 回來的資料內容
   */
  private getData(url: string) {
    return this.http.get(this.api + url).pipe(
      finalize(() => {  // 使用方式就像是 C# 當中 try catch 最後的 finally
        // 每一個 request 收到成功 response 隨即結束
        console.log('complete');
      })
    );
  }

  /**
   * 建構子
   * @param {HttpClient} http 建構子 DI 注入 HttpClient 物件
   * @memberof AutocompleteComponent
   */
  constructor(private http: HttpClient) { }

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
    if (this.activeIndex === 0) {
      this.activeIndex = this.suggestList.length - 1;
    } else {
      if (this.activeIndex === null) {
        this.activeIndex = 0;
      } else {
        this.activeIndex -= 1;
      }
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
}
