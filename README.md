//javascriptChat
//How to Use

var values = [
  {
    value:10,
    tag:'a',
  },
  {
    value:20,
    tag:'b',
  },
  {
    value:30,
    tag:'c',
  },
  {
    value:25,
    tag:'d',
  },
];
var a = new PieChart(document.getElementsByTagName('canvas')[0]);
a.setValues(values);
a.draw();
//done!!!
