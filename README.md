# Angular-Demo
學習 Angular 歷程

## Development server

- Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

- Run `json-server -w db.json` for a db json db server. api server Navigate to `http://localhost:3000/`.

## angular-demo1

1. 增加 `input` 控制項，並使用 **事件繫結** 綁定事件
    - 使用者輸入事件 `keyup`
2. 使用 `Rxjs fromEvent`
    - 當使用者輸入任何字元時候使用 `Rxjs` 的方式發送 `http get` 請求
    - 在取得 `get` 到的 `list 資料清單` 後，透過 **雙向繫結** 的方式將資料呈現在畫面上
    - 使用範本參考變數將子元件當作一個實體來呼叫使用
        - [static 解釋](https://blog.kevinyang.net/2019/05/29/angular-static-viewchild/)
            - 無綁定結構型 `directive` -> `true`
            - 有綁定結構型 `directive` -> `false` 並在 `AfterViewInit` 取得 `DOM`
3. 在 `app.component.html` 利用 `ngFor` 在 `ul li` 控制項上渲染 `list 資料清單`
4. 在 `app.component.css` 調整 `ul li` 樣式
5. 在 `app.component.html` 增加 `input`  控制項上下鍵控制 **事件繫結** 
6. 在 `app.component.ts` 利用 `input` 事件繫結的三個事件方法
   - 更新 `activeIndex` 變數來動態調整 `li` 的 `ngclass`
   - 依據  `li` 的 `ngclass` 變化，決定選取的資料會在那一筆位置上
   - 當選取到最後一筆清單資料時，在按下鍵時，會自動跳到第一筆的選取位置
7. 在 `app.component.html` 將 `input` 控制項的屬性 `inputValue` 綁定 `ngModel` 
   - 當使用者按下 `enter` 按鍵時，觸發事件更新 `inputValue` 的值
8. 在 `app.component.html` 將 `input` 控制項的屬性 `inputValue` 綁定 `ngModel` 
   - 當使用者滑鼠點擊 左鍵 時，觸發事件更新 `inputValue` 的值
9.  移除 `keyup` 事件並改用 `Rxjs` 方式做監聽，並調整觸發頻率的優化
10. 新增`autocomplete` 元件，將部分 `app.component.ts` 的邏輯移植使其成為可重複使用元件


## update-demo

1. 新增：當選取到第一筆清單資料時，在按上鍵時，會自動跳到最後一筆的選取位置
2. 調整：改為在 `OnInit` 時期先取得資料，避免使用多層級的 `subscribe`
   - 讓程式碼閱讀性更好，就像是寫 `js` 時也避免 `callback` 太多層
