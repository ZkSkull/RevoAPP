// Adicione um timeout para evitar requisições pendentes indefinidamente
const API_TIMEOUT = 10000; // 10 segundos

export async function authenticate(credentials) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                identifier: credentials.identifier, // pode ser email, usuário ou CPF
                password: credentials.password
            }),
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Falha no login');
        }

        return await response.json();
    } catch (error) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
            throw new Error('Tempo de conexão excedido');
        }
        throw error;
    }
}