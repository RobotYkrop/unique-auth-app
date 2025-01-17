import { API_ENDPOINTS } from '../libs/models/apiModels';

const createResponse = (body: object, status: number) =>
  new Response(JSON.stringify(body), { status });

const handleError = (message: string, status: number) => {
  return createResponse({ error: message }, status);
};
const handleRegister = async (body: BodyInit) => {
  const { email, password } = JSON.parse(body as string);

  const existingUsersJSON = localStorage.getItem('users');
  const existingUsers = existingUsersJSON ? JSON.parse(existingUsersJSON) : [];

  if (existingUsers.some((user: { email: string }) => user.email === email)) {
    return handleError('Email already registered', 400);
  }

  existingUsers.push({ email, password });
  localStorage.setItem('users', JSON.stringify(existingUsers));
  return createResponse({ success: 'Registered successfully' }, 200);
};

const handleLogin = async (body: BodyInit) => {
  const { email, password } = JSON.parse(body as string);

  const existingUsersJSON = localStorage.getItem('users');
  const existingUsers = existingUsersJSON ? JSON.parse(existingUsersJSON) : [];

  if (
    existingUsers.some(
      (user: { email: string; password: string }) =>
        user.email === email && user.password === password,
    )
  ) {
    return createResponse({ success: 'Login successful' }, 200);
  }

  return handleError('Invalid email or password', 400);
};

const handleVerify = async (body: BodyInit) => {
  const { verificationCode } = JSON.parse(body as string);

  if (verificationCode === '123456') {
    return createResponse(
      { success: 'Verification successful. You are now registered.' },
      200,
    );
  }

  return handleError('Invalid verification code', 400);
};

export const mockFetch = (
  url: string,
  options: RequestInit,
): Promise<Response> => {
  return new Promise<Response>((resolve, reject) => {
    setTimeout(async () => {
      const { body, method } = options;
      if (body) {
        try {
          if (url === API_ENDPOINTS.REGISTER && method === 'POST') {
            resolve(await handleRegister(body));
          } else if (url === API_ENDPOINTS.LOGIN && method === 'POST') {
            resolve(await handleLogin(body));
          } else if (url === API_ENDPOINTS.VERIFY && method === 'POST') {
            resolve(await handleVerify(body));
          }
        } catch (error) {
          reject(error);
        }
      }
    }, 2000);
  });
};
