import { isUUID } from 'class-validator';

function isValidUUID(userId: string): boolean {
    return isUUID(userId);
}

export { isValidUUID };
