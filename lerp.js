function linear(p)
{
	return p;
}
function square(p)
{
	return p^2
}
function root(p)
{
	return Math.sqrt(p)
}
function circular(p)
{
	return Math.sqrt(1 - (p-1)*(p-1));
}
function sine(p)
{
	return Math.sin(Math.PI*p / 2);
}
function perfect(p)
{
	return (1 - Math.cos(Math.PI * p))/2;
}
//
function lerp2(a, b, p)
{
  return a + (b-a) * perfect(p);
}

// var midpoint = 0.5
function lerp3(a, b, c, p, mid)
{
  if (p <= mid)
    return lerp2(a, b, p/mid);
  else
    return lerp2(b, c, (p-mid)/(1-mid));
}

// example
// let start = [255, 221, 0]
// let mid = [49, 44, 199]
// let end = [255, 0, 0]

// var svg = document.getElementById("svg")
// var svgns = "http://www.w3.org/2000/svg";
// let c = 0;
// for (let i = 0; i <= 1; i += 0.01)
// {
//   var rect = document.createElementNS(svgns, 'rect');
//   rect.setAttribute('x', c*2);
//   rect.setAttribute('y', 0);
//   rect.setAttribute('height', '50');
//   rect.setAttribute('width', '2');

//   let r = lerp3(start[0], mid[0], end[0], i)
//   let g = lerp3(start[1], mid[1], end[1], i)
//   let b = lerp3(start[2], mid[2], end[2], i)
  
//   console.log(r,g,b,i)

//   rect.setAttribute('fill', "rgb(" + r + "," + g + ","+ b + ")");
//   svg.appendChild(rect);
//   c++;
// }

export {lerp2, lerp3};