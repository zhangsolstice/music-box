export const spaceTravel = function () {
  let D = document
  let c = window
  let d = c.innerWidth
  let e = c.innerHeight
  let g = D.getElementsByClassName('bg')[0]
  let i = d / 2
  let j = e / 2
  g.width = d
  g.height = e
  let k = g.getContext('2d')
  k.globalAlpha = 0.3
  let l = Math
  let m = l.random
  let n = l.sin
  let o = l.floor
  let p = 10
  let q = []
  let r = 0
  let s = 0.1
  let V = 500
  let W = 190
  let Q = 0.3

  function E (n, f) {
    g.addEventListener(n, f, !1)
  }
  E('mousemove', function (a) {
    i = a.clientX
    j = a.clientY
  })

  function t (a) {
    let f = 0
    if (a.detail) f = -a.detail / 3
    else f = a.wheelDelta / 120
    if ((f > 0 && s < 1) || (f < 0 && s + f / 25 > 0.1)) {
      s += f / 25
    }
  }
  E('DOMMouseScroll', t)
  E('mousewheel', t)

  function u (a) {
    a.x = (m() * d - d * 0.5) * p
    a.y = (m() * e - e * 0.5) * p
    a.a = p
    a.b = 0
    a.c = 0
  }
  for (let v = 0, w; v < V; v++) {
    w = {}
    u(w)
    q.push(w)
  }
  setInterval(() => {
    k.fillStyle = '#000'
    k.fillRect(0, 0, d, e)
    for (let a = i - d / 2 + d / 2, f = j - e / 2 + e / 2, h = 0; h < V; h++) {
      let b = q[h]
      let x = b.x / b.a
      let y = b.y / b.a
      let z = 1 / b.a * 5 + 1
      let A = n(Q * h + r) * 64 + W
      let B = n(Q * h + 2 + r) * 64 + W
      let C = n(Q * h + 4 + r) * 64 + W
      if (b.b !== 0) {
        k.strokeStyle = 'rgb(' + o(A) + ',' + o(B) + ',' + o(C) + ')'
        k.lineWidth = z
        k.beginPath()
        k.moveTo(x + a, y + f)
        k.lineTo(b.b + a, b.c + f)
        k.stroke()
      }
      b.b = x
      b.c = y
      b.a -= s
      if (b.a < s || b.b > d || b.c > e) {
        u(b)
      }
    }
    r += 0.1
  }, 25)
}
