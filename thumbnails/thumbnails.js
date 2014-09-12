
$.Thumbnails = function(el){
  this.$el = $(el);
  this.$images = this.$el.find(".items").children();
  this.$imageNav = $("<div class='imageNav'> </div>");
  
  this.$gutter = $("<ul class='gutter'> </ul>"); 
  this.gutterImages = [0,1,2,3];
  this.fillGutter();
  
  this.$imageNav.append(this.$gutter);
  this.$imageNav.prepend($("<a href='#' id='left'> < </a>"));
  this.$imageNav.append($("<a href='#' id='right'>  > </a>"));

  //defaults
  this.$currentTopImage = $(this.$images[0]).clone();
  this.$currentTopImage.addClass("active");
  var temp = $("<div class='bigImage'></div>");
  temp.append($(this.$currentTopImage));
  this.$el.append(temp);
  this.$el.append(this.$imageNav);
 
  //this.setActiveImage();
  // event handler on hover (active thumbnail)
  // event handler on click (active image)
  

  $('#left').on('click', this.rotateLeft.bind(this));
  $('#right').on('click', this.rotateRight.bind(this));
  $('.gutter').on('click', "li", this.setActiveImage.bind(this));
  $('.gutter').on('mouseover', "li", this.setActiveThumb.bind(this));
};

$.Thumbnails.prototype.fillGutter = function() {
  // push each gutterImage into the gutter
  for (var i = 0; i < this.gutterImages.length; i++) {
    var temp = $("<li> </li>");
    temp.append($(this.$images[this.gutterImages[i]]));
    this.$gutter.append(temp);
  }
   
};

$.Thumbnails.prototype.setActiveImage = function(event) {
  this.$currentTopImage.removeClass("active");
  this.$el.find(".bigImage").empty();
  this.$currentTopImage = $(event.currentTarget).find("img").addClass("active");
  this.$el.find(".bigImage").append(this.$currentTopImage.clone() );
};

$.Thumbnails.prototype.setActiveThumb = function(event) {

  var tempTopBox = $("<div class='tempTop'></div>");
  var tempTop = $(event.currentTarget).find("img").addClass("hovered");
  tempTopBox.append(tempTop.clone() );
  this.$el.append(tempTopBox);
};

$.Thumbnails.prototype.rotateLeft = function() {
      this.rotate(-1);
};

$.Thumbnails.prototype.rotateRight = function() {
      this.rotate(1);
};

$.Thumbnails.prototype.rotate = function (dir) {
  this.$gutter.empty();
  if (dir === -1) {
    if(this.gutterImages[0] - 1 < 0){
      var temp = Math.abs(this.gutterImages[0] - 1);
      this.gutterImages.unshift(this.gutterImages.length - temp);  
    } else {
      this.gutterImages.unshift(this.gutterImages[0] - 1);
    }
    this.gutterImages.pop();
  }
  var lastEl = this.gutterImages[this.gutterImages.length - 1];
  if (dir === 1 ) {
    this.gutterImages.push((lastEl + 1) % this.gutterImages.length);
    this.gutterImages.shift();
  }
  this.fillGutter();
  
};


$.fn.thumbnails = function () {
  return this.each(function (){
    new $.Thumbnails(this);
  });
};
