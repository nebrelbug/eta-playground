window.onload = function() {
  var EtaConfig = Eta.defaultConfig
  var gui = new dat.GUI()
  gui.add(EtaConfig, 'autoEscape').onChange(update)
  gui
    .add(EtaConfig.tags, '0')
    .onChange(update)
    .name('Tag open')
  gui
    .add(EtaConfig.tags, '1')
    .onChange(update)
    .name('Tag close')

  //   gui.add(text, 'speed', -5, 5)
  //   gui.add(text, 'displayOutline')
  //   gui.add(text, 'explode')
}

var $result = document.getElementById('result')

function update() {
  var result = null,
    input = editor.getValue()
  try {
    result = Eta.render(input)
    $result.parentNode.style.background = '#27ae60'
  } catch (e) {
    result = e.stack
    $result.parentNode.style.background = '#c0392b'
  }

  $result.textContent = result
}

var editor = ace.edit('editor')
editor.setTheme('ace/theme/monokai')
editor.getSession().setMode('ace/mode/ejs')
editor.on('change', update)
editor.setValue(
  `OK, so have fun! :D
-------------------
<%
    var fruits = ["Apple", "Pear", "Orange", "Lemon"]
      , random = " ".repeat(18).split("").map(x => Math.random())
      ;
%>

These fruits are amazing:
<% for(var i = 0; i < fruits.length; ++i) {%>

  - <%=fruits[i]%>s<% } %>


Let's see some random numbers:

<% random.forEach((c, i) => {
%> <%=c.toFixed(10) + ((i + 1) % 6 === 0 ? "\\n": "") %><%});%>

You can put any JS inside tags:
-------------------------------

2+4 = <%= 2+4 %>

`,
  -1
)
editor.focus()
