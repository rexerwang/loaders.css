/*!
 * loaders.css加载动画
 *
 * Forked: <code>ConnorAtherton/loaders.css</code>
 * {@link https://github.com/ConnorAtherton/loaders.css}
 *
 * @author Connor Atherton
 * @author rexer
 */
~function () {

  /**
   * 动画 - div数量
   */
  const divs = {
    'ball-pulse': 3,
    'ball-grid-pulse': 9,
    'ball-clip-rotate': 1,
    'ball-clip-rotate-pulse': 2,
    'square-spin': 1,
    'ball-clip-rotate-multiple': 2,
    'ball-pulse-rise': 5,
    'ball-rotate': 1,
    'cube-transition': 2,
    'ball-zig-zag': 2,
    'ball-zig-zag-deflect': 2,
    'ball-triangle-path': 3,
    'ball-scale': 1,
    'line-scale': 5,
    'line-scale-party': 4,
    'ball-scale-multiple': 3,
    'ball-pulse-sync': 3,
    'ball-beat': 3,
    'line-scale-pulse-out': 5,
    'line-scale-pulse-out-rapid': 5,
    'ball-scale-ripple': 1,
    'ball-scale-ripple-multiple': 3,
    'ball-spin-fade-loader': 8,
    'line-spin-fade-loader': 8,
    'triangle-skew-spin': 1,
    'pacman': 5,
    'ball-grid-beat': 9,
    'semi-circle-spin': 1,
    'ball-scale-random': 3
  }

  /**
   * 添加div元素
   *
   * @param n
   * @returns {string}
   */
  function addDivs (n) {
    let arr = []
    for (let i = 1; i <= n; i++) {
      arr.push('<div></div>')
    }
    return arr.join('')
  }

  /**
   * loader container className
   * @type {string}
   */
  let ClassName = 'loaders'

  /**
   * 默认参数
   * @type {{body: string, position: string}}
   */
  let defaults = {
    body: 'body', // 挂载位置
    position: 'fixed', // 定位方式
    time: null // 延时关闭
  }

  /**
   * 加载动画类
   *
   * @class
   */
  class Loader {

    static animations = Object.keys(divs)

    /**
     *
     * @param animation
     * @param option
     */
    constructor (animation, option) {
      if (!Loader.animations.includes(animation)) {
        throw new Error('Not support')
      }
      this.option = Object.assign({}, defaults, option)
      let container = document.querySelector(this.option.body)
      if (!container) {
        throw new Error('Invalid `body` Element')
      }
      // remove all loaders
      Loader.clear()
      // init
      let loader = document.createElement('div')
      loader.className = ClassName + ' ' + this.option.position
      let inner = document.createElement('div')
      inner.className = 'loader ' + animation
      inner.innerHTML = addDivs(divs[animation])
      // append
      loader.appendChild(inner)
      container.appendChild(loader)
      this.container = container
      this.loader = loader
      // timeout
      this.option.timeout && this.timeout(this.option.timeout)
    }

    start () {
      this.loader.classList.add('loaded')
    }

    stop () {
      this.loader.classList.remove('loaded')
    }

    timeout (timeout) {
      clearTimeout(this.ticktock)
      this.ticktock = setTimeout(() => {
        Loader.clear()
      }, timeout)
    }

    close () {
      try {
        this.loader.parentNode.removeChild(this.loader)
      } catch (e) {}
    }

    static clear () {
      Array.from(document.querySelectorAll(ClassName)).forEach(loader => { loader.parentNode.removeChild(loader) })
    }
  }

  /**
   * 创建加载动画
   *
   * @param {Number|String} [animation]
   * @param {*} [option]
   * @param {Boolean} [started]
   * @returns {Loader}
   * @constructor
   */
  window.Loader = function (animation = 'freestyle', option = {}, started = true) {
    let length = Loader.animations.length
    // 你有free style么？
    if (animation === 'freestyle') {
      let freestyle = Math.floor(Math.random() * length)
      animation = Loader.animations[freestyle]
    }
    // 按动画索引
    else if (typeof animation === 'number') {
      animation = Loader.animations[animation]
    }
    let loader = new Loader(animation, option)
    started && loader.start()
    option.time && loader.timeout(option.time)
    return loader
  }

  window.Loader.clear = Loader.clear

}()
