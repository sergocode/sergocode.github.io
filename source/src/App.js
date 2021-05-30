import logo from './logo.svg';
import './App.css';
import Desktop from './Desktop/Desktop';
import Clock from './Clock/Clock';

function App() {
  return (
    <div className='areas-container'>
        <Desktop />
        <Clock />
    </div>
  );
}

document.addEventListener('touchstart', touchstart, false)
document.addEventListener('touchmove', touchmove, false)

let startTouchX = null
let endTouchX = null

function touchstart(event) {
  startTouchX = event.touches[0].clientX
}

function touchmove(event) {
  endTouchX = event.touches[0].clientX

  if (startTouchX > endTouchX && Math.abs(startTouchX - endTouchX) > 100) {
    document.querySelector('.areas-container').classList.remove('back-slide')
    document.querySelector('.areas-container').classList.add('next-slide')
  }
  if (startTouchX < endTouchX && Math.abs(startTouchX - endTouchX) > 100) {
    document.querySelector('.areas-container').classList.remove('next-slide')
    document.querySelector('.areas-container').classList.add('back-slide')
  }
}

export default App;
