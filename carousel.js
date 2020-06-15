class ImageCarousel {
  constructor() {
    this.carouselframe = document.querySelector('.carousel-frame');
    this.imagesContainer = document.querySelector('.images-container');
    this.imagesContainerWidth = this.imagesContainer.offsetWidth;
    this.totalImages = this.imagesContainer.children.length;
    this.totalwidth = this.imagesContainerWidth * this.totalImages;
    this.imagesContainer.style.width = this.totalwidth + 'px';
    this.dotCollection = [];
    this.transitionTime = 1;
    this.holdTime = 3000;
    this.speed = 5;
    this.left = 0;
    this.index = 0;
    this.newIndex = 0;
  }

  init() {
    this.createDots();
    this.createArrows();
    this.initializeSlider();
  }

  createDots() {
    const dotsContainer = document.createElement('div');
    dotsContainer.setAttribute('style', 'transform:translateX(-50%); position:absolute; z-index:1; bottom:15px; left:50%;');
    this.carouselframe.appendChild(dotsContainer);

    for(let i=0; i<this.totalImages; i++){
      const dot = document.createElement('div');
      dot.setAttribute('style', 'height:10px; width:10px; border:2px solid black; border-radius:50%; background:white; display:inline-block; margin:5px; cursor:pointer;');
      dotsContainer.appendChild(dot);
      this.dotCollection.push(dot);
    }
  }

  createArrows() {
    const leftArrow = document.createElement('div');
    const rightArrow = document.createElement('div');
    leftArrow.setAttribute('style', 'position:absolute; top:50%; transform:translateY(-50%) rotate(-90deg); left:15px; z-index:1; font-weight:bolder; font-size: 3rem; color:white; opacity:85%; cursor:pointer;')
    rightArrow.setAttribute('style', 'position:absolute; top:50%; transform:translateY(-50%) rotate(90deg); right:15px; z-index:1; font-weight:bolder; font-size: 3rem; color:white; opacity:85%; cursor:pointer;')
    leftArrow.textContent = '^';
    rightArrow.textContent = '^';
    this.carouselframe.appendChild(leftArrow);
    this.carouselframe.appendChild(rightArrow);
  }

  slideImage(index, newIndex){
    const moveImage = setInterval(() => {
      this.left = this.left + this.speed * (newIndex-index);
      
      if (this.left === this.imagesContainerWidth * newIndex){
        clearInterval(moveImage);
        this.initializeSlider();
      }
      this.imagesContainer.style.left = -this.left + 'px'; 
      
      
    },this.transitionTime);

  }

  initializeSlider(){
    setTimeout(() => {
      this.slideImage(this.index, this.newIndex);
    }, 5000);
    
    this.dotCollection[this.index].style.background = 'white';
    this.dotCollection[this.newIndex].style.background = 'black';
    this.index = this.newIndex;
    this.newIndex ++;
    
    if(this.newIndex === this.totalImages){
      this.newIndex = 0;
    }
    
  }

}

let imageCarousel = new ImageCarousel();
imageCarousel.init();