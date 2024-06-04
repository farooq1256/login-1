const getRandomId = () => {
    return Math.random().toString().slice(2);
};

document.getElementById("register").style.display = "none";
document.getElementById("todos").style.display = "none";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let arr = [];

document.getElementById("btn1").onclick = () => {
    let email = document.getElementById('loginEmail').value;
    let password = document.getElementById("loginPassword").value;
    let existingUser = arr.find((user) => user.email === email);

    if (existingUser) {
        showToastify("User already registered", "error");
        return;
    }
    
    if (!emailRegex.test(email)) {
        showToastify("Please enter your email correctly", "error");
        return;
    }
    
    if (!password) {
        showToastify("Please enter your password", "error");
        return;
    }

    arr.push({ 
        id: getRandomId(),
        email: email,
        password: password,
        status: "Active",
        createdAt: new Date()
    });
    showToastify("Successfully registered", "success");
    document.getElementById("login").style.display = "none";
    document.getElementById("register").style.display = "block";
};

document.getElementById("btn2").onclick = () => {
    let email = document.getElementById('registerEmail').value;
    let password = document.getElementById("registerPassword").value;
    let user = arr.find((user) => user.email === email && user.password === password);

    
    if (!emailRegex.test(email)) {
        showToastify("Please enter your email correctly", "error");
        return;
    }
    
    if (!user || user.password !== password) {
        showToastify("Please enter your password", "error");
        return;
    }
    if (user) {
        document.getElementById("register").style.display = "none";
        document.getElementById("webPage").innerHTML = ` Your email is: ${email}`;
        showToastify("User successfully logged in", "success");
    }  
    document.getElementById("register").style.display = "none";
    document.getElementById("todos").style.display = "block";
};

function showToastify(msg, type) {
    let bgColor = "";
    switch (type) {
        case "success":
            bgColor = "green";
            break;
        case "error":
            bgColor = "red";
            break;
        default:
            bgColor = "#000";
            break;
    }
    Toastify({
        text: msg,
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: bgColor,
    }).showToast();
}




// handleSumbit function
const handleSubmit = (event) => {

    
    let Title = document.getElementById("Title").value;
    let descrition = document.getElementById("descrition").value;
    let date = document.getElementById("date").value;
    Title = Title.trim();
    descrition = descrition.trim();
    if (Title.length < 3) {
        showToastify("Enter the correct Title", "error");
        return;
    }
    if (descrition.length < 3) {
        showToastify("Enter the correct descrition", "error");
        return;
    }
    if (date.length == " ") {
        showToastify("Enter the correct date", "error");
        return;
    }
    let todo = {
        Title,descrition,date
    };
    todo.id = getRandomId();
    todo.status = "active";
    todo.createdAt = new Date()

    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    showToastify("A new todo has been successfully added to the list", "success");
    
   
}