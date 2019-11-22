var PostRef = firebase.database().ref('/post/');
var PostContentRef = firebase.database().ref('/post-context/');
var pageView = $('.overlay');


// If page is loading >> preloader will show up
$(window).on('load', function () {
    $('.preloader').addClass('complete');
})

// Find and show post article when user enter hash on address bar
window.onload = function hasHash() {
    var hash = window.location.hash,
        hash = hash.replace('#', '');

    this.PostRef.once('value').then(
        function (snapshot) {

            if (snapshot.hasChild(hash)) {

                PostRef.child(hash).once('value').then(

                    function (snapshot) {

                        var PostData = snapshot.val(),
                            PostTitle = '<h1># ' + PostData.PostTitle + '</h1>';

                        $('.container').append(PostTitle);

                    }
                )

                PostContentRef.child(hash).once('value').then(
                    function (snapshot) {

                        var PostContentData = snapshot.val(),
                            PostContent = PostContentData.PostContent;

                        $('.container').append(PostContent);

                    }
                )

                pageView.show();
                $('body').addClass('noscroll');

            }
            else {
                // No post >> Do something
                $('.dialog').animate({ right: '20px' }, 300, function () {

                    setInterval(function () {
                        $('.dialog').animate({ right: '-100%' }, 1500)
                    }, 3000)

                });
            }
        }
    )

}

// Get post article
$(window).bind('hashchange', function detectHash() {
    var hashChange = window.location.hash,
        hashChange = hashChange.replace('#', '');

    if (hashChange != '') {

        PostRef.once('value').then(
            function (snapshot) {

                if (snapshot.hasChild(hashChange)) {

                    PostRef.child(hashChange).once('value').then(

                        function (snapshot) {

                            var PostData = snapshot.val(),
                                PostTitle = '<h1># ' + PostData.PostTitle + '</h1>';

                            $('.container').append(PostTitle);

                        }
                    )

                    PostContentRef.child(hashChange).once('value').then(
                        function (snapshot) {

                            var PostContentData = snapshot.val(),
                                PostContent = PostContentData.PostContent;

                            $('.container').append(PostContent);

                        }
                    )

                }

            }
        )

        pageView.show();
        $('body').addClass('noscroll');
    }
    else {
        pageView.hide();
        $('body').removeClass('noscroll');
        $('.container').empty();
    }

});

// Get post list
PostRef.on('child_added', function (snapshot) {
    var PostList = snapshot.val(),
        PostListId = snapshot.key,
        PostListTitle = PostList.PostTitle,
        PostListDesc = PostList.PostDesc,
        PostListCreatedTime = PostList.CreatedTime,
        completePostList = '<div class="post">' + '<a href="' + '#' + PostListId + '"' + '>' + PostListTitle + '</a>' + '<p>' + PostListDesc + '</p>' + '<time>' + PostListCreatedTime + '</time>' + '</div>';

    $('.main').prepend(completePostList);

})