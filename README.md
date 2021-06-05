# EC-Website-app(アプリ名　K2 shop)

## **要件定義**<br/>
前職の同僚が将来、ブランドを立ち上げる予定なので制作したECサイトです。<br/>
学習中に制作したのでセキュリティなどの問題もあり実際には稼働していません。<br/>
[K2 shop](https://ec-website-79387.web.app/)のリンク先です。<br/>

・アプリ内の機能<br/>
  ユーザーの登録、ログイン<br/>
  googleアカウントでのユーザー登録<br/>
  商品の登録、編集、削除<br/>
  商品の検索（ダイアルボックスのみ）<br/>
  管理画面に不正アクセスできないバリデーション機能<br/>
  管理者、ユーザーの認証判別<br/>
  カート機能<br/>
  stripeでの決済(テストキーで実装)<br/>
 

## **使用したライブラリ/フレームワーク**<br/>
・フロントエンド<br/>
 　react / axios / react-router-dom<br/>
 　redux / redux-thunk / redux-saga /reselect / react-redux / ckeditor4-react<br/>
 　moment / redux-logger / redux-persist / aos<br/>
 　@material-ui/core/ @material-ui/icons / node-sass<br/>
 　@stripe/stripe-js / @stripe/react-stripe-js<br/>
 
・バックエンド<br/>
   Firebase / firebase-functions / express / cors / stripe<br/>
