class Man {
  constructor(bl, my, img, x = 0, y = 0) {
    this.x = x
    this.y = y
    this.bl = bl
    this.my = my
    this.img = img
  }
}

class Game {
  constructor(type) {
    this.type = type
    this.canvas = document.getElementById('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.canvas.width = window.innerWidth - 48
    this.canvas.height = this.canvas.width
    this.space = this.canvas.width / 8
    this.start = this.space / 20
    this.onPlay = true
    this.count = 0
    this.initMap = [
      ['C0', 'M0', 'T0', 'Q0', 'K0', 'T1', 'M1', 'C1'],
      ['Z0', 'Z1', 'Z2', 'Z3', 'Z4', 'Z5', 'Z6', 'Z7'],
      [, , , , , , , ],
      [, , , , , , , ],
      [, , , , , , , ],
      [, , , , , , , ],
      ['z0', 'z1', 'z2', 'z3', 'z4', 'z5', 'z6', 'z7'],
      ['c0', 'm0', 't0', 'q0', 'k0', 't1', 'm1', 'c1']
    ]
    this.playMap = this.arrClone(this.initMap)
    this.mans = new Map()
    this.args = new Map()
  }

  init() {
    this.initMans()
    this.initEvent()
  }

  initEvent() {
    this.canvas.addEventListener('click',(e) => {
      this.getClickPoint(e)
    },false)
  }

  arrClone(arr) {
    const newArr = []
    for (let item of arr) {
      newArr.push(item)
    }
    return newArr
  }

  isInArray(arr,point) {
    for(let item of arr) {
      if(item[0] === point[0] && item[1] === point[1]) {
        return true
      }
      return false
    }
  }

  initMans() {
    this.args.set('c', {
        img: 'terge',
        my: 1,
        bl: 'c'
      })
      .set('m', {
        img: 'mori',
        my: 1,
        bl: 'm'
      })
      .set('t', {
        img: 'temee',
        my: 1,
        bl: 't'
      })
      .set('q', {
        img: 'bars',
        my: 1,
        bl: 'q'
      })
      .set('k', {
        img: 'han',
        my: 1,
        bl: 'k'
      })
      .set('z', {
        img: 'hcni',
        my: 1,
        bl: 'z'
      })
      .set('C', {
        img: 'terge2',
        my: -1,
        bl: 'c'
      })
      .set('M', {
        img: 'mori2',
        my: -1,
        bl: 'm'
      })
      .set('T', {
        img: 'temee2',
        my: -1,
        bl: 't'
      })
      .set('Q', {
        img: 'bars2',
        my: -1,
        bl: 'q'
      })
      .set('K', {
        img: 'han2',
        my: -1,
        bl: 'k'
      })
      .set('Z', {
        img: 'yima2',
        my: -1,
        bl: 'z'
      })
    const map = this.playMap
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        const key = map[i][j]
        const width = this.space - this.start * 2
        if (key) {
          const k = key.slice(0, 1)
          const bl = k.toLowerCase()
          const my = this.args.get(k).my
          const img = new Image()
          img.onload = () => {
            this.ctx.save()
            this.ctx.drawImage(img, this.space * j + this.start, this.space * i + this.start, width, width)
          }
          img.src = `img/${this.args.get(k).img}.png`
          this.mans.set(key, new Man(bl, my, img, j, i))
        }
      }
    }
  }

  getDomXY(dom) {
    let left = dom.offsetLeft
    let top = dom.offsetTop
    let current = dom.offsetParent
    while (current != null) {
      left += current.offsetLeft
      top += current.offsetTop
      current = current.offsetParent
    }
    return {
      x: left,
      y: top
    }
  }

  getClickPoint(e) {
    const domXY = this.getDomXY(this.canvas)
    const x = Math.floor((e.pageX - domXY.x) / this.space)
    const y = Math.floor((e.pageY - domXY.y) / this.space)
    console.log(x,y);
  }
}
