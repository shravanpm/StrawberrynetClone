

async function logIn(url,body){
try {
    let res = await fetch("http://localhost:5000/login",body);
    console.log(res)
    let data = await res.json();
    console.log(data);
    localStorage.setItem("token",JSON.stringify(data.token));
} catch (error) {
    console.log(error);
}
}



let _loginData = {
    "email" : "prathyu@gmail.com",
    "password" : "123"
}

_loginData = JSON.stringify(_loginData);

let body = {method : "POST",
body : _loginData,
headers : {
    "Content-Type" : "application/json"
}}



let loginURL = "http://localhost:5000/login"
logIn(loginURL,body);

async function getCartData(){
    try {
        let token = JSON.parse(localStorage.getItem("token"));
        if(!token){
            return null;
        }
        let res = await fetch("http://localhost:5000/cart",{
            headers : {
                "Content-Type" : "application/json",
                "authorization" : `Bearer ${token}`
            }
        });
        let data = await res.json();
        console.log(data);
    } catch (error) {
        
    }
}


// getCartData();
/**
 * 
 * @param {_id: "62457eaa5a5810efd2c44354"
​​
count: 3
​​
productId: Object { _id: "62457bada41a5fb1b1736150", name: "paris And laorial", price: 576, … }
​​
userId: Object { _id: "62457990a41a5fb1b173614d", name: "shravan" }} url 
 */


async function updatedCartData(id,x){
    try {
        let token = JSON.parse(localStorage.getItem("token"));
        let res = await fetch(`http://localhost:5000/cart/${id}`,{
            method : "GET",
            body:x,
            headers : {
                "Content-Type" : "application/json",
                "authorization" : `Bearer ${token}`
            }
        });
        let data = await res.json();
        console.log(data);
    } catch (error) {
        
    }
}


//delete one

async function deleteOneData(id){
    try {
        let token = JSON.parse(localStorage.getItem("token"));
        let res = await fetch(`http://localhost:5000/cart/${id}`,{
            method : "DELETE",
            body:x,
            headers : {
                "Content-Type" : "application/json",
                "authorization" : `Bearer ${token}`
            }
        });
        let data = await res.json();
        console.log(data);
    } catch (error) {
        
    }
}


//delete all

async function deleteCartData(){
    try {
        let token = JSON.parse(localStorage.getItem("token"));
        let res = await fetch("http://localhost:5000/cart",{
            method:"DELETE",
            headers : {
                "Content-Type" : "application/json",
                "authorization" : `Bearer ${token}`
            }
        });
        let data = await res.json();
        console.log(data);
    } catch (error) {
        
    }
}

// deleteCartData();

