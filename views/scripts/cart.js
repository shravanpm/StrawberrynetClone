var arr=JSON.parse(localStorage.getItem("projectData"))||[];
var Laodcount =  document.getElementsByClassName("cartCount")[0]
Laodcount.innerHTML=arr.length;
//cartData takes the productData from local storage

let cartData = JSON.parse(localStorage.getItem("projectData")) ||  [];

//totalCart will save the data of tolal price and extra

let totalCart= JSON.parse(localStorage.getItem("totalCart")) ||[];

//products are where data need to shown

let products = document.getElementById("products");

//sumArr stores the final cart price after qty change etc
var sumArr=[];


//checkOutDta stores the updated cart value in checkoutdata
let checkOutData = [];

//function showdata is use to render product list
function showData(data){
    products.innerHTML =null;
    products.innerText = "";
   
   //emptying sumArr each time
    sumArr = [];
    
       

    let goods = document.createElement("p");
    goods.innerText = "Goods shipped from Strawberrynet";
    products.append(goods);

    data.map(function(el,index){

        let obj = {} //object is created to push the data in checkoutdata

        let div = document.createElement("div");
        div.id = "card";

        let hr = document.createElement("hr");

        let div1 = document.createElement("div");
        div1.id = "cartImage";
        let image = document.createElement("img");
        image.src = el.image;  
        
        obj["image"] = el.image;
        div1.append(image);

        let div2 = document.createElement("div");
    
    let title = document.createElement("p");
    title.innerText = el.brand;
    let desc = document.createElement("p");
    desc.innerText = el.name;

    obj["title"] = el.brand;
    obj["desc"] = el.name;
   
    div2.append(title,desc);

    let div3 = document.createElement("div");
    div3.id = "qty";

    let qty = 1;
    
    obj["qty"] = qty;
    //div4 initialistion done before completing Div3 because price needed declare earlier
    let div4 = document.createElement("div");
    // let qty = document.getElementById(`select${i}`).value 
    
    let prodPrice = document.createElement("p");
   
    prodPrice.setAttribute("class","price");

    let x = qty*el.price;
        sumArr[index] = x;

    obj["price"] = x;
    obj["single"] = el.price;
        //showPrice() function is a seperate function used to show price only because,
        //  it need to change with qty change and removing a product.
    showPrice(prodPrice,x);
    
    //div5 is used to add remove function
    let div5 = document.createElement("div");
    let dlt = document.createElement("img");
    dlt.id = "delete";
    dlt.src = "images/remove.png";

    dlt.addEventListener("click",function (){
        
        console.log(data,"data before")
        
        //we have to splice every arr needed to splice w.r.t index and value needed to be updated in local storage also
        
        data.splice(index,1);
        sumArr.splice(index,1);
        showSum(sumArr);
        localStorage.setItem("projectData",JSON.stringify(data))
        cartData = JSON.parse(localStorage.getItem("projectData")) || [];

        
        checkOutData.splice(index,1);


        checkOutData = [];
        
        localStorage.setItem("checkOutData",JSON.stringify(checkOutData));

        
        products.innerHTML = null;
        
        //we are calling showData function once again with updated data
        showData(data);
        

    });
    div5.append(dlt);
    div4.append(prodPrice);
    //div4 completion

    let p10 = document.createElement("p");
    p10.innerText = ` ${qty} `;

    //b1 and b2 are used to change qty number

    let b1 = document.createElement("button");
    b1.innerText = "+";
    
    b1.addEventListener("click",function(){
        if(qty<20){
            qty++;
            
            //after changing qty value we need to change sumArr and need to show updated product price w.r.t qty

            p10.innerText = `${qty}`;
            let val = qty * el.price;
            sumArr[index] = val;
            showPrice(prodPrice,val);
            showSum(sumArr);
            
            //w.r.t quantity change we need to update every keys in checkoutdata when only try to change price only there is a glitch
            checkOutData[index]["image"] = el.image;
            checkOutData[index]["title"] = el.brand;
            checkOutData[index]["desc"] = el.name;
            checkOutData[index]["qty"] = qty;
            checkOutData[index]["price"] = val;
            checkOutData[index]["single"] = el.price;
            console.log(checkOutData,"b1");
            localStorage.setItem("checkOutData",JSON.stringify(checkOutData));

            
            
        }else{
            qty = 20;
        }
    });

    let b2 = document.createElement("button");
    b2.innerText = "-";
    b2.addEventListener("click",function(){
        if(qty>1){
            qty--;
            p10.innerText = ` ${qty} `;
            let val = qty * el.price;
            sumArr[index] = val;
            showPrice(prodPrice,val);
            showSum(sumArr);

            checkOutData[index]["image"] = el.image;
            checkOutData[index]["title"] = el.brand;
            checkOutData[index]["desc"] = el.name;
            checkOutData[index]["qty"] = qty;
            checkOutData[index]["single"] = el.price;
            checkOutData[index]["price"] = val;

            console.log(checkOutData,"b2");
            localStorage.setItem("checkOutData",JSON.stringify(checkOutData));

            let tem = JSON.parse(localStorage.getItem("checkOutData"));

            
            
        }else{
            qty = 1;
        }
    });
    
    //pushing the obj to checkoutdata
    checkOutData.push(obj);

    div3.append(b2,p10,b1);
  
    div.append(div1,div2,div3,div4,div5);

    products.append(hr,div);
    
  
    })
    let hr5=document.createElement("hr");
    products.append(hr5)
    showSum(sumArr);

    localStorage.setItem("checkOutData",JSON.stringify(checkOutData));
    console.log(checkOutData,"first");
    
};


