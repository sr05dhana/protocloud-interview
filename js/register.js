
const registerUser = async () => {
    const userName = document.getElementById('userName');
    const password = document.getElementById('password');
    const role = document.getElementById('role');
    if (!!userName.value && !!password.value && !!role.value) {
        try {
            const response = await fetch('http://18.133.180.192:5000/createuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password: password.value, role: role.value, username: userName.value }),
            });
            const myJson = await response.json();
            window.alert(myJson);
            window.location.href = "../index.html";
        } catch (err) {
            window.alert('User Already exists');
        }
    } else {
        window.alert('All fields are required');
    }
}
