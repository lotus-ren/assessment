'use strict';

const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('recommend');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した　HTM要素の子要素を全て削除する
 * ＠param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element)  {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
} 

//これはenterキーを押せば診断ができるようにするためのものです
userNameInput.onkeydown = (event) => {
    if (event.key === 'Enter') {
        assessmentButton.onclick();
    }
};

assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0) {
        //名前が空の時は処理をおこないません
        return;
    }

    removeAllChildren(resultDivided);

    //console.log(userName);
    //console.log('ボタンがおされました');
    //診断エリアの作成
    //while (resultDivided.firstChild) {
    //    resultDivided.removeChild(resultDivided.firstChild)
    //}
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const result = assessment(userName);

    const paragraph = document.createElement('p');
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);


    removeAllChildren(tweetDivided);

    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
     + encodeURIComponent('あなたのおすすめお菓子') 
     + '&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result)
    anchor.innerText = 'Tweet #あなたのいいところ';

    tweetDivided.appendChild(anchor);
    twttr.widgets.load();
}
const answers = [
'{userName}のおすすめお菓子は”たけのこの里”です”'
,'{userName}のおすすめお菓子は”きのこの山”です”'
,'{userName}のおすすめお菓子は”ラミー”です”'
,'{userName}のおすすめお菓子は”バッカス”です”'
,'{userName}のおすすめお菓子は”雪の宿”です”'
];

/**
 * 名前の文字列を渡すと診断結果を返す
 * ＠param{String} userName ユーザー名前
 * @return {String} 診断結果
 */
function assessment(userName) {
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++) {
        sumOfCharCode += userName.charCodeAt(i);
    }

    let index = sumOfCharCode % answers.length;
    let result = answers[index];
    result = result.replace(/\{userName\}/g, userName);

    return result;
}
