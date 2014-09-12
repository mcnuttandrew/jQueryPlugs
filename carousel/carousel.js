$.Carousel = function(el){
  this.$el = $(el);
  this.$activeImg = $(this.$el.find(".active"));

  this.activeIndex = parseInt(this.$activeImg.attr('id'),10);

  $('.slide-left').on('click', this.slideLeft.bind(this));
  $('.slide-right').on('click', this.slideRight.bind(this));
};

$.Carousel.prototype.slide = function(dir) {
  this.oldImg = this.$activeImg; 
 
  this.activeIndex = (this.activeIndex + dir) % 3;
  if(this.activeIndex < 0){
    this.activeIndex = 3 - Math.abs(this.activeIndex);
    
  }
  var newActiveImg = this.$el.find("#" + this.activeIndex);
  newActiveImg.addClass("active");
  
  if(dir < 0){
    newActiveImg.addClass("left");
    this.oldImg.addClass("right");
  } else {
    newActiveImg.addClass("right");
    this.oldImg.addClass("left");
  }
  
  this.$activeImg = newActiveImg;
  var that = this;
  setTimeout(function(){
    that.$activeImg.removeClass("left right");
  }, 0);
  
    this.oldImg.on("transitionend", function() {
       that.oldImg.removeClass("active");
    });
};

$.Carousel.prototype.slideLeft = function(){
  this.slide(-1);
};

$.Carousel.prototype.slideRight = function(){
  this.slide(1);
};



$.fn.carousel = function () {
  return this.each(function (){
    new $.Carousel(this);
  });
};