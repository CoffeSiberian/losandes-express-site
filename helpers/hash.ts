import bcrypt from "bcrypt";

const saltRounds = 11;

const hashPass = async (pass: string, callback: Function) => {
    bcrypt.hash(pass, saltRounds, (err, hash) => {
        return callback(hash);
    });
};

const checkHash = async (
    pass: string,
    passHash: string,
    callback: Function
) => {
    bcrypt.compare(pass, passHash, (err, result) => {
        if (err !== undefined) return callback(false);
        return callback(result);
    });
};

export { hashPass, checkHash };
