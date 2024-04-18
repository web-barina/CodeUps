jQuery(function ($) {
  //ハンバーガーメニュー
  $(document).ready(function () {
    $("#header__drawer").on("click", function () {
      $("#header-menu-sp").slideToggle();
    });
  }); //ハンバーガーメニュー閉じタグ

  //ファーストビュースライダー
  const FVswiper = new Swiper("#FVswiper", {
    loop: true,
    speed: 2000,
    navigation: false,
    autoplay: {
      delay: 2000,
    },
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
  });
  //キャンペーンスライダー
  const campaignSwiper = new Swiper("#campaignSwiper", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 40,
    breakpoints: {
      500: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 40,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    },
  }); //キャンペーンスライダー閉じタグ

  //画像アニメーション
  $(".inview").css({ opacity: "0", "margin-top": "50px" });
  $(".inview").on("inview", function () {
    $(this).animate({ opacity: "1", "margin-top": "0px" }, 2000);
  });
  //要素の取得とスピードの設定
  var box = $(".color-box"),
    speed = 700;

  //.color-boxの付いた全ての要素に対して下記の処理を行う
  box.each(function () {
    $(this).append('<div class="color"></div>');
    var color = $(this).find($(".color")),
      image = $(this).find("img");
    var counter = 0;

    image.css("opacity", "0");
    color.css("width", "0%");
    //inviewを使って背景色が画面に現れたら処理をする
    color.on("inview", function () {
      if (counter == 0) {
        $(this)
          .delay(200)
          .animate({ width: "100%" }, speed, function () {
            image.css("opacity", "1");
            $(this).css({ left: "0", right: "auto" });
            $(this).animate({ width: "0%" }, speed);
          });
        counter = 1;
      }
    });
  }); //画像アニメーション閉じタグ

  //scrollトップ
  //スクロールした際の動きを関数でまとめる
  function PageTopAnime() {
    var scroll = $(window).scrollTop(); //スクロール値を取得
    if (scroll >= 300) {
      //300pxスクロールしたら
      $("#scroll").removeClass("DownMove"); // DownMoveというクラス名を除去して
      $("#scroll").addClass("UpMove"); // UpMoveというクラス名を追加して出現
    } else {
      //それ以外は
      if ($("#scroll").hasClass("UpMove")) {
        //UpMoveというクラス名が既に付与されていたら
        $("#scroll").removeClass("UpMove"); //  UpMoveというクラス名を除去し
        $("#scroll").addClass("DownMove"); // DownMoveというクラス名を追加して非表示
      }
    }

    var wH = window.innerHeight; //画面の高さを取得
    var footerPos = $("#footer").offset().top; //footerの位置を取得
    if (scroll + wH >= footerPos + 10) {
      var pos = scroll + wH - footerPos + 10; //スクロールの値＋画面の高さからfooterの位置＋10pxを引いた場所を取得し
      $("#scroll").css("bottom", pos); //#scrollに上記の値をCSSのbottomに直接指定してフッター手前で止まるようにする
    } else {
      //それ以外は
      if ($("#scroll").hasClass("UpMove")) {
        //UpMoveというクラス名がついていたら
        $("#scroll").css("bottom", "10px"); // 下から10pxの位置にページリンクを指定
      }
    }
  }

  // 画面をスクロールをしたら動かしたい場合の記述
  $(window).scroll(function () {
    PageTopAnime(); /* スクロールした際の動きの関数を呼ぶ*/
  });

  // ページが読み込まれたらすぐに動かしたい場合の記述
  $(window).on("load", function () {
    PageTopAnime(); /* スクロールした際の動きの関数を呼ぶ*/
  });

  // #scrollをクリックした際の設定
  $("#scroll").click(function () {
    $("body,html").animate(
      {
        scrollTop: 0, //ページトップまでスクロール
      },
      500
    ); //ページトップスクロールの速さ。数字が大きいほど遅くなる
    return false; //リンク自体の無効化
  }); //scrollトップ閉じタグ
}); //全体閉じタグ
