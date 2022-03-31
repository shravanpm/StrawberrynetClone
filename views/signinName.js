// https://a.cdnsbn.com/images/common/Strawbaby_default.png


var nameShow = document.getElementById("profileNameShow")
var profileIconShow = document.getElementById("profileIconShow")
var LoginedUser=localStorage.getItem("LoginedUser")
console.log("LOFFFF",LoginedUser)
if(LoginedUser){
    profileIconShow.style.display="none"
    nameShow.style.display="block"
    var image = document.createElement("img")
    image.src="https://a.cdnsbn.com/images/common/Strawbaby_default.png"
    var profileName=document.createElement("h5")
    profileName.style.marginTop="10px"
    profileName.style.fontSize="16px"
    profileName.style.fontWeight="bold"
    profileName.textContent=LoginedUser
    nameShow.style.display="flex"
    nameShow.style.alignItems="center"
    nameShow.style.gap="5px"
    nameShow.append(image,profileName)

}