// Ofuscación del email: el HTML nunca lo contiene en texto plano.
// En build se guarda invertido y en base64; en el navegador se reconstruye al cargar la página.
export const encodeMail = (email: string) => Buffer.from([...email].reverse().join(''), 'utf8').toString('base64');
export const decodeMail = (encoded: string) => [...atob(encoded)].reverse().join('');
