# Stable Diffusionで遊んでる話とChrome拡張を作ってみた話

## 背景

- いろいろあって仕事でTypeScriptを書くことになった
  - 数年のブランクがあるため勘を取り戻したかった
  - React（正確にはNext.js）を触ることになった
    - Vue.jsしか触ったことがないからよくわからない
  - 上記を踏まえて昨今のフロントエンドもろもろをキャッチアップしたかった
- お勉強がてらChrome拡張を作ってみることにした
- 上司がStable Diffusionの遊び方を教えてくれた

## Stable Diffusionについて

### 遊び方

- サクっと遊ぶ場合は以下のリポジトリをcloneして動かすのが手っ取り早い
  - [AUTOMATIC1111/stable-diffusion-webui: Stable Diffusion web UI](https://github.com/AUTOMATIC1111/stable-diffusion-webui)
- ファインチューニングされたモデルは以下のサイトで配られている
  - [Civitai](https://civitai.com/)
  - [Hugging Face – The AI community building the future.](https://huggingface.co/)
- 筆者の環境は以下の通り
  - OS  / Windows 10 Pro
  - CPU / AMD Ryzen 5 5600X
  - RAM / 32GB
  - GPU / NVIDIA GeForce RTX 3060 (12GB)
  - 512 x 512 の画像を出力するくらいだったら2~3秒で出てくる
- 参考になるサイト
  - というのをまとめたかったのだけど自信を持ってここというサイトが見つけられなかったので募集中です
  - 習うより慣れよ

### 権利まわり

- アウトっぽいものが多い（多分アウト）
- 正直よくわからない
  - トラブルを避けたい場合これでお金とかいいねを稼ごうとしないほうがいいかも（当然）
- リンク集
  - [画像生成AIの著作権問題について海外や日本ではどのように解釈されているのか？ - GIGAZINE](https://gigazine.net/news/20221121-generative-ai-copyright/)
  - [「AI・データの利用に関する契約ガイドライン 1.1版」を策定しました （METI/経済産業省）](https://www.meti.go.jp/press/2019/12/20191209001/20191209001.html)
  - [Midjourney、Stable Diffusion、mimicなどの画像自動生成AIと著作権（その2） | STORIA法律事務所](https://storialaw.jp/blog/8883)

## 作ったものと作り方

- stable-diffusion-webuiのプロンプトをプロファイルとして保存しておけるChrome拡張
  - [stoneream/stable-diffusion-webui-profiler](https://github.com/stoneream/stable-diffusion-webui-profiler)
  - [動いている様子](https://twitter.com/stoneream/status/1624488368674578432)
  - ストアでは配ってないです（気が向いたらやります）
- StableDiffusionWebUIに限らず、任意のサイトのInput要素のvalueをプロファイルとして保存して適用するChrome拡張があったら便利かも、と考えたりした
- Chrome拡張を作るにあたってお世話になったもの
  - ボイラープレート
    - [crxjs/chrome-extension-tools: Bundling Chrome Extensions can be pretty complex. It doesn't have to be.](https://github.com/crxjs/chrome-extension-tools)
  - 公式ドキュメント
    - [Chrome Extensions getting started guides - Chrome Developers](https://developer.chrome.com/docs/extensions/mv3/getstarted/)

## その他

- 空白の数年間、いつの間にか主流になっていた技術
  - [Vite | Next Generation Frontend Tooling](https://vitejs.dev/)
  - [Next.js by Vercel - The React Framework](https://nextjs.org/)
