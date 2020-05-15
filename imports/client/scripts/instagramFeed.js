(function($) {
	$.fn.instagramFeed = function(options) {
		var instagramImages = $('#instagramImages');
		var settings = $.extend({
				isMobile: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
			}, options);

        instagramImages.css('width', settings.pluginWidth + '%');
		var imgNum = parseInt(settings.postsQuantity, 10);

        function nFormatter(num){
            if(num >= 1000000000){
                return (num/1000000000).toFixed(1).replace(/\.0$/,'') + 'G';
            }
            if(num >= 1000000){
                return (num/1000000).toFixed(1).replace(/\.0$/,'') + 'M';
            }
            if(num >= 1000){
                return (num/1000).toFixed(1).replace(/\.0$/,'') + 'K';
            }
            return num;
        }

        const fData = function(instaFeed) {
            if(settings.feedData == 'tag') {
                instaFeed = `https://www.instagram.com/explore/tags/${settings.tag}/?__a=1`;
            } else {
                instaFeed = `https://www.instagram.com/${settings.user}/?__a=1`
            }
            return instaFeed;
        }

		function getInstaData() {
			fetch(fData())
				.then(function(res) {
					return res.json();
				})
				.then(function(data) {
					let selectedOpt;
                    if(settings.feedData == 'tag') {
                        selectedOpt = data.graphql.hashtag.edge_hashtag_to_media.edges;
                    } else {
                        selectedOpt = data.graphql.user.edge_owner_to_timeline_media.edges;
                    }

					let output = '';
					selectedOpt.some(function(data, index) {
						output +=
                        `<div class="instaWrap">
                            <a href="https://www.instagram.com/p/${data.node.shortcode}" target="${settings.openLinks}">
                                <div class="instaOverlay">
                                    <div align="center" class="instaInfo">
                                        <div class="instaDi"><div class="instaLikes">
                                            <i class="fa fa-heart" style="font-size: calc(0.7vw + 0.7vh + 0.7vmin); line-height: inherit;"></i>&nbsp;
                                            <div class="instaNumL">${nFormatter(data.node.edge_liked_by.count)}</div></div>
                                        </div>
                                        <div class="instaGapI"></div>
                                        <div class="instaDi">
                                            <div class="instaComment">
                                                <i class="fa fa-comments-o" aria-hidden="true" style="font-size: calc(0.9vw + 0.9vh + 0.9vmin); line-height: inherit;"></i>&nbsp;
                                                <div class="instaNumR">${nFormatter(data.node.edge_media_to_comment.count)}</div>
                                            </div>
                                        </div>     
                                    </div>
                                </div>
                                <div class="instaImgBgr" style="background-image:url(${data.node.display_url})"></div>
                            </a>
                        </div>`;

						return index == imgNum - 1;
					});

                    output += '<div class="load-more-btn">' + settings.loadmoreBtnText + '</div>';
					document.getElementById('instagramImages').innerHTML = output;

                    var sbi = settings.spaceBetweenImages;
                    if (sbi > 3) sbi = 3;

                    instagramImages.css({
                        'padding-top': 'calc(' + sbi + '% / 2)',
                        'padding-right': 'calc(' + sbi + '% / 2)',
                        'margin-left': 'calc(' + -sbi + '% / 2)'
                    });
                    
                    var instaWrap = $('.instaWrap');
                    var loadMoreBtn = $('.load-more-btn');
                    var plugW = instagramImages.width();

                    if(settings.feedData == 'user' && imgNum >= 12 || settings.loadmoreBtnHide == 'true') {
                        loadMoreBtn.remove();
                    }    

                    loadMoreBtn.on('click', function() {
                        imgNum = imgNum + parseInt(settings.postsQuantity);
                        getInstaData();

                        if(settings.feedData == 'tag') {
                            if(selectedOpt.length <= imgNum) {
                                setTimeout(() => {
                                    loadMoreBtn.fadeOut();
                                }, 2000);
                            }  
                        } else {
                            if(imgNum >= 12) {
                                setTimeout(() => {
                                    loadMoreBtn.fadeOut();
                                }, 1000);
                            }   
                        }       
                    });

                    if (settings.columnsQuantity480 == '2' && plugW < 480) {
                        instaWrap.removeClass('col' + settings.columnsQuantity).addClass('col2');
                    } else {
                        instaWrap.removeClass('col2').addClass('col' + settings.columnsQuantity);
                    }
                    
                    if(settings.isMobile) {
                        instaWrap.removeClass('col' + settings.columnsQuantity).addClass('col2');
                        setTimeout(function () {
                            instaWrap.css({ 'width': 'calc(49.99% - ' + sbi + '%)' });
                            var colWM = $('.col2').css('width');
                            $('.col2').css('height', colWM);
                        }, 50);
                    }
                    
                    instaWrap.css({
                        'margin-bottom': sbi + '%',
                        'margin-left': sbi + '%',
                        'border-radius': settings.borderRadius + '%'
                    });

                    $('.col2').css({ 'width': 'calc(49.99% - ' + sbi + '%)' });
                    $('.col3').css({ 'width': 'calc(33.33% - ' + sbi + '%)' });

                    $('.instaLikes').css('color', settings.likesColor);
                    $('.instaComment').css('color', settings.commentsColor);
                    $('#instagramImages .fa').css('color', settings.iconsColor);

                    loadMoreBtn.css({
                        'background-color': settings.loadmoreBtnBackground,
                        'color': settings.loadmoreBtnTextColor,
                        'width': settings.loadmoreBtnWidth,
                        'height': settings.loadmoreBtnHeight,
                        'line-height': settings.loadmoreBtnHeight,
                        'font-size': settings.loadmoreBtnTextSize,
                        'border-radius': settings.loadmoreBtnBorderRadius,
                        'font-family': settings.loadmoreBtnFontFamily
                    });

                    loadMoreBtn.on('mouseenter', function () {
                        $(this).css({ 'color': settings.loadmoreBtnTextOnHover, 'background-color': settings.loadmoreBtnBackgroundOnHover });
                    }).on('mouseleave', function () {
                        $(this).css({ 'color': settings.loadmoreBtnTextColor, 'background-color': settings.loadmoreBtnBackground });
                    });

                    $('.instaOverlay').css({ 'background-color': settings.overlayColor, 'border-radius': settings.borderRadius + '%' });
                    $('.instaOverlay').on('mouseenter', function () {
                        $(this).css({ 'opacity': settings.overlayOpacity });
                    }).on('mouseleave', function () {
                        $(this).css({ 'opacity': 0 });
                    });

                    if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
                        var colW = $('.col' + settings.columnsQuantity).css('width');
                        $('.col' + settings.columnsQuantity).css('height', colW);
                        setTimeout(function () {
                            var colW = instaWrap.css('width');
                            instaWrap.css('height', colW);
                        }, 500);
                    }

                    if(settings.isMobile) {
                        instagramImages.css({'width': '100%', 'padding': 0, 'margin-left': '-1%'});
                        loadMoreBtn.css({
                            'font-size': '14px', 
                            'height': 'inherit', 
                            'width': '90%',
                            'line-height': 'calc(' + settings.loadmoreBtnHeight + ' / 1.5)'
                        });
                    }

                    var i = instagramImages.width();
                    if(i < 170) {
                        loadMoreBtn.css({
                            'font-size': '80%', 
                            'height': 'inherit', 
                            'width': '90%',
                            'line-height': 'calc(' + settings.loadmoreBtnHeight + ' / 1.5)',
                            'margin': '10px auto 5px auto'
                        });
                    } else {
                        loadMoreBtn.css({
                            'width': settings.loadmoreBtnWidth,
                            'height': settings.loadmoreBtnHeight,
                            'line-height': settings.loadmoreBtnHeight,
                            'font-size': settings.loadmoreBtnTextSize,
                            'margin': '15px auto'
                        });
                    }

                    var plugW = instagramImages.width();
                    if (settings.columnsQuantity480 == '2' && plugW < 480) {
                        instaWrap.removeClass('col' + settings.columnsQuantity).addClass('col2');
                        var colWM = $('.col2').css('width');
                        $('.col2').css('height', colWM);
                        instaWrap.css({ 'width': 'calc(49.99% - ' + sbi + '%)' });
                    } else {
                        if (settings.columnsQuantity == '2') {
                            instaWrap.removeClass('col' + settings.columnsQuantity).addClass('col2');
                            var colWM = $('.col2').css('width');
                            $('.col2').css('height', colWM);
                            instaWrap.css({ 'width': 'calc(49.99% - ' + sbi + '%)' });
                        } else {
                            if (!settings.isMobile) {
                                instaWrap.removeClass('col2').addClass('col' + settings.columnsQuantity);
                                var colW = $('.col' + settings.columnsQuantity).css('width');
                                $('.col' + settings.columnsQuantity).css('height', colW);
                                instaWrap.css({ 'width': 'calc(33.33% - ' + sbi + '%)' });
                            } else {
                                instaWrap.css({ 'width': 'calc(49.99% - ' + sbi + '%)' });
                                var colWM = $('.col2').css('width');
                                $('.col2').css('height', colWM);
                            }
                        }

                        $(window).on('resize', function () {
                            var plugW = instagramImages.width();
                            if (settings.columnsQuantity480 == '2' && plugW < 480) {
                                instaWrap.removeClass('col' + settings.columnsQuantity).addClass('col2');
                                var colWM = $('.col2').css('width');
                                $('.col2').css('height', colWM);
                                instaWrap.css({ 'width': 'calc(49.99% - ' + sbi + '%)' });
                            } else {
                                if (settings.columnsQuantity == '2') {
                                    instaWrap.removeClass('col' + settings.columnsQuantity).addClass('col2');
                                    var colWM = $('.col2').css('width');
                                    $('.col2').css('height', colWM);
                                    instaWrap.css({ 'width': 'calc(49.99% - ' + sbi + '%)' });
                                } else {
                                    if (!settings.isMobile) {
                                        instaWrap.removeClass('col2').addClass('col' + settings.columnsQuantity);
                                        var colW = $('.col' + settings.columnsQuantity).css('width');
                                        $('.col' + settings.columnsQuantity).css('height', colW);
                                        instaWrap.css({ 'width': 'calc(33.33% - ' + sbi + '%)' });
                                    } else {
                                        instaWrap.css({ 'width': 'calc(49.99% - ' + sbi + '%)' });
                                        var colWM = $('.col2').css('width');
                                        $('.col2').css('height', colWM);
                                    }
                                }
                            }

                            var i = instagramImages.width();
                            if(i < 170) {
                                loadMoreBtn.css({
                                    'font-size': '80%', 
                                    'height': 'inherit', 
                                    'width': '90%',
                                    'line-height': 'calc(' + settings.loadmoreBtnHeight + ' / 1.5)',
                                    'margin': '10px auto 5px auto'
                                });
                            } else {
                                loadMoreBtn.css({
                                    'width': settings.loadmoreBtnWidth,
                                    'height': settings.loadmoreBtnHeight,
                                    'line-height': settings.loadmoreBtnHeight,
                                    'font-size': settings.loadmoreBtnTextSize,
                                    'margin': '15px auto'
                                });
                            }
                        });
                    }
				})
				.catch(function() {
                    errorhandler();
				});
           
                function errorhandler() {
                    $('#instagramImages').append(`<div class="errorMessage">${settings.feedData} not found</div>`);
                }
		}
		getInstaData();
	};
})(jQuery);
