const API_URL = 'http://localhost:3001/api';

export const login = async (username: string, password: string) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }
};

export const register = async (username: string, password: string) => {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        throw new Error('Registration failed');
    }
};

export const logout = async () => {
    const res = await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
    });
    if (!res.ok) throw new Error('Logout failed');
};

export const getToken = (): string | null => null;

export const isAuthenticated = async (): Promise<boolean> => {
    try {
        const res = await fetch(`${API_URL}/auth/verify`, {
            credentials: 'include',
        });
        return res.ok;
    } catch {
        return false;
    }
};
