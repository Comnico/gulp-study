'use strict';
var app = angular.module('myApp', ['ngMaterial', 'ngResource', 'ngSanitize']);
app.controller('mainCtrl', function ($scope, $mdSidenav, $resource) {
    // アクセストークン
    var accessToken = 'CAAOfvlLEalYBAMAZBwaII1bFCibAWpHDNZCnFH3wDjGgC2Iw4d0du00y6RiC9MurHT4zu9guruR8yjhVLDdFoy6Lb4xAMl2W19J0ZBRUuQz8VZBAw8REismJ4UaHnTqfWnYTJ9qjIMnHMZCGpvFsqfNzX3mmVJcguo8JryHoewI7jxk91NGCovFnrgnhPCIQThuHIZBMMi8OnDBYz4rsR9TmJuOC0QH78ZD';
    // FacebookページID
    //var fbPageId = [
    //  '22092443056',
    //  '131861646933650'
    //];
    $scope.fbPages = [
        {
            id: 22092443056,
            name: 'Starbucks',
            pictureUrl: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xfp1/v/t1.0-1/c1.0.50.50/p50x50/960181_10151919982378057_997575693_n.jpg?oh=0f6986a6bec0b1b1ee1e3e281a6f023c&oe=56237AEA&__gda__=1445153648_eb40a1774d23c09e6e38c4e18a724d16'
        },
        {
            id: 131861646933650,
            name: 'キリンラガービール',
            pictureUrl: 'https://scontent.xx.fbcdn.net/hprofile-xfa1/v/l/t1.0-1/p100x100/429498_170265496426598_1517473945_n.jpg?oh=313994247ed2ec07e7682686a8ed2e6f&oe=5620438F'
        }
    ];
    // 投稿データを初期化
    var postData = {};
    $scope.posts = [];
    $scope.changeFeed = function (fbPageId) {
        // Feedを取得
        var resource = $resource('https://graph.facebook.com/' + fbPageId + '/feed?access_token=' + accessToken, {});
        postData = resource.get();
        // 投稿データ格納処理
        postData.$promise.then(function (data) {
            angular.forEach(postData.data, function (post, index) {
                $scope.posts[index] = {
                    // 投稿ID
                    postId: post.id,
                    // 投稿日時
                    createdTime: post.created_time,
                    // 投稿者ID
                    fromUserId: post.from.id,
                    // 投稿者名
                    fromUserName: post.from.name,
                    // 投稿本文
                    message: post.message,
                    // 投稿画像
                    picture: post.picture
                };
            });
        });
    };
    $scope.toggleSidenav = function (menuId) {
        $mdSidenav(menuId).toggle();
    };
});
