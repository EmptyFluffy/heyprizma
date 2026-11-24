// The Product menu: a button that opens a panel. Opens on click anywhere and also on hover where
// there is a real pointer; closes on Escape (the focus goes back to the button), on a click
// outside, when the focus leaves the bar, and when a link in it is followed.
;(function () {
  var btn = document.querySelector('.menu__btn')
  if (!btn) return
  var panel = document.getElementById(btn.getAttribute('aria-controls'))
  var bar = btn.closest('.nav')
  var hover = window.matchMedia('(hover: hover) and (pointer: fine)')
  var timer = 0
  var openedAt = 0
  function set(open) {
    window.clearTimeout(timer)
    if (open === (btn.getAttribute('aria-expanded') === 'true')) return
    btn.setAttribute('aria-expanded', String(open))
    panel.hidden = !open
    if (open) openedAt = Date.now()
  }
  btn.addEventListener('click', function () {
    var open = btn.getAttribute('aria-expanded') === 'true'
    // a click that follows the hover that just opened it keeps it open
    if (open && Date.now() - openedAt < 350) return
    set(!open)
  })
  btn.addEventListener('pointerenter', function () {
    if (hover.matches) set(true)
  })
  bar.addEventListener('pointerleave', function () {
    if (hover.matches) timer = window.setTimeout(function () { set(false) }, 180)
  })
  bar.addEventListener('pointerenter', function () {
    window.clearTimeout(timer)
  })
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
      set(false)
      btn.focus()
    }
  })
  document.addEventListener('pointerdown', function (e) {
    if (!bar.contains(e.target)) set(false)
  })
  bar.addEventListener('focusout', function (e) {
    if (e.relatedTarget && !bar.contains(e.relatedTarget)) set(false)
  })
  panel.addEventListener('click', function (e) {
    if (e.target.closest('a')) set(false)
  })
})()
