export const introduction = function () {
  const typing = {
    _el: document.getElementsByClassName('introduction-content')[0],
    _textList: [
      'Vue',
      'Vue-router',
      'Vuex',
      'Vue-server-renderer',
      'Webpack',
      'Pug',
      'Stylus',
      'Koa'
    ],
    _colorList: [
      'introduction-content-vue',
      'introduction-content-vue',
      'introduction-content-vue',
      'introduction-content-vue',
      'introduction-content-webpack',
      'introduction-content-pug',
      'introduction-content-stylus',
      'introduction-content-koa'
    ],
    _listIndex: 0,
    _text: '',
    _cursorIndex: 0,
    _inputSpeed: 200,
    _delSpeed: 100,
    _waitFinished: 2000,
    _waitInput: 500,
    _timer: null,
    cleanTimer () {
      if (this._timer) {
        clearTimeout(this._timer)
        this._timer = null
      }
    },
    waiting (ms) {
      return new Promise((resolve, reject) => {
        typing.cleanTimer()
        typing._timer = setTimeout(resolve, ms)
      })
    },
    render () {
      this._el.innerHTML = this._text.slice(0, this._cursorIndex)
    },
    backspace () {
      if (typing._cursorIndex > 0) {
        typing._el.setAttribute('class', 'introduction-content')
        typing.waiting(typing._delSpeed).then(() => {
          typing._cursorIndex--
          typing.render()
          typing.backspace()
        })
      } else {
        if (typing._listIndex >= typing._textList.length) {
          typing._listIndex = 0
        }
        typing._text = typing._textList[typing._listIndex]
        typing._listIndex++
        typing.waiting(typing._waitInput).then(typing.loop)
      }
    },
    loop () {
      if (typing._text.length === typing._cursorIndex) {
        typing._el.setAttribute('class', `introduction-content ${typing._colorList[typing._listIndex - 1]}`)
        typing.waiting(typing._waitFinished).then(typing.backspace)
      } else {
        typing._cursorIndex++
        typing.render()
        typing.waiting(typing._inputSpeed).then(typing.loop)
      }
    },
    start () {
      typing.backspace()
    }
  }
  return typing.start()
}
