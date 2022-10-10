function checkForToken(navigate, route, destiny) {
    const token = localStorage.getItem("token");

    if (token) {
        navigate(destiny);
    } else {
        if (route === "/sign-up") {
            navigate("/sign-up");
        } else {
            navigate("/");
        }
    }
};

export default checkForToken;