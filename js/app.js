var PostRef = firebase.database().ref('/post/');
var PostContentRef = firebase.database().ref('/post-context/');
var ContentArea = $('#content');


// Redirect if user is login or not
if  (window.location.href == window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + '/login/')  {
    firebase.auth().onAuthStateChanged(user => {

        if (user) { window.location = '/postcreate/'; }
    
    });
}

if  (window.location.href == window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + '/postcreate/')  {
    firebase.auth().onAuthStateChanged(user => {

        if (user) {} else { window.location = '/login/'; }
    
    });
}

$('.login-btn').on('click', function signInFunction() {

    var email = $('#username').val(),
        password = $('#password').val();

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function () {
            window.location = '/postcreate/';
        })
        .catch(function (err) {

            var ErrCode = err.code;

            alert(ErrCode);

        });

})


$('.signout').on('click', function signOutFunction() {

    firebase.auth().signOut()
        .then(function () {
            window.location = '/login/';
        })
        .catch(function (err) {

        })

})



// Create post functon
function xoaDau(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
}

function ReplaceTagContent(string) {

    var BBCode = ['[title]', '[/title]', '[img]', '[/img]', '[text]', '[/text]'];
    var HTMLCode = ['<h3>', '</h3>', "<img src='", "'>", '<p>', '</p>'];

    for (var x = 0; x < BBCode.length; x++) {

        while (string.includes(BBCode[x])) {

            string = string.replace(BBCode[x], HTMLCode[x]);

        }

    }

    return string;

}

// Create a new post
$('.submit').click(function createNewPost() {

    var now = new Date();
    var wdnum = now.getDay();
    var dd = now.getDate();
    var mm = now.getMonth() + 1;
    var yyyy = now.getFullYear();

    switch (wdnum) {
        case 0:
            day = "CN";
            break;
        case 1:
            day = "T2";
            break;
        case 2:
            day = "T3";
            break;
        case 3:
            day = "T4";
            break;
        case 4:
            day = "T5";
            break;
        case 5:
            day = "T6";
            break;
        case 6:
            day = "T7";
    }

    var CreatedTime = day + ', ' + dd + ' Th.' + mm + ' ' + yyyy;
    var PostTitle = $('#title').val();
    var PostDesc = $('#description').val();
    var PostContent = $('#content').val();
    var PostId = xoaDau(PostTitle);
    PostId = PostId.replace(/[ `~!@#$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/gi, '-');

    PostRef.child(PostId).set({
        PostTitle: PostTitle,
        PostDesc: PostDesc,
        CreatedTime: CreatedTime
    })

    PostContentRef.child(PostId).set({ PostContent: ReplaceTagContent(PostContent) })

})


// Add BBCode to textarea function
$('#add-text').on('click', function () {
    console.log('pressed');
    ContentArea.val(ContentArea.val() + '[text][/text]');
})
$('#add-header').on('click', function () {
    ContentArea.val(ContentArea.val() + '[title][/title]');
})
$('#add-img').on('click', function () {
    ContentArea.val(ContentArea.val() + '[img][/img]');
})