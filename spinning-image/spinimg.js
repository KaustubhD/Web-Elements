class SpinBatman extends HTMLElement{
  constructor(){
    super()
    this.attachShadow({
      mode: 'open'
    })
  }
  connectedCallback(){
    let temp = document.createElement('template')
    let styles = `
    <style>
      :host{
        display: inline-block;
      }
      ::slotted(img){
        width: 800px;
      }
    </style>
    `
    temp.innerHTML = styles + '<slot />'
    this.shadowRoot.appendChild(temp.content.cloneNode(true))

    this.animate([
      {transform: 'scale(0) rotate(1080deg)' },
      {transform: 'scale(1) rotate(0deg)' },
      {transform: 'scale(0) rotate(1080deg)' }
    ], {
      duration: 1000,
      easing: 'cubic-bezier(0.01, 0.26, 1, 0.75)',
      fill: 'forwards'
    })
  }
}

customElements.define('batman-spin', SpinBatman)