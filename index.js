document.addEventListener(`DOMContentLoaded`,()=> {
    
    // 배너 이미지 바뀌는 기능 
    const btns = document.querySelectorAll('#banner-wrap .btn');
    const sec1 = document.querySelector('.sec1');
    for (let btn of btns) {
        btn.addEventListener('click',function() {
            const url = this.dataset.image;
            sec1.style.backgroundImage = `url(${url})`
            this.classList.add('selected');
            for (let other of btns) {
                if (this !== other) {
                    other.classList.remove('selected')
                }
            }
            // --------------------------

            // 택스트 바뀌는 기능 
            const textId = this.dataset.text;
            const textBox = document.getElementById(textId);
            const textBoxs = document.querySelectorAll('.text')

            textBox.classList.add('active');

            for (const other of textBoxs) {
                if (textBox !== other) {
                    other.classList.remove('active');
                }
            }
        })
    };
    //-----------------------------------
    
    // 슬라이더 기능 
    const slider = document.querySelector('.slider');
    slider.addEventListener('mousedown',function(e) {
        slider.dataset.mouseDownAt = e.clientX
    })
    slider.addEventListener('mousemove',function(e){
        if (this.dataset.mouseDownAt === "0") return
        const currentX =  e.clientX - parseFloat(this.dataset.mouseDownAt);
        const percentage = 100 * currentX / (window.innerWidth === 0 ? 1 : window.innerWidth);
        
        const maxRoll = -100 * (slider.offsetWidth - window.innerWidth) / (slider.offsetWidth === 0 ? 1 : slider.offsetWidth)

        const locationRaw = percentage + parseFloat(this.dataset.prevPosition);

        const location = Math.max(Math.min(0, locationRaw),maxRoll);


        this.dataset.location = location;

        this.style.transform = `translateX( ${location}%)`

        this.animate({
            transform: `translateX( ${location}%)`
        }, { duration: 1200, fill: "forwards" });
    })
    slider.addEventListener('mouseup',function(e) {
        slider.dataset.mouseDownAt = "0"
        this.dataset.prevPosition = this.dataset.location;
    })

    slider.addEventListener('mouseleave', () => {
        slider.dataset.mouseDownAt = "0"
        slider.dataset.prevPosition = slider.dataset.location;
    });
    
    const images = document.querySelectorAll('img');
    
    images.forEach(function(image) {
        image.addEventListener('dragstart', function(event) {
            event.preventDefault();
        });
    });

    //-------------------------------------

    // 등장했고 스크롤 할 때 발생하는 효과


    const absoluteR = document.querySelector('.absolute-right');
    const absoluteL = document.querySelector('.absolute-left');
    const header = document.querySelector('header')


    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;

        if (scrollTop > 1890) {
            absoluteR.style.transform = `translateX(${(scrollTop - 1890) / 2}px)`
            absoluteL.style.transform = `translateX(${-1 * (scrollTop - 1890) / 2}px)`
        }

        if (scrollTop > 800) {
            header.style.backgroundColor = "#ffffffe4";
            header.style.marginTop = "0";
        } else {
            header.style.backgroundColor = "#ffffff00";
            header.style.marginTop = "20px";
        }
      });
});