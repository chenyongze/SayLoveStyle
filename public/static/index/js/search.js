$(document).ready(function() {



    var commentslist=$("#comment-lists-ul");

    // 记录当前点赞
    var liked_post = [];
    // 已经点赞了
    $("#main").on('click','.ui-icon-liked',function(){
        //提示
        layer.open({
            content: '已点赞'
            ,skin: 'msg'
            ,time: 2 //2秒后自动关闭
        });
    });
    // 未点赞的
    $("#main").on('click', ".ui-icon-like",function(event){
        var postID = $(this).data('post');
        // 判断是否已点赞
        if (liked_post.indexOf(postID) >= 0) {
            //提示
            layer.open({
                content: '已点赞'
                ,skin: 'msg'
                ,time: 2 //2秒后自动关闭
            });
            return;
        }else{
            liked_post.push(postID);
        }
        $.ajax({
            url: '/liked',
            type: 'POST',
            dataType: 'json',
            data: {post_id:postID},
            success:function(result){
                // console.log(result);
                $(event.target).html(result['data']).addClass('ui-icon-liked');
            }
        })
    });


    $("#main").on('click', ".ui-icon-guess",function(event){
        var postID = $(this).data('post');
        var proportion = $(this).text();
        var num = proportion.split("/");
        $("#guess_all").text(num[1]);
        $("#guess_right").text(num[0]);
        guess_post_id = postID;
    });
    // 猜名字
    $("#guess-submit").click(function(event) {
        var guessName = $("#guess-input").val();

        if (guessName != "") {
            $.ajax({
                url: '/guess',
                type: 'POST',
                dataType: 'json',
                data: {guessName:guessName, post_id:guess_post_id},
                success:function(result){
                    // console.log(result);


                    switch (result['code']) {
                        case 0:
                            var $all = $("#guess_all");
                            var guess_all = $all.text();
                            guess_all++;
                            $all.html(guess_all);
                        break;

                        default:
                            var $r=$("#guess_right");
                            var guess_right = $r.text();
                            guess_right++;
                            $r.html(guess_right);
                            $("#guess-submit").attr('disabled',true);
                        break;

                    }

                    $("#guess-hint").text(result.msg);
                },
                fail:function () {
                    console.log("error");
                },
                always:function(){
                    console.log("complete");
                    $("#guess-input").val("");
                }
            })
        }
    });

    //分享share-Popup
    $("#main").on('click', "a.ui-icon-share",function(event){

        var postID = $(this).attr('data-post');
        layer.open({
            content: '直接扫描二维码~'
            ,btn: '朕知道了'
        });
        // 此行控制生成的分享链接
        $("<a>").attr('target', '_blank').attr('href', './share/id/'+postID).text("戳我打开链接，复制给朋友").appendTo('#links');
    });


    // 评论展示
    $("#main").on('click', ".ui-icon-comment",function(event){

        var postID = $(this).attr('data-post');
        $("#comment-submit").attr('data-post', postID);

        $("#comment-lists-ul").html("");
        NProgress.start();

        $.ajax({
            url: '/comment',
            type: 'POST',
            dataType: 'json',
            data: {post_id:postID},
            success:function(result){
                NProgress.done();  // 进度条完成
                commentOutput(result);
            },
        })
    });
    // 提交评论
    $("#comment-submit").click(function(event) {
        var comment = $("#comment-Popup input").val();
        var postID = $(this).data('post');

        NProgress.start(); // 进度条开始

        // console.log(comment+"\n"+postID);
        if (comment != "") {
            $.ajax({
                url: '/commentpost',
                type: 'POST',
                dataType: 'json',
                data: {contents:comment, posts_id:postID},
                success:function(result){
                    $("#comment-hint").text(result.msg);

                    NProgress.done();  // 进度条完成

                    setTimeout(function(){
                        $("#comment-hint").text("");
                    },5000);


                    $("<li>").html('<span class="comment-floor">##</span><span class="comment-ip">保密</span><span class="comment-time">刚刚</span><p style="font-size:0.8rem">'+comment+'</p>').appendTo('#comment-lists-ul');
                    $("#contents-input").val("");
                },
                fail:function(){
                    console.log("error");
                },
                always:function(){
                    console.log("complete");
                    $("#comment-Popup input").val("");
                }
            })
        } else {

        }
    });
    function commentOutput(result) {
        $("#comment-lists-ul").html("");
        if (result == "") {
            $("#comment-lists-ul").text("快来抢沙发吧！");
        } else {
            $.each(result, function(index, val) {
                $("<li>").html('<span class="comment-floor">#'+(index+1)+'</span><span class="comment-ip">'+val['ip']+'</span><span class="comment-time">'+val['mtime']+'</span><p style="font-size:0.8rem">'+val['contents']+'</p>').appendTo('#comment-lists-ul');
            });
        }
    }


});


