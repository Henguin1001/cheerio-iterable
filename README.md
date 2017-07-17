# cheerio-iterable
Adds iterable functionality to the cheerio module, and allows standard array functionality to used on cheerio/jquery elements.
## Install It
`npm install --save cheerio-iterable`

## Use it
```js
var cheerio = require('cheerio-iterable');
var $ = cheerio.load(html);
```

## Examples

#### Iterating over group of elements

html/xml:
```html
<div>
  <h1>foo</h1>
  <h1>bar</h1>
</div>
```
js:
```js
for(member of $('h1')){
  console.log("Text: "+member.text());
}
```

output:
```
Text: foo
Text: bar
```

#### Iterating over children of an element

html/xml:
```html
<div id="content">
  <h1>foo</h1>
  <h2>bar</h2>
</div>
```

js:
```js
for(child of $('#content').children()){
  console.log("Text: "+child.text());
}
```

output:
```
Text: foo
Text: bar
```

#### Using the iterable property

html/xml:
```html
<div>
  <h1>First</h1>
  <h1>Second</h1>
</div>
<div>
  <h3>Third</h3>
</div>
```
js:
```js
for (member of [...$('h3'),...$('h1')]) {
  console.log(member.text());
}
```

output:
```
Third
First
Second
```


### Array prototypes
Most of the array prototype methods have been implemented for cheerio (some replacing existing functions).
The `Array.prototype.find` function is implemented under `element.arrayfind` for a cheerio element "element".

#### Using the map function:

html/xml:
```html
<div id="content">
  <h1>Hello</h1>
  <h2>World</h2>
</div>
```
js:
```js
var array = $('#content')
  .children()
  .map((element)=>element.text());
console.log(array);
```

output:
```
['Hello', 'World']
```

#### Using the reverse function
js:
```js
var array = $('#content')
  .children()
  .reverse()
  .map((element)=>element.text());
console.log(array);
```
html/xml:
```html
<div id="content">
  <h1>Hello</h1>
  <h2>World</h2>
</div>
```
output:
```
['World', 'Hello']
```