showData(cartData);

//showPrice funtion used to update price value
function showPrice(parent,amount){
    parent.innerText="";
    parent.innerText = amount;
}

//showSum is used to take the data from product data and make total and variable price and do required 

function showSum(sumArr,qty){
    let sum =0; //variable declared to sum
    
    totalCart = []; /// totalCart is reassigned
    localStorage.setItem("totalCart",JSON.stringify(totalCart));

    let totalObj = {

         };
    
    for(let i=0;i<sumArr.length;i++){
        sum +=sumArr[i];
    }
    let cartTotal = document.getElementById("cartTotal");
    cartTotal.innerHTML = null;
    

    //initialisation
    let div = document.createElement("div");
    div.id="cartValue";


    let div1 = document.createElement("div");
    let hr = document.createElement("hr");
    let h1 = document.createElement("h4");
    h1.innerText = `Item Total : ${sumArr.length} item(s)`;
    let h2 = document.createElement("h4");
    h2.innerText = `INR ${sum}`;

    totalObj["cartTotal"] = sum;

    div1.append(h1,h2);

    //div2 initialisation

    let div2 = document.createElement("div");
    div2.id = "redtext";
    
    let p1 = document.createElement("p");
    p1.innerText = `Extra 10% Off (New Customer)`
    let p2 = document.createElement("p");
    let temp = (sum*10)/100;
    temp.toFixed(2);
    
    
    totalObj["newCustomer"] = temp;
    
    p2.innerText =`-INR ${temp}`;
    sum = sum-temp;
    sum.toFixed(2);

    div2.append(p1,p2);

    //div3 starts

    let div3 = document.createElement("div");
    div3.id = "redtext"
    
    let p3 = document.createElement("p");
    p3.innerText = `Extra 8% Off (February Sale)`
    let p4 = document.createElement("p");
    temp = (sum*8)/100;
    temp = temp.toFixed(2);
    p4.innerText =`-INR ${temp}`;
    
    
    totalObj["february"] = temp;

    sum = sum-temp;

    div3.append(p3,p4);

    //div4 starts
    totalObj["stdShip"] = "";

    let div4 = document.createElement("div");
    if(sum<11582){

        
    
        let p5 = document.createElement("p");
        p5.innerText = `Standard Shipping (Signature)`
        let p6 = document.createElement("p");
        temp = 772.20;
        sum = sum+temp;
        p6.innerText =`INR ${temp}`;
        

        totalObj["stdShip"] = temp;

        div4.append(p5,p6);


    }else{
        totalObj["stdShip"] = 0;
    }

    //div5 starts
    let div5 = document.createElement("div");

        let p7 = document.createElement("p");
        p7.innerText = `Freight Surcharge `
        let p8 = document.createElement("p");
        temp = 240.60;
        sum = sum+temp;
        p8.innerText =`INR ${temp}`;
        
        totalObj["freight"] = temp;
        div5.append(p7,p8);

    //div6 starts

    let hr2 = document.createElement("hr");

    let div6 = document.createElement("div");
    let h3 = document.createElement("h2");
    h3.innerText = `Order Total: ${sumArr.length} item(s)`;
    let h4 = document.createElement("h2");
    sum = sum.toFixed(2);
    h4.innerText = `INR ${sum}`;

    totalObj["total"] = sum;
    div6.append(h3,h4);

    div.append(div1,div2,div3,div4,div5,hr2,div6);


    
    cartTotal.append(div);

    totalCart.push(totalObj);

    console.log(totalCart,"totalCart");
    localStorage.setItem("totalCart",JSON.stringify(totalCart));

    showSpend(sum);
}

//showSpend function is used to add dynamicsm spend div as, in bar how much need to remove shipping charge

function showSpend(sum){
    let parrent = document.getElementById("total");
    parrent.innerText ="";
    let de = document.querySelector("#del");


let spendbar = document.getElementById("spendbar");

if(sum<11582){
    let per = (sum/11582)*100;
    spendbar.style.width = `${per}%`;
    // parent.innerText = `Spend INR${1-sum} more for a reduced standard shipping fee at INR386.10.`;
    let sPend =11582-sum;
    sPend = sPend.toFixed(2);
    parrent.innerText = `Spend INR${sPend} more for a free shipping.`;
    de.innerText = "Free standard shipping for order above INR11,582.80."
}else{
    spendbar.style.width = `100%`;

    
    de.innerText = "Happy Shopping";
    
    
    parrent.innerText = `You're now eligible for FREE Standard shipping​`;

}


}

let checkOutPage = document.getElementById("checkOutPage");
checkOutPage.addEventListener("click",function(){
    window.location.href = "checkout.html";
});

let signout = document.getElementById("signout");
signout.addEventListener("click",function(){
    window.location.href = "login.html"
});