// 已迁移到display.js里面了
function output(result,count) {
    $("#main").html("");
    var total_page = "";
    $("<span>").addClass("post-body-time").html('<span>查找到了'+count+'条数据~~</span>').appendTo('#main');
    $.each(result, function(index, val) {

        var id = val['id'];
        var nickName = val['nickName'];
        var toWho = val['towho'];
        var contents = val['contents'];
        var love = val['love'];
        var guessCount = val['guess_yes'];
        var commentsCount = val['comment_count'];
        var time = val['mtime'];
        // total_page = val[8] + 1;
        var guessCount_all = val['guess_count'];
        var gender = val['gender'];
        var itsGender = val['itsGender'];
        var is_like = val['is_like'];
        var image =val['loveImage'];
        if(is_like != 0){
            var  is_likes = "ui-icon-liked";
        }else{
            var  is_likes = "ui-icon-like";
        }
        $("<div>").addClass('post').addClass('post-'+id).appendTo('#main');
        $("<div>").addClass('post-title').addClass('post-title-'+id).appendTo('.post-'+id);
        $("<ul>").html('<li class="'+gender+'">'+nickName+'</li><li><img src="https://upload-images.jianshu.io/upload_images/12353119-4fd3242e851fb388.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="" /></li><li class="'+itsGender+'">'+toWho+'</li>').appendTo('.post-title-'+id);
        $("<div>").addClass('post-body').addClass('post-body-'+id).appendTo('.post-'+id);
        $("<pre>").addClass('pre-'+id).appendTo('.post-body-'+id);
        $("<div>").addClass('post-body-content').text(contents).appendTo('.pre-'+id);
        if(image != "undefined"){
            $("<p>").addClass('post-body-image').html('<a href="'+image+'" data-fancybox="gallery"><img src= "'+image+'" original="'+image+'" style="max-width: 100%;max-height: 50%;border-radius: 5px;"/></a>').appendTo('.post-body-'+id);
        }

        $("<p>").addClass('post-body-time').text(time).appendTo('.post-body-'+id);
        $("<div>").addClass('post-actions action ui-navbar').addClass('post-actions-'+id).attr('data-role', 'navbar').attr('role', 'navigation').appendTo('.post-'+id);
        $("<ul>").addClass('ui-grid-c').addClass('post-actions-ul-'+id).appendTo('.post-actions-'+id);
        $("<li>").addClass('ui-block-a').html('<a class="ui-link ui-btn '+is_likes+' ui-btn-icon-left " href="#" data-post="'+id+'" data-icon="like">'+love+'</a>').appendTo('.post-actions-ul-'+id);
        $("<li>").addClass('ui-block-b').html('<a class="ui-link ui-btn ui-icon-guess ui-btn-icon-left " href="#guess-Name-Popup"  data-rel="popup" data-position-to="window"	data-transition="pop" data-post="'+id+'" data-icon="guess">'+guessCount+'/'+guessCount_all+'</a>').appendTo('.post-actions-ul-'+id);
        $("<li>").addClass('ui-block-c').html('<a class="ui-link ui-btn ui-icon-comment ui-btn-icon-left " href="#comment-Popup" data-rel="popup" data-position-to="window"	data-transition="pop" data-post="'+id+'" data-icon="comment">'+commentsCount+'</a>').appendTo('.post-actions-ul-'+id);
        $("<li>").addClass('ui-block-d').html('<a class="ui-link ui-btn ui-icon-share ui-btn-icon-left" href="#share-Popup" data-post="'+id+'" data-icon="share">分享</a>').appendTo('.post-actions-ul-'+id);
    });
    // $("#pages").attr('max', total_page);
}

function getCookie(c_name)
{
    if (document.cookie.length>0){
        c_start=document.cookie.indexOf(c_name + "=");
        if (c_start!=-1)
        {
            c_start=c_start + c_name.length+1;
            c_end=document.cookie.indexOf(";",c_start);
            if (c_end==-1) c_end=document.cookie.length;
            return unescape(document.cookie.substring(c_start,c_end));
        }
    }
    return "";
}
