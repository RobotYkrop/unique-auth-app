interface User {
    email: string;
    password: string;
}

const users: User[] = [];

export const registerUser = (email: string, password: string): boolean => {
    if (users.find(user => user.email === email)) {
        return false; // Пользователь уже существует
    }
    users.push({ email, password });
    return true; // Регистрация успешна
};

export const authenticateUser = (email: string, password: string): boolean => {
    return users.some(user => user.email === email && user.password === password);
};