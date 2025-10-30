export class Encryption {
    public static async deriveKey(password: string, salt: BufferSource) {
        const encoder = new TextEncoder();
        const passwordBuffer = encoder.encode(password);
        const importedKey = await crypto.subtle.importKey(
            "raw",
            passwordBuffer,
            { name: "PBKDF2" },
            false,
            ["deriveBits", "deriveKey"]
        );
        const derivedKey = await crypto.subtle.deriveKey(
            {
                name: "PBKDF2",
                salt: salt,
                iterations: 100000,
                hash: "SHA-256"
            },
            importedKey,
            { name: "AES-GCM", length: 256 },
            false,
            ["encrypt", "decrypt"]
        );
        return derivedKey;
    }

    public static async decryptData(encryptedBase64: string, password: string) {
        const encryptedData = base64ToArrayBuffer(encryptedBase64);
        const salt = encryptedData.slice(0, 16);
        const iv = encryptedData.slice(16, 28);
        const encryptedBuffer = encryptedData.slice(28);
        const key = await this.deriveKey(password, salt);
        const decryptedBuffer = await crypto.subtle.decrypt(
            {
                name: "AES-GCM",
                iv: iv
            },
            key,
            encryptedBuffer
        );

        const decoder = new TextDecoder();
        return decoder.decode(decryptedBuffer);
        /* -------------------------------------------------------------------------- */

        function base64ToArrayBuffer(base64: string): Uint8Array {
            const binaryString = atob(base64);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            return bytes;
        }
    }
}