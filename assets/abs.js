// Runs a sheet's drawing in when it is first seen, and again when the pointer comes back to it.
// Without this script, or with reduced motion, the drawing simply shows finished.
;(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return
  function play(el) {
    el.classList.remove('play')
    void el.getBoundingClientRect()
    el.classList.add('play')
  }
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          io.unobserve(e.target)
          play(e.target)
        }
      })
    },
    { threshold: 0.3 },
  )
  Array.prototype.forEach.call(document.querySelectorAll('[data-abs]'), function (el) {
    io.observe(el)
    var last = 0
    el.addEventListener('mouseenter', function () {
      var now = Date.now()
      if (now - last < 2800) return
      last = now
      play(el)
    })
  })
})()
