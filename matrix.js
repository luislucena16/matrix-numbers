class Matrix {
  constructor() {
    let elements = document.getElementsByClassName('matrix')
    this.elements = []
    for (let el of elements) {
      let vals = el.getAttribute('data-values') === null
        ? '0,1' : el.getAttribute('data-values')
      let emphasized = el.getAttribute('data-emphasized') === null
        ? [] : JSON.parse(el.getAttribute('data-emphasized'))

      vals = vals.split(',')
      this.elements.push({
        element: el,
        rows: el.getAttribute('data-rows') === null ? 1 : el.getAttribute('data-rows'),
        cols: el.getAttribute('data-cols') === null ? 1 : el.getAttribute('data-cols'),
        duration: el.getAttribute('data-duration'),
        vals,
        emphasized
      })
    }
    this.elements.forEach(el => {
      el.element.innerHTML = '<div class="matrix_alternate">'+el.element.innerHTML+'</div>'
      el.element.innerHTML += '<div class="matrix_div">'+this.init(el)+'</div>'
    })
  }

  init(el) {
    let html = '';
    for (let c = 0; c < el.rows; c++) {
      html += '<div class="matrix_row">'
      for (let r = 0; r < el.cols; r++) {
        let classes = 'number'
        if (el.emphasized[c] !== undefined && el.emphasized[c].indexOf(r) !== -1) {
          classes += ' emphasized'
        }
        html += `<span class="${classes}">`
        html += (Math.random() > .5 ? 1 : 0)
        html += '</span>'
      }
      html += '</div>'
    }
    return html
  }

  animate() {
      this.elements.forEach(el => {
        setInterval(() => {
          let numberContainers = el.element.querySelectorAll('span')
          //let numberToChange = Math.floor(Math.random() * numberContainers.length)
          // If the numberToChange array is added example: [numberToChange] the numbers change automatically
          numberContainers.innerHTML = el.vals[Math.floor(Math.random() * el.vals.length)]
        }, el.duration)
      })
  }
}

let m = new Matrix();
m.animate()
