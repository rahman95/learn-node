import axios from 'axios';
import { $ } from './bling';

function ajaxHeart(e) {
    e.preventDefault();

    const heartCount = $('.heart-count');
    const cardHeart = this.heart;
  
    axios.post(this.action)
        .then(res => {
            const isHearted = cardHeart.classList.toggle('heart__button--hearted');
            heartCount.textContent = res.data.length;
            if(isHearted) {
                cardHeart.classList.add('heart__button--float');
                setTimeout(() => {
                    cardHeart.classList.remove('heart__button--float')
                },2500)
            }
        })
        .catch(err => {
            console.error(err);
        })
}

export default ajaxHeart;