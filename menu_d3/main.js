d3.select('input[type="button"]').on('click', function() {
    // Получаем список языков программирования из меню
// Получаем список языков программирования из меню
var languages = d3.selectAll('.menu a').nodes().map(a => a.textContent);
//console.log(languages);
    
// Получаем все описания языков программирования
  var descriptions = d3.selectAll('.content div').selectAll('b').nodes().map(a => a.textContent)
    
// Создаем связь между элементами описаний и массивом языков, используя функцию для сравнения
var Fulldescriptions = d3.selectAll('.content div').nodes()
//console.log(Fulldescriptions);
// Удаляем лишние элементы

    // Получаем все описания языков программирования
    
   let b = Fulldescriptions.filter(d => {
      let a = d3.select(d).select('b').text();
     return  languages.includes(a);
     }).map(item => item.innerHTML)
   
  //   console.log(b);
    
  
  d3.select(".content ")
        .selectAll("div")
        .data(b)
         .enter()
        .append('div')
       
         
        d3.select(".content")
        .selectAll("div")
        .data(b)
        .html((d)=> d);
       
      

      d3.select(".content")
      .selectAll("div")
      .data(b)
      .exit().remove();

   });
         
  
    // Добавляем новые элементы


    
    // Создаем связь между элементами описаний и массивом языков
   




   
     
    // Фильтруем описания, оставляя только те, которые есть в меню
