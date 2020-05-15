import './card.html';
import './card.scss';

Template.card.onCreated(()=> {
});

Template.card.onRendered(()=> {

});

Template.card.helpers({
  user() {
    return Meteor.users.findOne({_id: FlowRouter.getParam('id')})
  },

  instagramFeed(username) {
    $(function () {
      $('#instagramImages').instagramFeed({

        //Feed Options
        feedData: 'user', // Feed source: user or tag
        user: username, // Enter Instagram username to display its feed (displays up to 12 latest posts)
        tag: 'eventosdf', // Enter Instagram hashtag to display its feed. Do not add # before the hashtag
        postsQuantity: '3', // Number of photos to display initially

        //Main Options
        pluginWidth: '100', // Feed width in percents
        columnsQuantity: '3', // Number of columns in the feed: 2 or 3
        columnsQuantity480: '3', // Number of columns in the feed when width is less than 480px: 2 or 3
        spaceBetweenImages: '1', // Space between the photos in the feed. Min: 0, Max: 3
        borderRadius: '3', // Photos corner radius. Max: 50
        overlayColor: '#000', // Photos overlay color on rollover
        overlayOpacity: '0.7', // Photos overlay opacity on rollover. Min: 0, Max: 1
        likesColor: '#fff', // Color of photo likes
        commentsColor: '#fff', // Color of photo comments
        iconsColor: '#fff', // Color of the likes and comments icons
        openLinks: '_blank', // Open Instagram links in the same or new browser tab: _self or _blank

        //Load More Button Options
        loadmoreBtnText: '+', // Load More button text
        loadmoreBtnWidth: '100px', // Load More button width
        loadmoreBtnHeight: '30px', // Load More button height
        loadmoreBtnTextSize: '15px', // Load More button text size
        loadmoreBtnFontFamily: 'arial', // Load More button text font
        loadmoreBtnTextColor: '#fff', // Load More button text color
        loadmoreBtnTextOnHover: '#fff', // Load More button text color on rollover
        loadmoreBtnBackground: '#4492D8', // Load More button background color
        loadmoreBtnBackgroundOnHover: '#306697', // Load More button background color on rollover
        loadmoreBtnBorderRadius: '5px', // Load More button corner radius
        loadmoreBtnHide: 'true', // Hide Load More button: false, true
      });
    });
  }
});

Template.card.events({
});
