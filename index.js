
const checkLogin = async () => {
    const userName = document.getElementById('userName');
    const password = document.getElementById('password');
    if (!!userName.value && !!password.value) {
        try {
            const response = await fetch('http://18.133.180.192:5000/users/' + userName.value);
            const myJson = await response.json();
            const userDetail = myJson;
            window.sessionStorage.setItem("userDetail", JSON.stringify(userDetail));
            window.location.href = "./html/course.html";
        } catch (err) {
            window.alert('Invalid Credentials');
        }
    } else {
        window.alert('All fields are required');
    }
}
