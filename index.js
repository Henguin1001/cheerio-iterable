var cheerio = require('cheerio');

const implement = ['concat','copyWithin','entries','every','fill',
  'filter','find','findIndex','forEach','includes','indexOf','join','keys',
  'lastIndexOf','map','pop','push','reduce','reduceRight','reverse','shift',
  'slice','some','sort','splice','toLocaleString','toSource','toString','unshift','values'];
const implement_conflict = ['find', 'toLocaleString', 'toString'];

function Copy(){
  cheerio.apply(this, arguments);
}
Copy.prototype = Object.create(cheerio.prototype);
Copy.prototype.constructor = Copy;
Copy.prototype[Symbol.iterator] = function* () {
  // console.log(this);
  // var array = this.parent().children().toArray();
  // var array = [this];
  // var next = this.next();
  // while (next.length > 0) {
  //   array = [...array, next];
  //   next = next.next();
  // }
  // var test = this.siblings();
  // console.log(array);
  // var array = [this, ...(this.siblings().toArray())];
  // test.forEach((e)=>{
  //   console.log(e.text());
  // });
  // console.log(this.parent().children());
  var array = this.toArray().map((e,i)=>(new Copy(e)));
  yield* array[Symbol.iterator]();
};
implement.forEach(function(e){
  if(implement_conflict.includes(e)){
    Copy.prototype["array" + e] = function(){
      return ((Array.from(this))[e])(...arguments);
    };
  } else {
    Copy.prototype[e] = function(){
      return ((Array.from(this))[e])(...arguments);
    };
  }
});

module.exports = {
  load:function(){
    var $ = cheerio.load(...arguments);
    $.prototype = Copy.prototype;
    return $;
  }
};
