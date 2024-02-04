export default function filterUser(user: any) {
    try {
        const { _id, sl, username, email, name, userType, createdAt, updatedAt } = user;
        return { _id, sl, username, email, name, userType, createdAt, updatedAt };
    } catch (error) {
        return {};
    }
}