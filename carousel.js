class ImageCarousel {
  constructor(transitionSpeed, holdTime) {
    this.carouselframe = document.querySelector('.carousel-frame');
    this.imagesContainer = document.querySelector('.images-container');
    this.imagesContainerWidth = this.imagesContainer.offsetWidth;
    this.totalImages = this.imagesContainer.children.length;
    this.totalwidth = this.imagesContainerWidth * this.totalImages;
    this.imagesContainer.style.width = this.totalwidth + 'px';
    this.dotCollection = [];
    this.transitionTime = 1;
    this.speed = transitionSpeed;
    this.holdTime = holdTime * 1000;
    this.left = 0;
    this.index = 0;
    this.newIndex = 0;
  }

  init() {
    this.createDots();
    this.createArrows();
    this.indicateDot();
    this.automateSlider();
    this.dotNavigate();
    this.arrowNavigate();
  }

  createDots() {
    this.dotsContainer = document.createElement('div');
    this.dotsContainer.setAttribute('style', 'transform:translateX(-50%); position:absolute; z-index:1; bottom:15px; left:50%;');
    this.carouselframe.appendChild(this.dotsContainer);

    for (let i = 0; i < this.totalImages; i++) {
      const dot = document.createElement('span');
      dot.setAttribute('style', 'height:10px; width:10px; border-radius:50%; background:white; display:inline-block; margin:5px; cursor:pointer; opacity:50%');
      this.dotsContainer.appendChild(dot);
      this.dotCollection.push(dot);
    }
  }

  createArrows() {
    this.leftArrow = document.createElement('div');
    this.rightArrow = document.createElement('div');
    this.leftArrow.setAttribute('style', 'position:absolute; top:50%; transform:translateY(-50%) rotate(-90deg) scale(1.5, 1.1); left:15px; z-index:1; font-weight:bolder; font-size: 3rem; color:white; opacity:80%; cursor:pointer;')
    this.rightArrow.setAttribute('style', 'position:absolute; top:50%; transform:translateY(-50%) rotate(90deg) scale(1.5, 1.1); right:15px; z-index:1; font-weight:bolder; font-size: 3rem; color:white; opacity:80%; cursor:pointer;')
    this.leftArrow.textContent = '^';
    this.rightArrow.textContent = '^';
    this.carouselframe.appendChild(this.leftArrow);
    this.carouselframe.appendChild(this.rightArrow);
  }

  indicateDot(){
    this.dotCollection.forEach(dot => {
      dot.style.opacity = '50%';
    });
    this.dotCollection[this.newIndex].style.opacity = '100%';
  }
  clear(){
    clearInterval(this.moveImage);
    clearInterval(this.holdImage);
  }

  slideImage(index, newIndex) {
    clearInterval(this.holdImage);
    this.moveImage = setInterval(() => {
      this.left = this.left + this.speed * (newIndex - index);

      if (this.left === this.imagesContainerWidth * newIndex || this.left < 0 || this.left > this.totalwidth-this.imagesContainerWidth) {
        this.left = this.imagesContainerWidth * newIndex;
        clearInterval(this.moveImage);
        this.automateSlider();
      }

      this.imagesContainer.style.left = -this.left + 'px';
      
    }, this.transitionTime);
    
  }


  dotNavigate() {
    this.dotsContainer.addEventListener('click', e => {
      const targetDot = e.target.closest('span');
      if (!targetDot) return;
      this.clear();
      const targetIndex = this.dotCollection.findIndex(dot => dot === targetDot);
      this.index = this.newIndex;
      this.newIndex = targetIndex;
      if(this.index === this.newIndex){
        this.left = this.imagesContainerWidth*this.newIndex;
      }
      this.slideImage(this.index, this.newIndex);
      this.indicateDot();
    });
  }

  arrowNavigate(){
    this.leftArrow.addEventListener('click', () => {
      this.clear()
      this.index = this.newIndex;
      this.newIndex--
      if(this.newIndex < 0){
        this.newIndex = this.totalImages - 1;
      }
      this.slideImage(this.index, this.newIndex);
      this.indicateDot();
    });
    this.rightArrow.addEventListener('click', () => {
      this.clear();
      this.index = this.newIndex;
      this.newIndex++;
      if(this.newIndex === this.totalImages){
        this.newIndex = 0;
      }
      this.slideImage(this.index, this.newIndex);
      this.indicateDot();
    });
  }

  automateSlider() {
    this.holdImage = setInterval(() => {
      clearInterval(this.slideImage);
      this.index = this.newIndex;
      this.newIndex++;
      if (this.newIndex === this.totalImages){
        this.newIndex = 0;
      }
      this.slideImage(this.index, this.newIndex);
    }, this.holdTime);
    this.indicateDot();
  }

}

//ImageCarousel(<transitionSpeed in pixels>, <holdtime in seconds>)
let imageCarousel = new ImageCarousel(10, 2);
imageCarousel.init();