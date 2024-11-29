import bcrypt from 'bcrypt';

export async function hashPassword(plainTextPassword: string) {
    const saltRounds = 10; // complexity of the hashing
    const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);
    return hashedPassword;
}

export async function verifyPassword(plainTextPassword: string, hashedPassword: string) {
    const isMatch = await bcrypt.compare(plainTextPassword, hashedPassword);
    return isMatch; // Returns true if passwords match
}