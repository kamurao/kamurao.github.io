$(document).ready(function() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    //today = dd + '-' + mm + '-' + yyyy;
    today = "18-07-2022";

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
    
    var tenLargest10 = new Array(10).fill(0)
    var tenLargestName = new Array(10).fill(0)
    var tenLargestPrice1 = new Array(10).fill(0)
    var tenLargestPrice10 = new Array(10).fill(0)
    var tenLargestPrice100 = new Array(10).fill(0)
    var tenLargestDifference = new Array(10).fill(0)
    var tenLargestCostForOne = new Array(10).fill(0)
    var tenLargest = 0;
    
    var tenOneLargest10 = new Array(10).fill(0)
    var tenOneLargestName = new Array(10).fill(0)
    var tenOneLargestPrice1 = new Array(10).fill(0)
    var tenOneLargestPrice10 = new Array(10).fill(0)
    var tenOneLargestPrice100 = new Array(10).fill(0)
    var tenOneLargestDifference = new Array(10).fill(0)
    var tenOneLargestCostForOne = new Array(10).fill(0)
    var tenOneLargest = 0;

    for(var i = 0; i < data.length; i++) {
        if(data[i].date === today) {
        //CALCULATE COST FOR 100 TABLE
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
            if(data[i].price10 != 0 && data[i].price1 != 0) {
                var costForOne = parseInt((data[i].price10/10))
                var priceDifference = parseInt(data[i].price1) - costForOne
                for(var y = 0; y < largest10.length; y++) {
                    if(priceDifference > largest10[y]) {
                        tenLargest10[y] = priceDifference
                        tenLargestName[y] = data[i].itemName
                        tenLargestPrice1[y] = data[i].price1
                        tenLargestPrice10[y] = data[i].price10
                        tenLargestPrice100[y] = data[i].price100
                        tenLargestDifference[y] = priceDifference
                        tenLargestCostForOne[y] = costForOne
                        break;
                    }
                }
            }
            if(data[i].price100 != 0 && data[i].price10 != 0) {
                var costForTen = parseInt((data[i].price100/10))
                var priceDifference = parseInt(data[i].price10) - costForTen
                for(var y = 0; y < tenOneLargest10.length; y++) {
                    if(priceDifference > largest10[y]) {
                        tenOneLargest10[y] = priceDifference
                        tenOneLargestName[y] = data[i].itemName
                        tenOneLargestPrice1[y] = data[i].price1
                        tenOneLargestPrice10[y] = data[i].price10
                        tenOneLargestPrice100[y] = data[i].price100
                        tenOneLargestDifference[y] = priceDifference
                        tenOneLargestCostForOne[y] = costForOne
                        break;
                    }
                }
            }
        }
    }
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

    var tenTable = document.getElementById("tenItemTable");
    for(var i = 0; i < tenLargestName.length; i++) {
        var tr = document.createElement("tr");
        tenTable.appendChild(tr);
        var opt = tenLargestName[i];
        var el = document.createElement("td");
        el.textContent = opt;
        el.value = opt;
        tenTable.appendChild(el);
        opt = tenLargestPrice1[i]
        addData(el, opt, tenTable)
        opt = tenLargestPrice10[i]
        addData(el, opt, tenTable)
        opt = tenLargestPrice100[i]
        addData(el, opt, tenTable)
        opt = tenLargestCostForOne[i]
        addData(el, opt, tenTable)
        opt = tenLargestDifference[i]
        addData(el, opt, tenTable)
    }

    var tenOneTable = document.getElementById("tenOneItemTable");
        for(var i = 0; i < tenLargestName.length; i++) {
            var tr = document.createElement("tr");
            tenOneTable.appendChild(tr);
            var opt = tenOneLargestName[i];
            var el = document.createElement("td");
            el.textContent = opt;
            el.value = opt;
            tenOneTable.appendChild(el);
            opt = tenOneLargestPrice1[i]
            addData(el, opt, tenOneTable)
            opt = tenOneLargestPrice10[i]
            addData(el, opt, tenOneTable)
            opt = tenOneLargestPrice100[i]
            addData(el, opt, tenOneTable)
            opt = tenOneLargestCostForOne[i]
            addData(el, opt, tenOneTable)
            opt = tenOneLargestDifference[i]
            addData(el, opt, tenOneTable)
        }
    });

});

function addData(el, data, selected) {
    el = document.createElement("td");
    el.textContent = data;
    el.value = data;
    selected.appendChild(el);
}