class slideShow {
    constructor () {
      this.init();
    }
    init() {
        const img_con_0 = document.querySelector('.img-con-0');
        const img_con_1 = document.querySelector('.img-con-1');
        const img_con_2 = document.querySelector('.img-con-2');
        const next = document.getElementById('next');
        const prev = document.getElementById('prev');
        const dots = document.querySelectorAll('.dots--dot');
        const elements = document.querySelectorAll('.slider--container');
        const images = ['https://images.unsplash.com/photo-1488199457324-febb246574d1?ixlib=rb-0.3.5&q=85&fm=jpg',
            'https://images.unsplash.com/photo-1493414177420-81e7777a0dd5?ixlib=rb-0.3.5&q=85&fm=jpg',
            'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-0.3.5&q=85&fm=jpg'
        ]
        let current = 0;
        let i = 0;
        let k = 0;
        
        next.onclick = () => goNext();
        prev.onclick = () => goPrev();

        const goNext = () => {
            let temp = images[0];
                for (let index = 0; index < images.length; index++) {
                    images[index] = images[index + 1];
                    if (index === images.length - 1) {
                        images[index] = temp;
                    }
                }
            let z = (k === images.length) ? 0 : ++k;
            alert(z)
            //changeDot(z)
            change();
          }
          
          const changeDot = (p) => {
            let dot = document.getElementsByClassName("active");
            dot[0].className = dot[0].className.replace(" active", "");
            document.querySelectorAll('.dots--dot')[p].classList.add("active");
          }

          const goPrev = () => {
            let temp = images[images.length - 1];
                for (let index = images.length - 1; index >= 0; index--) {
                    images[index] = images[index - 1];
                    if (index === 0) {
                        images[index] = temp;
                    }
                }
                if (k >=1) {
                    k--;
                }
                else {
                    k = 2;
                }
            changeDot(k)
            change();
          }
          
          [...dots].forEach((el, p) => {
              el.addEventListener('click', () => { 
                if (p > current) {
                    goNext();
                }
                else if (p < current) {
                  goPrev();
                }
                current = p;
                changeDot(p);
              });
          });
          
          const change = () => {
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
                }))
            }, Promise.resolve());

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
                        el.style.transition = "opacity .1s ease-in";
                        el.addEventListener('transitionend', fn);
                        el.style.opacity = "1";
                    }))
                }, Promise.resolve(clearInterval(timer)));
            }, 500); 
          }
    }
  }
  module.exports = slideShow;