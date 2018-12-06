class slideShow {
    constructor () {
      this.init();
    }
    init() {
       
    }
    
    prev_next(img_con_0, img_con_1, img_con_2, images) {
        const elements = document.querySelectorAll('.image-container');
        const dots =  document.querySelectorAll('.dot')

        let i = 0;
        let temp = (window.event.target.id == 'next') ?  images[0] : images[images.length-1];
        let index = (window.event.target.id == 'next') ?  0 : images.length-1;

        let array = [...elements];
        array.push(array.shift());
        array.reduce((p, el) => {
            return p
            .then(() => new Promise(resolve => {
                const fn = (e) => {
                    el.removeEventListener('transitionend', fn);
                    resolve();
                };
                el.style.transition = "opacity .15s ease-out";
                el.addEventListener('transitionend', fn);
                el.style.opacity = "0";
            }));
        }, Promise.resolve());

        [...dots].forEach((el, p) => {
            el.addEventListener("click", function() {
                alert(p)
            });
        });

        if (index == 0 ) {
            for (index; index < images.length; index++) {
                images[index] = images[index + 1];
                if (index === images.length-1 ) {
                    images[index] = temp;
                }
            }
        }
        else {
            for (index; index >=0; index--) {
                images[index] = images[index - 1];
                if (index === 0 ) {
                    images[index] = temp;
                }
            }
        } 

        let timer = setTimeout(() => {
            
            img_con_0.style.backgroundImage = "url("+images[i + 1]+")";
            img_con_1.style.backgroundImage = "url("+images[i]+")";
            img_con_2.style.backgroundImage = "url("+images[i + 2]+")";
            
            [...elements].reduce((p, el) => {
                return p
                  .then(() => new Promise(resolve => {
                    const fn = (e) => {
                      el.removeEventListener('transitionend', fn);
                      resolve();
                    };
                    el.style.transition = "opacity .2s ease-in";
                    el.addEventListener('transitionend', fn);
                    el.style.opacity = "1";
                  }));
              }, Promise.resolve(clearInterval(timer)));

        }, 700);  
    }
  }
  module.exports = slideShow;