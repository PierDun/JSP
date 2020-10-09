<%@ page pageEncoding="UTF-8" %>

<html lang="ru">
<head>
  <meta charset="utf-8">
  <title>Лабораторная работа№1</title>

  <link rel="stylesheet" type="text/css" href="main.css">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"> </script>
    <script type="text/javascript" src="script.js"> </script>
</head>

<body onload="addListener('canvas'); createCanvas('canvas')">
<div class="container header">
  <span class="left">Группа P3212</span>
  <span class="center">Земнухов Владимир</span>
  <span class="right">Вариант 212304</span>
</div>

<div class="container task">
    <table>
        <tr>
          <td><img alt="задание" class="task_image" src="task.png" height=85% width=95%></td>
          <td><img alt="зона" src="area.png" height=77% width=100%></td>
        </tr>
    </table>
</div>

<div class="container form">
  <form class="form" action=${pageContext.request.contextPath}/control method="GET" onsubmit="return validate(this)" target="result_frame">

    <table>
      <tr>
        <td></td>
        <td><input type="radio" id="-3" name="X=-3" value="-3" onclick="radioClick(-3)">
          <label for="-3">-3</label></td>
        <td><input type="radio" id="-2" name="X=-2" value="-2" onclick="radioClick(-2)">
          <label for="-2">-2</label></td>
        <td><input type="radio" id="-1" name="X=-1" value="-1" onclick="radioClick(-1)">
          <label for="-1">-1</label></td>
      </tr>
      <tr>
        <td> X = </td>
        <td><input type="radio" id="0" name="X=0" value="0" onclick="radioClick(0)">
          <label for="0">0</label></td>
        <td><input type="radio" id="1" name="X=1" value="1" onclick="radioClick(1)">
          <label for="1">1</label></td>
        <td><input type="radio" id="2" name="X=2" value="2" onclick="radioClick(2)">
          <label for="2">2</label></td>
      </tr>
      <tr>
        <td></td>
        <td><input type="radio" id="3" name="X=3" value="3" onclick="radioClick(3)">
          <label for="3">3</label></td>
        <td><input type="radio" id="4" name="X=4" value="4" onclick="radioClick(4)">
          <label for="4">4</label></td>
        <td><input type="radio" id="5" name="X=5" value="5" onclick="radioClick(5)">
          <label for="5">5</label></td>
      </tr>
    </table>

    <table>
      <tr>
        <td></td>
        <td><input type="checkbox" id="r1" name="R=1" value="1" onclick="checkClick(1)">
          <label for="r1">1</label></td>
        <td><input type="checkbox" id="r2" name="R=2" value="2" onclick="checkClick(2)">
          <label for="r2">2</label></td>
        <td><input type="checkbox" id="r3" name="R=3" value="3" onclick="checkClick(3)">
          <label for="r3">3</label></td>
      </tr>
      <tr>
        <td> R = </td>
        <td><input type="checkbox" id="r4" name="R=4" value="4" onclick="checkClick(4)">
          <label for="r4">4</label></td>
        <td><input type="checkbox" id="r5" name="R=5" value="5" onclick="checkClick(5)">
          <label for="r5">5</label></td>
      </tr>
    </table>

      <label for="X" hidden></label>
      <input id="X" required type="text" name="X" hidden><br>

      <label for="Y"> Y = </label>
      <input id="Y" required type="text" name="Y" placeholder="[-3 .. 5]" maxlength="10"><br>

      <label for="R" > </label>
      <input id="R" required type="text" name="R" hidden><br>

    <input id="submit" class="submit" type="submit" name="submit" value="ПРОВЕРИТЬ">
  </form>

  <canvas id="canvas" style="background-color:#ffffff; border-radius: 20px;"
          width="300" height="300"></canvas>

</div>

<div class="backgroundBlock">
  <div id="hint"></div>
</div>

<div >
  <iframe name="result_frame" height="120" width="700" id="result_frame"
          allowtransparency frameborder="no" scrolling="no" style="display:none"></iframe>
</div>

</body>
</html>