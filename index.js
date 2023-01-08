var btn = undefined

window.onload=function(){
    btn= document.getElementById("submit-button");


    btn.addEventListener('click', function(){
    
        var resultList = document.querySelectorAll('.result');
        resultList.forEach(result => {
        result.remove();
        });
    
        var hints = undefined;
        var food = document.getElementById("inputBox").value;
        var code = undefined
      
        
        fetch("https://api.edamam.com/api/food-database/v2/parser?app_id=4bd531fc&app_key=0ca3c3f32aad4dca2bd4565b182209bd&ingr=" + food + "&nutrition-type=cooking")    
            .then(res => res = res.json())
            .then(res => parseHints(res.hints))
            .catch(function(error){
                fetch("https://api.edamam.com/api/food-database/v2/parser?app_id=4bd531fc&app_key=0ca3c3f32aad4dca2bd4565b182209bd&brand=" + food + "&nutrition-type=cooking") 
                .then(res => res = res.json())
                .then(res => parseHints(res.hints))
            })
            
        
    
        
        
    
    
        
    
    });
  }




function addIt(string){
    

    document.getElementById('resultsArea').innerHTML = string;
  
}


function parseHints( hints){
    var div = document.createElement("div");
    div.innerHTML = "\x0A";
    document.getElementById("resultsArea").appendChild(div);
    div.setAttribute("style","height:35px");
    div.className = "result"

    console.log(hints)
    if(hints.length == 0){
        var noRes = document.createElement("div");
        noRes.innerHTML = "No Results, searched item may not be in database";
        document.getElementById("resultsArea").appendChild(noRes);
        noRes.className = "result"

    }
    for(var i = 0; i<=hints.length; i++){
        var output = ""
        item = hints[i];
        if(item!= undefined){
            var food = item.food
            var brand = food.brand
            var measures = item. measures
            var servingSize = measures[0].weight
            servingSize = servingSize/100
            var title = food.label
            var nutri = food.nutrients
            var cal = nutri.ENERC_KCAL
            var pro = nutri.PROCNT
            var fat = nutri.FAT
            var carbs = nutri.CHOCDF
            var fib = nutri.FIBTG
            if(cal != undefined){
                cal = cal*servingSize
                cal = Math.round(cal)
            }
            else{
                cal = 0
            }
            if(pro != undefined){
                pro = pro*servingSize
                pro = Math.round(pro)
            }
            else{
                pro = 0
            }
            if(fat != undefined){
                fat = fat*servingSize
                fat = Math.round(fat)
            }
            else{
                fat = 0
            }
            if(carbs != undefined){
                carbs = carbs*servingSize
                carbs = Math.round(carbs)
            }
            else{
                carbs = 0
            }
            if(fib != undefined){
                fib = fib*servingSize
                fib = Math.round(fib)
            }
            else{
                fib = 0
            }

            var titles = document.createElement("div");
            titles.innerHTML = title;
            document.getElementById("resultsArea").appendChild(titles);
            titles.className = "result"
            if(brand != undefined){
                var brands = document.createElement("div");
                brands.innerHTML = brand;
                document.getElementById("resultsArea").appendChild(brands);
                brands.className = "result"
            }
            var perServe = document.createElement("div");
            perServe.innerHTML = "Per Serving:";
            document.getElementById("resultsArea").appendChild(perServe);
            perServe.className = "result"

            var cals = document.createElement("div");
            cals.innerHTML = "Calories: " +cal.toString() + "g";
            document.getElementById("resultsArea").appendChild(cals);
            cals.className = "result"

            var pros = document.createElement("div");
            pros.innerHTML = "Protein: " + pro.toString() + "g";
            document.getElementById("resultsArea").appendChild(pros);
            pros.className = "result"

            var fats = document.createElement("div");
            fats.innerHTML = "Fat: " + fat.toString() +"g";
            document.getElementById("resultsArea").appendChild(fats);
            fats.className = "result"

            var carbss = document.createElement("div");
            carbss.innerHTML = "Carbs: " +carbs.toString() +"g";
            document.getElementById("resultsArea").appendChild(carbss);
            carbss.className = "result"

            var fibers = document.createElement("div");
            fibers.innerHTML = "Fiber: " + fib.toString() + "g";
            document.getElementById("resultsArea").appendChild(fibers);
            fibers.className = "result"


            var div = document.createElement("div");
            div.innerHTML = "\x0A";
            document.getElementById("resultsArea").appendChild(div);
            div.setAttribute("style","height:35px");
            div.className = "result"
        }

        
}



}