//画像
let sakura01;
let sakura02;
let happa01;
let happa02;
let kouyou01;
let yuki01;
let yuki02;

let capture;
let isCaptured = false;

let detected = false;
let picts = [];

// 1回の検出に対応する描画オブジェクト
//冬
class Pict {
  constructor(_x, _y) {
    // 初期座標
    this.x = _x;
    this.y = _y;

    // 描画パラメータの生成と保存
    this.fill_color_R = random(255);
    this.fill_color_G = random(255);
    this.ellipse_w = random(40);
    this.image_yuki01_w = random(10);
    this.image_yuki01_h = random(10);
    this.image_yuki02_w = random(12);
    this.image_yuki02_h = random(12);
  }

  display() {
    fill(this.fill_color_R, this.fill_color_G, 255, 90);
    ellipse(this.x, this.y, this.ellipse_w);
    image(yuki01, this.x - 5, this.y - 5,
      this.image_yuki01_w, this.image_yuki01_h);
    image(yuki02, this.x + 5, this.y + 5,
      this.image_yuki02_w, this.image_yuki02_h);

    // random move
    this.x += random([0, 0.3]);
    this.y += random([0, 0.3]);

    // move to lower right
    // this.x++; this.y++;
  }
}

//秋
class Pict1 {
  constructor(_x, _y) {
    // 初期座標
    this.x = _x;
    this.y = _y;

    // 描画パラメータの生成と保存
    this.fill_color_B = random(255);
    this.fill_color_G = random(255);
    this.ellipse_w = random(45);
    this.image_kouyou01_w = random(13);
    this.image_kouyou01_h = random(13);
    
  }

  display() {
    fill(255, this.fill_color_G, this.fill_color_B, 90);
    ellipse(this.x, this.y, this.ellipse_w);
    image(kouyou01, this.x - 5, this.y - 5,
      this.image_kouyou01_w, this.image_kouyou01_h);

    // random move
    this.x += random([-0.3, -0.3]);
    this.y += random([0.3, 0.3]);

    // move to lower right
    // this.x++; this.y++;
  }
}

//夏
class Pict2 {
  constructor(_x, _y) {
    // 初期座標
    this.x = _x;
    this.y = _y;

    // 描画パラメータの生成と保存
    this.fill_color_B = random(255);
    this.fill_color_R = random(255);
    this.ellipse_w = random(45);
    this.image_happa01_w = random(13);
    this.image_happa01_h = random(13);
    this.image_happa02_w = random(10);
    this.image_happa02_h = random(10);
  }

  display() {
    fill(this.fill_color_R, 255, this.fill_color_B, 90);
    ellipse(this.x, this.y, this.ellipse_w);
    image(happa01, this.x - 5, this.y - 5,
      this.image_happa01_w, this.image_happa01_h);
    image(happa02, this.x + 5, this.y + 5,
      this.image_happa02_w, this.image_happa02_h);

    // random move
    this.x += random([0.3, 0.3]);
    this.y += random([0.3, 0.3]);

    // move to lower right
    // this.x++; this.y++;
  }
}

//春
class Pict3 {
  constructor(_x, _y) {
    // 初期座標
    this.x = _x;
    this.y = _y;

    // 描画パラメータの生成と保存
    this.fill_color_B = random(180,255);
    this.fill_color_G = random(120,255);
    this.ellipse_w = random(45);
    this.image_sakura01_w = random(13);
    this.image_sakura01_h = random(13);
    this.image_sakura02_w = random(10);
    this.image_sakura02_h = random(10);
  }

  display() {
    fill(255, this.fill_color_G, this.fill_color_B, 99);
    ellipse(this.x, this.y, this.ellipse_w);
    image(sakura01, this.x - 5, this.y - 5,
      this.image_sakura01_w, this.image_sakura01_h);
    image(sakura02, this.x + 5, this.y + 5,
      this.image_sakura02_w, this.image_sakura02_h);

    // random move
    this.x += random([0, 0.35]);
    this.y += random([0, -0.2]);

    // move to lower right
    // this.x++; this.y++;
  }
}

//画像の挿入
function preload() {
  sakura01 = loadImage("hanabira.png");
  sakura02 = loadImage("usui.png");
  happa01 = loadImage("happa01.png");
  happa02 = loadImage("happa02.png");
  kouyou01 = loadImage("kouyou01.png");
  yuki01 = loadImage("yuki01.png");
  yuki02 = loadImage("yuki02.png");
}

function setup() {
  createCanvas(500,400);

  // facingMode 部分はテスト環境に合わせて適宜変更
  capture = createCapture({
    audio: false,
    video: {
      facingMode: {
        exact: "environment"
      }
      // facingMode: "user"
    }
  }, function() {
    isCaptured = true;
  });
  capture.size(500,400);
  capture.hide();
  noStroke();
  frameRate(60);
}

function draw() {
  clear();
  background(255);

  if (!isCaptured) return;
  image(capture, 0, 0, 500,400);

  fill(17, 68, 119)
  let display = touches.length + ' touches';
  text(display, 200, 190);

  // 15フレームに1回オブジェクト検出処理実施
  if (frameCount % 15 == 0) {
    detected = false; // 検出フラグOFF
    picts = []; // 描画オブジェクト管理配列クリア
    capture.loadPixels();

    const stepSize = 10;
    for (let y = 0; y < height; y += stepSize) {
      for (let x = 0; x < width; x += stepSize) {
        const i = y * width + x;
        const darkness = (255 - capture.pixels[i * 4]) / 255;
        const radius = stepSize * darkness;
        noStroke();
        noFill();

        if (darkness < 0.25) {
          if (touches.length == 1) {
            detected = true; // オブジェクト検出された
            picts.push(new Pict3(x, y));
            x += 50;
            y += 1;
          } else if (touches.length == 2) {
            detected = true; // オブジェクト検出された            
            picts.push(new Pict2(x, y));
            x += 50;
            y += 1;
          } else if (touches.length == 3) {
            detected = true; // オブジェクト検出された            
            picts.push(new Pict1(x, y));
            x += 50;
            y += 1;
          } else if (touches.length == 4) {
            detected = true; // オブジェクト検出された            
            picts.push(new Pict(x, y));
            x += 50;
            y += 1;
          }
        }
      }
    }
  }

  if (detected) {
    picts.forEach((aPict) => {
      aPict.display();
    });
  }
}