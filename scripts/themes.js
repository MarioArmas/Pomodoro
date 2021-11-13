const checkbox = document.getElementById("switch");

checkbox.addEventListener('change', () => {
    let theme = localStorage.getItem('data-theme');
    if (theme === 'dark') {
        changeThemeToLight()
    }
    else {
        changeThemeToDark()
    }
});

let theme = localStorage.getItem('data-theme');
const changeThemeToDark = () => {
    document.documentElement.setAttribute("data-theme", "dark")
    localStorage.setItem("data-theme", "dark")
}

const changeThemeToLight = () => {
    document.documentElement.setAttribute("data-theme", "light")
    localStorage.setItem("data-theme", 'light')
}