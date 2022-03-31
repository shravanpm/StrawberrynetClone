// let getAdmin = async (email, token) => {
// 		try {
// 			let res = await fetch(`http://localhost:5000/admin/${email}`, {
// 				headers: {
// 					"Content-Type": "application/json",
// 					"Authorization": `Bearer ${token}`
// 				}
// 			})

// 			let data = await res.json()
// 			localStorage.setItem("LogginedEmail", data.email);

// 		} catch (error) {
// 			console.log(error);
// 		}
// 	}


//     module.exports = getAdmin