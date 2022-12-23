const validateEmail = (email: string) => {
    try {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return true;
        }

        return false;
    } catch {
        return false;
    }
};

export default validateEmail;
