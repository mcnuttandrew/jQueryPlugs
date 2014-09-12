$.Tabs = function(el){
  this.$el = $(el);
  this.$contentTabs = $(this.$el.data().contentTabs);
  this.$activeTab = this.$contentTabs.find(".active");
  this.$el.on('click', 'li', this.clickTab.bind(this));
};

$.Tabs.prototype.clickTab = function(event){
 //remove
  this.$el.find(".active").removeClass("active");
  this.$contentTabs.find(".active").removeClass("active");
  var $targ = $(event.currentTarget);
  //new
  // var newActiveLink = ($targ.find("a")).addClass("active");//maybe not used
  var newActiveTab = this.$contentTabs.find(($targ.find("a").attr('href')));
  this.$activeTab.addClass("transitioning");
  
  var that =this;
  this.$activeTab.one("transitionend", function(){
    that.$activeTab.removeClass("transitioning");
    newActiveTab.addClass("active");
    that.$activeTab = newActiveTab;
  });
   
  event.preventDefault();
};

$.fn.tabs = function () {
  return this.each(function (){
    new $.Tabs(this);
  });
};

