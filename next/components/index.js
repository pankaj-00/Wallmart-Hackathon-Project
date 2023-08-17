const texts = document.querySelector('.transcript')
// window.SpeechRecognition= window.SpeechRecognition || window.webkitSpeechRecongiiton

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()
recognition.interimResults = false;
// recognition.continuous = true;

const btn2=document.querySelector('.speak');
const btn = document.querySelector('.TTSbutton');

btn.onclick = () => {
    recognition.start();
    console.log("start");
}
recognition.addEventListener(
    'result', (e) => { console.log(e.results[0][0].transcript) }

)
btn.onclick = () => {
    recognition.start();
    console.log("start");
}

const synth = window.speechSynthesis;
const voiceSelect = document.querySelector('#voice-select');

let voices = []
const getvoices = () => {
    voices = synth.getVoices();
    console.log(voices);
    voices.forEach(voice => {
        const option = document.createElement('option');
        option.textContent = voice.name + '(' + voice.lang + ')';
        option.setAttribute('datalang', voice.lang);
        option.setAttribute('dataname', voice.name);
        voiceSelect.appendChild(option);
    })
}

getvoices();
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getvoices;

}
const speak =()=>{
    if(synth.speaking){
        console.error('already speaking')
    }
    if (textInput.value !=='') {
        const speakText = new SpeechSynthesisUtterance(textInput.value);
        speakText.onend=e=>{
            console.log('done speaking  ');
        }
        speakText.onerror=e=>{
            console.log('error')
        }
        const selectedVoice=voiceSelect.selectedOptions[0].getAttribute('dataname');
        console.log(selectedVoice)
        voices.forEach(voice=>{
            if( voice.name ===selectedVoice){
                speakText.voice=voice
            }
        })
        synth.speak(speakText);
    }
}
btn2.onclick=speak
