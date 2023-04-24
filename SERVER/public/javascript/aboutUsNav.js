window.onscroll = function() {scrollFixAbout()};
const navListItems = document.querySelectorAll('#navListElements')

const scrollFixAbout = () => {
    if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80){
        document.getElementById('headerHome').style.backgroundColor='rgba(86.3,7.8,23.5,0.7)'
        document.getElementById('logoBrand').style.color='white'
        for(let i of navListItems){
            i.style.color='white'
            i.classList.add('li-ele-2')
            i.classList.remove('li-ele')
        }
    }else{
        document.getElementById('headerHome').style.backgroundColor='#fff'
        document.getElementById('logoBrand').style.color='#880808'
        for(let i of navListItems){
            i.style.color='black'
            i.classList.add('li-ele')
            i.classList.remove('li-ele-2')
        }
    }
}