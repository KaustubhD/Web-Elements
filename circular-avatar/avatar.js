const ELEMENT_NAME = 'circular-avatar'
class MyEl extends HTMLElement{
  constructor(){
    super()
    this.styles = `
      <style>
        :host{
          --height: 250px;
          display: block;
        }
        ::slotted(img){
          position: relative;
          left: -25%;
          filter: contrast(96%);
          height: var(--height);
        }
        slot[name="image"]{
          display: block;
        }
        #img-container{
          position: relative;
          overflow: hidden;
          border-radius: 50%;
          height: var(--height);
          width: var(--height);
          cursor: pointer;
        }
        #img-container::after{
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          height: 100%;
          width: 100%;
          top: 0;
          left: 0;
          background-color: rgba(255, 97, 0, 0.3);
          color: #fff;
          font-size: 55px;
          letter-spacing: 2px;
          opacity: 0;
          transform: rotate(20deg);
          transition: all 0.2s cubic-bezier(0, 0, 0.3, 1);
        }
        #img-container:hover::after{
          opacity: 1;
          transform: rotate(0deg);
        }
      </style>
    `
    // rgb(161,47,91) -- Another color
    this.comp = 0
    this.af = 0
    this.attachShadow({
      mode: "open"
    })
  }

  connectedCallback(){
    let template = document.createElement('template')
    template.innerHTML = this.styles + `
    <div id="img-container">
      <slot name="image"></slot>
      <slot id="text"></slot>
    </div>
    `
    
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    let textSlot = this.querySelector('span').textContent
    this.shadowRoot.styleSheets[0].addRule('#img-container::after','content: "' + textSlot + '";');
    this.addEvents()
  }

  addEvents(){
    this.outer = this.shadowRoot.querySelector('#img-container')
    this.inner = this.shadowRoot.querySelector('slot[name="image"]')

    this.ease = 0.3
    this.initialScale = 0.6
    this.finalScale = 1

    this.currentScale = this.initialScale

    this.outerElementScale = this.currentScale
    this.innerElementScale = 1 / this.outerElementScale
    

    this.outer.addEventListener('mouseenter', function(){
      this.currentScale = this.finalScale
      this.af = requestAnimationFrame(this.update)
    }.bind(this))

    this.outer.addEventListener('mouseleave', function(){
      this.currentScale = this.initialScale
      this.af = requestAnimationFrame(this.update)
    }.bind(this))

    this.update = this.update.bind(this)
    this.af = requestAnimationFrame(this.update)
  }

  update(){
    this.outerElementScale += (this.currentScale - this.outerElementScale) * this.ease
    if(this.comp === this.outerElementScale){
      cancelAnimationFrame(this.af)
      return
    }
    this.innerElementScale = 1 / this.outerElementScale
    this.comp = this.outerElementScale
    
    this.outer.style.transform = `scale(${this.outerElementScale})`
    this.inner.style.transform = `scale(${this.innerElementScale})`


    this.af = requestAnimationFrame(this.update)
  }
}

customElements.define(ELEMENT_NAME, MyEl)