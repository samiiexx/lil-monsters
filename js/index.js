$(function(){
    var headerContent = document.querySelector('.header-content')
    var nav = document.querySelector('.site-nav')
    var headerCue = document.querySelector('.header-cue')
    var meetMonsters = document.querySelector('#meet')
    var monsterScroll = document.querySelectorAll('#monster-group .monster')
    var navHeight = nav.scrollHeight

    monsterScroll.forEach(
        (item) => (item.style.animationDelay = `${Math.random() * .5 + .4}s`)
    )

    function inViewPort(el){
        var rect = el.getBoundingClientRect()
        return(
            (rect.top <=0 && rect.bottom >= 0) ||
            (rect.bottom >= window.innerHeight && rect.top <= window.innerHeight) || 
            (rect.top >= 0 && rect.bottom <= window.innerHeight)
        )
    }

    function moveHeader(){
        var top = window.pageYOffset
        var mainOnTop = meetMonsters.getBoundingClientRect().top - navHeight

        mainOnTop < 0
        ? nav.classList.add('in-body')
        : nav.classList.remove('in-body')

        var currentCuePosition = headerContent.getBoundingClientRect().top

        currentCuePosition < 0
        ? headerCue.classList.add('d-none')
        : headerCue.classList.remove('d-none')

        headerContent.style.transform = `translateY(-${top / 1.5}px)`

        headerContent.style.opacity = 1 - Math.max(top / (window.innerHeight * 0.2), 0)

        monsterScroll.forEach(
            (item) => inViewPort(item) 
        ? item.classList.add('appear') 
        : item.classList.remove('appear')
        )
        window.requestAnimationFrame(moveHeader)
    }

    window.requestAnimationFrame(moveHeader)

   
    var controller = new ScrollMagic.Controller()
    var friendTextTween = TweenMax.from('.friend-text', {
        y : 400, 
        opacity: 0,
})

    new ScrollMagic.Scene({
        triggerElement : '#friend',
        triggerHook : 0,
        duration: '100%',
    })
        .setTween(friendTextTween)
        .setPin('#friend')
        .addTo(controller)

        var parachuteTween = new TimelineMax()

        parachuteTween
        .from('#parachute', {
                scale: .5,
                opacity: 0.25,
                rotation: -40,
                x: '100%', y: '-200%'
            })
        .to('#parachute', {
            x: '30%',
            y: '20%',
            rotation: -30,
        })
        .to('#parachute', {
            x: '-80%',
            y: '250%',
            rotation: 30,
        })

        new ScrollMagic.Scene({
            triggerElement : '#friend',
            triggerHook : 0,
            duration: '170%',
        })
        .setTween(parachuteTween)
        .addTo(controller)

        var typesTween = new TimelineMax()
        
        typesTween.from('#types .col', {
            scale: .5,
            opacity: 0,
            stagger: .25,
        })

        new ScrollMagic.Scene({
            triggerElement: '#types',
            triggerHook: 0,
            duration: 300,

        })
        .setPin('#types')
        .setTween(typesTween)
        .addTo(controller)
})
// used when page loads
