
const get_users_data = () => {

    if (localStorage.getItem("users_data") == null) {
        localStorage.setItem("users_data", "[]")
        return JSON.parse(localStorage.getItem("users_data"))
    } else {
    return JSON.parse(localStorage.getItem("users_data"))
    }
}

const set_user_data = (users_data) => {

    localStorage.setItem("users_data", JSON.stringify(users_data))

}

const create_user = () => {

    let users_data = get_users_data();

    let name_input = document.getElementById("name_input").value;
    let username_input = document.getElementById("username_input").value;
    let password_input = document.getElementById("password_input").value;

    if (name_input == "" || username_input == "" || password_input == "") {
        alert("Please enter the details to sign up!")
    }   else    {
        let user = {
            name : name_input,
            username : username_input,
            password : `${btoa(password_input)}`
        }
        users_data.push(user);
    }

    set_user_data(users_data);
    
}

const welcome_user = (user) => {
    document.getElementById("sign_in_block").innerHTML = "";
    document.getElementById("welcome_text_login").textContent = `Hi ${user}!`
}

const not_registered = () => {
    document.getElementById("sign_in_block").innerHTML = "";
    let heading = document.getElementById("welcome_text_login");
    heading.style.gridArea = "sign_up_block";
    heading.classList.add("fade_in_animation");
    heading.textContent = `🥲 looks like you are not registered with us. Visit the Sign Up page 👆🏻 to register now!`;
}
const fetch_user = () => {

    let users_data = get_users_data();
    
    let username_input = document.getElementById("username_input").value;
    let password_input = document.getElementById("password_input").value;

    let found_user = users_data.find((user) => user.username === username_input);

    if (found_user) {
        let password = atob(found_user.password);
        if (password === password_input) {
            welcome_user(found_user.name);
        } else {
            document.getElementById("password_input").placeholder = "Password not matched!";
            document.getElementById("password_input").classList.add("red_placeholder");
        }
    } else {
        not_registered();
    }
}