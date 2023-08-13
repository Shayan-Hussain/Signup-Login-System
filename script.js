
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
        alert("Please enter full details to sign up!")
    }   else    {
        let user = {
            name : name_input,
            username : username_input,
            password : `${btoa(password_input)}`,
            signedin : false
        }
        users_data.push(user);
    }

    set_user_data(users_data);
    
}

const welcome_user = (user) => {

    window.location.href = "account.html";

    let heading = document.getElementById("welcome_text_account");

    console.log(heading.innerHTML)

    // heading.innerHTML = `hello ${user.username}`


}

const not_registered = () => {
    document.getElementById("sign_in_block").innerHTML = "";
    let heading = document.getElementById("welcome_text_login");
    heading.style.gridArea = "sign_up_block";
    heading.classList.add("fade_in_animation");
    heading.textContent = `🥲 looks like you are not registered with us. Visit the Sign Up page 👆🏻 to register now!`;
}

const change_placeholder_red = () => {
    document.getElementById("password_input").placeholder = "Password not matched!";
    document.getElementById("password_input").classList.add("red_placeholder");
}

const fetch_user = (event) => {

    event.preventDefault();
    
    let users_data = get_users_data();
    
    let username_input = document.getElementById("username_input").value;
    let password_input = document.getElementById("password_input").value;

    if (username_input == "" || password_input == "") {
        alert("Please enter your credentials to login!");
        return;
        }   else    {
        let found_user = users_data.find((user) => user.username === username_input);

        if (found_user !== undefined ) {
            password = atob(found_user.password);
            if (password == password_input) {
                console.log("hello");
                welcome_user(found_user);
            }   else    {
                password_input = " ";
                change_placeholder_red();
            }
        } else {
            not_registered();
        }
    }
}

 document.getElementById("login_form").addEventListener("submit", fetch_user);