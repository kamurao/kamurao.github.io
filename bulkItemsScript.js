$(document).ready(function() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    //today = dd + '-' + mm + '-' + yyyy;
    today = "14-07-2022";

    console.log(today)

    var select = document.getElementById("itemTable");
    d3.csv("./data.csv", function(data) {
    var itemNameList = []
    var largest10 = new Array(10).fill(0)
    var largestName = new Array(10).fill(0)
    var largestPrice1 = new Array(10).fill(0)
    var largestPrice10 = new Array(10).fill(0)
    var largestPrice100 = new Array(10).fill(0)
    var largestDifference = new Array(10).fill(0)
    var largestCostForOne = new Array(10).fill(0)
    var largest = 0;

    for(var i = 0; i < data.length; i++) {
        if(data[i].date === today) {
            if(data[i].price100 != 0 && data[i].price1 != 0) {
                var costForOne = parseInt((data[i].price100/100))
                var priceDifference = parseInt(data[i].price1) - costForOne
                for(var y = 0; y < largest10.length; y++) {
                    if(priceDifference > largest10[y]) {
                        largest10[y] = priceDifference
                        largestName[y] = data[i].itemName
                        largestPrice1[y] = data[i].price1
                        largestPrice10[y] = data[i].price10
                        largestPrice100[y] = data[i].price100
                        largestDifference[y] = priceDifference
                        largestCostForOne[y] = costForOne
                        break;
                    }
                }
                if(priceDifference > largest) {
                    largest = priceDifference;
                }
                itemNameList.push(priceDifference)
            }
        }
    }
    var uniqueItemNames = [...new Set(itemNameList)];
    console.log(uniqueItemNames)
        for(var i = 0; i < largestName.length; i++) {
            var tr = document.createElement("tr");
            select.appendChild(tr);
            var opt = largestName[i];
            var el = document.createElement("td");
            el.textContent = opt;
            el.value = opt;
            select.appendChild(el);
            opt = largestPrice1[i]
            addData(el, opt, select)
            opt = largestPrice10[i]
            addData(el, opt, select)
            opt = largestPrice100[i]
            addData(el, opt, select)
            opt = largestCostForOne[i]
            addData(el, opt, select)
            opt = largestDifference[i]
            addData(el, opt, select)
        }
    });

});

function addData(el, data, select) {
    el = document.createElement("td");
    el.textContent = data;
    el.value = data;
    select.appendChild(el);
}