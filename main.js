// let snowContainer = document.querySelector('.snow_container');

// const createSnow = () => {
//   // 雪を生成
//   let snow = document.createElement('span');
//   snow.className = 'snow';

//   // 雪の大きさ指定
//   minsize = 2;
//   maxsize = 10;
//   let snowSize = Math.random() * (maxsize - minsize);
//   snow.style.width = snowSize + 'px';
//   snow.style.height = snowSize + 'px';

//   // 雪の降る位置
//   snow.style.left = Math.random() * 100 + '%';

//   // 親要素に追加
//   snowContainer.appendChild(snow);

//   // 雪を消す
//   setTimeout(() => {
//     snow.remove();
//   }, 9000);
// };


// setInterval(createSnow, 100); 

const send = document.getElementById('submit');  // ラジオボタン取得
const regalEntity = document.getElementById('regalEntity');  // テキストボックス（法人の値）取得

// 空文字チェック
function check(charactor, userFill) {
  if(charactor == '') {
    alert(userFill + 'は必須入力項目です');
    throw 'もう一度入力してください';
  }
}
// 数値チェック
function checkNumber(numberValue) {
  for(let i = 0; i < numberValue.length; i++) {
    if(Number.isNaN(numberValue) !== false) {
      alert('数字のみ入力可能です');
      throw 'もう一度入力してください';
    }
  }
}
// 法人の時の会社名識別
function companyCheck(nameCompany) {
  if(regalEntity.checked == true) {
    check(nameCompany, '会社名');
  }
}
// 生年月日/郵便番号識別
function numericCheck(nameValue, numName) {
    check(nameValue, numName);
    checkNumber(nameValue);
}
// 部分入力チェック
function partsCheck() {
  if(post !== '' && domestic !== '' && residence !== '') {
  } else {
    alert('郵便番号、都道府県、住所はセットで記入してください');
  }
}

send.addEventListener('click', (event) => {
event.preventDefault(); // 送信したときにリロードしないようにする

  const company = document.getElementById('company').value;  // テキストボックス（会社名）の値を取得
  const userName = document.getElementById('userName').value;  // テキストボックス（氏名）取得
  const birthDay = document.getElementById('birth').value;  // テキストボックス（生年月日）取得
  const mail = document.getElementById('mail').value;  // テキストボックス（メールアドレス）取得
  const post = document.getElementById('post').value;  // テキストボックス（郵便番号）取得
  const domestic = document.getElementById('domestic').value;  // セレクト（都道府県）取得  
  const residence = document.getElementById('residence').value;  // テキストボックス（住所）取得  
  const contentArea = document.getElementById('contentArea').value;  // テキストエリア（問い合わせ）取得

  try {
    companyCheck(company); // 法人のラジオボタンが押された時の空文字チェック
    check(userName, '氏名'); // 氏名の空文字チェック
    numericCheck(birthDay, '生年月日');  // 生年月日の空文字と数値のチェック
    check(mail, 'メールアドレス'); // メールアドレスの空文字チェック
    numericCheck(post, '郵便番号'); // 郵便番号の空文字と数値のチェック
    partsCheck();

    // ラジオボタン（法人／個人）値取得
    const radioBusiness = document.querySelector('input[name=jobCategory]:checked').value;
    // ラジオボタン（男／女）値取得
    const radioGender = document.querySelector('input[name=gender]:checked').value;
    // 各種、ユーザーが入力した値を格納
    const userFormArray = {
        work: radioBusiness,
        companyName: company,
        userName: userName,
        gender: radioGender,
        birth: birthDay,
        mailAddress: mail,
        post: post,
        prefecture: domestic,
        address: residence,
        contentComment: contentArea
    }

    if(window.localStorage) {
      const json = JSON.stringify(userFormArray);
      localStorage.setItem('key_value', json);
      }

    } catch (error) {
      alert('エラー・' + error);
    }
  
});

const button = document.getElementById('serch');  // 郵便番号で検索するボタン取得
button.addEventListener('click', (e) => {
  e.preventDefault();
  const postNumber = document.getElementById('post').value;  // テキストボックス（郵便番号）取得
  const option = document.querySelectorAll('option');  // オプション要素（都道府県）取得
  const residenceValue = document.getElementById('residence');  // テキストボックス（住所）取得

  fetch("https://zipcloud.ibsnet.co.jp/api/search?zipcode=" + postNumber)
  .then(respons => {
    return respons.json();
  })
  .then(data => {
    const dataOption = data.results[0].address1;
    for(let i = 0; i < option.length; i++) {
      if(option[i].value == dataOption) {
        option[i].selected = true;
      } 
    }
    residenceValue.value = data.results[0].address2 + data.results[0].address3;
  })
  .catch(error => {
    console.log(error);
  })

})







































