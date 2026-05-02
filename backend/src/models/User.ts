import mongoose, { HydratedDocument } from 'mongoose';
import { nanoid } from 'nanoid';
import bcrypt from 'bcrypt';

interface UserMethods {
    checkPassword(password: string): Promise<boolean>;
    generateToken(): void;
}

type UserDocument = HydratedDocument<any, UserMethods>;

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
        default: () => nanoid(),
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
});

UserSchema.pre('save', async function () {
    const user = this as UserDocument;

    if (!user.isModified('password')) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
});

UserSchema.methods.checkPassword = function (password: string) {
    return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
    this.token = nanoid();
};

UserSchema.set('toJSON', {
    transform: (_doc, ret: any) => {
        ret.password = undefined;
        return ret;
    },
});

const User = mongoose.model('User', UserSchema);

export default User;